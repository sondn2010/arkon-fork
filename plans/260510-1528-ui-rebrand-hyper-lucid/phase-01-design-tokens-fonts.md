# Phase 01 — Design Tokens + Fonts

**Links:** [Plan](./plan.md) | [Design spec](../../docs/UI/DESIGN.md)
**Priority:** P1 | **Status:** Completed | **Effort:** 2h

## Overview

Replace all Sahara CSS variables with Hyper-Lucid tokens in `globals.css`. Swap EB Garamond for Space Grotesk. Define dark mode variant. This is the foundation — all other phases depend on it.

## Key Insights

- Token file: `frontend/src/app/globals.css` (Tailwind v4 `@theme inline`)
- Font strategy: existing layout uses Google Fonts CDN `<link>` in `<head>` — keep same pattern, swap EB Garamond → Space Grotesk
- `--font-heading` must reference `"Space Grotesk"` (exact string for CSS font-family)
- Radius: spec says `ROUND_FOUR = 1rem` for cards/buttons; set `--radius: 1rem`
- Surface layering: need 4 surface tiers (background, card, popover, surface-container-low)
- The `@layer base` block applies `border-border` globally — the "no-border" rule is enforced by making `--border` near-transparent, not by removing the CSS class
- Dark mode: `@custom-variant dark (&:is(.dark *))` is already configured

## Hyper-Lucid Color Mapping

| Token | Light Value | Dark Value | Notes |
|-------|-------------|------------|-------|
| `--background` | `#f4f6ff` | `#0f1623` | surface |
| `--foreground` | `#1f2937` | `#e2e8f0` | on-surface |
| `--card` | `#ffffff` | `#161e2e` | surface-container-lowest |
| `--card-foreground` | `#1f2937` | `#e2e8f0` | |
| `--popover` | `#ffffff` | `#161e2e` | |
| `--popover-foreground` | `#1f2937` | `#e2e8f0` | |
| `--primary` | `#00adef` | `#00adef` | Catalyst Blue |
| `--primary-foreground` | `#e8f4ff` | `#001824` | on-primary |
| `--secondary` | `#eaf1ff` | `#1a2540` | surface-container-low |
| `--secondary-foreground` | `#525c6c` | `#a0b0c8` | on-surface-variant |
| `--muted` | `#eaf1ff` | `#1a2540` | |
| `--muted-foreground` | `#525c6c` | `#7a90a8` | |
| `--accent` | `#eaf1ff` | `#1a2540` | |
| `--accent-foreground` | `#1f2937` | `#e2e8f0` | |
| `--destructive` | `#dc2626` | `#ef4444` | |
| `--border` | `rgba(31,41,55,0.08)` | `rgba(226,232,240,0.08)` | near-transparent — "no-line" rule |
| `--input` | `#cfdef7` | `#1a2540` | surface-container-highest |
| `--ring` | `#00adef` | `#00adef` | focus ring = primary |
| `--radius` | `1rem` | `1rem` | ROUND_FOUR |

### Chart Colors (Hyper-Lucid palette)
| Token | Value |
|-------|-------|
| `--chart-1` | `#00adef` |
| `--chart-2` | `#2fbcff` |
| `--chart-3` | `#7c3aed` |
| `--chart-4` | `#059669` |
| `--chart-5` | `#525c6c` |

### Sidebar Tokens
| Token | Light | Dark |
|-------|-------|------|
| `--sidebar` | `#eaf1ff` | `#161e2e` |
| `--sidebar-foreground` | `#1f2937` | `#e2e8f0` |
| `--sidebar-primary` | `#00adef` | `#00adef` |
| `--sidebar-primary-foreground` | `#e8f4ff` | `#001824` |
| `--sidebar-accent` | `rgba(0,173,239,0.08)` | `rgba(0,173,239,0.12)` |
| `--sidebar-accent-foreground` | `#00adef` | `#00adef` |
| `--sidebar-border` | `rgba(31,41,55,0.06)` | `rgba(226,232,240,0.06)` |
| `--sidebar-ring` | `#00adef` | `#00adef` |

