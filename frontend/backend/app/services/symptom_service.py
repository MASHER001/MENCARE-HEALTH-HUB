from typing import Any

from app.database.supabase_client import get_admin_client, get_public_client


def conditions_for_symptom(symptom_id: str) -> list[dict[str, Any]]:
    """Resolve the many-to-many condition_symptoms join for one symptom."""
    links = (
        get_public_client()
        .table("condition_symptoms")
        .select("condition_id")
        .eq("symptom_id", symptom_id)
        .execute()
        .data
        or []
    )
    condition_ids = [row["condition_id"] for row in links]
    if not condition_ids:
        return []
    return (
        get_public_client()
        .table("conditions")
        .select("id,name,slug,definition,category_id")
        .in_("id", condition_ids)
        .order("name")
        .execute()
        .data
        or []
    )


def symptoms_for_condition(condition_id: str) -> list[dict[str, Any]]:
    links = (
        get_public_client()
        .table("condition_symptoms")
        .select("symptom_id")
        .eq("condition_id", condition_id)
        .execute()
        .data
        or []
    )
    symptom_ids = [row["symptom_id"] for row in links]
    if not symptom_ids:
        return []
    return (
        get_public_client()
        .table("symptoms")
        .select("*")
        .in_("id", symptom_ids)
        .order("name")
        .execute()
        .data
        or []
    )


def link_symptom(condition_id: str, symptom_id: str) -> dict[str, Any]:
    return (
        get_admin_client()
        .table("condition_symptoms")
        .upsert({"condition_id": condition_id, "symptom_id": symptom_id})
        .execute()
        .data[0]
    )


def unlink_symptom(condition_id: str, symptom_id: str) -> None:
    (
        get_admin_client()
        .table("condition_symptoms")
        .delete()
        .eq("condition_id", condition_id)
        .eq("symptom_id", symptom_id)
        .execute()
    )
