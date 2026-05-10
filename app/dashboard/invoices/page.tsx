"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import InvoiceHistory from "@/components/invoice/InvoiceHistory";
import InvoiceDatabaseManager from "@/components/invoice/InvoiceDatabaseManager";
import { formatCurrencyINR } from "@/lib/utils";
import "@/styles/invoice.css";

interface SummaryData {
  totalInvoices: number;
  totalDatabases: number;
  activeDatabaseName: string;
  recentInvoices: any[];
}

export default function InvoiceDashboard() {
  const [summary, setSummary] = useState<SummaryData>({
    totalInvoices: 0,
    totalDatabases: 0,
    activeDatabaseName: "None",
    recentInvoices: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [invRes, dbRes] = await Promise.all([
        fetch("/api/invoices"),
        fetch("/api/invoice-databases")
      ]);
      
      const invoices = await invRes.json();
      const databases = await dbRes.json();
      
      const activeDb = databases.find((db: any) => db.isActive);
      
      setSummary({
        totalInvoices: Array.isArray(invoices) ? invoices.length : 0,
        totalDatabases: Array.isArray(databases) ? databases.length : 0,
        activeDatabaseName: activeDb ? activeDb.name : "None",
        recentInvoices: Array.isArray(invoices) ? invoices.slice(0, 5) : [],
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container p-6 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b]">MR Swimming Pools & Spa Invoice Workspace</h1>
          <p className="text-[#64748b] mt-2 text-lg">Manage invoices, product databases, and generate GST invoices.</p>
        </div>
        <Link href="/dashboard/invoices/new" className="btn btn-primary rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
          + Create New Invoice
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e8f0] flex items-center gap-4 transition-transform hover:scale-[1.02]">
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl text-blue-600">📋</div>
          <div>
            <div className="text-[#64748b] text-sm font-medium uppercase tracking-wider">Invoice History</div>
            <div className="text-2xl font-bold text-[#1e293b]">{summary.totalInvoices} Invoices</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e8f0] flex items-center gap-4 transition-transform hover:scale-[1.02]">
          <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl text-emerald-600">🗄️</div>
          <div>
            <div className="text-[#64748b] text-sm font-medium uppercase tracking-wider">Product Databases</div>
            <div className="text-2xl font-bold text-[#1e293b]">{summary.activeDatabaseName}</div>
            <div className="text-xs text-[#94a3b8]">{summary.totalDatabases} total databases</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e8f0] flex items-center gap-4 opacity-75 grayscale transition-transform hover:scale-[1.02]">
          <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-2xl text-slate-600">🔒</div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="text-[#64748b] text-sm font-medium uppercase tracking-wider">Security PIN</div>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Not Enabled</span>
            </div>
            <button className="text-sm text-blue-600 font-semibold mt-1" disabled>Set PIN Protection</button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Databases */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
            <div className="p-6 border-b border-[#e2e8f0] flex justify-between items-center bg-[#fafafa]">
              <h2 className="text-xl font-bold text-[#1e293b]">Product Databases</h2>
              <div className="text-sm text-[#64748b]">Central catalog management</div>
            </div>
            <div className="p-6">
              <InvoiceDatabaseManager onRefresh={fetchDashboardData} />
            </div>
          </div>
        </div>

        {/* Right Column: Recent Invoices */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
            <div className="p-6 border-b border-[#e2e8f0] bg-[#fafafa]">
              <h2 className="text-xl font-bold text-[#1e293b]">Recent Invoices</h2>
            </div>
            <div className="p-6">
              {summary.recentInvoices.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-[#64748b]">No invoices created yet.</p>
                  <Link href="/dashboard/invoices/new" className="text-blue-600 text-sm font-semibold hover:underline mt-2 inline-block">
                    Create New Invoice →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {summary.recentInvoices.map((inv) => (
                    <div key={inv.id} className="group p-4 rounded-xl border border-[#f1f5f9] hover:border-blue-200 hover:bg-blue-50 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-[#1e293b]">{inv.invoiceNumber}</span>
                        <span className="text-xs text-[#94a3b8]">{new Date(inv.invoiceDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm text-[#475569] font-medium truncate">{inv.customerName}</div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm font-bold text-blue-700">{formatCurrencyINR(inv.grandTotal)}</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <Link href={`/dashboard/invoices/edit/${inv.invoiceNumber}`} className="text-[10px] bg-white border border-[#e2e8f0] px-2 py-1 rounded shadow-sm hover:bg-blue-600 hover:text-white transition-colors">Edit</Link>
                          <a href={`/api/invoices/${inv.invoiceNumber}/pdf`} target="_blank" className="text-[10px] bg-white border border-[#e2e8f0] px-2 py-1 rounded shadow-sm hover:bg-emerald-600 hover:text-white transition-colors">PDF</a>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      // Logic to switch to history tab if I had one, 
                      // but here I'll just scroll or provide a link
                      const historyTable = document.querySelector('.invoice-history');
                      if (historyTable) historyTable.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-center py-3 text-sm text-[#64748b] font-medium hover:text-blue-600 transition-colors"
                  >
                    View All Invoices
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
