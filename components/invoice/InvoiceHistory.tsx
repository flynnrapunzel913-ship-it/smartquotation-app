"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrencyINR } from "@/lib/utils";

interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  grandTotal: number;
  isDraft: boolean;
}

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/invoices");
      const data = await response.json();
      setInvoices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (invoiceNumber: string) => {
    if (!confirm(`Are you sure you want to delete invoice ${invoiceNumber}?`)) return;
    try {
      const response = await fetch(`/api/invoices/${invoiceNumber}`, { method: "DELETE" });
      if (response.ok) fetchInvoices();
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleDuplicate = async (id: string) => {
    window.location.href = `/dashboard/invoices/new?duplicate=${id}`;
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="invoice-history">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1e293b", margin: 0 }}>Invoice Records</h2>
        <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>🔍</span>
          <input 
            type="text" 
            style={{ 
              width: "100%", 
              padding: "10px 12px 10px 36px", 
              borderRadius: "10px", 
              border: "1px solid #e2e8f0", 
              fontSize: "0.875rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            placeholder="Search invoices or customers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", background: "white", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Invoice No</th>
              <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Customer Name</th>
              <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
              <th style={{ padding: "14px 16px", textAlign: "right", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Grand Total</th>
              <th style={{ padding: "14px 16px", textAlign: "center", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
              <th style={{ padding: "14px 16px", textAlign: "right", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading history...</td>
              </tr>
            ) : filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "12px", opacity: 0.3 }}>📜</div>
                  <p style={{ color: "#64748b", fontWeight: "600", fontSize: "1rem", margin: 0 }}>No invoices created yet.</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginTop: "4px" }}>Click <Link href="/dashboard/invoices/new" style={{ color: "#4f46e5", fontWeight: "700", textDecoration: "underline" }}>“Create New Invoice”</Link> to generate your first invoice.</p>
                </td>
              </tr>
            ) : (
              filteredInvoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "14px 16px", fontWeight: "700", color: "#1e293b", fontSize: "0.875rem" }}>{inv.invoiceNumber}</td>
                  <td style={{ padding: "14px 16px", color: "#475569", fontSize: "0.875rem" }}>{inv.customerName}</td>
                  <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "0.875rem" }}>{new Date(inv.invoiceDate).toLocaleDateString("en-IN")}</td>
                  <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: "700", color: "#4f46e5", fontSize: "0.875rem" }}>{formatCurrencyINR(inv.grandTotal)}</td>
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    <span style={{ 
                      padding: "4px 8px", 
                      borderRadius: "6px", 
                      fontSize: "0.75rem", 
                      fontWeight: "700",
                      background: inv.isDraft ? "#fef3c7" : "#d1fae5",
                      color: inv.isDraft ? "#92400e" : "#065f46"
                    }}>
                      {inv.isDraft ? "Draft" : "Finalized"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                      <Link href={`/dashboard/invoices/preview/${inv.invoiceNumber}`} style={{ padding: "4px 8px", background: "white", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600", color: "#475569", textDecoration: "none" }}>View</Link>
                      <Link href={`/dashboard/invoices/edit/${inv.invoiceNumber}`} style={{ padding: "4px 8px", background: "white", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600", color: "#475569", textDecoration: "none" }}>Edit</Link>
                      <a href={`/api/invoices/${inv.invoiceNumber}/pdf`} target="_blank" style={{ padding: "4px 8px", background: "white", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600", color: "#16a34a", textDecoration: "none" }}>PDF</a>
                      <button style={{ padding: "4px 8px", background: "white", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600", color: "#dc2626", cursor: "pointer" }} onClick={() => handleDelete(inv.invoiceNumber)}>✕</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
