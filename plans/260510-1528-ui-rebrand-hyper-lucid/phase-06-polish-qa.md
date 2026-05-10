# Phase 06 — Polish + QA

**Links:** [Plan](./plan.md) | [Design spec](../../docs/UI/DESIGN.md)
**Priority:** P2 | **Status:** Completed | **Effort:** 2.5h
**Depends on:** Phases 01–05

## Overview

Full visual QA pass: audit all pages for residual Sahara tokens, verify WCAG focus compliance, test dark mode toggle, check glassmorphism rendering, ensure typography hierarchy is consistent.

## QA Checklist

### 1. Residual Sahara Token Sweep

Search for any remaining hardcoded Sahara values in the frontend source:

```bash
# Run from frontend/src/
rtk grep "#c2652a\|#faf5ee\|#faf0e8\|#f6f0e8\|#ece6dc\|sahara\|EB Garamond" --include="*.tsx" --include="*.ts" --include="*.css"
```

Any match = must be updated to Hyper-Lucid equivalent.

**Common locations to check:**
- Page components that set inline styles
- Any `className="text-[#c2652a]"` or `style={{ color: "#..." }}` patterns
- `globals.css` comment/header (should already be updated in Phase 01)

### 2. Residual shadow-sahara References

```bash
rtk grep "shadow-sahara" --include="*.tsx" --include="*.ts"
```

Only `login/page.tsx` used it — should be replaced by Phase 05. Verify no others.

### 3. WCAG Focus Audit

Test each interactive element type:
- [ ] **Input fields**: Tab into → see 2px blue border + glow
- [ ] **Buttons (primary)**: Tab onto → see focus ring
- [ ] **Buttons (ghost/outline)**: Tab onto → see focus ring
- [ ] **Dropdown triggers**: Tab → keyboard-openable
- [ ] **Links (nav items)**: Tab → see focus indicator
- [ ] **Sidebar workspace items**: Tab → see focus indicator

WCAG 2.4.7: Focus must be visible. If any element has `focus:outline-none` without replacement, add back `focus-visible:ring-2 focus-visible:ring-ring`.

### 4. Dark Mode Test

Add `.dark` class to `<html>` element temporarily in browser DevTools and verify:
- [ ] Background shifts to `#0f1623`
- [ ] Text shifts to `#e2e8f0`
- [ ] Primary `#00adef` remains visible and high-contrast
- [ ] Sidebar shows dark glassmorphism
- [ ] Cards visible on dark surface
- [ ] Input `bg-input` = `#1a2540` renders correctly

Note: Dark mode toggle mechanism (button/system preference) is out of scope for this re-brand. Just verify the `.dark` class CSS works.

### 5. Typography Hierarchy Audit

Visit each page and verify:
- [ ] h1/h2/h3 render Space Grotesk (check DevTools Computed → font-family)
- [ ] Body text renders Manrope
- [ ] Labels in forms use Space Grotesk (they use `label-md` = Space Grotesk per spec)
- [ ] No EB Garamond renders anywhere (network tab: no EB Garamond font request)

### 6. Glassmorphism Rendering

- [ ] Sidebar: scroll main content → verify content visible through sidebar (backdrop blur)
- [ ] Header: scroll page → content shows through header
- [ ] If `backdrop-filter` not rendering: check if parent has `transform` or `will-change` (known to break backdrop-filter)

### 7. Page-by-Page Visual Check

Visit each portal page, check for obvious issues:

| Page | Check |
|------|-------|
| `/login` | Logo visible, gradient button, no border card |
| `/` (Dashboard) | Cards use new styling, no warm tones |
| `/knowledge` | Table rows de-emphasized (near-transparent borders) |
| `/wiki` | Typography hierarchy correct |
| `/skills` | Badges use Hyper-Lucid palette |
| `/workspaces/[id]` | Workspace color dots updated |
| `/departments` | Table styling |
| `/settings` | Form inputs: ghost border |
| `/profile` | Card styling |
| `/audit` | Table, badges |

### 8. Typography Specifics for Page Headings

Check that page-level `<h1>` or heading components have `font-heading` class or inherit it from the CSS rule. The `globals.css` `@layer base` sets `h1, h2, h3, h4 { font-family: var(--font-heading); }` which should cascade. But custom components that set `text-xl font-semibold` may not have semantic `<h>` tags. Grep for patterns:

```bash
rtk grep "text-2xl\|text-3xl\|text-xl font-semibold\|text-xl font-medium" --include="*.tsx"
```

If heading-scale text uses `<div>` or `<p>` instead of `<h*>`, add `font-heading` class manually.

### 9. Color Contrast Check

Critical pairs to verify (minimum 4.5:1 for text):
| Foreground | Background | Expected ratio |
|------------|------------|----------------|
| `#1f2937` on `#f4f6ff` | Text on surface | ~10:1 ✓ |
| `#e8f4ff` on `#00adef` | Primary button text | ~5.2:1 ✓ |
| `#525c6c` on `#f4f6ff` | Muted text | ~4.8:1 ✓ |
| `#00adef` on `#ffffff` | Link/label on card | ~3.2:1 ⚠ (decorative use only) |

Note: `#00adef` on white is ~3.2:1 — below 4.5:1 threshold. Per spec, `primary` is used sparingly for "active" energy. Ensure primary-colored text is never used for body copy or critical information — only for interactive labels and decorations.

### 10. Final Build + Lint

```bash
cd frontend && rtk pnpm run build
rtk lint
```

Fix any warnings related to the re-brand changes.

## Related Code Files

| File | Action | Change |
|------|--------|--------|
| Any `*.tsx` with `#c2652a` / `sahara` / `EB Garamond` | Modify | Replace with Hyper-Lucid equivalent |
| `frontend/src/app/globals.css` | Verify | No Sahara tokens remain |
| Page components with inline styles | Modify | Update color values |

## Implementation Steps

1. Run Sahara color grep — fix any matches found
2. Run shadow-sahara grep — fix any remaining references
3. WCAG focus audit — test in browser via keyboard navigation
4. Dark mode test in DevTools
5. Typography audit — check font-family in DevTools Computed panel
6. Glassmorphism rendering check — scroll test for header and sidebar
7. Page-by-page visual scan (spot check each route)
8. Color contrast check — verify key pairs
9. Final `rtk pnpm run build && rtk lint`

## Todo List

- [ ] Sahara color grep + fix residuals
- [ ] shadow-sahara grep + fix
- [ ] WCAG focus audit (keyboard nav all interactives)
- [ ] Dark mode DevTools test
- [ ] Typography audit (DevTools font-family check)
- [ ] Glassmorphism scroll test (header + sidebar)
- [ ] Page-by-page visual scan (all portal routes)
- [ ] Color contrast verification
- [ ] Final build + lint check

## Success Criteria

- Zero grep matches for Sahara colors or `shadow-sahara` in source
- All interactive elements have visible focus indicator
- Dark mode toggles correctly with `.dark` class
- Space Grotesk renders on all heading elements (confirmed via DevTools)
- Build passes with no errors
- Lint passes (or only pre-existing warnings)

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Backdrop-filter broken by parent transform | Identify parent with `transform`/`will-change` and remove or restructure |
| Color contrast failure on primary text | Restrict primary-colored text to interactive labels only |
| Dark mode not toggling (no toggle button) | Document that `.dark` class on `<html>` is the mechanism; dark mode toggle UI is out of scope |
| Some pages missed in visual scan | Use route list from glob output (all 17 portal pages) |

## Security Considerations

- None — purely visual changes
