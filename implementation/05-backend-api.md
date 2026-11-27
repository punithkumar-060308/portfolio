# 05 — Backend API (FastAPI)

## Backend responsibilities
- Accept and validate contact form submissions.
- Store messages in MongoDB.
- Optionally send a notification email.
- Provide public project/profile endpoints only if content needs to be dynamic.
- Protect any admin endpoints with authentication and authorization.

Do not expose database credentials, email API keys or admin secrets to the browser.

## Suggested structure
```text
backend/app/
├── main.py
├── core/
│   └── config.py
├── db/
│   └── mongo.py
├── api/routes/
│   ├── health.py
│   ├── contact.py
│   └── projects.py
├── schemas/
│   └── contact.py
└── services/
    ├── contact_service.py
    └── email_service.py
```

## Minimal app entry point
```py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import health, contact

app = FastAPI(title="Punith Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(health.router, prefix="/api")
app.include_router(contact.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Portfolio API is running"}
```

For production, replace the local CORS origin with the exact deployed frontend origin. Do not use wildcard origins with credentials.

## API contract

### `GET /api/health`
Response:
```json
{ "status": "ok" }
```

### `POST /api/contact`
Request:
```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "subject": "Project collaboration",
  "message": "Hello, I would like to discuss..."
}
```
Success response:
```json
{
  "success": true,
  "message": "Your message has been received."
}
```

Expected validation:
- Name: 2–80 characters.
- Email: valid email, max 254 characters.
- Subject: 3–120 characters.
- Message: 10–5000 characters.
- Reject empty/whitespace-only values.
- Trim input and normalize email casing.

### Optional `GET /api/projects`
Return published projects only. Add pagination if the list becomes large.

## Contact schema example
```py
from pydantic import BaseModel, EmailStr, Field, field_validator

class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    subject: str = Field(min_length=3, max_length=120)
    message: str = Field(min_length=10, max_length=5000)

    @field_validator("name", "subject", "message")
    @classmethod
    def strip_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("This field cannot be empty")
        return value
```

## Security and abuse prevention
- Add rate limiting to contact submission.
- Add a honeypot field or CAPTCHA only if spam becomes a problem.
- Limit request body size.
- Never return internal exception details to clients.
- Validate all inputs server-side.
- Add structured logging without logging message contents unnecessarily.
- Use HTTPS in production.
- Add a retention/deletion policy for stored contact messages.

## API error format
Return useful HTTP status codes:
- `200` or `201`: accepted
- `422`: validation error
- `429`: rate limit exceeded
- `500`: generic server error

Keep API responses predictable and do not return stack traces.
