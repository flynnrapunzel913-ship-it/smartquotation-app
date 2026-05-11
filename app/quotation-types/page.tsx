"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuotationTypeCard } from "@/components/QuotationTypeCard";
import "@/styles/cards.css";

export default function QuotationTypesPage() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/history");
    router.prefetch("/dashboard/invoices");
    router.prefetch("/quotations/mr-swimming-pools/new");
    router.prefetch("/quotations/klean-tech/new");
  }, [router]);

  return (
    <div className="cards-page">
      <div className="container">
        <div className="cards-header">
          <div>
            <h1>Welcome, admin</h1>
            <p>Select a quotation module to begin</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/history" prefetch={true} className="btn btn-primary" style={{ textDecoration: "none" }}>
              Quotation History
            </Link>
            <Link href="/dashboard/invoices" prefetch={true} className="btn btn-outline" style={{ textDecoration: "none" }}>
              Invoice History
            </Link>
          </div>
        </div>

        <div className="cards-grid">
          <QuotationTypeCard
            theme="mr"
            title="MR SWIMMING POOLS & SPA CONSTRUCTION COMPANY"
            description="Swimming pool construction, maintenance, and equipment quotation builder."
            href="/quotations/mr-swimming-pools/new"
          />

          <QuotationTypeCard
            theme="klean"
            title="KLEAN TECH SYSTEMS"
            description="Water treatment systems, RO plants, and industrial filters quotation module."
            href="/quotations/klean-tech/new"
          />

          <QuotationTypeCard
            theme="mr-invoice"
            title="MR SWIMMING POOLS & SPA INVOICE"
            description="Generate professional GST tax invoices"
            href="/dashboard/invoices"
          />
        </div>
      </div>
    </div>
  );
}
