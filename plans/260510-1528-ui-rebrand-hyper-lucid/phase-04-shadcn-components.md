# Phase 04 — shadcn Component Audit

**Links:** [Plan](./plan.md) | [Design spec](../../docs/UI/DESIGN.md)
**Priority:** P1 | **Status:** Completed | **Effort:** 2.5h
**Depends on:** Phase 01

## Overview

Audit and update all shadcn/ui primitive components in `frontend/src/components/ui/` to match Hyper-Lucid spec. Key targets: buttons (gradient primary), inputs (ghost border focus), cards (no ring/border), separators (remove), table (no row borders), badge, tabs.

## Component Audit

### 1. Button (`button.tsx`) — Priority: High

**Current:** `default` variant = `bg-primary text-primary-foreground` (flat fill)
**Target:** Primary CTA = gradient `#00adef → #2fbcff` at 135deg

**Change:**
```tsx
// In buttonVariants cva, variants.variant.default:
// Before:
default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",

// After (use bg-primary-gradient utility + override hover):
default: "bg-gradient-to-br from-primary to-primary-container text-primary-foreground hover:opacity-90 transition-opacity",
```

Note: `--color-primary-container` = `#2fbcff` (set in Phase 01). `bg-gradient-to-br` = 135deg equivalent in Tailwind.

**Also:** Remove `border border-transparent` from the base classes — this base border exists for accessibility alignment but conflicts with Hyper-Lucid. Replace with `focus-visible:outline-2 focus-visible:outline-ring`:
```tsx
// Base CVA string: remove "border border-transparent", keep focus-visible ring
```

### 2. Input (`input.tsx`) — Priority: High (WCAG critical)

**Current:** `border border-input bg-transparent` + `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`
**Target:** Background `surface-container-highest` (`#cfdef7`/`--input`), ghost border focus (2px `primary` + 4px glow at 20%)

**Change:**
```tsx
// Before:
"h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 ..."
"... focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ..."

// After:
"h-8 w-full min-w-0 rounded-lg border border-transparent bg-input px-2.5 ..."
"... focus-visible:border-ring focus-visible:ring-[4px] focus-visible:ring-ring/20 ..."
```

Key changes:
- `border-input` → `border-transparent` (ghost border — invisible by default)
- `bg-transparent` → `bg-input` (surface-container-highest = `#cfdef7` light / `#1a2540` dark)
- `ring-ring/50` → `ring-ring/20` (lighter glow per spec)
- Keep `focus-visible:border-ring` (2px primary on focus — this IS the ghost border visible on focus)

**WCAG note:** focus-visible border IS kept — this satisfies WCAG 2.4.7.

### 3. Card (`card.tsx`) — Priority: High

**Current:** `ring-1 ring-foreground/10` (the "border" effect)
**Target:** No ring — tonal background provides containment. Background = `--card` = `#ffffff` on `--background` = `#f4f6ff`. 

**Change in Card:**
```tsx
// Before:
"group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 ... ring-1 ring-foreground/10 ..."
// After: remove ring-1 ring-foreground/10
"group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 ..."
```

**Change in CardFooter:**
```tsx
// Before (has border-t):
"flex items-center rounded-b-xl border-t bg-muted/50 p-4 ..."
// After: replace border-t with bg shift
"flex items-center rounded-b-xl bg-secondary/60 p-4 ..."
```

### 4. Separator (`separator.tsx`) — Check

Read file, check if `<Separator>` uses `border` or `bg`. If it uses `bg-border`, the Hyper-Lucid `--border` token (near-transparent) will make it nearly invisible — which is correct behavior. No code change needed if token-driven.

### 5. Table (`table.tsx`) — Check

Read file. If rows use `border-b`, after Phase 01 `--border` is near-transparent so rows will naturally de-emphasize. Verify visually. May need to switch `border-b` → `bg-muted/30` row striping or remove entirely.

