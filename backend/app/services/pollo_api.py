import httpx
from app.core.config import settings

POLLO_API = settings.pollo_api_base
POLLO_KEY = settings.pollo_api_key


async def generate_video_from_url(product_url: str, duration: int = 10) -> dict:
    body = {
        "input": {
            "prompt": f"Crie um anúncio curto e envolvente para o produto: {product_url}",
            "aspectRatio": "9:16",
            "resolution": "720p",
            "duration": duration,
            "generateAudio": True,
        },
        "model": "pollo-2.0",
    }
    headers = _headers()
    async with httpx.AsyncClient(timeout=180) as client:
        r = await client.post(f"{POLLO_API}/generation", json=body, headers=headers)
        r.raise_for_status()
        return r.json()


async def generate_video_from_photo(
    image_url: str, script: str | None = None, duration: int = 10
) -> dict:
    prompt = script or "Crie um anúncio dinâmico com esta imagem de produto"
    body = {
        "input": {
            "image": image_url,
            "prompt": prompt,
            "aspectRatio": "9:16",
            "resolution": "720p",
            "duration": duration,
            "generateAudio": True,
        },
        "model": "pollo-2.0",
    }
    headers = _headers()
    async with httpx.AsyncClient(timeout=180) as client:
        r = await client.post(f"{POLLO_API}/generation", json=body, headers=headers)
        r.raise_for_status()
        return r.json()


async def generate_avatar_talking_head(
    avatar_image: str, script: str, duration: int = 10
) -> dict:
    body = {
        "input": {
            "image": avatar_image,
            "prompt": script,
            "aspectRatio": "9:16",
            "duration": duration,
            "generateAudio": True,
        },
        "model": "pollo-ai/avatar",
    }
    headers = _headers()
    async with httpx.AsyncClient(timeout=180) as client:
        r = await client.post(f"{POLLO_API}/generation", json=body, headers=headers)
        r.raise_for_status()
        return r.json()


async def clone_ad_from_reference(reference_url: str, product_url: str) -> dict:
    body = {
        "input": {
            "referenceUrl": reference_url,
            "productUrl": product_url,
            "aspectRatio": "9:16",
        },
        "model": "pollo-agent",
    }
    headers = _headers()
    async with httpx.AsyncClient(timeout=300) as client:
        r = await client.post(f"{POLLO_API}/generation", json=body, headers=headers)
        r.raise_for_status()
        return r.json()


async def get_generation_status(task_id: str) -> dict:
    headers = _headers()
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{POLLO_API}/generation/{task_id}", headers=headers)
        r.raise_for_status()
        return r.json()


def _headers() -> dict:
    return {
        "Authorization": f"Bearer {POLLO_KEY}",
        "Content-Type": "application/json",
    }
