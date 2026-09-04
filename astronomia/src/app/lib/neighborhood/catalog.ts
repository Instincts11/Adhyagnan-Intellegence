import type { SkyWorld } from "./types";
import { compactPlanetName, planetNameCandidates } from "../planetNames";

/** Nearby confirmed hosts — sparse on purpose so the polar wave stays readable. */
export const LOCAL_SKY: SkyWorld[] = [
  { pl_name: "Proxima Cen b", hostname: "Proxima Cen", ra: 217.42895, dec: -62.67948, sy_dist: 1.301, disc_year: 2016, discoverymethod: "Radial Velocity", pl_rade: 1.07, pl_masse: 1.07, pl_orbper: 11.1868, pl_eqt: 234, pl_insol: 0.65, st_teff: 2992 },
  { pl_name: "Barnard's Star b", hostname: "Barnard's Star", ra: 269.45208, dec: 4.69339, sy_dist: 1.827, disc_year: 2018, discoverymethod: "Radial Velocity", pl_masse: 3.23, pl_orbper: 232.15, st_teff: 3224 },
  { pl_name: "GJ 411 b", hostname: "GJ 411", ra: 165.834, dec: 35.97, sy_dist: 2.55, disc_year: 2019, discoverymethod: "Radial Velocity", pl_masse: 2.69, pl_orbper: 12.95, st_teff: 3601 },
  { pl_name: "eps Eri b", hostname: "eps Eri", ra: 53.2327, dec: -9.4583, sy_dist: 3.22, disc_year: 2000, discoverymethod: "Radial Velocity", pl_masse: 248, pl_orbper: 2671, st_teff: 5084 },
  { pl_name: "GJ 887 b", hostname: "GJ 887", ra: 346.46683, dec: -35.85307, sy_dist: 3.29, disc_year: 2020, discoverymethod: "Radial Velocity", pl_masse: 4.2, pl_orbper: 9.26, st_teff: 3688 },
  { pl_name: "Ross 128 b", hostname: "Ross 128", ra: 176.905, dec: 0.805, sy_dist: 3.375, disc_year: 2017, discoverymethod: "Radial Velocity", pl_rade: 1.1, pl_masse: 1.4, pl_orbper: 9.87, pl_eqt: 301, st_teff: 3192 },
  { pl_name: "GJ 15 A b", hostname: "GJ 15 A", ra: 4.595, dec: 44.023, sy_dist: 3.56, disc_year: 2014, discoverymethod: "Radial Velocity", pl_masse: 3.03, pl_orbper: 11.44, st_teff: 3567 },
  { pl_name: "tau Cet e", hostname: "tau Cet", ra: 26.017, dec: -15.937, sy_dist: 3.65, disc_year: 2012, discoverymethod: "Radial Velocity", pl_masse: 3.93, pl_orbper: 162.87, pl_eqt: 244, st_teff: 5344 },
  { pl_name: "YZ Cet b", hostname: "YZ Cet", ra: 18.127, dec: -16.999, sy_dist: 3.71, disc_year: 2017, discoverymethod: "Radial Velocity", pl_masse: 0.7, pl_orbper: 1.97, st_teff: 3056 },
  { pl_name: "GJ 273 b", hostname: "GJ 273", ra: 111.852, dec: 5.226, sy_dist: 3.8, disc_year: 2017, discoverymethod: "Radial Velocity", pl_masse: 2.89, pl_orbper: 18.65, pl_eqt: 276, st_teff: 3382 },
  { pl_name: "Teegarden's Star b", hostname: "Teegarden's Star", ra: 43.259, dec: 16.927, sy_dist: 3.83, disc_year: 2019, discoverymethod: "Radial Velocity", pl_rade: 1.05, pl_masse: 1.05, pl_orbper: 4.91, pl_eqt: 278, pl_insol: 1.15, st_teff: 2904 },
  { pl_name: "Wolf 1061 c", hostname: "Wolf 1061", ra: 247.577, dec: -12.663, sy_dist: 4.31, disc_year: 2015, discoverymethod: "Radial Velocity", pl_masse: 3.41, pl_orbper: 17.87, pl_eqt: 223, st_teff: 3342 },
  { pl_name: "GJ 1061 d", hostname: "GJ 1061", ra: 54.003, dec: -44.514, sy_dist: 4.54, disc_year: 2020, discoverymethod: "Radial Velocity", pl_masse: 1.64, pl_orbper: 13.03, st_teff: 2953 },
  { pl_name: "GJ 687 b", hostname: "GJ 687", ra: 264.125, dec: 68.332, sy_dist: 4.55, disc_year: 2014, discoverymethod: "Radial Velocity", pl_masse: 18, pl_orbper: 38.14, st_teff: 3413 },
  { pl_name: "GJ 832 b", hostname: "GJ 832", ra: 323.391, dec: -49.009, sy_dist: 4.97, disc_year: 2008, discoverymethod: "Radial Velocity", pl_masse: 200, pl_orbper: 3657, st_teff: 3472 },
  { pl_name: "GJ 581 c", hostname: "GJ 581", ra: 229.859, dec: -7.722, sy_dist: 6.3, disc_year: 2007, discoverymethod: "Radial Velocity", pl_rade: 1.7, pl_masse: 5.6, pl_orbper: 12.91, pl_eqt: 320, st_teff: 3498 },
  { pl_name: "GJ 667 C c", hostname: "GJ 667 C", ra: 259.745, dec: -34.997, sy_dist: 7.24, disc_year: 2011, discoverymethod: "Radial Velocity", pl_rade: 1.5, pl_masse: 3.8, pl_orbper: 28.14, pl_eqt: 277, pl_insol: 0.88, st_teff: 3350 },
  { pl_name: "GJ 486 b", hostname: "GJ 486", ra: 191.15, dec: 9.79, sy_dist: 8.07, disc_year: 2021, discoverymethod: "Transit", pl_rade: 1.31, pl_masse: 2.82, pl_orbper: 1.47, pl_eqt: 701, st_teff: 3340 },
  { pl_name: "GJ 357 d", hostname: "GJ 357", ra: 142.763, dec: -21.656, sy_dist: 9.44, disc_year: 2019, discoverymethod: "Radial Velocity", pl_masse: 6.1, pl_orbper: 55.66, pl_eqt: 200, st_teff: 3505 },
  { pl_name: "GJ 436 b", hostname: "GJ 436", ra: 175.549, dec: 26.703, sy_dist: 9.76, disc_year: 2004, discoverymethod: "Radial Velocity", pl_rade: 4.17, pl_masse: 22.1, pl_orbper: 2.64, pl_eqt: 686, st_teff: 3479 },
  { pl_name: "TRAPPIST-1 e", hostname: "TRAPPIST-1", ra: 346.622, dec: -5.041, sy_dist: 12.43, disc_year: 2017, discoverymethod: "Transit", pl_rade: 0.91, pl_masse: 0.69, pl_orbper: 6.1, pl_eqt: 251, pl_insol: 0.66, st_teff: 2566 },
  { pl_name: "55 Cnc e", hostname: "55 Cnc", ra: 133.149, dec: 28.33, sy_dist: 12.59, disc_year: 2004, discoverymethod: "Radial Velocity", pl_rade: 1.88, pl_masse: 7.99, pl_orbper: 0.74, pl_eqt: 1958, st_teff: 5172 },
  { pl_name: "GJ 1214 b", hostname: "GJ 1214", ra: 258.831, dec: 4.96, sy_dist: 14.64, disc_year: 2009, discoverymethod: "Transit", pl_rade: 2.74, pl_masse: 8.17, pl_orbper: 1.58, pl_eqt: 596, st_teff: 3026 },
  { pl_name: "LHS 1140 b", hostname: "LHS 1140", ra: 11.247, dec: -15.272, sy_dist: 14.99, disc_year: 2017, discoverymethod: "Transit", pl_rade: 1.73, pl_masse: 5.6, pl_orbper: 24.74, pl_eqt: 226, pl_insol: 0.5, st_teff: 3096 },
  { pl_name: "51 Peg b", hostname: "51 Peg", ra: 344.367, dec: 20.769, sy_dist: 15.47, disc_year: 1995, discoverymethod: "Radial Velocity", pl_masse: 146, pl_orbper: 4.23, pl_eqt: 1284, st_teff: 5768 },
  { pl_name: "HD 189733 b", hostname: "HD 189733", ra: 300.182, dec: 22.711, sy_dist: 19.76, disc_year: 2005, discoverymethod: "Radial Velocity", pl_rade: 12.7, pl_masse: 365, pl_orbper: 2.22, pl_eqt: 1201, st_teff: 5052 },
  { pl_name: "TOI-700 d", hostname: "TOI-700", ra: 97.097, dec: -65.579, sy_dist: 31.13, disc_year: 2020, discoverymethod: "Transit", pl_rade: 1.19, pl_masse: 1.72, pl_orbper: 37.42, pl_eqt: 269, pl_insol: 0.86, st_teff: 3480 },
  { pl_name: "K2-18 b", hostname: "K2-18", ra: 172.56, dec: 7.589, sy_dist: 38.03, disc_year: 2015, discoverymethod: "Transit", pl_rade: 2.37, pl_masse: 8.63, pl_orbper: 32.94, pl_eqt: 265, pl_insol: 1.05, st_teff: 3457 },
];

