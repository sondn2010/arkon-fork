"""
MiniMax provider — LLM with embedding/vision fallback.

MiniMax uses Anthropic-compatible API:
  - LLM: M2.7, M2.5, M2-her (via Anthropic SDK)
  - Embedding: NOT available — fallback to configured provider
  - Vision: NOT available — fallback to configured provider

API: https://platform.minimax.io/docs/api-reference/text-anthropic-api
Auth: Bearer API key (JWT tokens)
"""

from typing import Optional

from loguru import logger

from app.ai.providers.base import (
    EmbeddingProvider,
    LLMProvider,
    ProviderConfig,
    VisionProvider,
)

# MiniMax API base URL (Anthropic-compatible)
MINIMAX_BASE_URL = "https://api.minimax.io/anthropic"


class MiniMaxEmbedding(EmbeddingProvider):
    """
    Embedding provider that falls back to configured provider.

    MiniMax does not offer text embedding. This class delegates to
    the configured fallback provider (typically OpenAI or Google).
    """

    def __init__(self, config: ProviderConfig):
        super().__init__(config)
        self._fallback: Optional[EmbeddingProvider] = None
        self._fallback_config = config
        # Override base_url if explicitly set, otherwise use default
        if not config.base_url:
            self._fallback_config.base_url = None

    def _get_fallback(self) -> EmbeddingProvider:
        """Lazy-load fallback embedding provider."""
        if self._fallback is None:
            from app.ai.providers.openai_provider import OpenAIEmbedding
            self._fallback = OpenAIEmbedding(self._fallback_config)
            logger.info("MiniMax embedding: falling back to OpenAI")
        return self._fallback

    async def embed(self, text: str) -> list[float]:
        return await self._get_fallback().embed(text)

    async def embed_batch(
        self, texts: list[str], concurrency: int = 5
    ) -> list[list[float]]:
        return await self._get_fallback().embed_batch(texts, concurrency)

    async def test_connection(self) -> tuple[bool, str]:
        try:
            result = await self._get_fallback().test_connection()
            return True, f"MiniMax embedding (fallback): {result[1]}"
        except Exception as e:
            return False, f"MiniMax embedding fallback error: {e}"

    @property
    def dimensions(self) -> int:
        return self._fallback_config.dimensions or 768


class MiniMaxLLM(LLMProvider):
    """
    MiniMax LLM provider using Anthropic-compatible API.

    Supports: MiniMax-M2.7, MiniMax-M2.5, MiniMax-M2-her, etc.
    """

    def __init__(self, config: ProviderConfig):
        super().__init__(config)
        self._client = None

    @property
    def client(self):
        if self._client is None:
            import anthropic
            base_url = self.config.base_url or MINIMAX_BASE_URL
            self._client = anthropic.AsyncAnthropic(
                api_key=self.config.api_key,
                base_url=base_url,
            )
            logger.info(f"MiniMax LLM: using base_url={base_url}")
        return self._client

    async def generate(
        self,
        prompt: str,
        system: Optional[str] = None,
        max_tokens: Optional[int] = None,
        temperature: float = 0.7,
    ) -> str:
        kwargs = {
            "model": self.config.model_id,
            "max_tokens": max_tokens or 16384,
            "temperature": temperature,
            "messages": [{"role": "user", "content": prompt}],
        }
        if system:
            kwargs["system"] = system

        response = await self.client.messages.create(**kwargs)
        return response.content[0].text if response.content else ""

    async def test_connection(self) -> tuple[bool, str]:
        try:
            result = await self.generate("Say 'OK'", max_tokens=10, temperature=0)
            return True, f"OK — model={self.config.model_id}, response='{result[:50]}'"
        except Exception as e:
            return False, f"MiniMax LLM error: {e}"


class MiniMaxVision(VisionProvider):
    """
    Vision provider that falls back to configured provider.

    MiniMax does not support image input. This class delegates to
    the configured fallback provider (typically OpenAI or Google).
    """

    def __init__(self, config: ProviderConfig):
        super().__init__(config)
        self._fallback: Optional[VisionProvider] = None
        self._fallback_config = config

    def _get_fallback(self) -> VisionProvider:
        """Lazy-load fallback vision provider."""
        if self._fallback is None:
            from app.ai.providers.openai_provider import OpenAIVision
            self._fallback = OpenAIVision(self._fallback_config)
            logger.info("MiniMax vision: falling back to OpenAI")
        return self._fallback

    async def analyze_image(
        self,
        image_data: bytes,
        mime_type: str = "image/jpeg",
        prompt: Optional[str] = None,
    ) -> str:
        return await self._get_fallback().analyze_image(image_data, mime_type, prompt)

    async def test_connection(self) -> tuple[bool, str]:
        try:
            result = await self._get_fallback().test_connection()
            return True, f"MiniMax vision (fallback): {result[1]}"
        except Exception as e:
            return False, f"MiniMax vision fallback error: {e}"