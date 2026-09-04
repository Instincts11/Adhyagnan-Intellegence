# -*- coding: utf-8 -*-
import math
import os
import re
import requests
import asyncio
from typing import List, Dict, cast, Optional, Any
from urllib.parse import quote
from dotenv import load_dotenv
from pydantic import BaseModel
import xml.etree.ElementTree as ET

# Agent framework imports
from agents import (
    Agent,
    OpenAIChatCompletionsModel,
    Runner,
    function_tool,
    set_tracing_disabled,
)

# Astroquery imports
from astroquery.ipac.nexsci.nasa_exoplanet_archive import NasaExoplanetArchive

try:
    from astronomist_agents.llm_config import (
        GROQ_API_KEY,
        GROQ_BASE_URL,
        GROQ_WEB_MODEL,
        PERPLEXITY_API_KEY,
        get_chat_client_and_model,
        is_usable_key,
        web_research_backend,
    )
except ImportError:
    from llm_config import (
        GROQ_API_KEY,
        GROQ_BASE_URL,
        GROQ_WEB_MODEL,
        PERPLEXITY_API_KEY,
        get_chat_client_and_model,
        is_usable_key,
        web_research_backend,
    )

# Groq / Gemini traces must not be sent to OpenAI
set_tracing_disabled(True)

# ----------------------------
# Chargement des variables d'environnement
# ----------------------------
load_dotenv()

# ----------------------------
# Tool Open Science Research
# ----------------------------
class ScientificArticle(BaseModel):
    title: Optional[str]
    abstract: Optional[str]
    link: Optional[str]
    source: Optional[str]

@function_tool
def open_science_database_research(query: str, n: int = 10) -> List[ScientificArticle]:
    """Recherche sur arXiv uniquement. Retourne les résultats sous forme de liste d’objets."""
    articles = []

    # arXiv
    def get_arxiv_abstracts(query, n):
        url = "http://export.arxiv.org/api/query"
        params = {
            "search_query": f"all:{query}",
            "start": 0,
            "max_results": n
        }
        resp = requests.get(url, params=params)
        root = ET.fromstring(resp.text)
        results = []
        for entry in root.findall('{http://www.w3.org/2005/Atom}entry'):
            title = entry.find('{http://www.w3.org/2005/Atom}title').text.strip()
            abstract = entry.find('{http://www.w3.org/2005/Atom}summary').text.strip()
            link = entry.find('{http://www.w3.org/2005/Atom}id').text
            results.append({'title': title, 'abstract': abstract, 'link': link})
        return results

    # Récupération et construction objets
    for r in get_arxiv_abstracts(query, n):
        articles.append(ScientificArticle(
            title=r['title'],
            abstract=r['abstract'],
            link=r['link'],
            source="arXiv"
        ))

    return articles

ASTROPHYSICS_RESEARCH_SYSTEM_PROMPT = """You are an expert astrophysicist and scientific literature analyst 
                specializing in exoplanets and stellar physics.
                
                Focus exclusively on:
                - Discoveries and characterization of exoplanets
                - Atmospheric studies, spectroscopy, and potential habitability indicators
                - Stellar properties, variability, and evolutionary stages
                - Results from major observatories and space telescopes 
                  (JWST, Hubble, TESS, Kepler, Gaia, ground-based instruments)
                - Methodological approaches (transit photometry, radial velocity, direct imaging, asteroseismology)
                - Peer-reviewed astrophysics journals (A&A, ApJ, MNRAS, AJ, PASP) and arXiv preprints
                - Recent breakthroughs and observational campaigns
                - Data reproducibility, uncertainties, and instrumental limitations
                - Implications for astrobiology and planetary system formation
                
                Always prioritize:
                - Peer-reviewed astrophysics sources over preprints when possible
                - Publications from the last 2–3 years unless historical context is essential
                - Specific citations with DOIs, ADS bibcodes, or arXiv IDs
                - Critical evaluation of methodologies, instrumentation, and results
                - Future missions, telescope developments, and research directions
                
                Present the information in a structured academic format, 
                focusing strictly on exoplanets and stars."""


def _format_research_result(query: str, data: dict) -> str:
    if "choices" in data and len(data["choices"]) > 0:
        content = data["choices"][0]["message"]["content"]
        result = f"🔭 Astrophysics Literature Research: '{query}'\n\n"
        result += content
        if "usage" in data:
            tokens_used = data["usage"].get("total_tokens", 0)
            result += f"\n\n📊 Research Analysis: {tokens_used} tokens used\n"
        return result
    return f"No research results found for astrophysics query: {query}"