export function mergeSkyCatalog(remote: SkyWorld[]): SkyWorld[] {
  const byName = new Map<string, SkyWorld>();
  for (const row of [...LOCAL_SKY, ...remote]) {
    if (!row.pl_name || !Number.isFinite(row.sy_dist) || !Number.isFinite(row.ra)) continue;
    const key = row.pl_name.toLowerCase().replace(/\s+/g, "");
    byName.set(key, row);
  }
  return [...byName.values()].sort((a, b) => a.sy_dist - b.sy_dist);
}

export function normName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, " ").trim();
}

export function findWorld(planets: SkyWorld[], query: string | null | undefined): SkyWorld | undefined {
  if (!query) return undefined;
  const keys = new Set(planetNameCandidates(query).map(compactPlanetName));
  return planets.find((p) => {
    return keys.has(compactPlanetName(p.pl_name)) || keys.has(compactPlanetName(p.hostname));
  });
}

export function upsertWorld(planets: SkyWorld[], world: SkyWorld): SkyWorld[] {
  const key = world.pl_name.toLowerCase().replace(/\s+/g, "");
  return [world, ...planets.filter((p) => p.pl_name.toLowerCase().replace(/\s+/g, "") !== key)];
}

export function rowToSkyWorld(row: Record<string, unknown>): SkyWorld | null {
  const pl_name = String(row.pl_name || "").trim();
  const ra = Number(row.ra);
  const dec = Number(row.dec);
  const sy_dist = Number(row.sy_dist);
  if (!pl_name || !Number.isFinite(ra) || !Number.isFinite(dec) || !Number.isFinite(sy_dist)) return null;
  const num = (value: unknown) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  };
  return {
    pl_name,
    hostname: String(row.hostname || pl_name),
    ra,
    dec,
    sy_dist,
    disc_year: Number(row.disc_year) || 0,
    discoverymethod: String(row.discoverymethod || "Unknown"),
    pl_rade: num(row.pl_rade),
    pl_masse: num(row.pl_masse),
    pl_orbper: num(row.pl_orbper),
    pl_eqt: num(row.pl_eqt),
    pl_insol: num(row.pl_insol),
    st_teff: num(row.st_teff),
  };
}
