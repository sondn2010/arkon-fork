"""
Guide REST router — serves static .md documentation grouped by category.

No auth required (portal is already authenticated).
"""

import re
from typing import Annotated

from fastapi import APIRouter, HTTPException, Query, Response
from pydantic import BaseModel

router = APIRouter()

# ─── Catalog ─────────────────────────────────────────────────────────────────────

CATALOG: list[dict] = [
    {
        "id": "getting-started",
        "label": "Getting Started",
        "items": [
            {"path": "README.md", "title": "Overview"},
            {"path": "SETUP.md", "title": "Setup Guide"},
            {"path": "HOW_TO_RUN.md", "title": "How to Run"},
        ],
    },
    {
        "id": "using-arkon",
        "label": "Using Arkon",
        "items": [
            {"path": "WIKI.md", "title": "Wiki System"},
            {"path": "ACCESS-CONTROL.md", "title": "RBAC Guide"},
            {"path": "SKILLS.md", "title": "AI Skills"},
        ],
    },
    {
        "id": "mcp-integration",
        "label": "MCP Integration",
        "items": [
            {"path": "MCP.md", "title": "Claude Desktop", "mcp_tool": "claude-desktop"},
            {"path": "MCP.md", "title": "Claude Code", "mcp_tool": "claude-code"},
            {"path": "MCP.md", "title": "Codex", "mcp_tool": "codex"},
            {"path": "MCP.md", "title": "Cursor", "mcp_tool": "cursor"},
            {"path": "MCP.md", "title": "Windsurf", "mcp_tool": "windsurf"},
        ],
    },
    {
        "id": "design-architecture",
        "label": "Design & Architecture",
        "items": [
            {"path": "UI/DESIGN.md", "title": "UI Design"},
            {"path": "ARCHITECTURE.md", "title": "System Architecture"},
        ],
    },
]

# Valid doc paths (URL-style with forward slashes) → filesystem path under "docs/"
_DOC_PATH_TO_FILE: dict[str, str] = {
    "README.md": "docs/README.md",
    "SETUP.md": "docs/SETUP.md",
    "HOW_TO_RUN.md": "docs/HOW_TO_RUN.md",
    "WIKI.md": "docs/WIKI.md",
    "ACCESS-CONTROL.md": "docs/ACCESS-CONTROL.md",
    "SKILLS.md": "docs/SKILLS.md",
    "MCP.md": "docs/MCP.md",
    "UI/DESIGN.md": "docs/UI/DESIGN.md",
    "ARCHITECTURE.md": "docs/ARCHITECTURE.md",
}

# mcp_tool query param value → heading name that starts a ## section in MCP.md
_MCP_TOOL_HEADINGS: dict[str, str] = {
    "claude-desktop": "Claude Desktop",
    "claude-code": "Claude Code",
    "codex": "Codex",
    "cursor": "Cursor",
    "windsurf": "Windsurf",
}


# ─── Pydantic models ────────────────────────────────────────────────────────────

class GuideItem(BaseModel):
    path: str
    title: str
    mcp_tool: str | None = None


class GuideCategory(BaseModel):
    id: str
    label: str
    items: list[GuideItem]


# ─── Helpers ─────────────────────────────────────────────────────────────────────

def _load_raw_content(file_path: str) -> str:
    """Read a file from disk, raising HTTPException 404 on failure."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        raise HTTPException(404, f"Document not found: {file_path}")
    except Exception as e:
        raise HTTPException(500, f"Error reading document: {e}")


def _extract_mcp_section(content: str, tool: str) -> str:
    """Extract the markdown section under heading '## {tool_name}'."""
    target_heading = _MCP_TOOL_HEADINGS.get(tool)
    if not target_heading:
        raise HTTPException(400, f"Unknown mcp_tool value: {tool}")

    target = f"## {target_heading}"
    pattern = re.escape(target) + r"(?:\n|$)"

    match = re.search(pattern, content)
    if not match:
        raise HTTPException(404, f"MCP section not found: {target}")

    start = match.end()
    # Find next top-level heading (## ...) or end of file
    next_section = re.search(r"\n## [^#]", content[start:])
    end = start + next_section.start() if next_section else len(content)
    return content[start:end].strip("\n")


# ─── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("/guide/categories", response_model=list[GuideCategory])
async def list_guide_categories():
    """Return all docs grouped by category."""
    return [
        GuideCategory(
            id=cat["id"],
            label=cat["label"],
            items=[
                GuideItem(
                    path=item["path"],
                    title=item["title"],
                    mcp_tool=item.get("mcp_tool"),
                )
                for item in cat["items"]
            ],
        )
        for cat in CATALOG
    ]


@router.get("/guide/doc/{path}")
async def get_guide_doc(
    path: str,
    mcp_tool: Annotated[
        str | None,
        Query(
            description=(
                "Extract only the MCP.md section for this tool. "
                "Supported: claude-desktop, claude-code, codex, cursor, windsurf"
            ),
        ),
    ] = None,
):
    """
    Return raw markdown content for a doc.

    - `mcp_tool` filters MCP.md to a single ## [Tool Name] section.
    - Returns 404 if the doc or MCP section is not found.
    - Cache-Control: public, max-age=300.
    """
    file_path = _DOC_PATH_TO_FILE.get(path)
    if not file_path:
        raise HTTPException(404, f"Document not found: {path}")

    raw = _load_raw_content(file_path)

    if mcp_tool is not None:
        raw = _extract_mcp_section(raw, mcp_tool)

    return Response(
        content=raw,
        media_type="text/markdown; charset=utf-8",
        headers={"Cache-Control": "public, max-age=300"},
    )
