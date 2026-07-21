from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    email: str
    password: str
    name: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    credits: int


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class AvatarRequest(BaseModel):
    source_image: str
    name: Optional[str] = None


class AvatarResponse(BaseModel):
    id: str
    name: str
    thumbnail_url: str
    created_at: datetime


class VideoRequest(BaseModel):
    product_url: Optional[str] = None
    product_description: Optional[str] = None
    product_images: Optional[list[str]] = None
    avatar_id: Optional[str] = None
    script_text: Optional[str] = None
    duration_seconds: int = 10
    aspect_ratio: str = "9:16"
    template_id: Optional[str] = None
    background_music: Optional[str] = None
    voice_id: Optional[str] = None


class VideoResponse(BaseModel):
    id: str
    status: str
    url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    created_at: datetime
    duration_seconds: int


class TemplateResponse(BaseModel):
    id: str
    name: str
    description: str
    category: str
    thumbnail_url: str
    duration_seconds: int


class GenerateFromUrlRequest(BaseModel):
    product_url: HttpUrl
    avatar_id: Optional[str] = None
    duration_seconds: int = 10


class GenerateFromPhotoRequest(BaseModel):
    product_image: str
    avatar_id: Optional[str] = None
    script_text: Optional[str] = None
    duration_seconds: int = 10


class CloneAdRequest(BaseModel):
    reference_url: HttpUrl
    product_url: Optional[HttpUrl] = None
    avatar_id: Optional[str] = None
