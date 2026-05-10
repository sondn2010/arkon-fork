# Codebase Summary

## Directory Structure

```
arkon-fork/
├── app/                    # Main application
│   ├── ai/                # AI providers & agents
│   │   ├── providers/     # AI provider implementations
│   │   ├── wiki_*.py     # Wiki compiler/analyzer
│   │   └── agent_protocol.py
│   ├── config.py          # Configuration
│   ├── database/         # ORM & repository
│   ├── main.py           # FastAPI entry point
│   ├── mcp/             # MCP server
│   ├── routers/          # REST API endpoints
│   ├── services/        # Business logic
│   └── worker.py        # Background workers
├── alembic/              # Database migrations
├── tests/                # Test suite
├── frontend/            # Next.js frontend
└── docs/               # Existing documentation
```

---

## Modules

### app/ai/
**Purpose:** AI provider abstraction and wiki compilation

| File | Purpose |
|------|--------|
| `providers/base.py` | Abstract AI provider interface |
| `providers/anthropic_provider.py` | Anthropic implementation |
| `providers/openai_provider.py` | OpenAI implementation |
| `providers/google.py` | Google GenAI implementation |
| `wiki_compiler.py` | LLM wiki page compilation |
| `wiki_analyzer.py` | Document analysis |
| `wiki_agent.py` | Wiki agent orchestration |

### app/database/
**Purpose:** SQLAlchemy ORM and repository

| File | Purpose |
|------|--------|
| `models.py` | All ORM models (850+ LOC) |
| `repository.py` | Generic repository pattern |

### app/routers/
**Purpose:** REST API endpoints

| File | Purpose |
|------|--------|
| `auth.py` | Login/logout, JWT tokens |
| `sources.py` | Document upload/management |
| `wiki.py` | Wiki page CRUD |
| `projects.py` | Workspace management |
| `rbac.py` | Role/permission management |
| `skills.py` | AI skill management |
| `admin_settings.py` | System configuration |

### app/services/
**Purpose:** Business logic layer

| File | Purpose |
|------|--------|
| `auth_service.py` | Authentication |
| `wiki_service.py` | Wiki operations |
| `permission_engine.py` | RBAC evaluation |
| `storage_service.py` | MinIO S3 operations |
| `embedding_storage.py` | Vector embeddings |

### app/mcp/
**Purpose:** Model Context Protocol server

| File | Purpose |
|------|--------|
| `server.py` | FastMCP server creation |
| `tools.py` | MCP tool definitions |
| `resources.py` | MCP resource definitions |

---

## Key Models

### Source
Raw document with full_text, source_type (file/url), status (pending/processing/complete/error), outline_json (TOC tree)

### WikiPage
Compiled wiki content with slug, title, page_type, content_md, summary, version

### Employee
User account with email, password_hash, role (admin/employee), department_id, custom_role_id, mcp_token

### Project
Workspace with name, description, workspace_type (project/customer), status

### Skill
AI skill package with name, slug, scope_type, current_version, status

---

## API Patterns

### Route Registration
```python
app.include_router(router, prefix="/api", tags=["tag"])
```

### Service Pattern
- Services are imported and used in routers
- Async session factory passed or injected

### Permission Check
```python
await permission_engine.authorize(request, "resource:action:scope")
```

---

## Database Migrations

Located in `alembic/versions/`. Each migration adds a schema change.

Recent migrations:
- 016_source_images - Image extraction
- 015_multi_dim_embeddings - Multi-dimension vectors
- 014_wiki_draft_revision - Draft system
- 013_wiki_user_contributions - User contributions

---

## Configuration

Environment variables in `.env.docker.example`:
- `SECRET_KEY` - JWT signing key
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- MinIO credentials
- AI provider API keys

---

## Dependencies

### Core
- fastapi, uvicorn
- sqlalchemy[asyncio], asyncpg, alembic
- pgvector

### AI
- google-genai, openai, anthropic

### MCP
- fastmcp

### Storage
- minio

### Workers
- arq, redis[hiredis]

---

## Testing

Single test file: `tests/test_embedding_catalog.py`

---

## Frontend

Next.js + Tailwind CSS (in `frontend/` directory)