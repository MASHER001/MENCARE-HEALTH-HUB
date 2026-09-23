from fastapi.testclient import TestClient

from app.main import app


def test_search_endpoint_returns_grouped_results(monkeypatch):
    from app.services import search_service

    monkeypatch.setattr(
        search_service,
        "global_search",
        lambda query, limit=10: {
            "conditions": [{"id": "1", "name": "BPH"}],
            "symptoms": [{"id": "2", "name": "weak stream"}],
            "facilities": [{"id": "3", "name": "Clinic"}],
            "health_facts": [{"id": "4", "title": "BPH fact"}],
            "myth_facts": [{"id": "5", "myth": "BPH is caused by cancer"}],
        },
    )

    client = TestClient(app)
    response = client.get("/api/v1/search", params={"q": "bph"})

    assert response.status_code == 200
    data = response.json()
    assert set(data) == {"conditions", "symptoms", "facilities", "health_facts", "myth_facts"}
    assert data["conditions"][0]["name"] == "BPH"


def test_myth_fact_model_has_expected_fields():
    from app.models.myth_fact import MythFactBase

    payload = {
        "myth": "Myth",
        "fact": "Fact",
        "explanation": "Explanation",
        "category_id": "123e4567-e89b-12d3-a456-426614174000",
    }

    model = MythFactBase(**payload)
    assert model.myth == "Myth"
    assert model.fact == "Fact"
