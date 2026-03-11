import logging

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field, field_validator

from app.database.contact_repository import contact_repository

router = APIRouter()
logger = logging.getLogger("app.contact_routes")


class ContactSubmissionRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=5, max_length=254)
    company: str | None = Field(default=None, max_length=160)
    message: str = Field(min_length=1, max_length=4000)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        email = value.strip()
        if "@" not in email or "." not in email.split("@")[-1]:
            raise ValueError("Invalid email format.")
        return email


class ContactSubmissionResponse(BaseModel):
    status: str
    submission_id: int


@router.post("", response_model=ContactSubmissionResponse)
def submit_contact(request: ContactSubmissionRequest, raw_request: Request) -> ContactSubmissionResponse:
    if not contact_repository.is_configured:
        raise HTTPException(status_code=503, detail="Contact storage is not configured.")

    metadata = {
        "user_agent": raw_request.headers.get("user-agent", ""),
        "origin": raw_request.headers.get("origin", ""),
        "client_host": raw_request.client.host if raw_request.client else "",
    }

    try:
        submission_id = contact_repository.insert_submission(
            name=request.name.strip(),
            email=request.email.strip(),
            company=request.company.strip() if request.company else None,
            message=request.message.strip(),
            metadata=metadata,
        )
    except Exception as exc:
        logger.exception("Contact submission save failed: %s", exc)
        raise HTTPException(status_code=500, detail=f"Failed to save contact submission: {exc}") from exc

    logger.info("Contact submission saved | id=%s | email=%s", submission_id, request.email)
    return ContactSubmissionResponse(status="ok", submission_id=submission_id)
