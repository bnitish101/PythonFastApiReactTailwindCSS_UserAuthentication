import base64
from datetime import datetime
from uuid import uuid4
from fastapi import HTTPException
from passlib.context import CryptContext

from app.service.schema import RegisterSchema

from app.model.person import Person
from app.model.users import Users
from app.model.user_role import UsersRole
from app.model.role import Role

from app.repository.role import RoleRepository
from app.repository.users import UsersRepository
from app.repository.auth_repo import JWTRepo
from app.repository.person import PersonRepository
from app.repository.user_role import UsersRoleRepository

from app.service.schema import LoginSchema
from app.service.schema import ForgotPasswordSchema

# Encrypt password 
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    
    @staticmethod
    async def register_service(register:RegisterSchema):

        # Create uuid
        _person_id = str(uuid4())
        _user_id = str(uuid4())

        # Convert "birth date" type form frontend String to Date
        birth_date = datetime.strftime(register.birth, "%d-%m-$Y")

        # Open image profile detault to string base64
        with open("./medea/profile.png", "rb") as f:
            image_str = base64.b64decode(f.read())
        image_str = "data:image/png;base64,"+image_str.decode("utf-8")

        # Mapping request data to class entity table
        _person = Person(
            id = _person_id,
            name = register.name,
            birth = birth_date,
            gender = register.gender,
            profile = image_str,
            phone_number = register.phone_number
        )
        _users = Users(
            id = _user_id,
            email = register.email,
            username = register.username,
            password = pwd_context(register.password),
            person_id = _person_id,
        )

        # Everyone who registers through our registration page makes the default as a user
        _role = await RoleRepository.find_by_list_role_name("user")
        _user_role = await UsersRole(
            user_id = _user_id,
            role_id = _role.id
        )

        # Checking the same username
        _username = await UsersRepository.find_by_username(register.username)
        if _username:
            raise HTTPException(status_code=400, detail="User already exists!")

        # Checking the same email id
        _email = await UsersRepository.find_by_email(register.email)
        if _email:
            raise HTTPException(status_code=400, detail="Email id already exists!")
        
        else:
            # insert to table
            await PersonRepository.create(**_person.dict())
            await UsersRepository.create(**_users.dict())
            await UsersRoleRepository.create(**_user_role.dict())

    @staticmethod
    async def login_service(login: LoginSchema):
        
        # Checking username
        _username = await UsersRepository.find_by_username(login.username)
        if _username is not None:
            if not pwd_context.verify(login.password, _username.password):
                raise HTTPException(status_code=400, detail="Invalid Password !")
            
            return JWTRepo(data={"username":_username.username}).generate_token()
        
        raise HTTPException(status_code=404, detail="Username not found!")

    @staticmethod
    async def forgot_password_service(forgot_passowrd: ForgotPasswordSchema):
        
        #Checking email id
        _email = await UsersRepository.find_by_email(forgot_passowrd.email)
        if _email is None:
            raise HTTPException(status_code=404, detail="Email not found!")
        
        await UsersRepository.update_passord(forgot_passowrd.email, pwd_context(forgot_passowrd.new_password))


# Generate roles manually
async def generate_role():
    _role = await RoleRepository.find_by_list_role_name(["admin", "user"])
    if not _role:
        await RoleRepository.create_list(
            [
                Role(
                    id = str( uuid4() ),
                    role_name = "admin"
                ),
                Role(
                    id = str( uuid4() ),
                    role_name = "user"
                )
            ]
        )

