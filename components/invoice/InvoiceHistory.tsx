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
        <h2 className="text-xl font-bold text-[#1e293b]">Invoice Records</h2>
        <div className="flex-1 max-w-md ml-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input 
              type="text" 
              className="w-full pl-10 pr-4 h-10 rounded-xl border border-[#e2e8f0] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm" 
              placeholder="Search invoices or customers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="border border-[#e2e8f0] rounded-xl bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-[#f8fafc] text-[#475569] text-xs uppercase tracking-wider font-bold border-bottom border-[#e2e8f0] grid grid-cols-12 gap-4 px-6 py-4">
          <div className="col-span-2">Invoice No</div>
          <div className="col-span-4">Customer Name</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-right">Grand Total</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Body */}
        <div className="divide-y divide-[#e2e8f0]">
          {isLoading ? (
            <div className="text-center py-20 text-[#94a3b8] animate-pulse">Loading history...</div>
          ) : filteredInvoices.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4 opacity-20 grayscale">📜</div>
              <p className="text-[#64748b] font-medium text-lg">No invoices created yet.</p>
              <p className="text-[#94a3b8] mt-1">Click <Link href="/dashboard/invoices/new" className="text-indigo-600 font-bold hover:underline">“Create New Invoice”</Link> to generate your first invoice.</p>
            </div>
          ) : (
            filteredInvoices.map((inv) => (
              <div key={inv.id} className="hover:bg-slate-50 transition-colors group grid grid-cols-12 gap-4 px-6 py-4 items-center">
                <div className="col-span-2 font-bold text-[#1e293b]">{inv.invoiceNumber}</div>
                <div className="col-span-4 text-[#475569]">{inv.customerName}</div>
                <div className="col-span-2 text-sm text-[#64748b]">{new Date(inv.invoiceDate).toLocaleDateString("en-IN")}</div>
                <div className="col-span-2 text-right font-bold text-indigo-700">{formatCurrencyINR(inv.grandTotal)}</div>
                <div className="col-span-1 text-center">
                  <span className={`badge ${inv.isDraft ? "badge-warning" : "badge-success"} text-[10px]`}>
                    {inv.isDraft ? "Draft" : "Finalized"}
                  </span>
                </div>
                <div className="col-span-1 text-right">
                  <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/dashboard/invoices/preview/${inv.invoiceNumber}`} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-md font-medium text-[#475569] hover:border-indigo-500 hover:text-indigo-500 transition-all">View</Link>
                    <Link href={`/dashboard/invoices/edit/${inv.invoiceNumber}`} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-md font-medium text-[#475569] hover:border-indigo-500 hover:text-indigo-500 transition-all">Edit</Link>
                    <a href={`/api/invoices/${inv.invoiceNumber}/pdf`} target="_blank" className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-md font-medium text-emerald-600 hover:bg-emerald-50 transition-all">PDF</a>
                    <button className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-md font-medium text-red-500 hover:bg-red-50 transition-all" onClick={() => handleDelete(inv.invoiceNumber)}>✕</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
