"use client";

import React from "react";

export default function ProfilePage() {
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      minHeight: "calc(100vh - 72px)", 
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        padding: "40px",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center"
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "var(--accent-slate)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "700",
          margin: "0 auto 20px"
        }}>
          AD
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>Admin</h1>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "32px" }}>admin@example.com</p>
        
        <div style={{ textAlign: "left", marginBottom: "32px" }}>
          <div style={{ marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
            <label style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase" }}>Role</label>
            <div style={{ fontSize: "15px", color: "#0f172a", fontWeight: "500", marginTop: "4px" }}>Administrator</div>
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase" }}>Member Since</label>
            <div style={{ fontSize: "15px", color: "#0f172a", fontWeight: "500", marginTop: "4px" }}>May 2026</div>
          </div>
        </div>
        
        <button 
          className="btn btn-primary" 
          style={{ width: "100%", padding: "12px", borderRadius: "10px" }}
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
