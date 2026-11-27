from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    PROJECT_NAME: str = "Punith Portfolio API"
    VERSION: str = "1.0.0"
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    MONGODB_URI: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "punith_portfolio"

    EMAIL_ENABLED: bool = False
    RESEND_API_KEY: str = ""
    CONTACT_NOTIFICATION_EMAIL: str = "punith@example.com"
    FROM_EMAIL: str = "portfolio@example.com"

settings = Settings()
