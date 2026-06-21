"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { QuotationTypeCard } from "@/components/QuotationTypeCard";
import RecentActivity from "@/components/RecentActivity";
import { LayoutGrid } from "lucide-react";
import TimeBasedGreeting from "@/components/dashboard/TimeBasedGreeting";

export default function QuotationTypesPage() {
  useEffect(() => {
    void import("@/components/wizard/MRSwimmingPoolsWizard");
    void import("@/components/wizard/KleanTechWizard");
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        position: "relative",
        overflowX: "hidden",
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "24px 2rem",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "16px",
              textAlign: "center",
              width: "100%",
            }}
          >
            <TimeBasedGreeting />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              marginBottom: "32px",
              width: "100%",
            }}
          >
            <QuotationTypeCard
              theme="mr"
              title="MR Quotation"
              description="Complete pool construction quotation builder."
              href="/quotations/mr-swimming-pools/new"
              logoUrl="/templates/mr-swimming-pools/logo.png"
            />
            <QuotationTypeCard
              theme="klean"
              title="Klean Tech Systems"
              description="Water treatment systems and industrial quotes."
              href="/quotations/klean-tech/new"
              logoUrl="/templates/klean-tech/roots-logo.png"
            />
            <QuotationTypeCard
              theme="mr-invoice"
              title="MR Tax Invoice"
              description="GST-ready professional tax invoices."
              href="/dashboard/invoices"
              logoUrl="/templates/mr-swimming-pools/logo.png"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <LayoutGrid size={24} className="text-slate-400" />
                <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0F172A", letterSpacing: "-0.01em" }}>
                  Recent Activity
                </h2>
              </div>
              <Link
                href="/activity"
                prefetch
                style={{
                  padding: "8px 20px",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  background: "white",
                  textDecoration: "none",
                  color: "#0f172a",
                }}
              >
                View All Activity
              </Link>
            </div>

            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
