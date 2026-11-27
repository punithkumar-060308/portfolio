# 06 — Database Models (MongoDB)

## Database
Suggested database name: `punith_portfolio`.

## Collections

### `contact_messages`
```json
{
  "_id": "ObjectId",
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "subject": "Collaboration",
  "message": "Message body",
  "status": "new",
  "created_at": "UTC datetime",
  "source": "portfolio"
}
```

### Optional `projects`
Use this only if projects must be managed dynamically.
```json
{
  "_id": "ObjectId",
  "slug": "exo-scan-ai",
  "title": "Exo-Scan AI",
  "summary": "Verified short summary",
  "description": "Full verified description",
  "stack": ["Python", "Lightkurve"],
  "status": "prototype",
  "featured": true,
  "published": true,
  "github_url": null,
  "demo_url": null,
  "created_at": "UTC datetime",
  "updated_at": "UTC datetime"
}
```

## Indexes
- `contact_messages.created_at` descending, for recent messages.
- `contact_messages.status` for admin filtering.
- `projects.slug` unique.
- `projects.published` plus `projects.featured` if project listing queries need it.

## Data handling
- Store timestamps in UTC.
- Do not store visitor IP addresses unless there is a clear security need and a disclosed retention policy.
- Avoid storing unnecessary personal information.
- Escape/sanitize content when displaying it in an admin interface.
- Back up the database and test restoration.
- Use a database user with only the permissions required by the application.

## Connection management
Create one MongoDB client during application startup and close it during shutdown. Read the connection string from environment variables. Add a short server selection timeout and handle unavailable database states gracefully.

## Static content versus database
For a personal portfolio, static profile/project content in the frontend repository is often simpler and safer. Use MongoDB primarily for contact messages. Introduce a `projects` collection only if a real content-management requirement exists.
