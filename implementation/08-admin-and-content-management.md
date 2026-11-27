# 08 — Optional Admin and Content Management

## Recommendation
Skip admin authentication in the first release unless you need to edit projects from a browser. A static project data file is easier to maintain for a personal site.

## If an admin panel is required
Possible capabilities:
- Admin login
- List contact messages
- Mark messages read/archived
- Create, edit, publish and unpublish projects

## Security requirements
- Use a proven authentication approach; do not invent password hashing or token handling.
- Hash passwords with a modern password hashing library.
- Store secrets in environment variables.
- Use short-lived access tokens or secure, HttpOnly cookies with appropriate CSRF protection.
- Enforce authorization on every admin endpoint.
- Add login rate limiting and audit important changes.
- Never ship admin credentials or secret keys to frontend bundles.
- Do not rely on hiding admin buttons as access control.

## Suggested routes
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/messages`
- `PATCH /api/admin/messages/{message_id}`
- `POST /api/admin/projects`
- `PATCH /api/admin/projects/{project_id}`
- `DELETE /api/admin/projects/{project_id}`

Use soft-delete or an archive state for messages and projects where appropriate. Add tests for unauthenticated and unauthorized access before deployment.
