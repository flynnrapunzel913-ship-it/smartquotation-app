"use client";

import dynamic from "next/dynamic";

const KleanTechWizard = dynamic(() => import("@/components/wizard/KleanTechWizard"), {
  loading: () => <div style={{ padding: "100px", textAlign: "center", color: "#64748b", fontSize: "1.25rem", fontWeight: "600" }}>Initializing Klean Tech Wizard...</div>,
  ssr: false
});

export default function KleanTechPage() {
  return <KleanTechWizard />;
}
