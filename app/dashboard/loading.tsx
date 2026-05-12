import React from "react";

export default function DashboardLoading() {
  return (
    <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header Skeleton */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ height: "32px", width: "300px", background: "#e2e8f0", borderRadius: "8px", marginBottom: "8px" }} className="animate-pulse"></div>
        <div style={{ height: "16px", width: "200px", background: "#e2e8f0", borderRadius: "4px" }} className="animate-pulse"></div>
      </div>

      {/* Cards Grid Skeleton */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "1.5rem",
        marginBottom: "3rem"
      }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ 
            height: "200px", 
            background: "rgba(255, 255, 255, 0.8)", 
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "1.5rem"
          }}>
            <div style={{ height: "24px", width: "60%", background: "#e2e8f0", borderRadius: "4px", marginBottom: "1rem" }} className="animate-pulse"></div>
            <div style={{ height: "16px", width: "80%", background: "#e2e8f0", borderRadius: "4px", marginBottom: "0.5rem" }} className="animate-pulse"></div>
            <div style={{ height: "16px", width: "40%", background: "#e2e8f0", borderRadius: "4px" }} className="animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
        <div style={{ height: "24px", width: "150px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "1.5rem" }} className="animate-pulse"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ height: "40px", width: "40px", background: "#e2e8f0", borderRadius: "50%" }} className="animate-pulse"></div>
            <div style={{ flex: 1 }}>
              <div style={{ height: "16px", width: "30%", background: "#e2e8f0", borderRadius: "4px", marginBottom: "0.5rem" }} className="animate-pulse"></div>
              <div style={{ height: "12px", width: "15%", background: "#e2e8f0", borderRadius: "4px" }} className="animate-pulse"></div>
            </div>
            <div style={{ height: "24px", width: "80px", background: "#e2e8f0", borderRadius: "4px" }} className="animate-pulse"></div>
          </div>
        ))}
      </div>

      <style>{`
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
}
