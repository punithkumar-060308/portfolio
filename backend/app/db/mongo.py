import logging
from pymongo import MongoClient
from pymongo.database import Database
from app.core.config import settings

logger = logging.getLogger(__name__)

class MongoDB:
    client: MongoClient | None = None
    db: Database | None = None

db_instance = MongoDB()

def get_database() -> Database | None:
    return db_instance.db

def connect_to_mongo():
    try:
        db_instance.client = MongoClient(
            settings.MONGODB_URI,
            serverSelectionTimeoutMS=500
        )
        db_instance.client.admin.command('ping')
        db_instance.db = db_instance.client[settings.MONGODB_DB_NAME]
        
        # Ensure indexes
        messages_col = db_instance.db["contact_messages"]
        messages_col.create_index([("created_at", -1)])
        messages_col.create_index([("status", 1)])
        
        logger.info("Connected to MongoDB successfully.")
    except Exception as e:
        logger.warning(f"MongoDB not connected: {e}. Messages will be handled safely.")
        db_instance.db = None

def close_mongo_connection():
    if db_instance.client:
        try:
            db_instance.client.close()
            logger.info("MongoDB connection closed.")
        except Exception:
            pass
        finally:
            db_instance.client = None
            db_instance.db = None
