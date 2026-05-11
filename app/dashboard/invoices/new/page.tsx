"use client";

import dynamic from "next/dynamic";

const InvoiceWizard = dynamic(() => import("@/components/invoice/InvoiceWizard"), {
  loading: () => <div style={{ padding: "100px", textAlign: "center", color: "#64748b", fontSize: "1.25rem", fontWeight: "600" }}>Initializing Invoice Wizard...</div>,
  ssr: false
});

export default function NewInvoicePage() {
  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <InvoiceWizard />
    </div>
  );
}
