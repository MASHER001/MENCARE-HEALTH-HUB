from fastapi import APIRouter, Depends

from app.core.dependencies import require_admin_user

router = APIRouter(tags=["Admin"])


@router.get("/admin/me", summary="Return the currently authenticated admin profile")
def get_admin_profile(user=Depends(require_admin_user)):
    return {
        "id": user.get("id"),
        "email": user.get("email"),
        "role": user.get("role"),
        "is_admin": True,
    }
