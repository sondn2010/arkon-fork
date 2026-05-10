---
name: user-guide-help-center
description: User guide help center feature implementation plan
type: brainstorm
---

# Brainstorm: User Guide / Help Center

## Problem statement

Arkon needs an in-portal user guide/help center for internal employees. Content lives in repo markdown files (`docs/`), must be readable on-demand, displayed both as a standalone page and in the sidebar.

---

## User requirements

| Requirement | Decision |
|---|---|
| Content source | Markdown files in `docs/` (referencing README.md and related files) |
| Audience | Internal employees only |
| Primary use case | Comprehensive help center (onboarding + feature docs + admin/technical) |
| Sync strategy | On-demand (API reads .md files fresh on each request) |
| Placement | Both sidebar item + standalone `/guide` page |
| Backend reads from | Copy docs to backend (`app/docs/`) |
| Full-text search | No — navigation + categories only |
| Approach | Option A — Markdown renderer (recommended) |

---

## Key context: MCP integration docs

The `docs/MCP.md` file contains step-by-step guides for connecting external AI tools (Claude Desktop, Claude Code, Codex) to Arkon via MCP. This must be rendered and accessible in the help center.

---

## Evaluated approaches

### Option A — Markdown Renderer (RECOMMENDED)

**Backend:** Copy `docs/` files to `app/docs/`. API reads filesystem on-demand. No DB needed.

**Frontend:** React component reads from API, renders markdown (e.g. `react-markdown` + `remark-gfm`).

**Pros:** Simple, versioned with code, no DB migration, fast to implement.
**Cons:** Requires rebuild when docs change.

### Option B — DB + Markdown

Admin uploads markdown files stored in MinIO, managed via portal UI.

**Pros:** Dynamic, no code rebuild needed.
**Cons:** More complex, requires DB tables + admin UI + file versioning, adds maintenance overhead.

---

## Final recommended solution

**Option A — Markdown Renderer** with:
- Copy `docs/` → `app/docs/` at build time (Docker `COPY` or `rsync`)
- Backend: read `app/docs/` filesystem, serve via `GET /api/guide/docs` + `GET /api/guide/doc/{path}`
- Frontend: `/guide` page + sidebar link, category nav from doc frontmatter, render markdown with `react-markdown`
- MCP docs (`MCP.md`) included as a category, with sub-pages for different AI tools (Claude Desktop, Claude Code, Codex, Cursor, Windsurf, etc.)

---

## Implementation plan

### Backend
- **Add router** `app/routers/guide.py` with:
  - `GET /api/guide/categories` — list categories from frontmatter
  - `GET /api/guide/doc/{path}` — serve raw .md file content
- **Files:** `app/docs/` (copied from `docs/` on build)
- **No DB changes**

### Frontend
- **Add page:** `frontend/src/app/(portal)/guide/page.tsx`
- **Add sidebar item:** `Help Center` in `components/layout/sidebar.tsx`
- **Add component:** `components/guide/guide-viewer.tsx` with:
  - Category navigation (sidebar or top nav)
  - Markdown rendering with syntax highlighting
  - Table of contents from headings

---

## Docs category structure

```
Getting Started/
  ├── README.md (Overview)
  ├── Setup Guide (SETUP.md)
  └── How to Run (HOW_TO_RUN.md)

Using Arkon/
  ├── Wiki System (WIKI.md)
  ├── RBAC Guide (ACCESS-CONTROL.md)
  └── AI Skills (SKILLS.md)

MCP Integration/
  ├── Claude Desktop
  ├── Claude Code
  ├── Codex
  ├── Cursor
  └── Windsurf

Design & Architecture/
  ├── UI Design (DESIGN.md)
  └── System Architecture (ARCHITECTURE.md)
```

> MCP.md contains content for all AI tool integrations. Frontend renders it as separate pages under the MCP category.

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| .md files not copied on rebuild | Add `COPY docs/ app/docs/` to Dockerfile |
| Large markdown files slow load | Add caching (in-memory or Redis TTL) |
| XSS in markdown rendering | Use `react-markdown` with sanitization |
| Doc frontmatter format inconsistent | Enforce a simple `category` + `title` frontmatter |

---

## Success criteria

- All markdown docs accessible via `/guide` page
- Sidebar shows `Help Center` link
- MCP integration section lists Claude Code, Codex, Cursor, Windsurf guides
- Navigation between docs works
- Docker build copies `docs/` to `app/docs/`

---

## Next steps

Implement the backend router and frontend page per the plan above.