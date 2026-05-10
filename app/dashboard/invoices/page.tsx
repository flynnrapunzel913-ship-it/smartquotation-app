"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import InvoiceHistory from "@/components/invoice/InvoiceHistory";
import "@/styles/invoice.css";

export default function InvoiceDashboard() {
  return (
    <div className="dashboard-container p-6 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b]">MR Swimming Pools & Spa Invoice Workspace</h1>
          <p className="text-[#64748b] mt-1 text-lg">View previous invoices, manage product databases, and create new GST invoices.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/dashboard/invoices/databases" 
            className="btn btn-outline rounded-xl px-6 py-2.5 text-sm font-bold shadow-sm bg-white hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            📂 Databases
          </Link>
          <Link 
            href="/dashboard/invoices/new" 
            className="btn btn-primary rounded-xl px-6 py-2.5 text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Create New Invoice
          </Link>
        </div>
      </div>

      {/* Main Content: Invoice History */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] overflow-hidden">
        <div className="p-1 border-b border-[#e2e8f0] bg-[#fafafa]/50">
           {/* Visual spacer/accent */}
        </div>
        <div className="p-6">
          <InvoiceHistory />
        </div>
      </div>
    </div>
  );
}
