"use client";

import React, { useState, useEffect } from "react";
import { formatCurrencyINR } from "@/lib/utils";
import "@/styles/history.css"; 

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInvoices();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/invoices?search=${search}`);
      const data = await res.json();
      setInvoices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (id: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    try {
      const res = await fetch(`/api/invoices/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchInvoices();
      } else {
        alert("Failed to delete invoice");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting invoice");
    }
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <div>
          <h1>Invoice History</h1>
          <p>Manage and view all generated invoices</p>
        </div>
        <div className="search-bar" style={{ width: '400px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by invoice number or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state" style={{ padding: '40px', textAlign: 'center' }}>Loading invoices...</div>
      ) : (
        <div className="history-list">
          {invoices.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px' }}>
              No invoices found.
            </div>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Grand Total</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td><strong>{inv.invoiceNumber}</strong></td>
                    <td>{new Date(inv.invoiceDate).toLocaleDateString("en-GB")}</td>
                    <td>{inv.customerName}</td>
                    <td>{formatCurrencyINR(Number(inv.grandTotal))}</td>
                    <td>
                      <span className={`badge ${inv.isDraft ? "badge-draft" : "badge-final"}`} style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: inv.isDraft ? '#fef3c7' : '#dcfce7',
                        color: inv.isDraft ? '#92400e' : '#166534'
                      }}>
                        {inv.isDraft ? "Draft" : "Final"}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                       <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button className="btn btn-outline btn-sm" onClick={() => window.open(`/dashboard/invoices/preview/${inv.id}`)}>
                            View
                          </button>
                          <button className="btn btn-outline btn-sm" onClick={() => router.push(`/dashboard/invoices/edit/${inv.id}`)}>
                            Edit
                          </button>
                          <button className="btn btn-outline btn-sm" onClick={() => router.push(`/dashboard/invoices/duplicate/${inv.id}`)}>
                            Duplicate
                          </button>
                          <button className="btn btn-outline btn-sm btn-danger-text" onClick={() => deleteInvoice(inv.id)}>
                            Delete
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
