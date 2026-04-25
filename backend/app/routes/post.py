from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.post import Post
from app.models.post_platform import PostPlatform
from app.models.platform import Platform
from app.schemas.post import PostCreate, BulkPost
from datetime import datetime
from app.models.log import Log
from app.schemas.ai import ContentRequest
from app.services.ai import (
    generate_caption,
    generate_hashtags,
    platform_format,
    best_time_to_post,
    predict_engagement,
    optimize_content
)
from app.models.media import Media
from typing import List

# PLATFORM REGISTRY
from app.services.platforms.registry import platform_registry

router = APIRouter(prefix="/posts")


# ---------------- DB ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- GET POSTS ----------------
@router.get("/")
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(Post).order_by(Post.id.desc()).all()

    result = []
    for post in posts:
        result.append({
            "id": post.id,
            "content": post.content,
            "status": post.status,
            "scheduled_at": post.scheduled_at,
            "platforms": [],

            # ✅ MEDIA
            "media_url": post.media.file_url if post.media else None,
            "media_type": post.media.type if post.media else None
        })

    return result


# ---------------- CREATE POST ----------------
@router.post("/")
def create_post(data: PostCreate, db: Session = Depends(get_db)):

    ai_caption = generate_caption(data.content).strip().strip('"')
    hashtags = generate_hashtags(data.content).strip()
    final_content = f"{ai_caption}\n\n{hashtags}"

    # time conversion
    scheduled_time = None
    if data.scheduled_at:
        try:
            scheduled_time = datetime.fromisoformat(data.scheduled_at)
        except:
            scheduled_time = None

    status = "scheduled" if scheduled_time else "draft"

    # ✅ INCLUDE MEDIA
    post = Post(
        content=final_content,
        status=status,
        scheduled_at=scheduled_time,
        media_id=data.media_id
    )

    db.add(post)
    db.commit()
    db.refresh(post)

    # platforms
    for platform_id in data.platforms:
        db.add(PostPlatform(post_id=post.id, platform_id=platform_id))

    db.commit()

    return {
        "message": "Post created",
        "status": status,
        "scheduled_at": scheduled_time
    }


# ---------------- PUBLISH ----------------
@router.post("/publish/{post_id}")
def publish_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()

    if not post:
        return {"error": "Post not found"}

    print("🚀 Publishing post:", post.id)

    post_platforms = db.query(PostPlatform).filter(
        PostPlatform.post_id == post_id
    ).all()

    print("🧩 Post Platforms:", post_platforms)

    for pp in post_platforms:
        platform = db.query(Platform).filter(
            Platform.id == pp.platform_id
        ).first()

        if not platform:
            print("❌ Platform not found")
            continue

        if platform.name not in platform_registry:
            print("❌ Platform not in registry:", platform.name)
            continue

        print("✅ Platform ID:", pp.platform_id)
        print("✅ Platform:", platform.name)

        adapter = platform_registry[platform.name]

        try:
            formatted = post.content   # ✅ simple clean message

            print("📤 Sending to Telegram:", formatted)

            res = adapter(formatted)

            db.add(Log(
                post_id=post.id,
                platform=platform.name,
                status="success",
                response=str(res)
            ))

            pp.status = "posted"

        except Exception as e:
            print("❌ Error:", e)

            db.add(Log(
                post_id=post.id,
                platform=platform.name,
                status="failed",
                response=str(e)
            ))

            pp.status = "failed"

    db.commit()
    return {"message": "Published"}


# ---------------- SCHEDULE ----------------
@router.post("/schedule/{post_id}")
def schedule_post(post_id: int, time: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()

    if not post:
        return {"error": "Post not found"}

    post.scheduled_at = datetime.fromisoformat(time)
    post.status = "scheduled"

    db.commit()

    return {"message": "Post scheduled"}


# ---------------- LOGS (FIXED) ----------------
@router.get("/logs")
def get_logs(db: Session = Depends(get_db)):
    posts = db.query(Post).order_by(Post.id.desc()).all()

    logs = []
    for post in posts:
        logs.append({
            "id": post.id,
            "content": post.content,
            "status": post.status,
            "time": post.scheduled_at,

            # ✅ MEDIA INCLUDED
            "media_url": post.media.file_url if post.media else None,
            "media_type": post.media.type if post.media else None
        })

    return logs


# ---------------- AI ----------------
@router.post("/generate-caption")
def get_caption(data: ContentRequest):
    return {"result": generate_caption(data.content)}


@router.post("/generate-hashtags")
def get_hashtags(data: ContentRequest):
    return {"result": generate_hashtags(data.content)}


@router.post("/best-time")
def best_time(data: ContentRequest):
    return {"result": best_time_to_post(data.content)}


@router.post("/predict")
def predict(data: ContentRequest):
    return {"result": predict_engagement(data.content)}


@router.post("/optimize")
def optimize(data: ContentRequest):
    return {"result": optimize_content(data.content)}


# ---------------- BULK ----------------
@router.post("/bulk")
def bulk_create(data: List[BulkPost], db: Session = Depends(get_db)):
    ids = []

    for item in data:
        post = Post(content=item.content)
        db.add(post)
        db.commit()
        db.refresh(post)

        for pid in item.platforms:
            db.add(PostPlatform(post_id=post.id, platform_id=pid))

        db.commit()
        ids.append(post.id)

    return {"created_posts": ids}


# ---------------- STATS ----------------
@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    return {
        "total": db.query(Post).count(),
        "scheduled": db.query(Post).filter(Post.status == "scheduled").count(),
        "published": db.query(Post).filter(Post.status == "posted").count(),
        "draft": db.query(Post).filter(Post.status == "draft").count()
    }


# ---------------- RECENT ----------------
@router.get("/recent")
def get_recent_posts(db: Session = Depends(get_db)):
    return db.query(Post).order_by(Post.id.desc()).limit(5).all()


# ---------------- PLATFORMS ----------------
@router.get("/platforms")
def get_platforms(db: Session = Depends(get_db)):
    platforms = db.query(Platform).all()
    return [{"id": p.id, "name": p.name} for p in platforms]

# ---------------- PLATFORM CONNECTION ----------------

connected_platforms = {}

@router.get("/platforms/connected")
def get_connected():
    return connected_platforms


@router.post("/platforms/connect/{platform_id}")
def connect_platform(platform_id: int):
    connected_platforms[platform_id] = True
    return {"message": f"Platform {platform_id} connected"}


@router.post("/platforms/disconnect/{platform_id}")
def disconnect_platform(platform_id: int):
    connected_platforms.pop(platform_id, None)
    return {"message": f"Platform {platform_id} disconnected"}

@router.get("/init-platforms")
def init_platforms(db: Session = Depends(get_db)):
    names = [
        "LinkedIn",
        "Twitter (X)",
        "Instagram",
        "YouTube",
        "Reddit",
        "Telegram"
    ]

    for name in names:
        existing = db.query(Platform).filter(Platform.name == name).first()
        if not existing:
            db.add(Platform(name=name))

    db.commit()

    return {"message": "Platforms added to DB"}