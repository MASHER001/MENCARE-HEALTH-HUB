from typing import Any

from app.database.supabase_client import get_public_client


def global_search(query: str, limit: int = 10) -> dict[str, list[dict[str, Any]]]:
    query_text = (query or "").strip()
    if not query_text:
        return {"conditions": [], "symptoms": [], "facilities": [], "health_facts": [], "myth_facts": []}

    db = get_public_client()
    pattern = f"%{query_text}%"

    conditions = (
        db.table("conditions")
        .select("id,name,slug,definition,category_id")
        .or_(f"name.ilike.{pattern},definition.ilike.{pattern},quick_fact.ilike.{pattern}")
        .limit(limit)
        .execute()
        .data
        or []
    )
    symptoms = (
        db.table("symptoms")
        .select("id,name,description")
        .or_(f"name.ilike.{pattern},description.ilike.{pattern}")
        .limit(limit)
        .execute()
        .data
        or []
    )
    facilities = (
        db.table("facilities")
        .select("id,name,location,services")
        .or_(f"name.ilike.{pattern},location.ilike.{pattern},services.ilike.{pattern}")
        .limit(limit)
        .execute()
        .data
        or []
    )
    health_facts = (
        db.table("health_facts")
        .select("id,title,content")
        .or_(f"title.ilike.{pattern},content.ilike.{pattern}")
        .limit(limit)
        .execute()
        .data
        or []
    )
    myth_facts = (
        db.table("myth_facts")
        .select("id,myth,fact,explanation,category_id")
        .or_(f"myth.ilike.{pattern},fact.ilike.{pattern},explanation.ilike.{pattern}")
        .limit(limit)
        .execute()
        .data
        or []
    )
    return {
        "conditions": conditions,
        "symptoms": symptoms,
        "facilities": facilities,
        "health_facts": health_facts,
        "myth_facts": myth_facts,
    }
