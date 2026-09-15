from typing import Any

from app.database.supabase_client import get_public_client


def global_search(query: str, limit: int = 10) -> dict[str, list[dict[str, Any]]]:
    db = get_public_client()
    pattern = f"%{query}%"

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
    facts = (
        db.table("health_facts")
        .select("id,title,content")
        .or_(f"title.ilike.{pattern},content.ilike.{pattern}")
        .limit(limit)
        .execute()
        .data
        or []
    )
    return {"conditions": conditions, "symptoms": symptoms, "health_facts": facts}
