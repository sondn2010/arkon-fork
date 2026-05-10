---
title: "Arkon UI Re-branding: Hyper-Lucid Architect"
description: "Full re-brand from Sahara warm minimalism to Hyper-Lucid Architect — Catalyst Blue palette, Space Grotesk, glassmorphism, no-border philosophy."
status: completed
priority: P1
effort: 12h
issue:
branch: main
tags: [frontend, feature, refactor]
created: 2026-05-10
---

# Arkon UI Re-branding: Hyper-Lucid Architect

## Overview

Replace the "Sahara" warm minimalism theme with the "Hyper-Lucid Architect" design system. This covers all visual layers: CSS tokens, typography, layout components, shadcn primitives, and auth pages.

**Brainstorm report:** `plans/reports/brainstorm-260510-1528-ui-rebrand-hyper-lucid.md`
**Design spec:** `docs/UI/DESIGN.md`

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Design Tokens + Fonts | Pending | 2h | [phase-01](./phase-01-design-tokens-fonts.md) |
| 2 | Logo + Sidebar | Pending | 2h | [phase-02](./phase-02-logo-sidebar.md) |
| 3 | Header + Portal Layout | Pending | 1.5h | [phase-03](./phase-03-header-layout.md) |
| 4 | shadcn Component Audit | Pending | 2.5h | [phase-04](./phase-04-shadcn-components.md) |
| 5 | Auth / Login Page | Pending | 1.5h | [phase-05](./phase-05-auth-login-page.md) |
| 6 | Polish + QA | Pending | 2.5h | [phase-06](./phase-06-polish-qa.md) |

## Dependencies

- Phase 1 must complete first (all other phases consume its tokens)
- Phases 2, 3, 4 can run sequentially after Phase 1
- Phase 5 depends on Phase 1 + 4 (needs new component styles)
- Phase 6 depends on all prior phases

## Key Files

| File | Role |
|------|------|
| `frontend/src/app/globals.css` | All design tokens (single source of truth) |
| `frontend/src/app/layout.tsx` | Font imports |
| `frontend/src/components/layout/sidebar.tsx` | Sidebar |
| `frontend/src/components/layout/header.tsx` | Header |
| `frontend/src/app/(portal)/layout.tsx` | Portal shell |
| `frontend/src/app/login/page.tsx` | Auth page |
| `frontend/src/components/ui/` | shadcn primitives |
| `frontend/public/logo.png` | Logo asset |
