from fastapi import APIRouter
from app.db.mongo import get_database

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check():
    db = get_database()
    return {
        "status": "ok",
        "database": "connected" if db is not None else "disconnected"
    }
