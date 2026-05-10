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
      setInvoices(data);
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
    // Basic logic to duplicate an invoice
    // This would likely fetch the original and then open the wizard with that data
    window.location.href = `/dashboard/invoices/new?duplicate=${id}`;
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="invoice-history">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Invoice History</h2>
        <div className="form-group" style={{ margin: 0, width: "300px" }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search by Invoice No or Customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card" style={{ padding: "0", overflow: "hidden" }}>
        <table className="items-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Invoice No</th>
              <th>Customer Name</th>
              <th className="text-right">Grand Total</th>
              <th className="text-center">Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="text-center" style={{ padding: "40px" }}>Loading invoices...</td></tr>
            ) : filteredInvoices.length === 0 ? (
              <tr><td colSpan={6} className="text-center" style={{ padding: "40px", color: "#64748b" }}>No invoices found.</td></tr>
            ) : (
              filteredInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontSize: "14px" }}>{new Date(inv.invoiceDate).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 700 }}>{inv.invoiceNumber}</td>
                  <td>{inv.customerName}</td>
                  <td className="text-right" style={{ fontWeight: 600 }}>{formatCurrencyINR(inv.grandTotal)}</td>
                  <td className="text-center">
                    <span className={`badge ${inv.isDraft ? "badge-warning" : "badge-success"}`}>
                      {inv.isDraft ? "Draft" : "Finalized"}
                    </span>
                  </td>
                  <td className="text-right">
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/dashboard/invoices/edit/${inv.invoiceNumber}`} className="btn btn-outline btn-sm">Edit</Link>
                      <button className="btn btn-outline btn-sm" onClick={() => handleDuplicate(inv.id)}>Duplicate</button>
                      <a href={`/api/invoices/${inv.invoiceNumber}/pdf`} target="_blank" className="btn btn-outline btn-sm">PDF</a>
                      <a href={`/api/invoices/${inv.invoiceNumber}/docx`} className="btn btn-outline btn-sm">Word</a>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(inv.invoiceNumber)}>Delete</button>
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
