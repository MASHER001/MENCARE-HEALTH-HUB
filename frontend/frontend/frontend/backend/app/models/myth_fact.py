from uuid import UUID

from pydantic import BaseModel, Field

from app.models.common import TimestampedRead


class MythFactBase(BaseModel):
    myth: str = Field(min_length=2)
    fact: str = Field(min_length=2)
    explanation: str | None = None
    category_id: UUID | None = None


class MythFactCreate(MythFactBase):
    pass


class MythFactUpdate(BaseModel):
    myth: str | None = None
    fact: str | None = None
    explanation: str | None = None
    category_id: UUID | None = None


class MythFactRead(MythFactBase, TimestampedRead):
    id: UUID
