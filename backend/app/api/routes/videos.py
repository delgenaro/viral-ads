from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    VideoRequest,
    VideoResponse,
    GenerateFromUrlRequest,
    GenerateFromPhotoRequest,
    CloneAdRequest,
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
            update_video(task["id"], status="processing", external_id=task_id)
        except Exception as e:
            update_video(task["id"], status="error", error=str(e))
    else:
        update_video(task["id"], status="demo", url="https://example.com/demo-video.mp4")

    return VideoResponse(
        id=task["id"],
        status=task["status"],
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
            update_video(task["id"], status="processing", external_id=task_id)
        except Exception as e:
            update_video(task["id"], status="error", error=str(e))
    else:
        update_video(task["id"], status="demo", url="https://example.com/demo-photo-video.mp4")

    return VideoResponse(
        id=task["id"],
        status=task["status"],
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
            update_video(task["id"], status="processing", external_id=task_id)
        except Exception as e:
            update_video(task["id"], status="error", error=str(e))
    else:
        update_video(task["id"], status="demo", url="https://example.com/demo-clone-video.mp4")

    return VideoResponse(
        id=task["id"],
        status=task["status"],
        created_at=task["created_at"],
        duration_seconds=10,
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
