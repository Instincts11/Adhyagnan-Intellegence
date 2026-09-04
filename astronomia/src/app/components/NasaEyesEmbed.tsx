"use client";
import React, { useMemo, useState } from "react";
import { eyesPlanetSlug, eyesSystemSlug } from "../lib/planetNames";

export default function NasaEyesEmbed({
  targetName,
  hostname,
  height = 600,
  full = false,
}: {
  targetName: string;
  hostname?: string | null;
  height?: number;
  full?: boolean;
}) {
  const [iframeError, setIframeError] = useState(false);
  const planetUrl = useMemo(() => {
    const slug = eyesPlanetSlug(targetName);
    return `https://eyes.nasa.gov/apps/exo/#/planet/${slug}`;
  }, [targetName]);
  const systemUrl = hostname
    ? `https://eyes.nasa.gov/apps/exo/#/system/${eyesSystemSlug(hostname)}`
    : null;

  return (
    <div
      style={{
        width: full ? "100%" : "min(900px, 60vw)",
        height: full ? "100%" : height,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(190, 214, 255, 0.14)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        background: "#000",
        position: "relative",
      }}
    >
      {!iframeError ? (
        <iframe
          key={planetUrl}
          src={planetUrl}
          title={`NASA Eyes on Exoplanets - ${targetName}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          onError={() => setIframeError(true)}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            background: "#10151f",
            color: "#eef3fa",
          }}
        >
          <h3 style={{ margin: "0 0 16px 0", color: "#8b9bb0" }}>Planet view did not load</h3>
          <p style={{ margin: "0 0 20px 0", textAlign: "center", opacity: 0.8 }}>
            NASA Eyes could not open “{targetName}”. Open it in a new tab, or try the host system.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href={planetUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid rgba(190, 214, 255, 0.14)",
                background: "rgba(190, 214, 255, 0.08)",
                color: "#eef3fa",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Open planet
            </a>
            {systemUrl && (
              <a
                href={systemUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(190, 214, 255, 0.14)",
                  background: "rgba(190, 214, 255, 0.08)",
                  color: "#eef3fa",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Open system
              </a>
            )}
            <button
              type="button"
              onClick={() => setIframeError(false)}
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid rgba(190, 214, 255, 0.14)",
                background: "rgba(190, 214, 255, 0.08)",
                color: "#eef3fa",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
