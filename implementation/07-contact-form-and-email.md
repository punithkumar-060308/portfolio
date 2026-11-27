# 07 — Contact Form and Email Workflow

## Visitor experience
1. Visitor fills name, email, subject and message.
2. Frontend performs basic validation for quick feedback.
3. Frontend sends a POST request to `/api/contact`.
4. Backend validates again and stores the message.
5. Backend optionally sends an email notification.
6. Frontend displays success or a recoverable error.

## Frontend requirements
- Disable submit while request is in progress.
- Show field-level validation messages.
- Preserve form values after a network error.
- Clear the form only after successful submission.
- Announce status updates using an accessible live region.
- Prevent accidental multiple submissions.

## API client example
```ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" }
});

export async function sendContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { data } = await api.post("/api/contact", payload);
  return data;
}
```

## Email integration
Choose one provider (for example Resend, Brevo or an SMTP service). Keep credentials on the backend only.

Recommended behavior:
- Store the message first.
- Send a notification after successful storage.
- If email delivery fails, retain the stored message and log a safe error.
- Do not tell the visitor the submission failed if the database accepted it; explain that the message was received but notification delivery had an issue only if relevant.

## Spam controls
Start with server-side rate limiting and a hidden honeypot. Add a CAPTCHA only if abuse warrants the extra friction. Do not rely on frontend-only validation.
