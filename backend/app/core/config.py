import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "ViralAds"
    app_version: str = "0.1.0"
    debug: bool = True

    database_url: str = "sqlite:///./viral_ads.db"

    pollo_api_key: str = ""
    pollo_api_base: str = "https://pollo.ai/api/platform"

    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 1440

    upload_dir: str = "./uploads"
    max_file_size_mb: int = 50

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
