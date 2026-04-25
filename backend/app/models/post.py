from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
import datetime

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    status = Column(String, default="draft")  # draft, scheduled, posted
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    scheduled_at = Column(DateTime, nullable=True)
    media_id = Column(Integer, ForeignKey("media.id"), nullable=True)
    media = relationship("Media")