def _groq_web_research(query: str, model: str) -> str:
    url = f"{GROQ_BASE_URL}/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": ASTROPHYSICS_RESEARCH_SYSTEM_PROMPT},
            {"role": "user", "content": query},
        ],
        "max_tokens": 2000,
    }
    # Compound systems pick their own sampling; chat models accept temperature.
    if "compound" not in model:
        payload["temperature"] = 0.2
    response = requests.post(url, json=payload, headers=headers, timeout=45)
    response.raise_for_status()
    return _format_research_result(query, response.json())


def _perplexity_web_research(query: str, model: str) -> str:
    url = "https://api.perplexity.ai/chat/completions"
    headers = {
        "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": ASTROPHYSICS_RESEARCH_SYSTEM_PROMPT},
            {"role": "user", "content": query},
        ],
        "max_tokens": 2000,
        "temperature": 0.2,
        "top_p": 0.9,
    }
    response = requests.post(url, json=payload, headers=headers, timeout=30)
    response.raise_for_status()
    return _format_research_result(query, response.json())


@function_tool
async def sonar_intelligence_research(query: str, model: str = None) -> str:
    """
    Conduct comprehensive scientific literature research on an exoplanet or a star.
    Uses Groq Compound (free, built-in web search) by default. Perplexity is optional.

    Args:
        query: Research-focused query related to an exoplanet or a star
               (e.g., "atmospheric characterization of WASP-39b",
               "stellar variability of Proxima Centauri",
               "JWST results on TRAPPIST-1").
        model: Optional model override (Groq: groq/compound, Perplexity: sonar)

    Returns:
        Structured scientific literature review with citations,
        focusing on recent astrophysics research.
    """
    backend = web_research_backend()

    try:
        if backend == "groq":
            return _groq_web_research(query, model or GROQ_WEB_MODEL)
        if backend == "perplexity":
            return _perplexity_web_research(query, model or "sonar")
        return (
            "Error: no free web-research backend is configured. "
            "Set GROQ_API_KEY in .env (recommended) or optional PERPLEXITY_API_KEY."
        )
    except requests.exceptions.RequestException as e:
        # Groq Compound can be rate-limited; fall back to a standard Groq chat model.
        if backend == "groq" and is_usable_key(GROQ_API_KEY) and (model or GROQ_WEB_MODEL) != "llama-3.3-70b-versatile":
            try:
                return _groq_web_research(query, "llama-3.3-70b-versatile")
            except Exception:
                pass
        return f"Astrophysics Research API Error: {str(e)}"
    except Exception as e:
        return f"Unexpected error in astrophysics literature research: {str(e)}"

# ----------------------------
# Tools – Exoplanet Astroquery
# ----------------------------

PSCOMP_COLUMNS = (
    "pl_name,pl_letter,hostname,discoverymethod,disc_year,"
    "pl_orbper,pl_orbpererr1,pl_orbpererr2,"
    "pl_orbsmax,pl_orbsmaxerr1,pl_orbsmaxerr2,"
    "pl_rade,pl_radeerr1,pl_radeerr2,"
    "pl_masse,pl_masseerr1,pl_masseerr2,"
    "pl_eqt,pl_eqterr1,pl_eqterr2,"
    "pl_insol,pl_insolerr1,pl_insolerr2,"
    "st_teff,st_tefferr1,st_tefferr2,"
    "st_rad,st_raderr1,st_raderr2,"
    "st_mass,st_masserr1,st_masserr2,"
    "sy_dist,sy_disterr1,sy_disterr2,ra,dec"
)

PSCOMP_COLUMNS_SHORT = (
    "pl_name,hostname,disc_year,discoverymethod,pl_orbper,pl_orbsmax,"
    "pl_rade,pl_masse,pl_eqt,st_teff,st_mass,st_rad,sy_dist,ra,dec"
)


def _sql_escape(value: str) -> str:
    return value.replace("'", "''")


def _jsonable(value: Any) -> Any:
    if value is None:
        return None
    mask = getattr(value, "mask", None)
    if mask is not None:
        try:
            if bool(mask):
                return None
        except Exception:
            pass
    filled = getattr(value, "filled", None)
    if callable(filled):
        try:
            value = filled(None)
        except Exception:
            pass
    if hasattr(value, "value") and not isinstance(value, (str, bytes, int, float, bool)):
        try:
            value = value.value
        except Exception:
            pass
    if hasattr(value, "item"):
        try:
            value = value.item()
        except Exception:
            pass
    if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
        return None
    if isinstance(value, bytes):
        return value.decode("utf-8", errors="replace")
    module = type(value).__module__
    if module.startswith("numpy") or module.startswith("astropy"):
        try:
            return value.tolist()
        except Exception:
            return str(value)
    return value


