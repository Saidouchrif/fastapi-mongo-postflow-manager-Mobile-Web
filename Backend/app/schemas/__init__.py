from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PostIn(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1)

class PostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    content: Optional[str] = Field(None, min_length=1)

class PostOut(PostIn):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
