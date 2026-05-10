---
name: minimax-ai-provider-implementation
description: Implement MiniMax AI provider for LLM (embedding/vision fallback)
type: plan
status: pending
---

# MiniMax AI Provider Implementation Plan

## Overview

Add MiniMax as an AI provider supporting LLM. Embedding/vision fall back to other providers.

**Priority:** High  
**Status:** Pending  
**Effort:** 2-3 hours  

## Context

From brainstorm (plans/reports/brainstorm-260510-minimax-ai-provider-integration.md):
- MiniMax uses Anthropic-compatible API: `https://api.minimax.io/anthropic`
- No embedding endpoint available
- No vision/image input support (current API)
- Authentication: Bearer API key (JWT tokens)

## Key Insights

- MiniMax LLM reuse existing `AnthropicLLM` class with custom `base_url`
- Embedding fallback: route to configured provider (e.g., OpenAI)
- Vision fallback: route to configured provider (e.g., OpenAI)
- Config already supports per-provider keys pattern

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  app/ai/providers/base.py                              │
│  ProviderType: GOOGLE, OPENAI, ANTHROPIC, ... → MINIMAX│
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  app/ai/providers/minimax_provider.py (NEW)          │
│  ├─ MiniMaxEmbedding (delegates to OpenAI)           │
│  ├─ MiniMaxLLM (Anthropic SDK + custom base_url)      │
│  └─ MiniMaxVision (delegates to OpenAI)               │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  app/ai/registry.py                                   │
│  ├─ _get_embedding_class: add MINIMAX case            │
│  ├─ _get_llm_class: add MINIMAX case                  │
│  ├─ _get_vision_class: add MINIMAX case               │
│  └─ SUPPORTED_PROVIDERS: add minimax                  │
└─────────────────────────────────────────────────────────┘
```

## Requirements

### Functional
- MINIMAX selectable in admin portal for LLM
- MiniMax LLM generates text correctly
- Embedding routes to configured fallback provider
- Vision routes to configured fallback provider

### Non-Functional
- Runtime switchable (no redeploy)
- API key encrypted at rest
- Test connection works

## Files to Modify

| File | Change |
|------|--------|
| `app/ai/providers/base.py` | Add MINIMAX to enum |
| `app/ai/providers/minimax_provider.py` | NEW (~180 lines) |
| `app/ai/registry.py` | Register provider |
| `app/services/config_service.py` | Add minimax config key |

## Implementation Steps

### Phase 1: Add MINIMAX to enum
1. Open `app/ai/providers/base.py`
2. Add `MINIMAX = "minimax"` to `ProviderType` enum (line ~25)

### Phase 2: Create MiniMax provider class
1. Create `app/ai/providers/minimax_provider.py`
2. Implement `MiniMaxEmbedding`: wraps OpenAIEmbedding, uses its config
3. Implement `MiniMaxLLM`: uses Anthropic SDK with `base_url="https://api.minimax.io/anthropic"`
4. Implement `MiniMaxVision`: wraps OpenAIVision, uses its config

### Phase 3: Register in registry
1. Open `app/ai/registry.py`
2. Add MINIMAX case to `_get_embedding_class()`
3. Add MINIMAX case to `_get_llm_class()`
4. Add MINIMAX case to `_get_vision_class()`
5. Add to `SUPPORTED_PROVIDERS` dict

### Phase 4: Update config service
1. Open `app/services/config_service.py`
2. Add `"embedding_api_key__minimax"` to `ALL_CONFIG_KEYS`

## Todo List

- [ ] Add MINIMAX to ProviderType enum
- [ ] Create minimax_provider.py with fallback classes
- [ ] Register MiniMax in registry.py
- [ ] Add minimax config key to config_service.py
- [ ] Test provider connection

## Success Criteria

- [ ] MiniMax LLM generates text (M2.7 model)
- [ ] Provider appears in admin portal dropdown
- [ ] `test_all()` includes minimax
- [ ] Embedding routes to configured fallback
- [ ] Vision routes to configured fallback

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| API endpoint change | Low | High | Use env var for base_url |
| Auth failure | Low | High | Test connection on save |

## Security Considerations

- API key stored encrypted (already in config pattern)
- No new attack surface
- Uses existing SDKs (Anthropic, OpenAI)

## Next Steps

1. Execute implementation phases
2. Test with MiniMax API key in staging
3. Add to admin portal (already handled by registry pattern)