GENITIVE_TO_IAU = [
    (re.compile(r"\bcentauri\b", re.I), "Cen"),
    (re.compile(r"\bcancri\b", re.I), "Cnc"),
    (re.compile(r"\beridani\b", re.I), "Eri"),
    (re.compile(r"\btauri\b", re.I), "Tau"),
    (re.compile(r"\bpegasi\b", re.I), "Peg"),
    (re.compile(r"\bceti\b", re.I), "Cet"),
    (re.compile(r"\bleonis\b", re.I), "Leo"),
    (re.compile(r"\bvirginis\b", re.I), "Vir"),
]

EXTRA_ALIASES = {
    "55cancrie": ["55 Cnc e", "HD 75732 e"],
    "55cnce": ["55 Cnc e", "55 Cancri e", "HD 75732 e"],
    "proximacentaurib": ["Proxima Cen b", "Proxima Centauri b"],
    "proximacenb": ["Proxima Cen b"],
    "kelt9b": ["KELT-9 b"],
    "hatp67b": ["HAT-P-67 b"],
}


def planet_name_candidates(raw: str) -> List[str]:
    name = " ".join(raw.replace("+", " ").split())
    if not name:
        return []
    out: List[str] = []
    seen = set()

    def add(candidate: str) -> None:
        key = candidate.lower()
        if candidate and key not in seen:
            seen.add(key)
            out.append(candidate)

    add(name)
    add(re.sub(r"([0-9])([A-Za-z])$", r"\1 \2", name))
    add(re.sub(r"([0-9])\s+([A-Za-z])$", r"\1\2", name))
    spaced_lower = re.sub(
        r"([0-9]\s*)([A-Z])$",
        lambda m: f"{m.group(1).rstrip()} {m.group(2).lower()}",
        name,
    )
    add(spaced_lower)
    add(re.sub(r"([0-9])\s+([a-z])$", r"\1\2", spaced_lower))
    for pattern, abbr in GENITIVE_TO_IAU:
        add(pattern.sub(abbr, name))
        add(pattern.sub(abbr, spaced_lower))
    compact = re.sub(r"[^a-z0-9]", "", name.lower())
    for extra in EXTRA_ALIASES.get(compact, []):
        add(extra)
    return out


def _table_to_dicts(tab) -> List[Dict[str, Any]]:
    try:
        df = tab.to_pandas()
        records = df.where(df.notna(), None).to_dict(orient="records")
        return [{str(k): _jsonable(v) for k, v in rec.items()} for rec in records]
    except Exception:
        results = []
        for row in tab:
            result = {}
            for col in tab.colnames:
                result[col] = _jsonable(row[col])
            results.append(result)
        return results


def lookup_exoplanet_archive(planet_name: str) -> Dict[str, Any]:
    """Query NASA pscomppars via astroquery. Used by the Kepler tool and the HTTP lookup."""
    names = planet_name_candidates(planet_name)
    if not names:
        return {"success": False, "message": "Planet name is required", "results": []}

    last_error = None
    for columns in (PSCOMP_COLUMNS, PSCOMP_COLUMNS_SHORT):
        try:
            for name in names:
                tab = NasaExoplanetArchive.query_criteria(
                    table="pscomppars",
                    select=columns,
                    where=f"pl_name='{_sql_escape(name)}'",
                )
                if len(tab) > 0:
                    results = _table_to_dicts(tab)
                    print(f"[info] Astroquery returned {len(results)} records for '{name}'", flush=True)
                    return {
                        "success": True,
                        "message": f"Found {len(results)} record(s) for '{name}'",
                        "results": results,
                        "query_info": {
                            "table": "pscomppars",
                            "planet_searched": name,
                            "columns_returned": list(tab.colnames),
                        },
                    }

            compact = _sql_escape(names[0].replace(" ", ""))
            tab = NasaExoplanetArchive.query_criteria(
                table="pscomppars",
                select=columns,
                where=f"replace(pl_name,' ','')='{compact}'",
            )
            if len(tab) > 0:
                results = _table_to_dicts(tab)
                print(f"[info] Astroquery compact match returned {len(results)} records for '{planet_name}'", flush=True)
                return {
                    "success": True,
                    "message": f"Found {len(results)} record(s) for '{planet_name}'",
                    "results": results,
                    "query_info": {
                        "table": "pscomppars",
                        "planet_searched": planet_name,
                        "columns_returned": list(tab.colnames),
                    },
                }
        except Exception as e:
            last_error = e
            print(f"[warn] Astroquery select failed ({columns[:24]}…): {e}", flush=True)
            continue

    message = f"No exoplanet found with name '{planet_name}'"
    if last_error:
        message = f"Error querying exoplanet '{planet_name}': {last_error}"
    return {"success": False, "message": message, "results": []}


