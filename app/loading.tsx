import React from "react";

export default function Loading() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "calc(100vh - 72px)",
      gap: "16px"
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        border: "3px solid #e2e8f0",
        borderTopColor: "var(--accent-slate)",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }}></div>
      <p style={{ color: "var(--text-subtle)", fontSize: "14px", fontWeight: "500" }}>Loading page...</p>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
