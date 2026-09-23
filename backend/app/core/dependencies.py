from fastapi import Depends

from app.core.security import get_current_user, require_admin


def get_authenticated_user(user=Depends(get_current_user)):
    return user


def require_admin_user(user=Depends(require_admin)):
    return user
