from __future__ import annotations

from typing import Any

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import settings
from app.database.supabase_client import get_admin_client

bearer_scheme = HTTPBearer(auto_error=False)


def _as_user_mapping(user: Any) -> dict[str, Any]:
    if isinstance(user, dict):
        return user
    if user is None:
        return {}
    if hasattr(user, "model_dump"):
        payload = user.model_dump()
        if isinstance(payload, dict):
            return payload
    return {
        key: getattr(user, key)
        for key in ("id", "email", "role", "app_metadata", "user_metadata")
        if hasattr(user, key)
    }


def user_has_admin_role(user: Any) -> bool:
    """Return True when the Supabase user carries an admin role claim.

    This is intentionally isolated so the team can replace the exact claim
    source once the project decides how admin access is stored in Supabase.
    """
    user_map = _as_user_mapping(user)
    if not user_map:
        return False

    claim_names = {name.lower() for name in settings.ADMIN_ROLE_CLAIM_NAMES if name}
    if not claim_names:
        claim_names = {"admin", "administrator"}

    sources = [
        user_map.get("app_metadata") or {},
        user_map.get("user_metadata") or {},
        user_map.get("role") and {"role": user_map.get("role")},
        user_map,
    ]

    for source in sources:
        if not isinstance(source, dict):
            continue
        values: list[str] = []
        for key in ("role", "roles", "admin", "is_admin"):
            value = source.get(key)
            if value is not None:
                if isinstance(value, list):
                    values.extend(str(item).lower() for item in value)
                else:
                    values.append(str(value).lower())
        if any(value in claim_names for value in values):
            return True

        if "is_admin" in source and source.get("is_admin") is True:
            return True

    return False


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict[str, Any]:
    if credentials is None or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = credentials.credentials
    try:
        client = get_admin_client()
        response = client.auth.get_user(access_token)
    except Exception as exc:  # pragma: no cover - Supabase auth error path
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired Supabase token.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    user = _as_user_mapping(getattr(response, "user", None))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unable to resolve authenticated Supabase user.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


def require_admin(user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    if not user_has_admin_role(user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrative privileges are required for this operation.",
        )
    return user
