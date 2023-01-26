from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel

# pg
# username: postgres
# password: admin123$

# DATABASE_URL = "postgresql://user:password@postgresserver/db"
# DB_CONFIG = f"postgresql+asyncpg://postgres:admin123$@localhost:5432/pgDatabase"

# http://127.0.0.1:8000/
pg_user: str = "postgres" # os.getenv("SQL_USER", "")
pg_pass: str = "admin123$" # os.getenv("POSTGRES_PASSWORD", "")
pg_host: str =  "localhost" # os.getenv("SQL_HOST", "")
pg_port: str =  "5432" # os.getenv("SQL_PORT", "")
pg_database: str = "pgDatabase" # os.getenv("SQL_DB", "")
DB_CONFIG: str = (
    f"postgresql+asyncpg://{pg_user}:{pg_pass}@{pg_host}:{pg_port}/{pg_database}"
)



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
        async with self.engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)

db = AsyncDatabaseSession()

async def commit_callback():
    try:
        await db.commit()
    except Exception:
        await db.rollback()
        raise