### 6. Badge (`badge.tsx`) — Low

Badges should use `bg-secondary text-secondary-foreground` for Hyper-Lucid "surface-container-high" style. Check current implementation and ensure no hardcoded warm colors.

### 7. Tabs (`tabs.tsx`) — Low

Check if active tab uses `bg-background` or `bg-primary`. Hyper-Lucid: active tab = `bg-card` (white) lifted on `bg-background` surface. Verify no borders.

### 8. Select, Dropdown, Popover — Low

These use `bg-popover` which is `#ffffff` (set in Phase 01). Should auto-update. Check for any hardcoded border classes beyond the near-transparent `--border` token.

## Component Read Order (before editing)

Read these files before making changes:
- `frontend/src/components/ui/separator.tsx`
- `frontend/src/components/ui/table.tsx`
- `frontend/src/components/ui/badge.tsx`
- `frontend/src/components/ui/tabs.tsx`

## Related Code Files

| File | Action | Change |
|------|--------|--------|
| `frontend/src/components/ui/button.tsx` | Modify | Gradient primary, remove base border |
| `frontend/src/components/ui/input.tsx` | Modify | Ghost border focus, bg-input background |
| `frontend/src/components/ui/card.tsx` | Modify | Remove ring-1, update CardFooter |
| `frontend/src/components/ui/separator.tsx` | Check/Modify | Verify token-driven |
| `frontend/src/components/ui/table.tsx` | Check/Modify | Verify row borders |
| `frontend/src/components/ui/badge.tsx` | Check/Modify | Verify no warm hardcoded colors |
| `frontend/src/components/ui/tabs.tsx` | Check/Modify | Verify active tab style |

## Implementation Steps

1. Read `separator.tsx`, `table.tsx`, `badge.tsx`, `tabs.tsx` first
2. Update `button.tsx`: gradient primary, remove base `border border-transparent`
3. Update `input.tsx`: ghost border (transparent default, ring/20 focus), bg-input background
4. Update `card.tsx`: remove `ring-1 ring-foreground/10`; update `CardFooter` border-t → bg shift
5. Update `separator.tsx` if hardcoded border
6. Update `table.tsx` if hardcoded row borders
7. Update `badge.tsx` / `tabs.tsx` if needed
8. Build check: `cd frontend && rtk pnpm run build`

## Todo List

- [ ] Read separator.tsx, table.tsx, badge.tsx, tabs.tsx
- [ ] Update button.tsx: gradient primary + remove base border
- [ ] Update input.tsx: transparent default border + bg-input + ring/20 focus glow
- [ ] Update card.tsx: remove ring-1 from Card; update CardFooter border → bg-secondary/60
- [ ] Fix separator.tsx if not token-driven
- [ ] Fix table.tsx row borders if needed
- [ ] Fix badge.tsx if hardcoded warm colors
- [ ] Fix tabs.tsx active state if needed
- [ ] Build check

## Success Criteria

- Primary buttons show gradient (`#00adef` → `#2fbcff`)
- Inputs have no visible border at rest; 2px blue border + soft glow on focus
- Cards have no ring/border — white card visibly lifted on `#f4f6ff` background
- Focus on any interactive element is clearly visible (WCAG 2.4.7 compliant)
- No `#c2652a` or Sahara warm tones remain in any component file

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| `bg-input` on input shows wrong color in dark mode | Phase 01 sets `--input: #1a2540` for dark — verify toggle |
| Button gradient conflicts with disabled state opacity | `disabled:opacity-50` already in CVA base — keeps working with gradient |
| WCAG failure if `border-transparent` input loses visible focus | `focus-visible:border-ring` retained — focus border IS visible |
| CardFooter bg-secondary/60 not matching design | Adjust to `bg-muted/40` if too saturated |

## Security Considerations

- No security implications — purely visual changes

## Next Steps

→ Phase 05: Auth / Login Page
