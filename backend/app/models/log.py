from sqlalchemy import Column, Integer, String, DateTime
from app.db.database import Base
import datetime

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer)
    platform = Column(String)
    status = Column(String)  # success / failed / retry_success
    response = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)