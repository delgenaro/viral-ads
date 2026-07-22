from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    VideoRequest,
    VideoResponse,
    GenerateFromUrlRequest,
    GenerateFromPhotoRequest,
    CloneAdRequest,
    GenerateCombinedRequest,
)
from app.services.video_service import (
    create_video_task,
    update_video,
    get_video,
    list_videos,
)
from app.services.pollo_api import (
    generate_video_from_url,
    generate_video_from_photo,
    generate_avatar_talking_head,
    clone_ad_from_reference,
    get_generation_status,
)
from app.core.config import settings

router = APIRouter(prefix="/videos", tags=["videos"])


@router.post("/", response_model=VideoResponse)
async def create(body: VideoRequest):
    params = body.model_dump(exclude_none=True)
    task = create_video_task(params)
    return VideoResponse(
        id=task["id"],
        status="pending",
        created_at=task["created_at"],
        duration_seconds=body.duration_seconds,
    )


@router.post("/from-url", response_model=VideoResponse)
async def from_url(body: GenerateFromUrlRequest):
    task = create_video_task(body.model_dump())
    if settings.pollo_api_key:
        try:
            result = await generate_video_from_url(str(body.product_url), body.duration_seconds)
            task_id = result.get("taskId") or result.get("id", "")
            task = update_video(task["id"], status="processing", external_id=task_id)
        except Exception as e:
            task = update_video(task["id"], status="error", error=str(e))
    else:
        task = update_video(task["id"], status="demo", url="https://www.w3schools.com/html/mov_bbb.mp4")
    return VideoResponse(
        id=task["id"],
        status=task["status"],
        url=task.get("url"),
        created_at=task["created_at"],
        duration_seconds=body.duration_seconds,
    )


@router.post("/from-photo", response_model=VideoResponse)
async def from_photo(body: GenerateFromPhotoRequest):
    task = create_video_task(body.model_dump())
    if settings.pollo_api_key:
        try:
            result = await generate_video_from_photo(body.product_image, body.script_text, body.duration_seconds)
            task_id = result.get("taskId") or result.get("id", "")
            task = update_video(task["id"], status="processing", external_id=task_id)
        except Exception as e:
            task = update_video(task["id"], status="error", error=str(e))
    else:
        task = update_video(task["id"], status="demo", url="https://www.w3schools.com/html/mov_bbb.mp4")
    return VideoResponse(
        id=task["id"],
        status=task["status"],
        url=task.get("url"),
        created_at=task["created_at"],
        duration_seconds=body.duration_seconds,
    )


@router.post("/clone", response_model=VideoResponse)
async def clone(body: CloneAdRequest):
    task = create_video_task(body.model_dump())
    if settings.pollo_api_key:
        try:
            result = await clone_ad_from_reference(str(body.reference_url), str(body.product_url or body.reference_url))
            task_id = result.get("taskId") or result.get("id", "")
            task = update_video(task["id"], status="processing", external_id=task_id)
        except Exception as e:
            task = update_video(task["id"], status="error", error=str(e))
    else:
        task = update_video(task["id"], status="demo", url="https://www.w3schools.com/html/mov_bbb.mp4")
    return VideoResponse(
        id=task["id"],
        status=task["status"],
        url=task.get("url"),
        created_at=task["created_at"],
        duration_seconds=10,
    )


@router.post("/generate", response_model=VideoResponse)
async def generate(body: GenerateCombinedRequest):
    task = create_video_task(body.model_dump())
    if settings.pollo_api_key:
        try:
            from app.services.pollo_api import generate_avatar_talking_head
            result = await generate_avatar_talking_head(body.avatar_image, body.script_text or "Confira este produto incrível!", body.duration_seconds)
            task_id = result.get("taskId") or result.get("id", "")
            task = update_video(task["id"], status="processing", external_id=task_id)
        except Exception as e:
            task = update_video(task["id"], status="error", error=str(e))
    else:
        task = update_video(task["id"], status="demo", url="https://www.w3schools.com/html/mov_bbb.mp4")
    return VideoResponse(
        id=task["id"],
        status=task["status"],
        url=task.get("url"),
        created_at=task["created_at"],
        duration_seconds=body.duration_seconds,
    )


@router.get("/", response_model=list[VideoResponse])
async def list_all():
    return [
        VideoResponse(
            id=v["id"],
            status=v["status"],
            url=v.get("url"),
            thumbnail_url=v.get("thumbnail_url"),
            created_at=v["created_at"],
            duration_seconds=v["duration_seconds"],
        )
        for v in list_videos()
    ]


@router.get("/{video_id}", response_model=VideoResponse)
async def get(video_id: str):
    v = get_video(video_id)
    if not v:
        raise HTTPException(404, "Vídeo não encontrado")
    return VideoResponse(
        id=v["id"],
        status=v["status"],
        url=v.get("url"),
        thumbnail_url=v.get("thumbnail_url"),
        created_at=v["created_at"],
        duration_seconds=v["duration_seconds"],
    )


@router.post("/{video_id}/check-status")
async def check_status(video_id: str):
    v = get_video(video_id)
    if not v:
        raise HTTPException(404, "Vídeo não encontrado")
    if "external_id" in v and settings.pollo_api_key:
        try:
            result = await get_generation_status(v["external_id"])
            if result.get("status") == "completed":
                update_video(video_id, status="completed", url=result.get("output", {}).get("url"))
            return {"status": result.get("status"), "video": result}
        except Exception:
            pass
    return {"status": v["status"]}
