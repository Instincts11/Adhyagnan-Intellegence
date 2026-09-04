"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StarfieldHyperdrive from "../components/StarfieldHyperdrive";
import NavigationBar from "../components/NavigationMenu";
import NasaEyesEmbed from "../components/NasaEyesEmbed";
import ExoplanetDetails from "../components/ExoplanetDetails";
import { fetchExoplanetData, ExoplanetData } from "../services/nasaApi";

export default function ExoplanetResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const targetName = searchParams.get('planet');
  
  const [exoplanetData, setExoplanetData] = useState<ExoplanetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch exoplanet data when targetName changes
  useEffect(() => {
    if (!targetName) return;
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    setExoplanetData(null);

    fetchExoplanetData(targetName, ac.signal)
      .then((response) => {
        if (ac.signal.aborted) return;
        if (response.error) {
          setError(response.error);
        } else if (response.data.length > 0) {
          setExoplanetData(response.data[0]);
        } else {
          setError('No data found for this exoplanet');
        }
      })
      .catch((err) => {
        if (ac.signal.aborted || err?.name === 'AbortError') return;
        setError(err.message || 'Failed to fetch exoplanet data');
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });

    return () => ac.abort();
  }, [targetName]);

  if (!targetName) {
    return (
      <div style={{ minHeight: "100vh", minWidth: "100vw", position: "relative", overflow: "hidden" }}>
        <StarfieldHyperdrive speed={0.05} warpBoost={1.2} />
        <NavigationBar pageTitle="Exoplanet Result" />
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          height: "100vh",
          color: "#ff6b6b",
          textAlign: "center"
        }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: "8px" }}>No exoplanet specified</div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>Please search for an exoplanet first</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", minWidth: "100vw", position: "relative", overflow: "hidden" }}>
      <StarfieldHyperdrive speed={0.05} warpBoost={1.2} />
      <NavigationBar pageTitle="Exoplanet Result" />

      <div style={{ position: "relative", zIndex: 1, height: "calc(100vh - 64px)", top: 64, display: "flex", flexDirection: "column" }}>
        {loading ? (
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "100vh",
            color: "#8b9bb0",
            fontSize: 18,
            fontWeight: 600
          }}>
            Loading exoplanet data...
          </div>
        ) : error ? (
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "100vh",
            color: "#ff6b6b",
            textAlign: "center"
          }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "8px" }}>Error loading data</div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>{error}</div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            {/* Left: NASA Eyes fills available space */}
            <div style={{ flex: 1, padding: "16px var(--page-gutter) 16px var(--page-gutter)", paddingRight: 8, minWidth: 0 }}>
              <div style={{ width: "100%", height: "100%" }}>
                <NasaEyesEmbed
                  targetName={exoplanetData?.pl_name || targetName}
                  hostname={exoplanetData?.hostname}
                  full
                />
              </div>
            </div>
            
            {/* Right: characteristics panel */}
            <div style={{ width: 420, padding: "16px var(--page-gutter) 16px 8px" }}>
              <div style={{
                height: "100%",
                borderRadius: 16,
                border: "1px solid rgba(190, 214, 255, 0.14)",
                background: "#10151f",
                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ padding: "18px 16px", borderBottom: "1px solid rgba(190, 214, 255, 0.12)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 700, color: "#eef3fa" }}>{targetName}</div>
                  <button 
                    onClick={() => router.push('/kepler-input')}
                    style={{ 
                      background: "transparent", 
                      color: "#8b9bb0", 
                      border: "1px solid rgba(190, 214, 255, 0.14)", 
                      borderRadius: 8, 
                      padding: "6px 10px", 
                      cursor: "pointer",
                      fontSize: 12
                    }}
                  >
                    New Search
                  </button>
                </div>
                <div style={{ 
                  padding: 16, 
                  overflow: "auto", 
                  flex: 1,
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(188,210,255,0.3) #07090e"
                }}>
                  <ExoplanetDetails 
                    data={exoplanetData} 
                    loading={loading} 
                    error={error} 
                  />
                </div>
                <div style={{ marginTop: "auto", padding: 12, borderTop: "1px solid rgba(190, 214, 255, 0.12)", display: "grid", gap: 8 }}>
                  {exoplanetData?.pl_name && (
                    <button
                      onClick={() => router.push(`/neighborhood?planet=${encodeURIComponent(exoplanetData.pl_name)}`)}
                      style={{
                        background: "rgba(126,182,255,0.16)",
                        color: "#eef3fa",
                        border: "1px solid rgba(126,182,255,0.35)",
                        borderRadius: 8,
                        padding: "12px 16px",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 14,
                        width: "100%",
                      }}
                    >
                      Find nearest on the wave
                    </button>
                  )}
                  {exoplanetData?.hostname && (
                    <button
                      onClick={() => {
                        const systemViewerUrl = `/kepler-system-viewer?planet=${encodeURIComponent(exoplanetData.pl_name)}&hostname=${encodeURIComponent(exoplanetData.hostname)}`;
                        window.location.href = systemViewerUrl;
                      }}
                      style={{
                        background: "rgba(74,222,128,0.22)",
                        color: "#eef3fa",
                        border: "1px solid rgba(74,222,128,0.4)",
                        borderRadius: 8,
                        padding: "12px 16px",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 14,
                        width: "100%",
                      }}
                    >
                      🌌 NEXT : View System
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
