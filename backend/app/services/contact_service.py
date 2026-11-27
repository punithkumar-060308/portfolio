import logging
from datetime import datetime, timezone
from app.db.mongo import get_database
from app.schemas.contact import ContactCreate
from app.services.email_service import send_contact_notification

logger = logging.getLogger(__name__)

async def process_contact_submission(payload: ContactCreate) -> dict:
    db = get_database()
    record = {
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "status": "new",
        "created_at": datetime.now(timezone.utc),
        "source": "portfolio"
    }

    if db is not None:
        try:
            db["contact_messages"].insert_one(record)
            logger.info(f"Stored contact message from {payload.email}")
        except Exception as e:
            logger.error(f"Failed to write to MongoDB: {e}")
    else:
        logger.warning(f"MongoDB not connected. Logged message from {payload.email}: {payload.subject}")

    # Optionally trigger async email notification
    await send_contact_notification(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message
    )

    return {
        "success": True,
        "message": "Your message has been received. Thank you for reaching out!"
    }
