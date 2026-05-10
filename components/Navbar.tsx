"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

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
        <div className="navbar-left">
          <Link href="/quotation-types" className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
        <div className="navbar-center">
          <Link href="/quotation-types" className="navbar-logo">
            SmartQuotation
          </Link>
        </div>
        <div className="navbar-right" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {pathname?.includes("/klean-tech") && (
            <button 
              onClick={() => router.push(pathname + "?manageProducts=true")} 
              className="manage-products-button"
              style={{
                padding: "8px 16px",
                background: "#0f172a",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "14px"
              }}
            >
              Upload / Manage Products
            </button>
          )}
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
