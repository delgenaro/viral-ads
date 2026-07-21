from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import auth, avatars, videos, templates


@asynccontextmanager
async def lifespan(app: FastAPI):
    import os
    os.makedirs(settings.upload_dir, exist_ok=True)
    yield


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(avatars.router)
app.include_router(videos.router)
app.include_router(templates.router)


@app.get("/health")
async def health():
    return {"status": "ok", "version": settings.app_version}
