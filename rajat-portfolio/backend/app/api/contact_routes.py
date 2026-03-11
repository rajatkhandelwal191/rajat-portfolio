import logging
from datetime import date

from fastapi import APIRouter, Header, HTTPException, Query, Request
from pydantic import BaseModel, Field, field_validator

from app.core.config import settings
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


class ContactSubmissionItem(BaseModel):
    id: int
    name: str
    email: str
    company: str = ""
    message: str
    metadata: dict[str, object] = {}
    created_at: str


class ContactSubmissionListResponse(BaseModel):
    status: str
    total: int
    items: list[ContactSubmissionItem]


def _assert_admin_password(password_header: str | None) -> None:
    configured_password = settings.contact_admin_password.strip()
    if not configured_password:
        raise HTTPException(status_code=503, detail="Contact admin password is not configured.")
    if not password_header or password_header.strip() != configured_password:
        raise HTTPException(status_code=401, detail="Invalid admin password.")


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


@router.get("/submissions", response_model=ContactSubmissionListResponse)
def list_contact_submissions(
    x_admin_password: str | None = Header(default=None),
    name: str | None = Query(default=None, max_length=120),
    email: str | None = Query(default=None, max_length=254),
    company: str | None = Query(default=None, max_length=160),
    date_from: date | None = Query(default=None),
    date_to: date | None = Query(default=None),
    limit: int = Query(default=100, ge=1, le=500),
) -> ContactSubmissionListResponse:
    _assert_admin_password(x_admin_password)

    if not contact_repository.is_configured:
        raise HTTPException(status_code=503, detail="Contact storage is not configured.")

    try:
        rows = contact_repository.list_submissions(
            name=name,
            email=email,
            company=company,
            date_from=date_from.isoformat() if date_from else None,
            date_to=date_to.isoformat() if date_to else None,
            limit=limit,
        )
    except Exception as exc:
        logger.exception("Contact submissions query failed: %s", exc)
        raise HTTPException(status_code=500, detail=f"Failed to fetch contact submissions: {exc}") from exc

    items = [
        ContactSubmissionItem(
            id=row["id"],
            name=row["name"],
            email=row["email"],
            company=row["company"] or "",
            message=row["message"],
            metadata=row["metadata"] or {},
            created_at=row["created_at"].isoformat(),
        )
        for row in rows
    ]
    return ContactSubmissionListResponse(status="ok", total=len(items), items=items)
