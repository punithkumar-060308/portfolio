from fastapi import APIRouter, HTTPException, status
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_service import process_contact_submission

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(payload: ContactCreate):
    try:
        result = await process_contact_submission(payload)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit contact message. Please try again later."
        )
