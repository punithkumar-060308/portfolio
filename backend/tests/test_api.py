import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.fixture
def anyio_backend():
    return 'asyncio'

@pytest.mark.anyio
async def test_root():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
        assert "Punith Kumar B S Portfolio API" in response.json()["message"]

@pytest.mark.anyio
async def test_health():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/health")
        assert response.status_code == 200
        assert response.json()["status"] == "ok"

@pytest.mark.anyio
async def test_contact_validation_failure():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {
            "name": "",
            "email": "invalid-email",
            "subject": "",
            "message": ""
        }
        response = await ac.post("/api/contact", json=payload)
        assert response.status_code == 422

@pytest.mark.anyio
async def test_contact_valid_submission():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        payload = {
            "name": "Jane Developer",
            "email": "jane@example.com",
            "subject": "AI Project Collaboration",
            "message": "Hi Punith, I would love to collaborate on your exoplanet detection pipeline."
        }
        response = await ac.post("/api/contact", json=payload)
        assert response.status_code == 201
        assert response.json()["success"] is True

@pytest.mark.anyio
async def test_list_projects():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/projects")
        assert response.status_code == 200
        projects = response.json()
        assert len(projects) >= 3
        assert any(p["slug"] == "exo-scan-ai" for p in projects)

@pytest.mark.anyio
async def test_get_project_detail():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/projects/exo-scan-ai")
        assert response.status_code == 200
        assert response.json()["title"] == "Exo-Scan AI"

@pytest.mark.anyio
async def test_get_project_not_found():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/projects/non-existent-project")
        assert response.status_code == 404
