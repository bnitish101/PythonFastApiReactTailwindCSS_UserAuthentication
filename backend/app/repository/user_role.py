from app.model.user_role import UsersRole
from app.repository.base_repo import BaseRepo


class PersonRepository(BaseRepo):
    model = UsersRole