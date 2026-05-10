"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import InvoiceHistory from "@/components/invoice/InvoiceHistory";
import "@/styles/invoice.css";

export default function InvoiceDashboard() {
  return (
    <div className="dashboard-container p-6 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px", marginTop: "20px" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "800", color: "#1e293b", marginBottom: "12px" }}>MR Swimming Pools & Spa Invoice Workspace</h1>
        <p style={{ fontSize: "1.125rem", color: "#64748b", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px auto" }}>
          View previous invoices, manage product databases, and create new GST invoices.
        </p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <Link 
            href="/dashboard/invoices/databases" 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "#475569",
              backgroundColor: "white",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              textDecoration: "none",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f8fafc";
              e.currentTarget.style.color = "#0f172a";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.color = "#475569";
            }}
          >
            📂 Databases
          </Link>
          <Link 
            href="/dashboard/invoices/new" 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "white",
              background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              textDecoration: "none",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
            }}
          >
            <span style={{ fontSize: "1.25rem", lineHeight: "1" }}>+</span> Create New Invoice
          </Link>
        </div>
      </div>

      {/* Main Content: Invoice History */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
        <div className="p-1 border-b border-[#e2e8f0] bg-[#fafafa]/50">
           {/* Visual spacer/accent */}
        </div>
        <div className="p-6">
          <InvoiceHistory />
        </div>
      </div>
    </div>
  );
}
