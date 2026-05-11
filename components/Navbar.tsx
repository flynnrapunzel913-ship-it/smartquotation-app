"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, LogOut, ChevronLeft } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchFocused, setSearchFocused] = useState(false);

  // Don't show navbar on login page
  if (pathname === "/login") return null;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Back Button */}
        <div className="navbar-left">
          <button 
            onClick={() => router.back()} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "6px", 
              background: "transparent", 
              border: "none", 
              cursor: "pointer", 
              color: "var(--text-main)", 
              fontSize: "14px", 
              fontWeight: "600",
              padding: "8px 12px",
              borderRadius: "8px",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-subtle)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
        </div>

        {/* Center: Empty spacer to maintain layout */}
        <div className="navbar-center"></div>

        {/* Right: Search, Account, Logout */}
        <div className="navbar-right" style={{ display: "flex", gap: "16px", alignItems: "center", justifyContent: "flex-end" }}>
          <div className={`search-container ${searchFocused ? "focused" : ""}`} style={{ 
            position: "relative", 
            display: "flex", 
            alignItems: "center",
            background: "white",
            borderRadius: "10px",
            padding: "0 12px",
            border: "1px solid #e2e8f0",
            transition: "all 0.2s",
            width: searchFocused ? "240px" : "180px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            <Search size={16} style={{ color: "#64748b" }} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                background: "transparent",
                border: "none",
                padding: "8px",
                fontSize: "13px",
                outline: "none",
                width: "100%",
                color: "#0F172A"
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "8px", paddingLeft: "16px", borderLeft: "1px solid var(--border-subtle)" }}>
            <div style={{ 
              width: "32px", 
              height: "32px", 
              borderRadius: "50%", 
              background: "var(--accent-slate)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "white",
              fontSize: "12px",
              fontWeight: "600"
            }}>
              AD
            </div>
            <button onClick={handleLogout} className="logout-button" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

