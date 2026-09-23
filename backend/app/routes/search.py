from fastapi import APIRouter, Query

from app.services import search_service

router = APIRouter(tags=["Search"])


@router.get("/search", summary="Search across conditions, symptoms, facilities, health facts and myth-vs-fact content")
def search(q: str = Query(..., min_length=1, alias="q", description="Search text to match against the public content tables."), limit: int = Query(10, ge=1, le=25)):
    return search_service.global_search(query=q, limit=limit)
