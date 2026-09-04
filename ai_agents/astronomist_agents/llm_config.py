# -*- coding: utf-8 -*-
"""
Free-first LLM configuration.

Default development provider is Groq (no credit card).
Optional free alternative: Google Gemini (AI Studio).
Paid fallbacks: OpenAI + Perplexity remain supported if keys are set.
"""
import os
from typing import Optional, Tuple

from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "groq").strip().lower()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")

GROQ_BASE_URL = "https://api.groq.com/openai/v1"
GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"

GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
GROQ_WEB_MODEL = os.getenv("GROQ_WEB_MODEL", "groq/compound")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

PROVIDER_DOCS = {
    "groq": "https://console.groq.com/keys",
    "gemini": "https://aistudio.google.com/apikey",
    "google": "https://aistudio.google.com/apikey",
    "openai": "https://platform.openai.com/api-keys",
}


def is_usable_key(value: Optional[str]) -> bool:
    if not value:
        return False
    cleaned = value.strip()
    if not cleaned:
        return False
    lowered = cleaned.lower()
    return not (
        lowered.startswith("your_")
        or "api_key_here" in lowered
        or lowered in {"changeme", "placeholder", "xxx"}
    )


def current_provider() -> str:
    if LLM_PROVIDER in {"gemini", "google"}:
        return "gemini"
    if LLM_PROVIDER in {"openai", "groq"}:
        return LLM_PROVIDER
    return "groq"


def provider_api_key(provider: Optional[str] = None) -> Optional[str]:
    name = provider or current_provider()
    if name == "groq":
        return GROQ_API_KEY
    if name == "gemini":
        return GOOGLE_API_KEY
    if name == "openai":
        return OPENAI_API_KEY
    return None


def missing_key_message(provider: Optional[str] = None) -> str:
    name = provider or current_provider()
    docs = PROVIDER_DOCS.get(name, PROVIDER_DOCS["groq"])
    env_name = {
        "groq": "GROQ_API_KEY",
        "gemini": "GOOGLE_API_KEY or GEMINI_API_KEY",
        "openai": "OPENAI_API_KEY",
    }.get(name, "GROQ_API_KEY")
    return (
        f"{env_name} is not set for provider '{name}'. "
        f"Get a free key at {docs} and add it to your .env file."
    )


def require_llm_key() -> None:
    name = current_provider()
    if not is_usable_key(provider_api_key(name)):
        raise ValueError(missing_key_message(name))


def get_chat_client_and_model() -> Tuple[AsyncOpenAI, str]:
    """OpenAI-compatible client used by the Kepler agent."""
    require_llm_key()
    name = current_provider()

    if name == "groq":
        return (
            AsyncOpenAI(api_key=GROQ_API_KEY, base_url=GROQ_BASE_URL),
            os.getenv("KEPLER_MODEL_ID") or GROQ_MODEL,
        )
    if name == "gemini":
        return (
            AsyncOpenAI(api_key=GOOGLE_API_KEY, base_url=GEMINI_BASE_URL),
            os.getenv("KEPLER_MODEL_ID") or GEMINI_MODEL,
        )
    return (
        AsyncOpenAI(api_key=OPENAI_API_KEY),
        os.getenv("KEPLER_MODEL_ID") or OPENAI_MODEL,
    )


def get_celeste_provider_and_model():
    """Celeste provider enum + model id used by the Grace Hopper agent."""
    require_llm_key()
    from celeste import Provider

    name = current_provider()
    grace_override = os.getenv("GRACE_HOPPER_MODEL_ID")

    if name == "groq":
        return Provider.GROQ, grace_override or GROQ_MODEL
    if name == "gemini":
        return Provider.GOOGLE, grace_override or GEMINI_MODEL
    return Provider.OPENAI, grace_override or OPENAI_MODEL


def web_research_backend() -> str:
    """Prefer Groq Compound (free web search), then Perplexity if configured."""
    if current_provider() == "groq" and is_usable_key(GROQ_API_KEY):
        return "groq"
    if is_usable_key(PERPLEXITY_API_KEY):
        return "perplexity"
    if is_usable_key(GROQ_API_KEY):
        return "groq"
    if is_usable_key(GOOGLE_API_KEY):
        return "gemini"
    return "none"
