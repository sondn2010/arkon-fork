# System Architecture

## Overview

Arkon is an enterprise knowledge hub that compiles documents into a structured wiki and serves them to Claude via MCP.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Employee  │────▶│  Frontend  │────▶│  FastAPI  │
│  (Claude)  │     │  (Next.js) │     │   API     │
└─────────────┘     └─────────────┘     └─────────────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
              ┌─────▼─────┐          ┌──────▼──────┐       ┌──────▼──────┐
              │  PostgreSQL│          │    Redis    │       │   MinIO    │
              │ + pgvector │          │   (arq)    │       │   (S3)     │
              └───────────┘          └────────────┘       └────────────┘
```

## Components

### FastAPI Application
- REST API for web UI
- MCP server endpoint
- JWT authentication
- RBAC enforcement

### Database (PostgreSQL + pgvector)
- **Sources:** Raw document storage
- **Wiki Pages:** Compiled content
- **Employees:** User accounts
- **Projects:** Workspaces
- **Skills:** AI skill packages
- **Embeddings:** Vector store (multi-dimension)

### Worker Queue (Redis + arq)
- Background document processing
- Wiki compilation jobs
- Embedding generation

### Object Storage (MinIO)
- Source file storage
- Extracted images

### AI Providers
- Google GenAI
- OpenAI
- Anthropic
- Ollama

## Layer Architecture

```
┌─────────────────────────────────────────┐
│           API Routes (routers/)           │
├─────────────────────────────────────────┤
│           Services (business logic)       │
├─────────────────────────────────────────┤
│      Permission Engine (RBAC v2)         │
├─────────────────────────────────────────┤
│      Database (SQLAlchemy 2.0)         │
└─────────────────────────────────────────┘
```

## Permission Model

### Dual-Realm Architecture

```
┌─────────────────────────────────────────┐
│           Global Realm                  │
│  • Department-scoped permissions        │
│  • doc:read:own_dept                    │
│  • wiki:edit:all                        │
├─────────────────────────────────────────┤
│         Workspace Realm                │
│  • Membership-gated access             │
│  • viewer → contributor → editor → admin│
└─────────────────────────────────────────┘
```

## Wiki Compilation Flow

```
1. Upload Source (file/URL)
2. Extract Text (PDF/DOCX/URL)
3. Analyze → Chunk → Outline
4. LLM Compile → Wiki Pages
5. Generate Embeddings
6. Index for Search
```

## MCP Integration

Claude Desktop connects to `/mcp` endpoint with Bearer token. MCP tools:

- `search_wiki` - Semantic search
- `get_wiki_page` - Page content
- `list_sources` - Document list
- `get_skill` - Execute AI skill

## Deployment

Docker Compose with:
- `app` service (FastAPI)
- `postgres` service
- `redis` service
- `minio` service

## Environment

See `.env.docker.example`:
- `SECRET_KEY`
- `DATABASE_URL`
- `REDIS_URL`
- `MINIO_*`
- `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `GOOGLE_API_KEY`