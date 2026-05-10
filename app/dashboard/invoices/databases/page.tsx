"use client";

import React from "react";
import Link from "next/link";
import InvoiceCatalogManager from "@/components/invoice/InvoiceCatalogManager";
import "@/styles/invoice.css";

export default function DatabasesPage() {
  return (
    <div className="dashboard-container p-6 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link 
            href="/dashboard/invoices" 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#475569",
              backgroundColor: "white",
              padding: "10px 16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              textDecoration: "none",
              marginBottom: "16px",
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
            ← Back to Workspace
          </Link>
          <h1 className="text-3xl font-bold text-[#1e293b]">Product Databases</h1>
          <p className="text-[#64748b] mt-1 text-lg">Manage your invoice product catalog here.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
        <div className="p-8">
          <InvoiceCatalogManager />
        </div>
      </div>
    </div>
  );
}
