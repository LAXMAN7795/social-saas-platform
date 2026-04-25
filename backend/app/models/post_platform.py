from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.database import Base

class PostPlatform(Base):
    __tablename__ = "post_platforms"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id"))
    platform_id = Column(Integer, ForeignKey("platforms.id"))
    status = Column(String, default="pending")