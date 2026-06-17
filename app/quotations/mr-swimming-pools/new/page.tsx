"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import MRSamplePicker from "@/components/MRSamplePicker";

const MRSwimmingPoolsWizard = dynamic(() => import("@/components/wizard/MRSwimmingPoolsWizard"), {
  loading: () => (
    <div style={{ padding: "100px", textAlign: "center", color: "#64748b", fontSize: "1.25rem", fontWeight: "600" }}>
      Initializing Quotation Wizard...
    </div>
  ),
  ssr: false,
});

import "@/styles/cards.css";
import "@/styles/wizard.css";

function WizardWrapper() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || undefined;
  const sample = searchParams.get("sample") || undefined;
  const mode = (searchParams.get("mode") as "edit" | "duplicate") || "edit";
  const [blankStarted, setBlankStarted] = useState(false);
  const showWizard = Boolean(id || sample || blankStarted);

  if (!showWizard) {
    return (
      <MRSamplePicker
        onSelectBlank={() => setBlankStarted(true)}
      />
    );
  }

  return <MRSwimmingPoolsWizard id={id} mode={mode} sample={sample} />;
}

export default function MRSwimmingPoolsPage() {
  return (
    <div className="cards-page" style={{ padding: "40px 20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0F172A", marginBottom: "24px", textAlign: "center" }}>
        MR Swimming pools and Spa quotation
      </h1>
      <Suspense fallback={<div>Loading wizard...</div>}>
        <WizardWrapper />
      </Suspense>
    </div>
  );
}
