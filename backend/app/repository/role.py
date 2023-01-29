from typing import List
from sqlalchemy.future import select

from app.config import db, commit_rollback
from app.model.role import Role
from app.repository.base_repo import BaseRepo

class RoleRepository(BaseRepo):
    model = Role

    @staticmethod
    async def find_by_role_name(role_name:str):
        query = select(Role).where(Role.role_name == role_name)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def find_by_list_role_name(role_name_list:List[str]):
        # cb+ s debug steps print in litte format ways ;-)
        print(">"*10, "cb+ s (find_by_list_role_name)","<"*10,

            f"\n[__class__| {__class__}]\n",
            f"\n[{role_name_list}]\n",

        ">"*10, "cb+ e (find_by_list_role_name)","<"*10)
        # cb+ e debug steps print in litte format ways ;-)

        query = select(Role).where(Role.role_name.in_(role_name_list))
        return (await db.execute(query)).scalars().all()

    @staticmethod
    async def create_list(role_name_list:List[str]):
        db.add_all(role_name_list)
        await commit_rollback()

    