### Hyper-Lucid Extra Tokens (to add to @theme inline)
```css
/* Surface tiers */
--color-surface: var(--surface);
--color-surface-container-low: var(--surface-container-low);
--color-surface-container-high: var(--surface-container-high);
--color-on-surface-variant: var(--on-surface-variant);
--color-primary-container: var(--primary-container);
--color-outline-variant: var(--outline-variant);
```

| Extra Token | Light | Dark |
|-------------|-------|------|
| `--surface` | `#f4f6ff` | `#0f1623` |
| `--surface-container-low` | `#eaf1ff` | `#1a2540` |
| `--surface-container-high` | `#dde8f8` | `#232f45` |
| `--on-surface-variant` | `#525c6c` | `#7a90a8` |
| `--primary-container` | `#2fbcff` | `#003a5c` |
| `--outline-variant` | `rgba(0,173,239,0.20)` | `rgba(0,173,239,0.20)` |

## Font Changes

### layout.tsx — `<head>`
**Remove:**
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400..800&family=Manrope:wght@200..800&display=swap" />
```
**Add:**
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Manrope:wght@200..800&display=swap" />
```

### globals.css — `@theme inline`
**Change:**
```css
--font-heading: "EB Garamond", ui-serif, Georgia, serif;
```
**To:**
```css
--font-heading: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
```

## Custom Utilities to Update

**Remove:** `.shadow-sahara`
**Add:**
```css
/* Hyper-Lucid ambient shadow — tinted, large blur, negative spread */
.shadow-ambient {
  box-shadow: 0 8px 40px -10px rgba(31, 41, 55, 0.06);
}

/* Primary gradient — CTAs and hero accents */
.bg-primary-gradient {
  background: linear-gradient(135deg, #00adef, #2fbcff);
}
```

## Related Code Files

| File | Action | Change |
|------|--------|--------|
| `frontend/src/app/globals.css` | Modify | Full token replacement, font var, utilities |
| `frontend/src/app/layout.tsx` | Modify | Swap Google Fonts link |

## Implementation Steps

1. Open `globals.css` — replace the comment block header (Sahara → Hyper-Lucid Architect)
2. In `@theme inline`: update `--font-heading`, keep `--font-sans` (Manrope), add surface/outline-variant tokens
3. Replace entire `:root {}` block with Hyper-Lucid light palette (see mapping table above)
4. Add `.dark` block after `:root {}` with dark palette values
5. Update `@layer base` — keep `border-border` (now near-transparent), keep body/html rules; update h1-h4 to use `font-heading`
6. Remove `.shadow-sahara` utility; add `.shadow-ambient` and `.bg-primary-gradient`
7. In `layout.tsx`: replace EB Garamond link with Space Grotesk link
8. Run `cd frontend && rtk pnpm run build` — verify no compile errors

## Todo List

- [ ] Replace globals.css comment header
- [ ] Update `@theme inline` font-heading + surface tokens
- [ ] Replace `:root {}` Sahara values with Hyper-Lucid light palette
- [ ] Add `.dark {}` dark mode block
- [ ] Remove `.shadow-sahara`, add `.shadow-ambient` + `.bg-primary-gradient`
- [ ] Update `layout.tsx` Google Fonts link (Space Grotesk)
- [ ] Build check: `rtk pnpm run build` in frontend/

## Success Criteria

- No `#c2652a`, `#faf5ee`, `#faf0e8`, `EB Garamond` anywhere in globals.css
- `--primary: #00adef` in `:root`
- Space Grotesk renders on h1-h4 in browser
- Dark mode `.dark` class switches palette correctly
- Build passes with no errors

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Tailwind v4 `@theme inline` syntax errors | Test build after each block change |
| Dark mode `.dark` selector not matching | Verify `@custom-variant dark` directive is present |
| Space Grotesk not loading | Check network tab; fallback to `system-ui` in font stack |

## Next Steps

→ Phase 02: Logo + Sidebar (consumes new primary/sidebar tokens)
