from uuid import UUID

from pydantic import BaseModel, Field

from app.models.common import TimestampedRead


class CategoryBase(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    description: str | None = Field(default=None, max_length=2000)


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=120)
    description: str | None = Field(default=None, max_length=2000)


class CategoryRead(CategoryBase, TimestampedRead):
    id: UUID
