import time
from datetime import datetime
from app.db.database import SessionLocal
from app.models.post import Post
from app.routes.post import publish_post

def run_worker():
    while True:
        db = SessionLocal()

        posts = db.query(Post).filter(Post.status == "scheduled").all()

        for post in posts:
            if post.scheduled_at and post.scheduled_at <= datetime.utcnow():
                print(f"Publishing scheduled post {post.id}")

                publish_post(post.id, db)

                post.status = "posted"
                db.commit()

        db.close()
        time.sleep(10)  # check every 10 sec