from typing import Optional, List
from sqlalchemy import Column, table
from sqlmodel import SQLModel, Field, Relationship

from app.model.mixins import TimeMixin
from app.model.user_role import UsersRole

class Role(SQLModel, TimeMixin, table=True):
    __tablename__ = "tbl_role"

    id : Optional[str] = Field(None, primary_key=True, nullable=False)
    role_name : str

    users : List["Users"] = Relationship(back_populates="roles", link_model=UsersRole)