from typing import Optional
from sqlalchemy import Column, String, table
from sqlmodel import SQLModel, Field, Relationship

from app.model.mixins import TimeMixin
from app.model.user_role import UsersRole

class Users(SQLModel, TimeMixin, table=True):
    __tablename__ = "tbl_users"
    
    id : Optional[str] = Field(None, primary_key=True, nullable=False)
    email : str = Field(sa_column=Column("email", String, unique=True))
    username : str = Field(sa_column=Column("username", String, unique=True))
    password : str

    person_id : Optional[str] = Field(default=None, foreign_key="tbl_person.id")
    person_obj : Optional["Person"] = Relationship(back_populates="users_obj")

    roles : Optional["Role"] = Relationship(back_populates="users", link_model=UsersRole)