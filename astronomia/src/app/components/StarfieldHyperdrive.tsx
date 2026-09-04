"use client";
import { useEffect, useRef, useState } from "react";

type Orb = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
};

const ORB_COLORS = [
  "rgba(99, 102, 241, 0.12)",
  "rgba(59, 130, 246, 0.12)",
  "rgba(168, 85, 247, 0.10)",
];

/** EasyView-style ambient space: black canvas, nebula orbs, grain, cursor glow. */
export default function StarfieldHyperdrive(_props?: {
  density?: number;
  speed?: number;
  warpBoost?: number;
  color?: string;
}) {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOrbs(
      Array.from({ length: 8 }, (_, id) => ({
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 80 + 40,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 8,
        color: ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)],
      }))
    );
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      glow.style.display = "none";
      return;
    }

    let x = -120;
    let y = -120;
    let tx = -120;
    let ty = -120;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      tx = event.clientX - 16;
      ty = event.clientY - 16;
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ev-space" aria-hidden>
      <div className="ev-space-orbs">
        {orbs.map((orb) => (
          <div
            key={orb.id}
            className="ev-space-orb"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="ev-space-spot" />
      <div className="ev-space-bloom" />
      <div className="ev-space-glass ev-space-glass-a" />
      <div className="ev-space-glass ev-space-glass-b" />
      <div className="ev-space-glass ev-space-glass-c" />
      <div className="ev-space-grain" />
      <div ref={glowRef} className="ev-space-cursor" />
    </div>
  );
}
