import { NextRequest, NextResponse } from 'next/server';
import { lookupFallbackPlanet } from './fallbackPlanets';
import { LOCAL_SKY, findWorld } from '../../lib/neighborhood/catalog';
import { planetNameCandidates } from '../../lib/planetNames';
import type { SkyWorld } from '../../lib/neighborhood/types';

const NASA_TAP = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync';
const COMP_COLUMNS = [
  'pl_name',
  'pl_letter',
  'hostname',
  'discoverymethod',
  'disc_year',
  'pl_orbper',
  'pl_orbpererr1',
  'pl_orbpererr2',
  'pl_orbsmax',
  'pl_orbsmaxerr1',
  'pl_orbsmaxerr2',
  'pl_rade',
  'pl_radeerr1',
  'pl_radeerr2',
  'pl_masse',
  'pl_masseerr1',
  'pl_masseerr2',
  'pl_eqt',
  'pl_eqterr1',
  'pl_eqterr2',
  'pl_insol',
  'pl_insolerr1',
  'pl_insolerr2',
  'st_teff',
  'st_tefferr1',
  'st_tefferr2',
  'st_rad',
  'st_raderr1',
  'st_raderr2',
  'st_mass',
  'st_masserr1',
  'st_masserr2',
  'sy_dist',
  'sy_disterr1',
  'sy_disterr2',
  'ra',
  'dec',
].join(',');

const PYTHON_API = process.env.KEPLER_API_URL || 'http://127.0.0.1:8000';

type PlanetPayload = {
  data: Record<string, unknown>[];
  source?: string;
  error?: string;
};

type CacheEntry = { expires: number; payload: PlanetPayload };
const resultCache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<PlanetPayload>>();
const CACHE_TTL_MS = 10 * 60 * 1000;

function sqlEscape(value: string): string {
  return value.replace(/'/g, "''");
}

function buildPrimaryQuery(planetName: string): string {
  const names = planetNameCandidates(planetName);
  const exact = names.map((n) => `pl_name='${sqlEscape(n)}'`).join(' or ');
  const compact = [...new Set(names.map((n) => n.replace(/\s+/g, '')))];
  const compactClause = compact
    .map((c) => `replace(pl_name,' ','')='${sqlEscape(c)}'`)
    .join(' or ');
  return `select top 5 ${COMP_COLUMNS} from pscomppars where (${exact}) or (${compactClause})`;
}

async function nasaFetch(url: string): Promise<Response> {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'text/csv,text/plain,*/*',
      'User-Agent': 'Adhyagnan/1.0',
    },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
}

function parseCsv(csvData: string): Record<string, unknown>[] {
  const lines = csvData
    .replace(/^\uFEFF/, '')
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (lines.length < 2) return [];
  if (/^ERROR/i.test(lines[0]) || lines[0].includes('<html')) {
    throw new Error(lines.slice(0, 3).join(' '));
  }

  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
  const rows: Record<string, unknown>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row: Record<string, unknown> = {};
    for (let j = 0; j < headers.length; j++) {
      const value = (values[j] ?? '').trim().replace(/^"|"$/g, '');
      if (value === '' || value === 'null' || value === 'nan') {
        row[headers[j]] = '';
      } else if (!Number.isNaN(Number(value))) {
        row[headers[j]] = Number(value);
      } else {
        row[headers[j]] = value;
      }
    }
    rows.push(row);
  }

  return rows;
}

async function queryNasa(query: string): Promise<Record<string, unknown>[]> {
  const url = `${NASA_TAP}?query=${encodeURIComponent(query)}&format=csv`;
  console.log('NASA TAP query:', query);
  const response = await nasaFetch(url);
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`NASA TAP HTTP ${response.status}${body ? `: ${body.slice(0, 200)}` : ''}`);
  }
  const csvData = await response.text();
  const rows = parseCsv(csvData);
  console.log('NASA TAP rows received:', rows.length);
  return rows;
}

