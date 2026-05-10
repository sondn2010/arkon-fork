# Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Python 3.11+
- PostgreSQL + pgvector
- Redis
- MinIO
- AI provider API key (Google, OpenAI, or Anthropic)

## Quick Start (Docker)

```bash
# Clone and setup
git clone https://github.com/nduckmink/arkon.git
cd arkon
cp .env.docker.example .env.docker
```

### Configure Environment

Edit `.env.docker`:

```env
SECRET_KEY=<run: python -c "import secrets; print(secrets.token_urlsafe(32))">
DEFAULT_ADMIN_EMAIL=admin@yourcompany.com
DEFAULT_ADMIN_PASSWORD=your-secure-password

# Database
DATABASE_URL=postgresql+asyncpg://postgres:postgres@postgres:5432/arkon

# Redis
REDIS_URL=redis://redis@redis:6379/0

# MinIO
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=arkon

# AI Provider
ANTHROPIC_API_KEY=sk-ant-...
# or OPENAI_API_KEY=sk-...
# or GOOGLE_API_KEY=...
```

### Start Services

```bash
docker compose --env-file .env.docker up -d --build
```

Access at **http://localhost:3119**

## Development Mode

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.venv\Scripts\activate   # Windows

# Install dependencies
pip install -e ".[dev]"

# Run database migrations
alembic upgrade head

# Start API
uvicorn app.main:app --reload
```

## Database Migrations

```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `SECRET_KEY` | JWT signing key | Yes |
| `DATABASE_URL` | PostgreSQL connection | Yes |
| `REDIS_URL` | Redis connection | Yes |
| `MINIO_ENDPOINT` | MinIO server | Yes |
| `DEFAULT_ADMIN_EMAIL` | Initial admin email | Yes |
| `DEFAULT_ADMIN_PASSWORD` | Initial admin password | Yes |
| `AI_PROVIDER_API_KEY` | AI API key | Yes |

## Health Check

```bash
curl http://localhost:3119/health
```

## Stopping

```bash
docker compose --env-file .env.docker down
```

## Production Considerations

- Change default `SECRET_KEY`
- Change default admin password
- Configure SSL/TLS
- Set up regular backups
- Configure logging
- Set up monitoring