# Phase 2 — Backend: Guide API router

## Context Links

- Plan: `plans/260511-0047-user-guide-help-center/plan.md`
- Phase 1: `phase-01-setup-docs-copy.md`
- Existing router example: `app/routers/wiki.py`
- Config: `app/config.py`

## Overview

| Field | Value |
|---|---|
| Priority | P1 |
| Status | pending |
| Effort | 1.5h |

Create `app/routers/guide.py` — two endpoints that serve doc metadata and raw markdown content from `app/docs/`.

---

## Requirements

- No DB changes
- No authentication required (portal is already authenticated)
- Read from `app/docs/` (filesystem path)
- HTTP caching: `Cache-Control: max-age=300` on doc content endpoint

---

## API Endpoints

### `GET /api/guide/categories`

Returns a list of all available docs with category, title, path.

**Response:**
```json
{
  "categories": [
    {
      "id": "getting-started",
      "label": "Getting Started",
      "items": [
        { "title": "Overview", "path": "README.md", "slug": "overview" },
        { "title": "Setup Guide", "path": "SETUP.md", "slug": "setup" }
      ]
    },
    {
      "id": "using-arkon",
      "label": "Using Arkon",
      "items": [
        { "title": "Wiki System", "path": "WIKI.md", "slug": "wiki" }
      ]
    },
    {
      "id": "mcp-integration",
      "label": "MCP Integration",
      "items": [
        { "title": "Claude Desktop", "path": "MCP.md", "slug": "claude-desktop", "mcp_tool": "claude-desktop" },
        { "title": "Claude Code", "path": "MCP.md", "slug": "claude-code", "mcp_tool": "claude-code" },
        { "title": "Codex", "path": "MCP.md", "slug": "codex", "mcp_tool": "codex" },
        { "title": "Cursor", "path": "MCP.md", "slug": "cursor", "mcp_tool": "cursor" },
        { "title": "Windsurf", "path": "MCP.md", "slug": "windsurf", "mcp_tool": "windsurf" }
      ]
    },
    {
      "id": "design-architecture",
      "label": "Design & Architecture",
      "items": [
        { "title": "UI Design", "path": "UI/DESIGN.md", "slug": "ui-design" },
        { "title": "System Architecture", "path": "ARCHITECTURE.md", "slug": "architecture" }
      ]
    }
  ]
}
```

**Category mapping logic:**

| File | Category ID | Category Label | Title |
|---|---|---|---|
| `README.md` | getting-started | Getting Started | Overview |
| `SETUP.md` | getting-started | Getting Started | Setup Guide |
| `HOW_TO_RUN.md` | getting-started | Getting Started | How to Run |
| `WIKI.md` | using-arkon | Using Arkon | Wiki System |
| `ACCESS-CONTROL.md` | using-arkon | Using Arkon | RBAC Guide |
| `SKILLS.md` | using-arkon | Using Arkon | AI Skills |
| `MCP.md` | mcp-integration | MCP Integration | Claude Desktop / Code / Codex / Cursor / Windsurf (sub-items) |
| `UI/DESIGN.md` | design-architecture | Design & Architecture | UI Design |
| `ARCHITECTURE.md` | design-architecture | Design & Architecture | System Architecture |

### `GET /api/guide/doc/{path+}`

Returns raw markdown content for a specific doc. Path is the file path relative to `app/docs/`.

**Query params:**
- `mcp_tool` (optional): For MCP.md sub-pages — filter to a specific tool section

**Response (success):**
```
Content-Type: text/markdown; charset=utf-8
Cache-Control: public, max-age=300

[raw markdown content]
```

**Response (not found):**
```
404 {"detail": "Document not found"}
```

---

## MCP Tool Section Extraction

For `MCP.md`, the file contains content for multiple AI tools. Each tool section starts with `## [Tool Name]` heading (e.g., `## Claude Code`, `## Codex`). The `mcp_tool` param filters to that section.

Logic:
1. Read `MCP.md` content
2. Split by `## ` headings
3. If `mcp_tool` is set, find the section with that tool name
4. Return the section's content (heading + body)

Tool name → heading suffix mapping:
```
claude-desktop → Claude Desktop
claude-code    → Claude Code
codex          → Codex
cursor         → Cursor
windsurf       → Windsurf
```

---

## Files

| File | Action |
|---|---|
| `app/routers/guide.py` | **Create** — guide router |
| `app/main.py` | Modify — register guide router |

---

## Dependencies

- Blocked by Phase 1 (Dockerfile must copy docs first)

---

## Success Criteria

- [ ] `GET /api/guide/categories` returns all docs grouped by category
- [ ] `GET /api/guide/doc/README.md` returns raw markdown with 200 status
- [ ] `GET /api/guide/doc/nonexistent.md` returns 404
- [ ] `GET /api/guide/doc/MCP.md?mcp_tool=claude-code` returns only the Claude Code section
- [ ] Response includes `Cache-Control: public, max-age=300`