function emptyPlanetFields(row: Record<string, unknown>): Record<string, unknown> {
  return {
    pl_letter: '',
    pl_orbpererr1: '',
    pl_orbpererr2: '',
    pl_orbsmaxerr1: '',
    pl_orbsmaxerr2: '',
    pl_radeerr1: '',
    pl_radeerr2: '',
    pl_masseerr1: '',
    pl_masseerr2: '',
    pl_eqterr1: '',
    pl_eqterr2: '',
    pl_insol: '',
    pl_insolerr1: '',
    pl_insolerr2: '',
    st_tefferr1: '',
    st_tefferr2: '',
    st_raderr1: '',
    st_raderr2: '',
    st_masserr1: '',
    st_masserr2: '',
    sy_disterr1: '',
    sy_disterr2: '',
    pl_controv_flag: 0,
    pl_pubdate: '',
    rowupdate: '',
    ra: '',
    dec: '',
    ...row,
  };
}

function skyWorldToRow(world: SkyWorld): Record<string, unknown> {
  return emptyPlanetFields({
    pl_name: world.pl_name,
    hostname: world.hostname,
    discoverymethod: world.discoverymethod,
    disc_year: world.disc_year,
    pl_orbper: world.pl_orbper ?? '',
    pl_orbsmax: '',
    pl_rade: world.pl_rade ?? '',
    pl_masse: world.pl_masse ?? '',
    pl_eqt: world.pl_eqt ?? '',
    pl_insol: world.pl_insol ?? '',
    st_teff: world.st_teff ?? '',
    sy_dist: world.sy_dist,
    ra: world.ra,
    dec: world.dec,
  });
}

function localPlanetRow(planetName: string): Record<string, unknown> | null {
  const fallback = lookupFallbackPlanet(planetName);
  if (fallback) return fallback;
  const sky = findWorld(LOCAL_SKY, planetName);
  return sky ? skyWorldToRow(sky) : null;
}

async function queryPythonArchive(planetName: string): Promise<Record<string, unknown>[]> {
  try {
    const url = `${PYTHON_API}/kepler/planet?name=${encodeURIComponent(planetName)}`;
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(25_000),
    });
    if (!response.ok) return [];
    const payload = (await response.json()) as { success?: boolean; data?: Record<string, unknown>[] };
    if (!payload.success || !payload.data?.length) return [];
    console.log('Python astroquery rows received:', payload.data.length);
    return payload.data.map(emptyPlanetFields);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') return [];
    console.warn('Python planet lookup failed:', error);
    return [];
  }
}

async function resolvePlanet(planetName: string): Promise<PlanetPayload> {
  const local = localPlanetRow(planetName);
  const tapRows = await queryNasa(buildPrimaryQuery(planetName)).catch((error) => {
    console.warn('NASA TAP query failed:', error);
    return [] as Record<string, unknown>[];
  });
  if (tapRows.length) return { data: tapRows, source: 'archive' };

  const pythonRows = await queryPythonArchive(planetName);
  if (pythonRows.length) return { data: pythonRows, source: 'astroquery' };

  if (local) {
    console.warn(`Using local parameters for ${planetName}`);
    return { data: [local], source: 'local' };
  }

  return {
    data: [],
    error: `No exoplanet data found for "${planetName}". NASA names usually include a space (e.g. "TRAPPIST-1 e", "55 Cnc e").`,
  };
}

export async function GET(request: NextRequest) {
  const planetName = new URL(request.url).searchParams.get('name')?.trim();
  if (!planetName) {
    return NextResponse.json({ error: 'Planet name is required' }, { status: 400 });
  }

  const cacheKey = planetName.toLowerCase();
  const cached = resultCache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json(cached.payload);
  }

  let pending = inflight.get(cacheKey);
  if (!pending) {
    pending = resolvePlanet(planetName).finally(() => {
      inflight.delete(cacheKey);
    });
    inflight.set(cacheKey, pending);
  }

  const payload = await pending;
  if (payload.data.length && payload.source !== 'local') {
    resultCache.set(cacheKey, { expires: Date.now() + CACHE_TTL_MS, payload });
  }
  return NextResponse.json(payload);
}
