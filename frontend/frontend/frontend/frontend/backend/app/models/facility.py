from uuid import UUID

from pydantic import BaseModel, EmailStr, Field

from app.models.common import TimestampedRead


class FacilityBase(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    location: str | None = Field(default=None, max_length=200)
    address: str | None = None
    phone: str | None = Field(default=None, max_length=40)
    email: EmailStr | None = None
    services: list[str] | None = None
    opening_hours: str | None = None
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    description: str | None = None


class FacilityCreate(FacilityBase):
    pass


class FacilityUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=200)
    location: str | None = None
    address: str | None = None
    phone: str | None = None
    email: EmailStr | None = None
    services: list[str] | None = None
    opening_hours: str | None = None
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)
    description: str | None = None


class FacilityRead(FacilityBase, TimestampedRead):
    id: UUID
