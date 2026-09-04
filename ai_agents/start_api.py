#!/usr/bin/env python3
"""
Script to start the Johannes Kepler AI Agent API server
"""

import uvicorn
from dotenv import load_dotenv

from astronomist_agents.llm_config import (
    current_provider,
    missing_key_message,
    provider_api_key,
    is_usable_key,
)

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    provider = current_provider()
    if not is_usable_key(provider_api_key(provider)):
        print(f"❌ Error: {missing_key_message(provider)}")
        print("Free options:")
        print("  - Groq (default): https://console.groq.com/keys")
        print("  - Google Gemini:  https://aistudio.google.com/apikey")
        print("Then set LLM_PROVIDER=groq (or gemini) and the matching key in .env")
        exit(1)

    print("🚀 Starting Johannes Kepler AI Agent API...")
    print(f"🧠 LLM provider: {provider}")
    print("📡 API will be available at: http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🔍 Health Check: http://localhost:8000/kepler/health")
    print("=" * 50)

    # Start the server
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
