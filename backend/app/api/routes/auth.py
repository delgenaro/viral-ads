from fastapi import APIRouter, HTTPException
from app.models.schemas import UserCreate, UserLogin, TokenResponse, UserResponse
from app.core.security import hash_password, verify_password, create_access_token
import uuid

router = APIRouter(prefix="/auth", tags=["auth"])

FAKE_USERS: dict[str, dict] = {}


@router.post("/register", response_model=TokenResponse)
async def register(body: UserCreate):
    if any(u["email"] == body.email for u in FAKE_USERS.values()):
        raise HTTPException(400, "Email já cadastrado")
    user_id = str(uuid.uuid4())
    user = {
        "id": user_id,
        "email": body.email,
        "name": body.name,
        "password": hash_password(body.password),
        "credits": 10,
    }
    FAKE_USERS[user_id] = user
    token = create_access_token(user_id)
    return TokenResponse(
        access_token=token,
        user=UserResponse(id=user_id, email=body.email, name=body.name, credits=10),
    )


@router.post("/login", response_model=TokenResponse)
async def login(body: UserLogin):
    for uid, u in FAKE_USERS.items():
        if u["email"] == body.email and verify_password(body.password, u["password"]):
            token = create_access_token(uid)
            return TokenResponse(
                access_token=token,
                user=UserResponse(id=uid, email=u["email"], name=u["name"], credits=u["credits"]),
            )
    raise HTTPException(401, "Email ou senha inválidos")
