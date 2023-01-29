from fastapi import APIRouter

from app.service.schema import ResponseSchema, RegisterSchema, LoginSchema, ForgotPasswordSchema
from app.service.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model= ResponseSchema, response_model_exclude_none=True)
async def register(request_body: RegisterSchema):
    # cb+ s debug steps print in litte format ways ;-)
    print(">"*10, "cb+ s (register)","<"*10,

        f"\n[__class__| {__name__}]\n",
        f"\n[request_body| {request_body}]\n",

    ">"*10, "cb+ e (register)","<"*10)
    # cb+ e debug steps print in litte format ways ;-)

    await AuthService.register_service(request_body)
    return ResponseSchema(detail="Successfully data saved.")
    
@router.post("/login", response_model=ResponseSchema)
async def login(request_body: LoginSchema):
    token = await AuthService.login_service(request_body)
    return ResponseSchema(detail="Successfully Login.", result={"token_type": "Bearer", "access_token":token})
    
@router.post("/forgot-password", response_model=ResponseSchema, response_model_exclude_none=True)
async def login(request_body: ForgotPasswordSchema):
    await AuthService.forgot_password_service(request_body)
    return ResponseSchema(detail="Successfully updated password.")