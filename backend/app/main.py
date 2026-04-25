from fastapi import FastAPI
from app.routes import auth
from app.routes import media


# DB imports
from app.db.database import Base, engine
from app.models import user  # important to register model
from app.models import user, post, platform, post_platform
from app.routes import auth, post
import threading
from app.services.worker import run_worker
from app.models import log
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Routes
app.include_router(auth.router)
app.include_router(post.router)
app.include_router(media.router)
threading.Thread(target=run_worker, daemon=True).start()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def home():
    return {"message": "Backend running 🚀"}