from fastapi import APIRouter, HTTPException
from app.models.schemas import AvatarRequest, AvatarResponse
from app.services.avatar_service import list_avatars, create_avatar, get_avatar, delete_avatar

router = APIRouter(prefix="/avatars", tags=["avatars"])


@router.get("/", response_model=list[AvatarResponse])
async def list_all():
    return list_avatars()


@router.post("/", response_model=AvatarResponse)
async def create(body: AvatarRequest):
    if not body.source_image:
        raise HTTPException(400, "source_image é obrigatório")
    return create_avatar(body.source_image, body.name)


@router.get("/{avatar_id}", response_model=AvatarResponse)
async def get(avatar_id: str):
    av = get_avatar(avatar_id)
    if not av:
        raise HTTPException(404, "Avatar não encontrado")
    return av


@router.delete("/{avatar_id}")
async def delete(avatar_id: str):
    if not delete_avatar(avatar_id):
        raise HTTPException(404, "Avatar não encontrado")
    return {"ok": True}
