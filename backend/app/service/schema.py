import logging
import re
from typing import Optional, TypeVar
from fastapi import HTTPException
from pydantic import BaseModel, validator
from app.model.person import Gender

T = TypeVar("T")

#Get root logger
logger = logging.getLogger(__name__)


class RegisterSchema(BaseModel):
    username: str
    email: str
    name: str
    password: str
    phone_number: str
    birth: str
    gender: Gender
    profile: str = "base64"

    # phone number validation
    @validator("phone_number")
    def phone_validation(cls, v):
        logger.debug(f"Phone in 2 validator: {v}")

        # regex phone numeber
        regex = r"((?:\+\d{2}[-\.\s]??|\d{4}[-\.\s]??)?(?:\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4}))"
        
        if v and not re.search(regex, v, re.I):
            raise HTTPException(status_code = 400, detail={"status": "Bad request", "messaeg": "Invalid input phone number"})
        
        return v

    # Gender validation
    @validator
    def gender_validation(cls, v):
        if hasattr(Gender, v) is False:
            raise HTTPException(status_code=400, detail={"status": "Bad request", "messaeg": "Invalid input gender"})

        return v

    
class LoginSchema(BaseModel):
    username: str
    password: str


class ForgotPasswordSchema(BaseModel):
    email:str
    new_password: str


class DetailSchema(BaseModel):
    status: str
    message: str
    result: Optional[T]


class ResponseSchema(BaseModel):
    detail: str
    result: Optional[T]

    