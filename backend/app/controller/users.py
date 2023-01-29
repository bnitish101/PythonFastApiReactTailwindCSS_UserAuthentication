from fastapi import APIRouter, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.service.schema import ResponseSchema, RegisterSchema, LoginSchema, ForgotPasswordSchema
from app.repository.auth_repo import JWTBearer, JWTRepo
from app.service.users import UserService

router = APIRouter(
    prefix="/users",
    tags=["user"],
    dependencies=[Depends(JWTBearer())]
)

@router.post("/", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_user_profile(credential: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo().extract_token(credential.credentials)
    result = await UserService.get_user_profile(token["username"])
    return ResponseSchema(detail="Successfull fetched data", result=result)