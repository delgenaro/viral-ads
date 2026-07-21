import uuid
from datetime import datetime, timezone


VIDEO_STORE: dict[str, dict] = {}


class VideoTask:
    pending: list[dict] = []
    completed: list[dict] = []


def create_video_task(params: dict) -> dict:
    task_id = str(uuid.uuid4())
    task = {
        "id": task_id,
        "status": "pending",
        "params": params,
        "url": None,
        "thumbnail_url": None,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "duration_seconds": params.get("duration_seconds", 10),
    }
    VIDEO_STORE[task_id] = task
    VideoTask.pending.append(task)
    return task


def update_video(task_id: str, **kwargs) -> dict | None:
    task = VIDEO_STORE.get(task_id)
    if task:
        task.update(kwargs)
    return task


def get_video(task_id: str) -> dict | None:
    return VIDEO_STORE.get(task_id)


def list_videos() -> list[dict]:
    return list(VIDEO_STORE.values())


def list_templates() -> list[dict]:
    return [
        {
            "id": "tpl-product-showcase",
            "name": "Vitrine do Produto",
            "description": "Mostra o produto em destaque com música e texto chamativo",
            "category": "produto",
            "thumbnail_url": "/templates/product-showcase.png",
            "duration_seconds": 10,
        },
        {
            "id": "tpl-ugc-review",
            "name": "Review UGC",
            "description": "Avatar apresenta o produto como um criador de conteúdo",
            "category": "ugc",
            "thumbnail_url": "/templates/ugc-review.png",
            "duration_seconds": 15,
        },
        {
            "id": "tpl-before-after",
            "name": "Antes e Depois",
            "description": "Comparação visual do problema vs solução com o produto",
            "category": "demonstracao",
            "thumbnail_url": "/templates/before-after.png",
            "duration_seconds": 10,
        },
        {
            "id": "tpl-promo-countdown",
            "name": "Oferta Relâmpago",
            "description": "Anúncio com urgência e contagem regressiva para promoção",
            "category": "promocao",
            "thumbnail_url": "/templates/promo-countdown.png",
            "duration_seconds": 8,
        },
        {
            "id": "tpl-avatar-presenter",
            "name": "Apresentador Avatar",
            "description": "Avatar fala diretamente com a câmera sobre o produto",
            "category": "avatar",
            "thumbnail_url": "/templates/avatar-presenter.png",
            "duration_seconds": 15,
        },
        {
            "id": "tpl-storytelling",
            "name": "Storytelling",
            "description": "Narrativa curta envolvente que apresenta o produto",
            "category": "narrativa",
            "thumbnail_url": "/templates/storytelling.png",
            "duration_seconds": 10,
        },
    ]
