---
type: brainstorm
date: 2026-05-10
slug: ui-rebrand-hyper-lucid
---

# Brainstorm Report: Arkon UI Re-branding → Hyper-Lucid Architect

## Problem Statement
Re-brand Arkon's entire frontend UI from the "Sahara" warm minimalism theme to the "Hyper-Lucid Architect" design system, incorporating the new swirl logo, Space Grotesk typography, Catalyst Blue palette, glassmorphism, and no-border philosophy. Dark mode must be supported.

## Current State
- **Theme**: "Sahara" — burnt sienna `#c2652a`, linen `#faf5ee`, EB Garamond headings
- **Token location**: `frontend/src/app/globals.css` (Tailwind v4 `@theme inline`)
- **Layout**: Fixed 240px sidebar, sticky header, portal layout with auth guard
- **Components**: shadcn/ui (Base UI React) + Lucide icons + Material Symbols
- **Stack**: Next.js · Tailwind CSS v4 · PostCSS

## Target State
- **Theme**: "Hyper-Lucid Architect" — Catalyst Blue `#00adef`, Slate Gray `#1f2937`, surface `#f4f6ff`
- **Typography**: Space Grotesk (headings) + Manrope (body) via `next/font`
- **Logo**: `Logo.png` (blue/cyan/green swirl) in sidebar org header
- **Borders**: Eliminated — replaced by tonal color-shift layering
- **Elevation**: Ambient shadows (tinted, large blur, negative spread) + glassmorphism
- **Dark mode**: Full Hyper-Lucid dark variant

## Gap Analysis

| Layer | Effort | Files Affected |
|---|---|---|
| CSS design tokens (color, radius, shadow) | Low | `globals.css` |
| Typography (Space Grotesk via next/font) | Low | `layout.tsx`, `globals.css` |
| Logo in sidebar | Low | `sidebar.tsx` |
| Glassmorphism header + sidebar | Medium | `header.tsx`, `sidebar.tsx`, `globals.css` |
| Remove borders from shadcn components | High | ~8-10 files in `components/ui/` |
| Dark mode palette | Medium | `globals.css` |
| Page-level tonal layering | Medium | Page components, `globals.css` utilities |

## Recommended Approach: Token-First, Phased

### Phase 1 — Design Tokens + Fonts
- Replace all Sahara CSS vars in `globals.css` with Hyper-Lucid tokens
- Add Space Grotesk via `next/font/google` in `layout.tsx`
- Keep Manrope (already used)
- Define dark mode variant tokens
- **Impact**: 70% visual re-brand immediately

### Phase 2 — Logo + Sidebar
- Swap `Logo.png` into sidebar org header
- Apply glassmorphism to sidebar (`bg-surface/80 backdrop-blur-[20px]`)
- Remove `border-r` sidebar divider, use tonal background shift
- Remove section separator lines

### Phase 3 — Header + Layout
- Apply glassmorphism to sticky header
- Remove `border-b`, use tonal shift or shadow
- Ensure main content area uses `surface` → `surface-container-low` nesting

### Phase 4 — Components + Polish
- Audit + update: `button.tsx`, `input.tsx`, `card.tsx`, `table.tsx`, `separator.tsx`, `badge.tsx`, `tabs.tsx`, `select.tsx`
- Apply ghost-border to inputs (focus: 2px `primary` + 4px glow at 20%)
- Primary button: gradient `#00adef → #2fbcff` at 135deg
- Remove hardcoded borders from card, separator, table components

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Tailwind v4 font token syntax | Medium | Use CSS `font-family` vars in `@theme inline`, not deprecated config |
| shadcn border removal breaks WCAG focus | High | Keep ghost-border (20% opacity outline) on ALL inputs by default |
| Glassmorphism `backdrop-filter` browser compat | Low | Enterprise tool — modern browsers acceptable |
| Dark mode palette not defined in DESIGN.md | Medium | Derive: `#0f1623` base, `#00adef` primary at 80%, flip surface/text roles |

## Decisions Made
- Scope: Full re-brand (all layers)
- Logo: Image file (`Logo.png`) in sidebar
- Dark mode: Yes, define dark variant in Phase 4
- Timeline: Quality-first (3-4 sessions)
- Strategy: Option A — direct `globals.css` edit, token-first

## Dark Mode Palette (Proposed)
- Base background: `#0f1623`
- Surface: `#161e2e`
- Surface-container-low: `#1a2540`
- On-surface (text): `#e2e8f0`
- Primary: `#00adef` (unchanged — high contrast on dark)
- Primary container: `#003a5c`

## Success Criteria
- All Sahara color values (`#c2652a`, `#faf5ee`, warm tones) removed from codebase
- Space Grotesk renders on all display/headline elements
- No visible 1px solid borders except ghost-border on inputs
- Logo.png visible in sidebar org header
- Glassmorphism visible on sidebar and header (with backdrop blur)
- Dark mode toggles correctly
- No WCAG focus-visibility violations

## Resolved Questions
- Auth/login pages: **Yes**, full Hyper-Lucid re-brand (no exceptions)
- Logo asset: **Logo.png** (repo root) — no SVG needed
- Workspace type colors: **Update** to Hyper-Lucid secondary palette (derive from primary `#00adef` via hue rotation)
