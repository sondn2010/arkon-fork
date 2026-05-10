# Phase 4 — MCP sub-pages: subdivide MCP.md into per-tool sections

## Context Links

- Plan: `plans/260511-0047-user-guide-help-center/plan.md`
- Phase 2: `phase-02-backend-guide-router.md`
- Phase 3: `phase-03-frontend-guide-page.md`
- Source doc: `docs/MCP.md`

## Overview

| Field | Value |
|---|---|
| Priority | P2 |
| Status | pending |
| Effort | 1h |

The `MCP.md` file contains content for multiple AI tools. This phase ensures the backend correctly segments it into sub-pages for: Claude Desktop, Claude Code, Codex, Cursor, Windsurf.

---

## Requirements

The backend already handles MCP.md sub-page filtering via the `mcp_tool` query param. This phase verifies and documents the section extraction logic.

---

## MCP Section Extraction (backend)

The `GET /api/guide/doc/MCP.md` endpoint with `mcp_tool` param splits `MCP.md` content by `## ` headings and returns only the matching section.

### Expected section headings in MCP.md

| Tool | Heading in MCP.md |
|---|---|
| Claude Desktop | `## Claude Desktop` |
| Claude Code | `## Claude Code` |
| Codex | `## Codex` |
| Cursor | `## Cursor` |
| Windsurf | `## Windsurf` |

### Edge cases to handle

1. **Tool section not found** → return 404 with message: "Section for '{tool}' not found in MCP.md"
2. **First heading line** (no `## ` prefix) → treat file start as section for "Claude Desktop"
3. **Sub-sections** (### h3) → include in parent section content

### Extraction pseudocode

```python
def extract_mcp_section(content: str, tool: str) -> str:
    sections = split_by_heading(content)  # {"Claude Desktop": "...", "Claude Code": "..."}
    if tool not in sections:
        raise HTTPException(404, f"Section for '{tool}' not found")
    return sections[tool]
```

---

## MCP.md current structure (to verify)

Based on `docs/MCP.md`:
- `## Connecting Claude Desktop` — setup steps for Claude Desktop
- `## Authentication` — token auth
- `## MCP Tool Reference` — tool list
- [Other tools to be added]

**Verification task:** Check if `## Claude Code`, `## Codex`, `## Cursor`, `## Windsurf` headings exist in `docs/MCP.md`. If not, add placeholder sections with:
- Tool name heading
- Setup steps for connecting via MCP
- Token config snippet

---

## Files

| File | Action |
|---|---|
| `docs/MCP.md` | Modify — add Claude Code / Codex / Cursor / Windsurf sections |
| `app/routers/guide.py` | Verify — section extraction handles all cases |

---

## Dependencies

- Can run in parallel with Phase 3 (doc segmentation is backend-only)

---

## Success Criteria

- [ ] `GET /api/guide/doc/MCP.md?mcp_tool=claude-code` returns Claude Code section only
- [ ] `GET /api/guide/doc/MCP.md?mcp_tool=codex` returns Codex section only
- [ ] `GET /api/guide/doc/MCP.md?mcp_tool=cursor` returns Cursor section only
- [ ] `GET /api/guide/doc/MCP.md?mcp_tool=windsurf` returns Windsurf section only
- [ ] `GET /api/guide/doc/MCP.md?mcp_tool=unknown` returns 404
- [ ] `GET /api/guide/categories` lists all 5 MCP tool sub-items under mcp-integration