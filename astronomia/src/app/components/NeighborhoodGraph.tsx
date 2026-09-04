"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LOCAL_SKY, findWorld, rowToSkyWorld, upsertWorld } from "../lib/neighborhood/catalog";
import {
  PC_TO_LY,
  SOL_ID,
  dist3,
  polarPoint,
  toNodes,
  waveRing,
  worldId,
} from "../lib/neighborhood/graph";
import type { GraphNode, RadialMode, SkyWorld } from "../lib/neighborhood/types";

const SIZE = 640;
const CX = 320;
const CY = 320;
const PLOT_R = 248;
const SAMPLES = 80;

type Probe = { px: number; py: number };

function ly(pc: number) {
  return pc * PC_TO_LY;
}

function fmtPc(pc: number) {
  if (pc < 10) return `${pc.toFixed(2)} pc`;
  return `${pc.toFixed(1)} pc`;
}

function nearestToWorld(nodes: GraphNode[], origin: GraphNode, n = 5) {
  return nodes
    .filter((node) => !node.isSol && node.id !== origin.id)
    .map((node) => ({ node, d: dist3(origin, node) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n);
}

function nearestToProbe(
  nodes: GraphNode[],
  plots: Map<string, { px: number; py: number }>,
  probe: Probe,
  n = 5
) {
  return nodes
    .filter((node) => !node.isSol)
    .map((node) => {
      const p = plots.get(node.id);
      if (!p) return null;
      return { node, d: Math.hypot(p.px - probe.px, p.py - probe.py) };
    })
    .filter((row): row is { node: GraphNode; d: number } => row !== null)
    .sort((a, b) => a.d - b.d)
    .slice(0, n);
}

export default function NeighborhoodGraph({ initialFocus }: { initialFocus?: string | null }) {
  const boot = findWorld(LOCAL_SKY, initialFocus);
  const [live, setLive] = useState(false);
  const [planets, setPlanets] = useState<SkyWorld[]>(LOCAL_SKY);
  const [horizon, setHorizon] = useState(() =>
    boot && boot.sy_dist > 18 ? Math.max(20, Math.ceil(boot.sy_dist + 3)) : 20
  );
  const [radial, setRadial] = useState<RadialMode>("sqrt");
  const [harmonics, setHarmonics] = useState(3);
  const [amp, setAmp] = useState(0.08);
  const [phase, setPhase] = useState(0.4);
  const [orbitPhase, setOrbitPhase] = useState(0.12);
  const [signalYr, setSignalYr] = useState(12);
  const [rings, setRings] = useState(4);
  const [selectedId, setSelectedId] = useState(() => (boot ? worldId(boot) : SOL_ID));
  const [probeMoved, setProbeMoved] = useState(false);
  const [probe, setProbe] = useState<Probe>({ px: CX, py: CY });
  const [dragging, setDragging] = useState<"probe" | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setLive(true);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      let next = LOCAL_SKY;
      try {
        const response = await fetch("/api/neighborhood", { cache: "no-store" });
        const payload = (await response.json()) as { planets?: SkyWorld[] };
        if (payload.planets?.length) next = payload.planets;
      } catch {
        /* keep local catalog */
      }

      if (initialFocus) {
        try {
          const response = await fetch(`/api/exoplanet?name=${encodeURIComponent(initialFocus)}`, {
            cache: "no-store",
          });
          const payload = (await response.json()) as { data?: Record<string, unknown>[] };
          const world = payload.data?.[0] ? rowToSkyWorld(payload.data[0]) : null;
          if (world) {
            next = upsertWorld(next, world);
            if (world.sy_dist > 18) {
              setHorizon((h) => Math.max(h, Math.ceil(world.sy_dist + 3)));
            }
          }
        } catch {
          /* keep neighborhood catalog */
        }
      }

      if (alive) setPlanets(next);
    })();
    return () => {
      alive = false;
    };
  }, [initialFocus]);

  const focus = useMemo(() => findWorld(planets, initialFocus), [planets, initialFocus]);
  const horizonCap = Math.max(40, horizon, Math.ceil((focus?.sy_dist ?? 0) + 5));

  useEffect(() => {
    if (!focus) return;
    setSelectedId(worldId(focus));
    if (focus.sy_dist > horizon) setHorizon(Math.max(horizon, Math.ceil(focus.sy_dist + 3)));
  }, [focus?.pl_name]);

  const nodes = useMemo(
    () => toNodes(planets.filter((p) => p.sy_dist <= horizon)),
    [planets, horizon]
  );

  const plots = useMemo(() => {
    const map = new Map<string, { px: number; py: number }>();
    for (const n of nodes) {
      map.set(n.id, polarPoint(n.sy_dist, n.l, horizon, radial, CX, CY, PLOT_R));
    }
    return map;
  }, [nodes, horizon, radial]);

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const selected = byId.get(selectedId) ?? (focus ? byId.get(worldId(focus)) : undefined) ?? byId.get(SOL_ID)!;
  const selectedPlot = selected ? plots.get(selected.id) : undefined;
  const probePos: Probe =
    probeMoved || !selectedPlot ? probe : { px: selectedPlot.px, py: selectedPlot.py };
  const ranked = useMemo(() => {
    if (!probeMoved && selected && !selected.isSol) {
      return nearestToWorld(nodes, selected, 5);
    }
    return nearestToProbe(nodes, plots, probePos, 5);
  }, [nodes, plots, probePos, probeMoved, selected]);
  const closest = ranked[0]?.node;
  const closestSol = useMemo(
    () => nodes.filter((n) => !n.isSol).sort((a, b) => a.sy_dist - b.sy_dist)[0],
    [nodes]
  );

  const signalPc = signalYr / PC_TO_LY;
  const heard = nodes.filter((n) => !n.isSol && n.sy_dist <= signalPc).sort((a, b) => b.sy_dist - a.sy_dist)[0];
  const waiting = nodes.filter((n) => !n.isSol && n.sy_dist > signalPc).sort((a, b) => a.sy_dist - b.sy_dist)[0];

  const wavePaths = useMemo(() => {
    const out: string[] = [];
    for (let i = 1; i <= rings; i++) {
      const r0 = (i / (rings + 0.4)) * PLOT_R;
      out.push(waveRing(r0, amp, harmonics, phase + i * 0.35, CX, CY));
    }
    return out;
  }, [rings, amp, harmonics, phase]);

  const orbit = useMemo(() => {
    const xs: number[] = [];
    const sine: number[] = [];
    const cosine: number[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const t = i / SAMPLES;
      xs.push(t);
      sine.push(Math.sin(2 * Math.PI * t + phase));
      cosine.push(Math.cos(2 * Math.PI * t + phase));
    }
    return { xs, sine, cosine };
  }, [phase]);

  function clientToSvg(ev: React.PointerEvent) {
    const svg = svgRef.current;
    if (!svg) return { px: CX, py: CY };
    const pt = svg.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { px: CX, py: CY };
    const p = pt.matrixTransform(ctm.inverse());
    return { px: p.x, py: p.y };
  }

  function onMove(ev: React.PointerEvent) {
    if (dragging !== "probe") return;
    const p = clientToSvg(ev);
    const dx = p.px - CX;
    const dy = p.py - CY;
    const cap = Math.hypot(dx, dy);
    const scale = cap > PLOT_R ? PLOT_R / cap : 1;
    setProbeMoved(true);
    setProbe({ px: CX + dx * scale, py: CY + dy * scale });
  }

  const lookback = selected?.isSol ? 0 : ly(selected?.sy_dist ?? 0);
  const flux = selected && !selected.isSol ? 1 / (selected.sy_dist * selected.sy_dist) : 1;
  const fluxVsProx = closestSol ? flux * (closestSol.sy_dist * closestSol.sy_dist) : flux;

  const stripW = 520;
  const stripH = 92;
  const sinPath = orbit.sine
    .map((v, i) => `${i === 0 ? "M" : "L"}${((i / SAMPLES) * stripW).toFixed(2)},${(stripH / 2 - v * 34).toFixed(2)}`)
    .join(" ");
  const cosPath = orbit.cosine
    .map((v, i) => `${i === 0 ? "M" : "L"}${((i / SAMPLES) * stripW).toFixed(2)},${(stripH / 2 - v * 34).toFixed(2)}`)
    .join(" ");
  const playX = Number((orbitPhase * stripW).toFixed(2));

  const labeled = new Set<string>([SOL_ID, selected?.id, closest?.id].filter(Boolean) as string[]);

  if (!live) {
    return (
      <div className="wave-desk" data-no-reveal>
        <p className="prose-block" style={{ margin: 0 }}>
          Opening the neighborhood map…
        </p>
      </div>
    );
  }

  return (
    <div className="wave-desk" data-no-reveal>
      <div className="wave-controls">
        <label>
          Horizon
          <input type="range" min={6} max={horizonCap} value={horizon} onChange={(e) => setHorizon(Number(e.target.value))} />
          <span>{horizon} pc</span>
        </label>
        <label>
          Spread
          <select value={radial} onChange={(e) => setRadial(e.target.value as RadialMode)}>
            <option value="linear">linear r</option>
            <option value="sqrt">√r (nearby opens)</option>
            <option value="log">log r</option>
          </select>
        </label>
        <label>
          Harmonics
          <input type="range" min={1} max={8} value={harmonics} onChange={(e) => setHarmonics(Number(e.target.value))} />
          <span>n={harmonics}</span>
        </label>
        <label>
          Wave amp
          <input type="range" min={0} max={0.28} step={0.01} value={amp} onChange={(e) => setAmp(Number(e.target.value))} />
          <span>{amp.toFixed(2)}</span>
        </label>
        <label>
          Phase
          <input type="range" min={0} max={6.28} step={0.02} value={phase} onChange={(e) => setPhase(Number(e.target.value))} />
          <span>φ</span>
        </label>
        <label>
          Rings
          <input type="range" min={2} max={7} value={rings} onChange={(e) => setRings(Number(e.target.value))} />
          <span>{rings}</span>
        </label>
        <label>
          Pulse age
          <input type="range" min={1} max={80} value={signalYr} onChange={(e) => setSignalYr(Number(e.target.value))} />
          <span>{signalYr} yr</span>
        </label>
      </div>

      <div className="wave-layout">
        <svg
          ref={svgRef}
          className="wave-svg"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          onPointerMove={onMove}
          onPointerUp={() => setDragging(null)}
          onPointerLeave={() => setDragging(null)}
          role="img"
          aria-label="Map of nearby exoplanet systems around the Solar System"
        >
          <circle cx={CX} cy={CY} r={PLOT_R + 8} className="wave-disc" />
          {wavePaths.map((d, i) => (
            <path key={i} d={d} className="wave-ring" />
          ))}
          <circle
            cx={CX}
            cy={CY}
            r={Number((radialUnitSafe(signalPc, horizon, radial) * PLOT_R).toFixed(2))}
            className="wave-pulse"
          />
          {nodes.map((n) => {
            const p = plots.get(n.id);
            if (!p) return null;
            const on = n.id === selected?.id;
            const near = n.id === closest?.id;
            return (
              <g key={n.id} onClick={() => setSelectedId(n.id)} style={{ cursor: "pointer" }}>
                <circle
                  cx={p.px}
                  cy={p.py}
                  r={n.isSol ? 7 : on || near ? 5.5 : 3.2}
                  className={`wave-dot${n.isSol ? " is-sol" : ""}${on ? " is-sel" : ""}${near ? " is-near" : ""}`}
                />
                {labeled.has(n.id) && (
                  <text x={p.px + 8} y={p.py - 8} className="wave-label">
                    {n.isSol ? "Sol" : n.pl_name}
                  </text>
                )}
              </g>
            );
          })}
          <g
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragging("probe");
            }}
            style={{ cursor: "grab" }}
          >
            <circle cx={probePos.px} cy={probePos.py} r={11} className="wave-probe" />
            <text x={probePos.px} y={probePos.py + 22} textAnchor="middle" className="wave-label">
              probe
            </text>
          </g>
        </svg>

        <aside className="wave-side">
          <p className="mkt-eyebrow">{probeMoved ? "Closest to the probe" : "This world"}</p>
          <h3>{(probeMoved ? closest : selected && !selected.isSol ? selected : closest)?.pl_name ?? "—"}</h3>
          <p>
            {selected && !selected.isSol && !probeMoved
              ? `${fmtPc(selected.sy_dist)} · ${ly(selected.sy_dist).toFixed(2)} ly from Sol. Neighbors below are the next-nearest hosts. Drag the probe to search from anywhere.`
              : closest
                ? `${fmtPc(closest.sy_dist)} · ${ly(closest.sy_dist).toFixed(2)} ly from Sol. Drag the probe; the ranking follows.`
                : "Drag the gold probe across the map."}
          </p>
          <ol className="wave-rank">
            {ranked.map(({ node }, i) => (
              <li key={node.id}>
                <button type="button" onClick={() => setSelectedId(node.id)}>
                  <span>
                    {i + 1}. {node.pl_name}
                  </span>
                  <em>{fmtPc(node.sy_dist)}</em>
                </button>
              </li>
            ))}
          </ol>
          {selected && !selected.isSol && (
            <Link className="site-cta" href={`/kepler-planet-results?planet=${encodeURIComponent(selected.pl_name)}`}>
              Brief {selected.pl_name}
            </Link>
          )}
        </aside>
      </div>

      <div className="wave-strip-wrap">
        <div className="wave-strip-head">
          <p className="mkt-eyebrow">Line of sight and sky wobble</p>
          <h4>
            {selected?.isSol ? "Sol reference" : selected?.pl_name} · folded orbit
            {selected?.pl_orbper ? ` · P = ${selected.pl_orbper.toFixed(2)} d` : ""}
          </h4>
          <label>
            fold
            <input
              type="range"
              min={0}
              max={1}
              step={0.002}
              value={orbitPhase}
              onChange={(e) => setOrbitPhase(Number(e.target.value))}
            />
          </label>
        </div>
        <svg viewBox={`0 0 ${stripW} ${stripH}`} className="wave-strip" aria-hidden>
          <line x1="0" y1={stripH / 2} x2={stripW} y2={stripH / 2} className="wave-axis" />
          <path d={sinPath} className="wave-sin" />
          <path d={cosPath} className="wave-cos" />
          <line x1={playX} y1="6" x2={playX} y2={stripH - 6} className="wave-play" />
        </svg>
        <p className="wave-strip-note">
          Gold is the star tugged along our line of sight — how 51 Peg b was found. Blue is the same
          orbit seen sideways on the sky, the way Gaia measures it. Slide the fold the way an observer
          stacks a time series.
        </p>
      </div>

      <div className="wave-infer">
        <article>
          <p className="mkt-eyebrow">Lookback</p>
          <h4>We see the past</h4>
          <p>
            {selected?.isSol
              ? "Sol is now. Every other point is delayed."
              : `${selected.pl_name} is ${lookback.toFixed(2)} years of light away. Hawking’s point was brutal and useful: the image on the detector left that world before anyone in this room was looking.`}
          </p>
        </article>
        <article>
          <p className="mkt-eyebrow">Causality · pulse</p>
          <h4>Who has heard Earth</h4>
          <p>
            A radio pulse {signalYr} yr old is now at {signalPc.toFixed(2)} pc.
            {heard ? ` Last world inside the wavefront: ${heard.pl_name}.` : " No catalogued world is inside yet."}
            {waiting ? ` Next to enter: ${waiting.pl_name} at ${fmtPc(waiting.sy_dist)}.` : ""}{" "}
            That is SETI logistics, not poetry — Sagan’s round-trip is twice the lookback.
          </p>
        </article>
        <article>
          <p className="mkt-eyebrow">Follow-up</p>
          <h4>Photons and JWST time</h4>
          <p>
            {selected?.isSol
              ? "Pick a world. Inverse-square says the nearest transiting rocky hosts buy SNR."
              : `Flux vs a 1 pc source scales as 1/d² = ${flux.toExponential(2)}. Versus Proxima that is ×${fluxVsProx.toFixed(3)}. Atmosphere work (Knutson, Kreidberg, JWST ERS) spends orbit-time where the photons actually arrive.`}
          </p>
        </article>
        <article>
          <p className="mkt-eyebrow">Nearest to Sol</p>
          <h4>{closestSol ? closestSol.pl_name : "—"}</h4>
          <p>
            {closestSol
              ? `${fmtPc(closestSol.sy_dist)} · ${ly(closestSol.sy_dist).toFixed(2)} ly. Proxima is the first address on the map. A message sent today returns in ~${(2 * ly(closestSol.sy_dist)).toFixed(1)} years. Hawking later warned that shouting is optional; the light-travel arithmetic is not.`
              : "Widen the horizon."}
          </p>
        </article>
      </div>
    </div>
  );
}

function radialUnitSafe(distPc: number, maxPc: number, mode: RadialMode) {
  const u = Math.max(0, Math.min(1, distPc / Math.max(maxPc, 0.01)));
  if (mode === "sqrt") return Math.sqrt(u);
  if (mode === "log") return Math.log10(1 + 9 * u);
  return u;
}
