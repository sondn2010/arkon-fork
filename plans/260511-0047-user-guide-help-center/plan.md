---
title: User Guide / Help Center
description: Add in-portal user guide/help center for internal employees. Content sourced from repo markdown docs, rendered via react-markdown on a standalone page and in the sidebar.
status: completed
priority: P2
effort: 6h
branch: feature/re-branding
tags: [frontend, backend, feature]
created: 2026-05-11
completed: 2026-05-11
---

# User Guide / Help Center — Implementation Plan

## Overview

Add an in-portal user guide/help center. Markdown docs live in `docs/` (already exist). Backend reads from `app/docs/` (copy of `docs/`). Frontend renders with `react-markdown`. No DB changes.

**Key features:**
- Standalone `/guide` page with category navigation
- Sidebar item: "Help Center"
- On-demand markdown rendering (reads from filesystem)
- MCP integration section: Claude Desktop, Claude Code, Codex, Cursor, Windsurf

---

## Phases

| # | Phase | Status |
|---|---|---|
| 1 | [Setup: Dockerfile + docs copy](phase-01-setup-docs-copy.md) | ✅ COMPLETED |
| 2 | [Backend: Guide API router](phase-02-backend-guide-router.md) | ✅ COMPLETED |
| 3 | [Frontend: Guide page + sidebar](phase-03-frontend-guide-page.md) | ✅ COMPLETED |
| 4 | [MCP section: subdivide MCP.md into per-tool pages](phase-04-mcp-subpages.md) | ✅ COMPLETED |

---

## Doc category structure

```
Getting Started/
  ├── Overview (README.md)
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

---

## Files to modify

| File | Action | Change |
|---|---|---|
| `Dockerfile` | Modify | COPY `docs/` → `app/docs/` |
| `app/routers/guide.py` | **Create** | GET /api/guide/categories, GET /api/guide/doc/{path+} |
| `app/main.py` | Modify | Register guide router |
| `frontend/package.json` | Modify | Add `rehype-highlight` |
| `frontend/src/components/layout/sidebar.tsx` | Modify | Add "Help Center" nav item |
| `frontend/src/app/(portal)/guide/page.tsx` | **Create** | Guide page with category nav + markdown viewer |
| `frontend/src/components/guide/guide-category-nav.tsx` | **Create** | Category navigation component |
| `frontend/src/components/guide/guide-doc-viewer.tsx` | **Create** | Markdown rendering component |
| `frontend/src/components/guide/guide-toc.tsx` | **Create** | Table of contents component |
| `docs/MCP.md` | Modify | Add Claude Code, Codex, Cursor, Windsurf sections |

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| .md files not copied on rebuild | Add `COPY docs/ app/docs/` in Dockerfile |
| XSS in markdown rendering | Use `react-markdown` with sanitization |
| Large markdown slow to load | Add HTTP caching headers (Cache-Control: max-age=300) |

---

## Dependencies

- Phase 2 blocked by Phase 1 (Dockerfile must copy docs first)
- Phase 3 blocked by Phase 2 (frontend calls guide API)
- Phase 4 can run in parallel with Phase 3 (MCP doc segmentation)

---

## Success criteria

- [x] `GET /api/guide/categories` returns doc list with category, title, path
- [x] `GET /api/guide/doc/{path}` returns raw markdown content
- [x] `/guide` page renders markdown with headings, code blocks, tables
- [x] Sidebar shows "Help Center" link
- [x] MCP section has sub-pages for Claude Code, Codex, Cursor, Windsurf
- [x] Docker build copies `docs/` to `app/docs/`

---

## Files created

| File | Description |
|---|---|
| `app/routers/guide.py` | Guide API router (~180 lines) |
| `frontend/src/app/(portal)/guide/page.tsx` | Guide page (~140 lines) |
| `frontend/src/components/guide/guide-category-nav.tsx` | Category navigation (~100 lines) |
| `frontend/src/components/guide/guide-doc-viewer.tsx` | Markdown viewer (~85 lines) |
| `frontend/src/components/guide/guide-toc.tsx` | Table of contents (~84 lines) |