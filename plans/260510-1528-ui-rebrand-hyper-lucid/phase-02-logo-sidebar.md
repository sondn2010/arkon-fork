# Phase 02 — Logo + Sidebar

**Links:** [Plan](./plan.md) | [Design spec](../../docs/UI/DESIGN.md) | [Sidebar](../../frontend/src/components/layout/sidebar.tsx)
**Priority:** P1 | **Status:** Completed | **Effort:** 2h
**Depends on:** Phase 01

## Overview

Apply Hyper-Lucid to the sidebar: glassmorphism background, remove border-r, tonal section separators, update workspace type colors to Hyper-Lucid palette. The logo (Logo.png swirl) is already referenced via `/logo.png` — verify asset is in `frontend/public/`.

## Key Insights

- Sidebar is `position: fixed` — `backdrop-filter` on the sidebar itself works because main content scrolls behind it
- Currently: `bg-[#f7f5f2] border-r border-black/[0.04]` → glassmorphism: `bg-sidebar/80 backdrop-blur-[20px]` + no `border-r`
- OrgHeader already renders `<Image src="/logo.png">` and `"Arkon"` wordmark — logo copy may already be present
- Three `border-t border-black/[0.04]` dividers exist: after OrgHeader, before nav, and at bottom footer — all need replacement with tonal color shifts
- Workspace colors hardcoded in `workspaceColor()` function: `#c2652a`, `#2a7ec2`, `#2ac265` → update to Hyper-Lucid
- Active nav item uses `bg-black/[0.04]` → update to `bg-primary/[0.08]` for Catalyst Blue tint
- Hover uses `bg-black/[0.03]` → update to `bg-primary/[0.05]`
- Section label color `text-muted-foreground/60` → remains valid with new muted token
- `OrgHeader` "Arkon" text uses `text-primary font-heading` → will auto-update from Phase 01 tokens (Space Grotesk + #00adef)

## New Workspace Type Colors

| Type | Old | New | Rationale |
|------|-----|-----|-----------|
| internal | `#c2652a` | `#00adef` | Catalyst Blue = primary |
| customer | `#2a7ec2` | `#7c3aed` | Violet = secondary |
| partner | `#2ac265` | `#059669` | Emerald = partner |
| fallback | `#78706a` | `#525c6c` | on-surface-variant |

## Related Code Files

| File | Action | Change |
|------|--------|--------|
| `frontend/public/logo.png` | Verify/Copy | Ensure Logo.png (repo root) is in public/ |
| `frontend/src/components/layout/sidebar.tsx` | Modify | Glassmorphism, remove borders, update colors |

## Implementation Steps

### Step 1 — Verify Logo Asset
Check if `frontend/public/logo.png` exists. If not, copy `Logo.png` from repo root:
```bash
# From D:\sources\fish\00.CoreFrameworkFE\arkon-fork
cp Logo.png frontend/public/logo.png
```

### Step 2 — Update Main Sidebar Container
In `sidebar.tsx`, the `<nav>` element (line ~380):

**Before:**
```tsx
<nav className="hidden md:flex flex-col h-full w-[240px] shrink-0 bg-[#f7f5f2] border-r border-black/[0.04]">
```
**After:**
```tsx
<nav className="hidden md:flex flex-col h-full w-[240px] shrink-0 bg-sidebar/80 backdrop-blur-[20px]">
```

### Step 3 — Remove Divider After OrgHeader
**Before:**
```tsx
{/* Divider */}
<div className="mx-3 border-t border-black/[0.04] my-1" />
```
**After:** Delete this block entirely. The tonal background difference between OrgHeader area and nav area provides separation.

### Step 4 — Update Bottom Footer
**Before:**
```tsx
<div className="px-3 py-2 border-t border-black/[0.04]">
```
**After:**
```tsx
<div className="px-3 py-2 bg-sidebar-accent/30">
```

### Step 5 — Update Active/Hover States in SidebarNavItem
**Before:**
```tsx
active
  ? "bg-black/[0.04] font-semibold text-foreground"
  : "text-muted-foreground hover:bg-black/[0.03] hover:text-foreground"
```
**After:**
```tsx
active
  ? "bg-primary/[0.08] font-semibold text-foreground"
  : "text-muted-foreground hover:bg-primary/[0.05] hover:text-foreground"
```

Apply same pattern to workspace item links in `SidebarWorkspacesSection` (the workspace `<Link>` className, ~line 274-279).

### Step 6 — Update Workspace Colors
In the `workspaceColor()` function:
```ts
function workspaceColor(type: string): string {
  const colors: Record<string, string> = {
    internal: "#00adef",
    customer: "#7c3aed",
    partner: "#059669",
  };
  return colors[type] || "#525c6c";
}
```

### Step 7 — Remove Workspace Create Button Border Hover
In `SidebarWorkspacesSection` the "+" button:
```tsx
// Change: hover:bg-black/[0.04] → hover:bg-primary/[0.05]
className="... hover:bg-primary/[0.05] hover:text-muted-foreground ..."
```

### Step 8 — Build Check
```bash
cd frontend && rtk pnpm run build
```

## Todo List

- [ ] Verify `frontend/public/logo.png` exists (copy from repo root if missing)
- [ ] Update `<nav>` glassmorphism classes
- [ ] Remove border-t divider after OrgHeader
- [ ] Update footer to use `bg-sidebar-accent/30` instead of border-t
- [ ] Update active/hover states in `SidebarNavItem` (primary/8%, primary/5%)
- [ ] Update active/hover states in workspace `<Link>` elements
- [ ] Update `workspaceColor()` to Hyper-Lucid colors
- [ ] Update workspace "+ New" button hover
- [ ] Build check

## Success Criteria

- Sidebar shows glassmorphism effect (translucent background, content visible through)
- No visible `border-r` on sidebar right edge
- Active nav items show blue tint (`primary/8%`) not gray
- Workspace dots use new colors: `#00adef` (internal), `#7c3aed` (customer), `#059669` (partner)
- Logo.png (swirl) renders in sidebar header
- "Arkon" wordmark uses Space Grotesk + Catalyst Blue (from Phase 01 tokens)

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| `backdrop-blur` not visible (no content behind sidebar) | Portal layout has `overflow-hidden` on main — content scrolls behind sidebar; test by scrolling a long page |
| Logo.png missing in public/ | Copy step is explicit in Step 1 |
| `bg-sidebar/80` requires `--sidebar` to be a valid color (not rgba) | Phase 01 sets `--sidebar: #eaf1ff` (hex) — opacity modifier works correctly |

## Next Steps

→ Phase 03: Header + Portal Layout
