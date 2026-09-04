"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StarfieldHyperdrive from "../components/StarfieldHyperdrive";

export default function MissionViewerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const missionName = searchParams.get('mission');
  const missionUrl = searchParams.get('url');
  const missionDescription = searchParams.get('description');
  
  const [loading, setLoading] = useState(true);

  // Hide loading overlay when iframe loads
  useEffect(() => {
    const iframe = document.querySelector('iframe');
    const loadingOverlay = document.getElementById('mission-loading');
    
    if (iframe && loadingOverlay) {
      const handleLoad = () => {
        setTimeout(() => {
          loadingOverlay.style.opacity = '0';
          setTimeout(() => {
            loadingOverlay.style.display = 'none';
          }, 300);
        }, 2000); // Wait 2 seconds to ensure NASA Eyes is fully loaded
      };
      
      iframe.addEventListener('load', handleLoad);
      
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  if (!missionName || !missionUrl) {
    return (
      <div style={{ minHeight: "100vh", minWidth: "100vw", position: "relative", overflow: "hidden" }}>
        <StarfieldHyperdrive speed={0.05} warpBoost={1.2} />
        <div style={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)", 
          color: "#eef3fa", 
          textAlign: "center",
          zIndex: 1
        }}>
          <h2>No mission selected</h2>
          <button 
            onClick={() => router.push('/exploration-path')}
            style={{
              background: "rgba(190, 214, 255, 0.08)",
              color: "#eef3fa",
              border: "1px solid rgba(140,170,255,0.25)",
              borderRadius: 10,
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: 700,
              marginTop: 16
            }}
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", minWidth: "100vw", position: "relative", overflow: "hidden" }}>
      <StarfieldHyperdrive speed={0.05} warpBoost={1.2} />
      
      {/* Header */}
      <div style={{ 
        position: "absolute", 
        top: 24, 
        left: 24, 
        right: 24,
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ color: "#8b9bb0", letterSpacing: "0.3em", textTransform: "uppercase", fontSize: 12 }}>
          Mission Viewer - {missionName}
        </div>
        <button 
          onClick={() => router.push('/exploration-path')}
          style={{
            background: "transparent",
            color: "#8b9bb0",
            border: "1px solid rgba(190, 214, 255, 0.14)",
            borderRadius: 8,
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: 12
          }}
        >
          ← Back
        </button>
      </div>

      {/* Controls */}
      <div style={{ 
        position: "absolute", 
        top: 24, 
        right: 24, 
        zIndex: 1,
        display: "flex",
        gap: 12,
        alignItems: "center"
      }}>
        <div style={{ 
          color: "#8b9bb0", 
          fontSize: 12, 
          background: "rgba(0,0,0,0.6)", 
          padding: "6px 10px", 
          borderRadius: 6,
          border: "1px solid rgba(190, 214, 255, 0.14)"
        }}>
          NASA Eyes Mission
        </div>
      </div>

      {/* NASA Eyes Mission Visualization */}
      <div style={{ 
        position: "absolute", 
        top: 88, 
        left: "var(--page-gutter)", 
        right: "var(--page-gutter)",
        zIndex: 1,
        width: "auto",
        height: "62vh",
        maxWidth: "none",
        maxHeight: "none"
      }}>
        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: "100%",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(190, 214, 255, 0.14)",
          background: "rgba(0,0,0,0.3)"
        }}>
          <iframe
            src={`https://eyes.nasa.gov/apps/exo/#/spacecraft/${missionUrl}`}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: 16
            }}
            title={`NASA Eyes ${missionName} mission`}
            allow="fullscreen"
            loading="lazy"
          />
          
          {/* Loading overlay */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8b9bb0",
            zIndex: 10,
            transition: "opacity 0.3s ease"
          }} id="mission-loading">
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                width: "40px", 
                height: "40px", 
                border: "3px solid rgba(188,210,255,0.3)",
                borderTop: "3px solid #8cc0ff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px"
              }} />
              <div>Loading NASA Eyes...</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
                This may take a few moments
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Information Panel - Below the visualization */}
      <div style={{
        position: "absolute",
        bottom: 24,
        left: "var(--page-gutter)",
        right: "var(--page-gutter)",
        zIndex: 1,
        background: "#10151f",
        borderRadius: 16,
        border: "1px solid rgba(190, 214, 255, 0.14)",
        padding: 16,
        width: "auto",
        maxWidth: "none",
        marginTop: 20,
        marginBottom: 20
      }}>
        <div style={{ color: "#eef3fa", fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
          {missionName} Mission
        </div>
        <div style={{ 
          color: "#8b9bb0", 
          fontSize: 14, 
          lineHeight: 1.4,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 8,
          marginBottom: 16
        }}>
          <div>Mission: {missionName}</div>
          <div>Description: {missionDescription}</div>
          <div>Status: Active/Completed</div>
          <div>Launch: NASA Mission</div>
        </div>
        
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
