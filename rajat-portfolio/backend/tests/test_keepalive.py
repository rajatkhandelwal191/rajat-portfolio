import pytest
from starlette.testclient import TestClient

from app.main import app
from app.services.keepalive_service import keepalive_service


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def test_keepalive_status_endpoint(client):
    response = client.get("/health/keepalive")
    assert response.status_code == 200
    data = response.json()
    assert "enabled" in data
    assert "supabase" in data
    assert "groq" in data
    assert data["supabase"]["interval_hours"] == 6.0
    assert data["groq"]["interval_hours"] == 48.0


def test_keepalive_trigger_supabase(client):
    response = client.post("/api/keepalive/trigger?target=supabase")
    assert response.status_code == 200
    data = response.json()
    assert "supabase" in data
    assert data["supabase"]["status"] in ("ok", "skipped")
    if data["supabase"]["status"] == "ok":
        assert isinstance(data["supabase"]["chunk_count"], int)
        assert data["supabase"]["chunk_count"] >= 0


def test_keepalive_trigger_groq(client):
    response = client.post("/api/keepalive/trigger?target=groq")
    assert response.status_code == 200
    data = response.json()
    assert "groq" in data
    assert data["groq"]["status"] in ("ok", "skipped")
    if data["groq"]["status"] == "ok":
        assert data["groq"]["response"] is not None


def test_ping_supabase_direct():
    import asyncio
    result = asyncio.run(keepalive_service.ping_supabase())
    assert result["status"] in ("ok", "skipped")
    if result["status"] == "ok":
        assert result["chunk_count"] == 66
