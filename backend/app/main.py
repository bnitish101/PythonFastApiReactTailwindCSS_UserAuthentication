from fastapi import FastAPI, APIRouter
from app.config import db


# app = FastAPI()
# router = APIRouter()

# @app.get("/")
# async def read_root():
#     return {"myKye":"Wellcome to my juorny."}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

# app.include_router(router)


def init_app():
    db.init()

    app = FastAPI(
        title= "PythonFastApiReactTailwindCSS_UserAuthentication",
        description= "Login Page",
        version= "1"
    )

    @app.on_event("startup")
    async def startup():
        await db.create_all()

    @app.on_event("shutdown")
    async def shutdown():
        await db.close()

    return app

app = init_app()