@function_tool
def astroquery_exoplanet_lookup(planet_name: str) -> Dict:
    """
    Query exoplanet data using astroquery NasaExoplanetArchive.
    Returns detailed exoplanet parameters from the NASA Exoplanet Archive.
    
    Args:
        planet_name: Name of the exoplanet to search for (e.g., 'K2-18 b', 'Kepler-22b')
    """
    return lookup_exoplanet_archive(planet_name)

# ----------------------------
# Agent Johannes Kepler
# ----------------------------

def create_agent() -> Agent:
    """Creates the exoplanet intelligence agent"""
    openai_client, model_name = get_chat_client_and_model()
    return Agent(
        name="Johannes Kepler",
        instructions="""
        You are an astrophysics research analyst specialized in **exoplanets**.
        Your mission is to produce concise, actionable syntheses for scientists and students,
        combining authoritative catalog data (NASA Exoplanet Archive) and recent literature (arXiv/astro-ph).

        **Your role:**
        - Fetch authoritative parameters for a given exoplanet or host star.
        - Summarize discovery context, key references, and recent observational highlights (e.g., JWST).
        - Compare multiple planets within the same system when asked.
        - Provide clear units, uncertainties where available, and direct archive links.

        **Workflow:**
        - If the user gives an exoplanet name, query the NASA Exoplanet Archive using `astroquery_exoplanet_lookup` to get detailed parameters and observational data.
        - For scientific literature on that exoplanet (methods, observations, atmospheres, JWST…), call `open_science_database_research` with the object name or theme.
        - For broader **web search & synthesis** about the exoplanet (news, datasets, blogs, institutional pages), call `sonar_intelligence_research` (Groq Compound / optional Perplexity).

        **Response format:**
        - *Begin with a one-line italic summary of the approach taken.*
        - **Use bold section headers.**
        - Present a compact parameter table/bullets (period, mass/radius, a, e, Teq, star Teff/M/R, distance).
        - Link back to the NASA archive page for the object.
        - Cite 3–6 recent papers with one-line takeaways.

        **Important:** Always respond in English, regardless of the input language.

        Keep things precise and avoid speculative claims.
        """,
        model=OpenAIChatCompletionsModel(
            model=model_name,
            openai_client=openai_client,
        ),
        tools=[astroquery_exoplanet_lookup, open_science_database_research, sonar_intelligence_research],
    )

async def call_kepler_api(planet_name: str, custom_query: str = None):
    """Calls the Kepler API to analyze an exoplanet"""
    import httpx
    
    print(f"🔭 Analyzing {planet_name} via Kepler API")
    print("=" * 50)
    
    # Prepare the query
    query = custom_query or f"Give me a synthetic sheet for exoplanet {planet_name} (key parameters, host star, discoveries & references)."
    
    print(f"Question: {query}")
    print("\n🤖 Calling Kepler API...", end="", flush=True)
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:8000/kepler/analyze",
                json={
                    "planet_name": planet_name,
                    "query": query
                },
                timeout=60.0
            )
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get("success"):
                    print(" ✅")
                    print("\n" + "=" * 50)
                    print("🧠 KEPLER ANALYSIS RESULT")
                    print("=" * 50)
                    
                    if data.get("tools_used"):
                        print(f"🔧 Tools used: {', '.join(data['tools_used'])}")
                        print()
                    
                    print(data.get("result", "No result"))
                    print("\n" + "=" * 50)
                    print("✅ Analysis completed!")
                else:
                    print(" ❌")
                    print(f"\n❌ API Error: {data.get('error', 'Unknown error')}")
            else:
                print(" ❌")
                print(f"\n❌ HTTP Error {response.status_code}: {response.text}")
                
    except httpx.ConnectError:
        print(" ❌")
        print("\n❌ Error: Unable to connect to Kepler API")
        print("💡 Make sure the API is running on http://localhost:8000")
    except Exception as e:
        print(" ❌")
        print(f"\n❌ Error: {str(e)}")

if __name__ == "__main__":
    import sys
    
    # Get exoplanet name from command line arguments
    if len(sys.argv) > 1:
        planet_name = sys.argv[1]
        custom_query = sys.argv[2] if len(sys.argv) > 2 else None
    else:
        planet_name = "Kepler-22b"  # Default
        custom_query = None
    
    asyncio.run(call_kepler_api(planet_name, custom_query))