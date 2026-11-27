# 09 — Testing and Quality

## Frontend checks
- Test navigation links and mobile menu.
- Test light/dark theme persistence.
- Test contact form loading, success, validation and error states.
- Test project links and missing optional URLs.
- Test responsive layouts at 360px, 768px, 1024px and wide desktop.
- Test keyboard-only navigation and visible focus.
- Test with reduced motion enabled.

## Backend checks
- Health endpoint returns 200.
- Contact endpoint accepts valid data.
- Invalid email and too-short fields are rejected.
- Whitespace-only values are rejected.
- Database failures do not leak internal details.
- Rate limiting works.
- CORS allows only intended origins.
- Email failure does not discard a saved message.

## Example backend test
```py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
```

Use dependency injection for database and email services so tests can substitute fakes without connecting to production services.

## Quality gates
Before release:
- No console errors.
- No broken links.
- No placeholder text.
- No secrets committed.
- No oversized unoptimized images.
- Lighthouse performance/accessibility review.
- Metadata, title, description and social preview configured.
- Favicon and custom 404 page included.
