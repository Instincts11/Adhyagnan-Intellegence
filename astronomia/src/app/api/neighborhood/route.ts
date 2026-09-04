import { NextResponse } from "next/server";
import { LOCAL_SKY, mergeSkyCatalog } from "../../lib/neighborhood/catalog";
import type { SkyWorld } from "../../lib/neighborhood/types";

const NASA_TAP = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";
const QUERY = `select top 80 pl_name,hostname,ra,dec,sy_dist,pl_rade,pl_masse,pl_orbper,pl_eqt,pl_insol,discoverymethod,disc_year,st_teff from pscomppars where sy_dist is not null and ra is not null and sy_dist < 40 order by sy_dist`;

function parseCsv(csvData: string): SkyWorld[] {
  const lines = csvData.replace(/^\uFEFF/, "").trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2 || /^ERROR/i.test(lines[0]) || lines[0].includes("<html")) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const rows: SkyWorld[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    const raw: Record<string, string | number> = {};
    for (let j = 0; j < headers.length; j++) {
      const value = (values[j] ?? "").trim().replace(/^"|"$/g, "");
      if (!value || value === "null") continue;
      raw[headers[j]] = Number.isNaN(Number(value)) ? value : Number(value);
    }
    const pl_name = String(raw.pl_name || "");
    const ra = Number(raw.ra);
    const dec = Number(raw.dec);
    const sy_dist = Number(raw.sy_dist);
    if (!pl_name || !Number.isFinite(ra) || !Number.isFinite(sy_dist)) continue;
    rows.push({
      pl_name,
      hostname: String(raw.hostname || pl_name),
      ra,
      dec,
      sy_dist,
      disc_year: Number(raw.disc_year) || 0,
      discoverymethod: String(raw.discoverymethod || "Unknown"),
      pl_rade: num(raw.pl_rade),
      pl_masse: num(raw.pl_masse),
      pl_orbper: num(raw.pl_orbper),
      pl_eqt: num(raw.pl_eqt),
      pl_insol: num(raw.pl_insol),
      st_teff: num(raw.st_teff),
    });
  }
  return rows;
}

function num(value: string | number | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET() {
  try {
    const url = `${NASA_TAP}?query=${encodeURIComponent(QUERY)}&format=csv`;
    const response = await fetch(url, {
      headers: { Accept: "text/csv", "User-Agent": "Adhyagnan/1.0" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("TAP");
    const remote = parseCsv(await response.text());
    return NextResponse.json({ planets: mergeSkyCatalog(remote), source: remote.length ? "mixed" : "local" });
  } catch {
    return NextResponse.json({ planets: LOCAL_SKY, source: "local" });
  }
}
