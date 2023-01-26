from typing import Union

from fastapi import FastAPI, APIRouter

app = FastAPI()
router = APIRouter()

@app.get("/")
async def read_root():
    return {"myKye":"Wellcome to my juorny."}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

app.include_router(router)