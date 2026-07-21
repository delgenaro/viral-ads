from fastapi import APIRouter
from app.models.schemas import TemplateResponse
from app.services.video_service import list_templates

router = APIRouter(prefix="/templates", tags=["templates"])


@router.get("/", response_model=list[TemplateResponse])
async def list_all():
    return [
        TemplateResponse(**t)
        for t in list_templates()
    ]
