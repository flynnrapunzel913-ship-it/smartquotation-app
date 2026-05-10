"use client";

import React, { useState } from "react";
import InvoiceHistory from "@/components/invoice/InvoiceHistory";
import InvoiceDatasetManager from "@/components/invoice/InvoiceDatasetManager";

export default function InvoiceDashboardPage() {
  const [activeTab, setActiveTab] = useState<"invoices" | "datasets">("invoices");

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <div className="tabs-header" style={{ display: "flex", gap: "24px", marginBottom: "32px", borderBottom: "1px solid #e2e8f0" }}>
        <button 
          className={`tab-btn ${activeTab === "invoices" ? "active" : ""}`}
          onClick={() => setActiveTab("invoices")}
          style={{ 
            padding: "12px 4px", 
            fontSize: "16px", 
            fontWeight: 600, 
            background: "none", 
            border: "none", 
            borderBottom: activeTab === "invoices" ? "3px solid #0369a1" : "3px solid transparent",
            color: activeTab === "invoices" ? "#0369a1" : "#64748b",
            cursor: "pointer"
          }}
        >
          Invoices
        </button>
        <button 
          className={`tab-btn ${activeTab === "datasets" ? "active" : ""}`}
          onClick={() => setActiveTab("datasets")}
          style={{ 
            padding: "12px 4px", 
            fontSize: "16px", 
            fontWeight: 600, 
            background: "none", 
            border: "none", 
            borderBottom: activeTab === "datasets" ? "3px solid #0369a1" : "3px solid transparent",
            color: activeTab === "datasets" ? "#0369a1" : "#64748b",
            cursor: "pointer"
          }}
        >
          Datasets
        </button>
      </div>

      {activeTab === "invoices" ? (
        <InvoiceHistory />
      ) : (
        <InvoiceDatasetManager />
      )}
    </div>
  );
}
