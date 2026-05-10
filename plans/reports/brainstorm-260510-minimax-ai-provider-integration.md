---
name: ai-provider-minimax-integration
description: Add MiniMax AI provider for LLM with full integration approach
type: brainstorm
---

# AI Provider Integration: MiniMax Support

## Problem Statement

Add MiniMax as an AI provider for embedding, LLM, and vision processing. MiniMax uses Anthropic-compatible API, which affects implementation strategy.

**Requirements:**
- Support MiniMax LLM models (M2.7, M2.5, M2-her)
- Support embedding (use fallback to existing providers)
- Support vision (use fallback to existing providers)

## MiniMax API Analysis

| Capability | Status | API |
|------------|--------|-----|
| LLM | ✅ Available | Anthropic-compatible (`https://api.minimax.io/anthropic`) |
| Embedding | ❌ Not available | No text-embedding endpoint |
| Vision | ❌ Not supported | Image input not in current API |

**Authentication:** Bearer API key (JWT tokens)

## Architecture

```
ProviderType (enum)
    │
    ▼
┌─────────────────────────────────────────┐
│  app/ai/providers/minimax_provider.py   │
│  ├─ MiniMaxEmbedding (fallback to OpenAI)│
│  ├─ MiniMaxLLM (reuses Anthropic SDK)   │
│  └─ MiniMaxVision (fallback to OpenAI)  │
└─────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────┐
│  app/ai/registry.py                    │
│  ├─ _get_embedding_class()            │
│  ├─ _get_llm_class()                  │
│  └─ _get_vision_class()                │
└─────────────────────────────────────────┘
```

## Implementation Steps

### 1. Update ProviderType enum
- File: `app/ai/providers/base.py`
- Add: `MINIMAX = "minimax"` to enum

### 2. Create MiniMax provider class
- File: `app/ai/providers/minimax_provider.py`
- MiniMaxEmbedding: Fallback wrapper that delegates to OpenAI
- MiniMaxLLM: Use Anthropic SDK with custom base_url
- MiniMaxVision: Fallback wrapper that delegates to OpenAI

### 3. Register in registry
- File: `app/ai/registry.py`
- Add MINIMAX case to `_get_*_class()` functions
- Add to `SUPPORTED_PROVIDERS` dict

### 4. Add config keys
- Keys: `embedding_api_key__minimax`, `llm_api_key__minimax`, `vision_api_key__minimax`
- Already handled by existing `embedding_api_key_for()` pattern

## Files to Modify

| File | Change |
|------|--------|
| `app/ai/providers/base.py` | Add MINIMAX to enum |
| `app/ai/providers/minimax_provider.py` | Create new file (~150 lines) |
| `app/ai/registry.py` | Register provider + update dict |

## Risk Assessment

- **Low risk**: Uses existing Anthropic SDK (well-tested)
- **Fallback strategy**: Embedding/vision already have fallback pattern in registry
- **No breaking changes**: All existing providers continue working

## Success Criteria

- MiniMax LLM generates text correctly
- Provider switchable at runtime via admin portal
- Embedding/vision fallback to configured provider
- `test_all()` includes MiniMax

## Next Steps

1. Create implementation plan with planner agent
2. Implement MiniMax provider class
3. Test with M2.7 model
4. Add to admin portal dropdown