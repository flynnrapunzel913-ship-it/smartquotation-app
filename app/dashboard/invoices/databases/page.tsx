"use client";

import React from "react";
import Link from "next/link";
import InvoiceDatabaseManager from "@/components/invoice/InvoiceDatabaseManager";
import "@/styles/invoice.css";

export default function DatabasesPage() {
  return (
    <div className="dashboard-container p-6 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/dashboard/invoices" className="text-blue-600 text-sm font-medium hover:underline mb-2 inline-block">
            ← Back to Workspace
          </Link>
          <h1 className="text-3xl font-bold text-[#1e293b]">Product Databases</h1>
          <p className="text-[#64748b] mt-1 text-lg">Upload and manage Excel, PDF, and Word product catalogs.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-white px-4 py-2 rounded-xl border border-[#e2e8f0] shadow-sm flex items-center gap-3">
              <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Security PIN Protection:</span>
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Not Enabled</span>
              <button className="text-xs text-blue-600 font-bold opacity-50 cursor-not-allowed" disabled>Set PIN</button>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
        <div className="p-8">
          <InvoiceDatabaseManager />
        </div>
      </div>
    </div>
  );
}
