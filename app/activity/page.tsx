"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, ArrowLeft } from "lucide-react";
import RecentActivity from "@/components/RecentActivity";
import "@/styles/cards.css";

export default function ActivityPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        <button
          type="button"
          onClick={() => router.push("/quotation-types")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            padding: "8px 14px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "white",
            color: "#475569",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <LayoutGrid size={28} className="text-slate-400" />
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0F172A", margin: 0 }}>All Activity</h1>
            <p style={{ fontSize: 14, color: "#64748b", margin: "4px 0 0" }}>
              Click any item to preview (completed) or edit (draft).
            </p>
          </div>
        </div>

        <RecentActivity
          limit={100}
          filter="all"
          showCardHeader={false}
          emptyMessage="No activity yet. Create a quotation or invoice to get started."
        />
      </div>
    </div>
  );
}
