from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import os
from datetime import datetime

from app.db.database import SessionLocal
from app.models.media import Media

router = APIRouter(prefix="/media")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/upload")
async def upload_media(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        # Save file
        filename = f"{datetime.now().timestamp()}_{file.filename}"
        filepath = os.path.join(UPLOAD_DIR, filename)

        with open(filepath, "wb") as buffer:
            buffer.write(await file.read())

        # ✅ SAVE TO DB (IMPORTANT PART)
        media = Media(
            file_url=filepath,
            type=file.content_type
        )

        db.add(media)
        db.commit()
        db.refresh(media)

        print("SAVED MEDIA:", media.id, media.file_url)  # DEBUG

        return {"id": media.id, "url": filepath}

    except Exception as e:
        print("UPLOAD ERROR:", e)
        return {"error": str(e)}


# Get all media
@router.get("/")
def get_media(db: Session = Depends(get_db)):
    return db.query(Media).order_by(Media.id.desc()).all()