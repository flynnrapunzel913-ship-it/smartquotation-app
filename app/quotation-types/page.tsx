"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { QuotationTypeCard } from "@/components/QuotationTypeCard";
import "@/styles/cards.css";

export default function QuotationTypesPage() {
  const router = useRouter();


  return (
    <div className="cards-page">
      <div className="container">
        <div className="cards-header">
          <div>
            <h1>Welcome, admin</h1>
            <p>Select a quotation module to begin</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-primary" onClick={() => router.push("/history")}>
              View History
            </button>
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
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
}
