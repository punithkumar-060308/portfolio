import logging
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)

async def send_contact_notification(name: str, email: str, subject: str, message: str) -> bool:
    if not settings.EMAIL_ENABLED or not settings.RESEND_API_KEY:
        logger.info("Email notifications disabled or API key not configured.")
        return False

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": settings.FROM_EMAIL,
                    "to": settings.CONTACT_NOTIFICATION_EMAIL,
                    "subject": f"Portfolio Contact: {subject} from {name}",
                    "text": f"Name: {name}\nEmail: {email}\n\nSubject: {subject}\n\nMessage:\n{message}"
                }
            )
            return resp.status_code in (200, 201)
    except Exception as e:
        logger.error(f"Failed to send email notification: {e}")
        return False
