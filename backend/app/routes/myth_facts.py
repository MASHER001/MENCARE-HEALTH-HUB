from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status

from app.core.dependencies import require_admin_user
from app.database.supabase_client import get_admin_client, get_public_client
from app.schemas.myth_fact import MythFactCreate, MythFactRead, MythFactUpdate

router = APIRouter(tags=["Myth vs Fact"])


@router.get("/myth-facts", response_model=list[MythFactRead], summary="List myth vs fact entries")
def list_myth_facts(limit: int = Query(50, ge=1, le=200)) -> list[dict[str, Any]]:
    response = (
        get_public_client()
        .table("myth_facts")
        .select("*")
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )
    return response.data or []


@router.get("/myth-facts/{myth_fact_id}", response_model=MythFactRead, summary="Fetch one myth vs fact entry")
def get_myth_fact(myth_fact_id: str) -> dict[str, Any]:
    response = (
        get_public_client()
        .table("myth_facts")
        .select("*")
        .eq("id", myth_fact_id)
        .single()
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Myth vs fact not found.")
    return response.data


@router.post(
    "/myth-facts",
    response_model=MythFactRead,
    status_code=status.HTTP_201_CREATED,
    summary="Create a myth vs fact entry",
)
def create_myth_fact(
    myth_fact: MythFactCreate,
    user: dict[str, Any] = Depends(require_admin_user),
) -> dict[str, Any]:
    del user
    response = (
        get_admin_client()
        .table("myth_facts")
        .insert(myth_fact.model_dump(mode="json"))
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to create myth vs fact entry.")
    return response.data[0]


@router.put("/myth-facts/{myth_fact_id}", response_model=MythFactRead, summary="Update a myth vs fact entry")
def update_myth_fact(
    myth_fact_id: str,
    myth_fact: MythFactUpdate,
    user: dict[str, Any] = Depends(require_admin_user),
) -> dict[str, Any]:
    del user
    update_data = myth_fact.model_dump(exclude_unset=True, mode="json")
    if not update_data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields were provided for update.")

    response = (
        get_admin_client()
        .table("myth_facts")
        .update(update_data)
        .eq("id", myth_fact_id)
        .select("*")
        .single()
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Myth vs fact not found.")
    return response.data


@router.delete("/myth-facts/{myth_fact_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a myth vs fact entry")
def delete_myth_fact(myth_fact_id: str, user: dict[str, Any] = Depends(require_admin_user)) -> Response:
    del user
    response = (
        get_admin_client()
        .table("myth_facts")
        .delete()
        .eq("id", myth_fact_id)
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Myth vs fact not found.")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
