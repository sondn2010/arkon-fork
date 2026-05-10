# Phase 03 — Header + Portal Layout

**Links:** [Plan](./plan.md) | [Design spec](../../docs/UI/DESIGN.md)
**Priority:** P2 | **Status:** Completed | **Effort:** 1.5h
**Depends on:** Phase 01

## Overview

Apply glassmorphism to the sticky header. Remove `border-b`. Update the portal layout shell background to use surface tonal layering. Update loading state.

## Key Insights

- Current header: `bg-background/95 backdrop-blur-sm border-b border-border h-14` → replace with `bg-background/80 backdrop-blur-[20px]` (no border-b)
- `border-b border-border` — after Phase 01, `--border` is near-transparent (`rgba(31,41,55,0.08)`) so border will almost disappear anyway, but explicitly remove the class to follow the "no-line" rule
- Portal layout `<div className="h-screen flex bg-background overflow-hidden">` — `bg-background` becomes `#f4f6ff` via Phase 01 tokens; no code change needed
- Inner main area `<div className="p-6 md:p-8 lg:p-10 pt-4! ...">` — add `bg-surface-container-low` tonal shift for depth? Actually spec says content sits on `surface-container-low` to create lift. Add it here.
- The header has a `<div />` spacer (leftmost) — consider adding the Arkon logo/wordmark here for the header bar context (optional)
- Loading state spinner uses `text-primary` which auto-updates to Catalyst Blue from Phase 01

## Header Changes

### header.tsx (line 25)

**Before:**
```tsx
<header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border h-14 flex items-center justify-end px-6">
```
**After:**
```tsx
<header className="sticky top-0 z-30 bg-background/80 backdrop-blur-[20px] h-14 flex items-center justify-end px-6">
```

### Optional: Add app name to header left side
If the sidebar is hidden on mobile (it is — `hidden md:flex`), mobile users have no branding. Add to header left side:
```tsx
<div className="flex items-center gap-2 md:hidden">
  <Image src="/logo.png" alt="Arkon" width={20} height={20} className="rounded-[3px]" />
  <span className="text-sm font-semibold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>Arkon</span>
</div>
```
This requires adding `import Image from "next/image"` to header.tsx.

## Portal Layout Changes

### (portal)/layout.tsx

**Inner main div — add surface tonal background:**
```tsx
// Before:
<main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
  <div className="p-6 md:p-8 lg:p-10 pt-4! w-full flex-1 min-h-0 flex flex-col gap-8 overflow-y-auto">

// After (add bg-background to ensure the main content area is clearly on the base surface):
<main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0 bg-background">
  <div className="p-6 md:p-8 lg:p-10 pt-4! w-full flex-1 min-h-0 flex flex-col gap-8 overflow-y-auto">
```

The `bg-background` on `<main>` creates the tonal separation between the sidebar (`bg-sidebar/80` = `#eaf1ff` tinted) and main area (`#f4f6ff`).

### Loading State (no code change needed)
```tsx
<div className="min-h-screen flex items-center justify-center bg-background">
  <span className="material-symbols-outlined text-4xl text-primary animate-spin">
```
`bg-background` → `#f4f6ff` and `text-primary` → `#00adef` both auto-update from Phase 01 tokens.

## Related Code Files

| File | Action | Change |
|------|--------|--------|
| `frontend/src/components/layout/header.tsx` | Modify | Glassmorphism, remove border-b, optional mobile branding |
| `frontend/src/app/(portal)/layout.tsx` | Modify | Add `bg-background` to `<main>` for tonal separation |

## Implementation Steps

1. In `header.tsx` line 25: update className (remove `border-b border-border`, change opacity/blur values)
2. In `header.tsx`: add optional mobile logo (import Image, add left-side brand element)
3. In `(portal)/layout.tsx`: add `bg-background` to `<main>` element
4. Build check: `cd frontend && rtk pnpm run build`

## Todo List

- [ ] Update header className: glassmorphism, remove border-b
- [ ] (Optional) Add mobile branding to header left side (Image import + logo)
- [ ] Add `bg-background` to portal layout `<main>` element
- [ ] Build check

## Success Criteria

- Header shows backdrop blur with no bottom border line
- Main content area and sidebar have distinct background tones
- Mobile breakpoint shows logo in header (if implemented)
- Build passes

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Mobile logo in header requires Image import | Low risk — straightforward addition |
| Main area bg conflicts with page-level backgrounds | `bg-background` is the base surface; pages can add cards on top |

## Next Steps

→ Phase 04: shadcn Component Audit
