"use client";

import React, { useState } from "react";
import Link from "next/link";
import InvoiceHistory from "@/components/invoice/InvoiceHistory";
import InvoiceDatabaseManager from "@/components/invoice/InvoiceDatabaseManager";
import "@/styles/invoice.css";

export default function InvoiceDashboard() {
  const [activeTab, setActiveTab] = useState<"history" | "databases">("history");

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1>MR Swimming Pools & Spa Invoice Workspace</h1>
          <p style={{ color: "#64748b", marginTop: "4px" }}>Manage your invoices, product databases, and generate new tax invoices.</p>
        </div>
        <Link href="/dashboard/invoices/new" className="btn btn-primary" style={{ padding: "12px 24px", fontSize: "16px", fontWeight: 600 }}>
          + Create New Invoice
        </Link>
      </div>

      <div className="workspace-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" }}>
        <div className="stat-card card" onClick={() => setActiveTab("history")} style={{ cursor: "pointer", border: activeTab === "history" ? "2px solid #0ea5e9" : "1px solid #e2e8f0" }}>
          <div className="stat-icon" style={{ fontSize: "24px", marginBottom: "8px" }}>📋</div>
          <div className="stat-value" style={{ fontSize: "20px", fontWeight: 700 }}>Invoice History</div>
          <div className="stat-label" style={{ fontSize: "14px", color: "#64748b" }}>View and manage previous invoices</div>
        </div>
        <div className="stat-card card" onClick={() => setActiveTab("databases")} style={{ cursor: "pointer", border: activeTab === "databases" ? "2px solid #0ea5e9" : "1px solid #e2e8f0" }}>
          <div className="stat-icon" style={{ fontSize: "24px", marginBottom: "8px" }}>🗄️</div>
          <div className="stat-value" style={{ fontSize: "20px", fontWeight: 700 }}>Product Databases</div>
          <div className="stat-label" style={{ fontSize: "14px", color: "#64748b" }}>Manage price lists and catalogs</div>
        </div>
        <Link href="/dashboard/invoices/new" className="stat-card card" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="stat-icon" style={{ fontSize: "24px", marginBottom: "8px" }}>➕</div>
          <div className="stat-value" style={{ fontSize: "20px", fontWeight: 700 }}>Create New</div>
          <div className="stat-label" style={{ fontSize: "14px", color: "#64748b" }}>Generate a new tax invoice</div>
        </Link>
      </div>

      <div className="workspace-content">
        {activeTab === "history" ? (
          <InvoiceHistory />
        ) : (
          <InvoiceDatabaseManager />
        )}
      </div>
    </div>
  );
}
