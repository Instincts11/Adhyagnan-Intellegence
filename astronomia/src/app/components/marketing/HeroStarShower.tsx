"use client";
import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; pz: number };

/** Light warp-style star shower, painted behind hero copy. */
export default function HeroStarShower({
  density = 560,
  speed = 0.04,
  warpBoost = 0.42,
  color = "#ffffff",
}: {
  density?: number;
  speed?: number;
  warpBoost?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const host = canvas.parentElement;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let raf = 0;
    let running = true;

    const spawn = (near = false): Star => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: near ? Math.random() * 0.4 + 0.6 : Math.random() * 0.9 + 0.1,
      pz: 1,
    });

    const resize = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(density, Math.max(220, Math.floor((w * h) / 2200)));
      stars = Array.from({ length: count }, () => spawn());
    };

    const draw = () => {
      if (!running) return;
      const w = host.clientWidth;
      const h = host.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const depth = Math.max(w, h) * 0.52;
      const step = reduced ? 0 : speed * 18 + warpBoost * 10;

      for (const star of stars) {
        star.pz = star.z;
        star.z -= step / depth;
        if (star.z <= 0.04) {
          Object.assign(star, spawn(true));
          star.z = 1;
          star.pz = 1;
        }

        const k = 1 / star.z;
        const pk = 1 / Math.max(star.pz, 0.05);
        const sx = cx + star.x * k * depth;
        const sy = cy + star.y * k * depth;
        const px = cx + star.x * pk * depth;
        const py = cy + star.y * pk * depth;
        const glow = Math.min(1, 0.35 + (1 - star.z) * 1.05);
        const radius = star.z < 0.28 ? 2.1 : star.z < 0.55 ? 1.35 : 0.9;

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = star.z < 0.35 ? 1.8 : 1.05;
        ctx.globalAlpha = glow * 0.55;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        ctx.globalAlpha = glow * 0.28;
        ctx.beginPath();
        ctx.arc(sx, sy, radius * 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = Math.min(1, glow);
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    if (reduced) {
      draw();
      return () => {
        running = false;
        ro.disconnect();
      };
    }

    raf = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, density, speed, warpBoost]);

  return <canvas ref={canvasRef} className="hero-star-shower" aria-hidden />;
}
