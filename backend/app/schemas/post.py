from pydantic import BaseModel
from typing import List,Optional

# For single post creation
class PostCreate(BaseModel):
    content: str
    platforms: list[int]
    scheduled_at: str | None = None
    media_id: int | None = None   # ✅ ADD THIS

# For bulk post creation
class BulkPost(BaseModel):
    content: str
    platforms: List[int]