from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

# pg
# username: postgres
# password: admin123$

DB_CONFIG = f"postgresql+asyncpg://postgres:postgres@localhost:5434/test"


class AsyncDatabaseSession:

    def __init__(self) -> None:
        self.session = None
        self.engine = None
    
    def __getattr__(self, name):
        return getattr(self.session, name)

    def init(self):
        self.engine = create_async_engine(DB_CONFIG, future=True, echo=True)
        self.session = sessionmaker(self.engine, expire_on_commit=False, class_=AsyncSession)()

    async def create_all(self):
        async with self.engine.engine() as conn:
            await conn.run_sync(SQLModel.metadata.create_all())

db = AsyncDatabaseSession()

async def commit_callback():
    try:
        await db.commit()
    except Exception:
        await db.rollback()
        raise