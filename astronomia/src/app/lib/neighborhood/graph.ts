import type { GraphNode, RadialMode, SkyWorld } from "./types";

const DEG = Math.PI / 180;
const A_NGP = 192.85948 * DEG;
const D_NGP = 27.12825 * DEG;
const L_NCP = 122.93192 * DEG;

export const SOL_ID = "sol";
export const PC_TO_LY = 3.26156;

export function equatorialToGalactic(raDeg: number, decDeg: number): { l: number; b: number } {
  const a = raDeg * DEG;
  const d = decDeg * DEG;
  const sinb = Math.sin(d) * Math.sin(D_NGP) + Math.cos(d) * Math.cos(D_NGP) * Math.cos(a - A_NGP);
  const b = Math.asin(Math.max(-1, Math.min(1, sinb)));
  const y = Math.cos(d) * Math.sin(a - A_NGP);
  const x = Math.sin(d) * Math.cos(D_NGP) - Math.cos(d) * Math.sin(D_NGP) * Math.cos(a - A_NGP);
  let l = L_NCP - Math.atan2(y, x);
  l = ((l / DEG) % 360 + 360) % 360;
  return { l, b: b / DEG };
}

export function worldId(w: SkyWorld): string {
  return w.pl_name.toLowerCase().replace(/\s+/g, "-");
}

export function toNodes(planets: SkyWorld[]): GraphNode[] {
  const nodes: GraphNode[] = planets.map((p) => {
    const { l, b } = equatorialToGalactic(p.ra, p.dec);
    const lr = l * DEG;
    const br = b * DEG;
    return {
      ...p,
      id: worldId(p),
      l,
      b,
      x: p.sy_dist * Math.cos(br) * Math.cos(lr),
      y: p.sy_dist * Math.cos(br) * Math.sin(lr),
      z: p.sy_dist * Math.sin(br),
      isSol: false,
    };
  });
  nodes.unshift({
    pl_name: "Sol",
    hostname: "Sun",
    ra: 0,
    dec: 0,
    sy_dist: 0,
    disc_year: 0,
    discoverymethod: "origin",
    id: SOL_ID,
    l: 0,
    b: 0,
    x: 0,
    y: 0,
    z: 0,
    isSol: true,
    pl_orbper: 365.25,
    pl_rade: 1,
  });
  return nodes;
}

export function radialUnit(distPc: number, maxPc: number, mode: RadialMode): number {
  const u = Math.max(0, Math.min(1, distPc / Math.max(maxPc, 0.01)));
  if (mode === "sqrt") return Math.sqrt(u);
  if (mode === "log") return Math.log10(1 + 9 * u);
  return u;
}

export function polarPoint(
  distPc: number,
  lonDeg: number,
  maxPc: number,
  mode: RadialMode,
  cx: number,
  cy: number,
  plotR: number
) {
  const r = Math.round(radialUnit(distPc, maxPc, mode) * plotR * 100) / 100;
  const t = lonDeg * DEG;
  return {
    px: Math.round((cx + r * Math.cos(t)) * 100) / 100,
    py: Math.round((cy - r * Math.sin(t)) * 100) / 100,
    r,
    t,
  };
}

export function waveRing(
  r0: number,
  amp: number,
  harmonics: number,
  phase: number,
  cx: number,
  cy: number,
  samples = 96
): string {
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const th = (i / samples) * Math.PI * 2;
    const r = Math.max(4, r0 * (1 + amp * Math.sin(harmonics * th + phase)));
    const x = cx + r * Math.cos(th);
    const y = cy - r * Math.sin(th);
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `${pts.join(" ")} Z`;
}

export function dist3(a: GraphNode, b: GraphNode): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}
