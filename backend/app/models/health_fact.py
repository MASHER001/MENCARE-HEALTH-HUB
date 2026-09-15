from uuid import UUID

from pydantic import BaseModel, Field

from app.models.common import TimestampedRead


class HealthFactBase(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    content: str = Field(min_length=2)
    category_id: UUID | None = None


class HealthFactCreate(HealthFactBase):
    pass


class HealthFactUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=2, max_length=200)
    content: str | None = None
    category_id: UUID | None = None


class HealthFactRead(HealthFactBase, TimestampedRead):
    id: UUID
