# Phase 3 — Frontend: Guide page + sidebar

## Context Links

- Plan: `plans/260511-0047-user-guide-help-center/plan.md`
- Phase 2: `phase-02-backend-guide-router.md`
- Existing page example: `frontend/src/app/(portal)/wiki/[...slug]/page.tsx`
- Sidebar: `frontend/src/components/layout/sidebar.tsx`

## Overview

| Field | Value |
|---|---|
| Priority | P1 |
| Status | pending |
| Effort | 3h |

Add the `/guide` page with category navigation and markdown rendering, plus a "Help Center" item in the sidebar.

---

## Requirements

- Install `react-markdown`, `remark-gfm`, `rehype-highlight`
- No full-text search
- Category nav on the left, doc viewer on the right
- Active category/item highlighted
- Responsive (category nav collapses on small screens)

---

## Implementation Steps

### Step 1 — Install packages

```bash
cd frontend
npm install react-markdown remark-gfm rehype-highlight
```

### Step 2 — Add sidebar item

In `components/layout/sidebar.tsx`, add to the first section (above "Documents"):

```typescript
{ label: "Help Center", href: "/guide", icon: "help" },
```

No permissions required — visible to all logged-in users.

### Step 3 — Create guide page

Create `frontend/src/app/(portal)/guide/page.tsx` with:
- Three-panel layout: category nav (left) + doc viewer (center) + TOC (right, lg only)
- Fetch `/api/guide/categories` on load
- Active category highlighted
- Click category → show its items
- Click item → fetch `/api/guide/doc/{path}?mcp_tool={slug}` and render markdown
- Loading skeletons
- "Not found" empty state for 404

### Step 4 — Create guide components

Create `frontend/src/components/guide/`:
- `guide-category-nav.tsx` — category tree with expand/collapse
- `guide-doc-viewer.tsx` — ReactMarkdown wrapper with remark-gfm + rehype-highlight
- `guide-toc.tsx` — extracted from headings H2/H3 for right sidebar

### Step 5 — Styling

Style the guide page to match the wiki page aesthetic:
- Left panel: 200px wide, scrollable, category items with icons
- Center: max-w-3xl, prose-style markdown rendering
- Right panel: sticky TOC with active heading tracking (IntersectionObserver)

---

## Files

| File | Action |
|---|---|
| `frontend/package.json` | Modify — add react-markdown deps |
| `frontend/src/components/layout/sidebar.tsx` | Modify — add Help Center nav item |
| `frontend/src/app/(portal)/guide/page.tsx` | **Create** |
| `frontend/src/components/guide/guide-category-nav.tsx` | **Create** |
| `frontend/src/components/guide/guide-doc-viewer.tsx` | **Create** |
| `frontend/src/components/guide/guide-toc.tsx` | **Create** |

---

## Dependencies

- Blocked by Phase 2 (backend API must exist first)

---

## Success Criteria

- [ ] Sidebar shows "Help Center" link (no permission needed)
- [ ] `/guide` page loads with category nav on left
- [ ] Clicking a doc shows rendered markdown
- [ ] Code blocks have syntax highlighting
- [ ] Tables render correctly
- [ ] TOC (right panel) shows H2/H3 headings and scrolls to section
- [ ] Loading states on fetch
- [ ] 404 empty state for missing docs