# Code Standards

## Language

Python 3.11+ with type hints.

## Project Structure

```
app/
├── ai/           # AI providers & agents
├── config.py     # Settings via pydantic-settings
├── database/    # ORM & repository
├── main.py      # FastAPI app entry
├── mcp/        # MCP server
├── routers/     # API endpoints
├── services/    # Business logic
└── worker.py   # Background jobs
```

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Files | kebab-case | `wiki-compiler.py` |
| Classes | PascalCase | `WikiPage` |
| Functions | snake_case | `get_wiki_page` |
| Constants | UPPER_SNAKE | `MAX_FILE_SIZE` |

## Type Hints

Use strict type hints. Required for function signatures.

```python
def get_page(slug: str) -> WikiPage | None:
    ...
```

## Async/Await

All database operations use async SQLAlchemy 2.0:

```python
async with async_session_factory() as session:
    result = await session.execute(select(Source))
```

## ORM Models

Located in `app/database/models.py` (850+ LOC).

- Use `Mapped` and `mapped_column`
- Relationships defined with `relationship()`
- Indexes in `__table_args__`

## API Routes

FastAPI routers in `app/routers/`.

```python
from fastapi import APIRouter, Depends

router = APIRouter()

@router.get("/items")
async def list_items() -> list[Item]:
    ...
```

## Services

Business logic in `app/services/`. Async throughout.

```python
class WikiService:
    async def get_page(self, slug: str) -> WikiPage:
        ...
```

## Permissions

RBAC with scoped permissions:
- Format: `resource:action:scope`
- Examples: `doc:read:own_dept`, `wiki:edit:all`

Dual-realm: Global + Workspace membership.

## Error Handling

Use HTTP exceptions:

```python
from fastapi import HTTPException

raise HTTPException(status_code=404, detail="Not found")
```

## Configuration

Via `pydantic-settings` in `app/config.py`:

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    ...
```

## Testing

pytest with pytest-asyncio.

```python
@pytest.mark.asyncio
async def test_search():
    ...
```

## Linting

`ruff` for linting, configured in `pyproject.toml`:

```toml
[tool.ruff]
line-length = 88

[tool.ruff.lint]
select = ["E", "F", "I"]
ignore = ["E501"]
```

## Imports

Third-party first, then local:

```python
# Third-party
from fastapi import FastAPI
from sqlalchemy import select

# Local
from app.database import async_session_factory
from app.models import Employee
```

## Database Migrations

Alembic in `alembic/versions/`:

```bash
alembic revision --autogenerate -m " description"
alembic upgrade head
```

## MCP Tools

Defined in `app/mcp/tools.py` using FastMCP.

---

## Deprecation Policy

- Mark deprecated functions with `warnings.warn`
- Include removal version in docstring
- Update users via changelog