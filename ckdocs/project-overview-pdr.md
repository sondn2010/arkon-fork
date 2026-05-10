# Project Overview

## Arkon - Enterprise AI Knowledge Hub

**Version:** 0.1.0  
**Type:** Enterprise Web Application + MCP Server  
**Description:** Connect organizational knowledge to AI clients via MCP. Self-hosted, on-premise knowledge wiki system.

## Problem Statement

Organizations adopt AI team-by-team with no shared knowledge, inconsistent context, and no visibility into what information AI clients are working with. Every employee manually pastes documents, repeats the same background, and gets different answers.

## Solution

Arkon treats your AI client as a managed organizational resource - not a personal chatbot. It compiles documents into a structured knowledge wiki and serves it directly to Claude via MCP.

---

## Technology Stack

### Backend
- **Framework:** FastAPI 0.104+
- **Database:** PostgreSQL + pgvector (vector embeddings)
- **Queue:** Redis (arq workers)
- **Storage:** MinIO (S3-compatible)
- **Python:** 3.11+

### AI Providers
- Google GenAI
- OpenAI
- Anthropic
- Ollama
- Voyage
- Cohere

### Frontend
- Next.js
- Tailwind CSS

---

## Core Features

### Knowledge Wiki
- LLM-compiled persistent wiki from documents
- Cross-linked pages with backlinks/outlinks
- Full-text and semantic search
- Knowledge graph visualization
- Knowledge type organization (SOP, Product, HR Policy, etc.)
- Version history and rollback
- Draft → Review → Approval workflow

### Workspaces
- Cross-functional knowledge contexts
- Role-based membership (Viewer, Contributor, Editor, Admin)
- Scoped wiki and document management

### AI Skills
- Custom agent packages
- Versioned and department-scoped
- Distributed via MCP

### MCP Server
- Token-based authentication
- Filtered knowledge access by permission scope

### Access Control
- Fine-grained RBAC at department level
- Workspace membership roles

---

## Data Architecture

### Dual-Realm Permission Model
- **Global Realm:** scoped permissions (doc:read:own_dept, doc:read:all)
- **Workspace Realm:** membership-gated (viewer/contributor/editor/admin)

### Database Schema
- `sources` - Raw documents (file/URL)
- `wiki_pages` - LLM-compiled wiki content
- `wiki_links` - Page cross-references
- `wiki_page_drafts` - Pending contributions
- `wiki_page_revisions` - Version snapshots
- `employees` - User accounts
- `departments` - Organizational units
- `projects` - Workspaces
- `skills` - AI skill packages
- `audit_log` - Access decisions

---

## API Endpoints

### REST API (`/api/*`)
- `/api/auth` - Authentication
- `/api/sources` - Document management
- `/api/wiki` - Wiki pages
- `/api/projects` - Workspaces
- `/api/rbac` - Access control
- `/api/skills` - AI skills
- `/api/settings` - Configuration

### MCP Server (`/mcp`)
- Token-based tool access
- Scoped knowledge retrieval

---

## Quick Start

```bash
# Docker
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up -d --build
```

Access at http://localhost:3119