from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    env: str = "development"
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    allowed_origins: list[str] = ["http://localhost:3000"]

    groq_model: str = "llama-3.3-70b-versatile"
    groq_api_key: str = ""
    supabase_url: str = ""
    supabase_service_role_key: str = ""
    supabase_db_url: str = ""
    huggingfacehub_api_token: str = ""
    embedding_model_name: str = "sentence-transformers/all-MiniLM-L6-v2"
    embedding_dimension: int = 384
    faiss_storage_path: str = "storage/faiss"
    profile_markdown_path: str = "app/data/rajat_khandelwal_profile.md"
    auto_ingest_on_startup: bool = True

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_allowed_origins(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, list):
            return value
        if not value:
            return ["http://localhost:3000"]
        return [origin.strip() for origin in value.split(",") if origin.strip()]

    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        enable_decoding=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
