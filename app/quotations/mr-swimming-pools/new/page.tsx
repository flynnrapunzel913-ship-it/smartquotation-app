"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
const MRSwimmingPoolsWizard = dynamic(() => import("@/components/wizard/MRSwimmingPoolsWizard"), {
  loading: () => <div style={{ padding: "100px", textAlign: "center", color: "#64748b", fontSize: "1.25rem", fontWeight: "600" }}>Initializing Quotation Wizard...</div>,
  ssr: false
});
import "@/styles/cards.css";

function WizardWrapper() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || undefined;
  const mode = (searchParams.get("mode") as "edit" | "duplicate") || "edit";

  return <MRSwimmingPoolsWizard id={id} mode={mode} />;
}

export default function MRSwimmingPoolsPage() {
  return (
    <div className="cards-page" style={{ padding: "40px 20px" }}>
      <Suspense fallback={<div>Loading wizard...</div>}>
        <WizardWrapper />
      </Suspense>
    </div>
  );
}
