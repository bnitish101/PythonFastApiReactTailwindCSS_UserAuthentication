from datetime import date, datetime
from typing import Optional
from sqlalchemy import Enum, table
from sqlmodel import SQLModel, Field, Relationship

from app.model.mixins import TimeMixin


class Gender(str, Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"


class Person(SQLModel, TimeMixin, table=True):
    __tablename__ = "tbl_person"

    id : Optional[str] = Field(None, primary_key=True, nullable=False)
    name : str
    birth : date
    gender : Gender
    profile : str
    phone_number : str

    users : Optional["Users"] = Relationship(
        sa_relationship_kwargs={"userlist": False},
        back_populates= "tbl_person"
    )
