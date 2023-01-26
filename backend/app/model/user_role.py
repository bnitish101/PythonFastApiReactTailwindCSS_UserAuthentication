from sqlalchemy import Column, String, table
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

from app.model.mixins import TimeMixin


class UsersRole(SQLModel, TimeMixin, table=True):
    __tablename__ = "tbl_user_role"

    user_id : Optional[str] = Field(default=None, foreign_key="tbl_users.id", primary_key=True)
    role_id : Optional[str] = Field(default=None, foreign_key="tbl_role.id", primary_key=True)