# Phase 05 — Auth / Login Page

**Links:** [Plan](./plan.md) | [Design spec](../../docs/UI/DESIGN.md)
**Priority:** P2 | **Status:** Completed | **Effort:** 1.5h
**Depends on:** Phase 01, Phase 04

## Overview

Re-brand the login page (`frontend/src/app/login/page.tsx`) to match Hyper-Lucid spec. Replace warm neutral layout with cool surface, add logo image above brand name, apply tonal card, use gradient CTA button, apply ghost border inputs.

## Current State

```tsx
// Current login layout:
<div className="min-h-screen flex items-center justify-center bg-background">
  <div className="w-full max-w-md px-8">
    {/* Brand: text-only "Arkon" h1 */}
    <div className="bg-card rounded-xl border border-border shadow-sahara p-8">
      {/* h2 "Sign in", form inputs, button */}
    </div>
  </div>
</div>
```

## Target Layout

After Phase 01 tokens, most values auto-update. Specific changes needed:

1. **Brand section**: Add `Logo.png` image above "Arkon" h1, change h1 font to Space Grotesk (`font-heading`)
2. **Card**: Remove explicit `border border-border` class + `shadow-sahara` → use `shadow-ambient`
3. **h2 "Sign in"**: Ensure uses Space Grotesk (add `font-heading` class)
4. **Submit button**: Already uses `bg-primary` — after Phase 04 this will be the gradient. Add `w-full` large padding per spec (`py-4 px-8` for premium wide footprint).
5. **Background**: `bg-background` → auto-updates to `#f4f6ff` from Phase 01. No change.
6. **Error state**: `text-destructive bg-destructive/10` → auto-updates to red on cool surface.

## Detailed Changes

### Brand Section

**Before:**
```tsx
<div className="text-center mb-10">
  <h1 className="text-5xl tracking-tight text-foreground mb-2">
    Arkon
  </h1>
  <p className="text-muted-foreground text-sm">Enterprise AI Control Center</p>
</div>
```

**After:**
```tsx
<div className="text-center mb-10">
  <div className="flex items-center justify-center gap-3 mb-3">
    <Image src="/logo.png" alt="Arkon" width={40} height={40} className="rounded-[6px]" />
    <h1 className="text-5xl tracking-tight text-foreground font-heading" style={{ letterSpacing: '-0.02em' }}>
      Arkon
    </h1>
  </div>
  <p className="text-muted-foreground text-sm">Enterprise AI Knowledge Hub</p>
</div>
```

Add `import Image from "next/image"` at top.
Update description text to match current README: "Enterprise AI Knowledge Hub".

### Login Card

**Before:**
```tsx
<div className="bg-card rounded-xl border border-border shadow-sahara p-8">
  <h2 className="text-2xl text-foreground mb-6">Sign in</h2>
```

**After:**
```tsx
<div className="bg-card rounded-xl shadow-ambient p-8">
  <h2 className="text-2xl text-foreground mb-6 font-heading">Sign in</h2>
```

Changes:
- Remove `border border-border` (Hyper-Lucid no-border rule — card white on `#f4f6ff` provides enough contrast)
- Replace `shadow-sahara` → `shadow-ambient` (new utility from Phase 01)
- Add `font-heading` to h2

### Submit Button

**Before:**
```tsx
<Button
  type="submit"
  disabled={loading}
  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
>
```

**After:**
```tsx
<Button
  type="submit"
  disabled={loading}
  className="w-full mt-2 py-4"
>
```

Remove inline `bg-primary hover:bg-primary/90 text-primary-foreground` — Phase 04 button now uses gradient by default for the `default` variant. `py-4` gives the wide premium footprint from the spec.

### Footer Text

**Before:**
```tsx
<p className="text-center text-xs text-muted-foreground mt-6">
  Arkon v0.1 — On-Premise Deployment
</p>
```

**After:** Keep as-is or update version to match current release (v0.2.2 from git log).
```tsx
<p className="text-center text-xs text-muted-foreground mt-6">
  Arkon — On-Premise Deployment
</p>
```

## Related Code Files

| File | Action | Change |
|------|--------|--------|
| `frontend/src/app/login/page.tsx` | Modify | Logo, font-heading on titles, remove border/old shadow, update button |

## Implementation Steps

1. Add `import Image from "next/image"` to `login/page.tsx`
2. Update brand section: add `<Image>` logo + `font-heading` + letter-spacing on h1; update description text
3. Update card container: remove `border border-border`, replace `shadow-sahara` → `shadow-ambient`
4. Add `font-heading` to `<h2>Sign in</h2>`
5. Update button: remove inline color overrides, add `py-4`
6. Update footer version text if desired
7. Build check: `cd frontend && rtk pnpm run build`

## Todo List

- [ ] Add `import Image from "next/image"` to login page
- [ ] Update brand section (logo image + font-heading + letter-spacing + description text)
- [ ] Update card: remove `border border-border` and `shadow-sahara`; add `shadow-ambient`
- [ ] Add `font-heading` to "Sign in" h2
- [ ] Update submit button: remove inline bg overrides, add `py-4`
- [ ] Update footer text
- [ ] Build check

## Success Criteria

- Login page shows swirl logo left of "Arkon" heading
- "Arkon" uses Space Grotesk with tight letter-spacing
- Card has no visible border — floats on cool surface background
- Submit button shows blue gradient
- Input fields have no border at rest; blue focus ring on focus
- Page loads and login function works end-to-end

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| `shadow-ambient` not defined yet | Defined in Phase 01 globals.css — execute phases in order |
| Image import might need `next/image` config for `/logo.png` | Local public/ files don't require next.config domains |
| Button variant override: removing inline className may not work if base styles don't apply | Verify Phase 04 button default variant has gradient before removing inline overrides |

## Next Steps

→ Phase 06: Polish + QA
