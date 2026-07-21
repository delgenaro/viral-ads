import uuid
from datetime import datetime, timezone


AVATAR_STORE: dict[str, dict] = {}


def list_avatars() -> list[dict]:
    return list(AVATAR_STORE.values())


def create_avatar(source_image: str, name: str | None = None) -> dict:
    avatar_id = str(uuid.uuid4())
    avatar = {
        "id": avatar_id,
        "name": name or f"Avatar {len(AVATAR_STORE) + 1}",
        "source_image": source_image,
        "thumbnail_url": source_image,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    AVATAR_STORE[avatar_id] = avatar
    return avatar


def get_avatar(avatar_id: str) -> dict | None:
    return AVATAR_STORE.get(avatar_id)


def delete_avatar(avatar_id: str) -> bool:
    return AVATAR_STORE.pop(avatar_id, None) is not None
