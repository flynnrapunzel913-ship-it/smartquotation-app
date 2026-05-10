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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#334155]">Invoice Records</h2>
        <div className="w-80">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input 
              type="text" 
              className="form-control pl-10 h-10 rounded-xl border-[#e2e8f0] focus:border-blue-500" 
              placeholder="Search invoices or customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden border border-[#f1f5f9] rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f8fafc] text-[#64748b] text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="px-4 py-3">Invoice No</th>
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Grand Total</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-20 text-[#94a3b8] animate-pulse">Loading history...</td></tr>
            ) : filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-24">
                  <div className="text-5xl mb-4 opacity-20 grayscale">📜</div>
                  <p className="text-[#64748b] font-medium text-lg">No invoices created yet.</p>
                  <p className="text-[#94a3b8] mt-1">Click <Link href="/dashboard/invoices/new" className="text-blue-600 font-bold hover:underline">“Create New Invoice”</Link> to generate your first invoice.</p>
                </td>
              </tr>
            ) : (
              filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-4 font-bold text-[#1e293b]">{inv.invoiceNumber}</td>
                  <td className="px-4 py-4 text-[#475569]">{inv.customerName}</td>
                  <td className="px-4 py-4 text-sm text-[#64748b]">{new Date(inv.invoiceDate).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-4 text-right font-bold text-blue-700">{formatCurrencyINR(inv.grandTotal)}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`badge ${inv.isDraft ? "badge-warning" : "badge-success"} text-[10px]`}>
                      {inv.isDraft ? "Draft" : "Finalized"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/dashboard/invoices/preview/${inv.invoiceNumber}`} className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-[#475569] hover:border-blue-500 hover:text-blue-500 transition-all">View</Link>
                      <Link href={`/dashboard/invoices/edit/${inv.invoiceNumber}`} className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-[#475569] hover:border-blue-500 hover:text-blue-500 transition-all">Edit</Link>
                      <button className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-[#475569] hover:border-blue-500 hover:text-blue-500 transition-all" onClick={() => handleDuplicate(inv.id)}>Duplicate</button>
                      <a href={`/api/invoices/${inv.invoiceNumber}/pdf`} target="_blank" className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-emerald-600 hover:bg-emerald-50 transition-all">PDF</a>
                      <button className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-red-500 hover:bg-red-50 transition-all" onClick={() => handleDelete(inv.invoiceNumber)}>Delete</button>
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
