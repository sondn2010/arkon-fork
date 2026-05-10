# Phase 1 — Setup: Dockerfile + docs copy

## Context Links

- Plan: `plans/260511-0047-user-guide-help-center/plan.md`
- Dockerfile: `Dockerfile`

## Overview

| Field | Value |
|---|---|
| Priority | P1 |
| Status | pending |
| Effort | 30 min |

Copy `docs/` directory into the Docker image so the backend can read markdown files from `app/docs/`.

---

## Requirements

1. Add `COPY docs/ app/docs/` to `Dockerfile` (after source files, before CMD)
2. Add comment explaining the copy
3. Verify in `docker-compose.yml` that `x-backend` build context includes `docs/` (it already does — `context: .`)

---

## Implementation Steps

### Step 1 — Modify Dockerfile

Find the `COPY app/ app/` line in the Dockerfile and add `COPY docs/ app/docs/` after it.

Example:

```dockerfile
# Copy application source
COPY app/ app/

# Copy documentation for the help center
COPY docs/ app/docs/
```

### Step 2 — Verify docker-compose.yml

The `x-backend` anchor already has `context: .` so the entire repo (including `docs/`) is available in the build context. No changes needed.

---

## Files

| File | Action |
|---|---|
| `Dockerfile` | Modify — add `COPY docs/ app/docs/` |

---

## Success Criteria

- [ ] `docker compose --env-file .env.docker build api` succeeds
- [ ] `docker compose run api ls app/docs/` shows all .md files from `docs/`