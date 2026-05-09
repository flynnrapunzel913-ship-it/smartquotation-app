"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function KleanTechSuccessPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "30px", background: "white", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", textAlign: "center" }}>
      <div style={{ width: "60px", height: "60px", background: "#10b981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      
      <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a", marginBottom: "10px" }}>Quotation created successfully!</h1>
      <p style={{ color: "#64748b", marginBottom: "30px" }}>Your Klean Tech Systems quotation has been saved and is ready.</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        <Link href={`/api/quotations/${id}/preview`} target="_blank" style={{ padding: "12px", background: "#0f172a", color: "white", borderRadius: "6px", textDecoration: "none", fontWeight: "500" }}>
          Preview Quotation
        </Link>
        <Link href={`/api/quotations/${id}/pdf`} target="_blank" style={{ padding: "12px", background: "#ef4444", color: "white", borderRadius: "6px", textDecoration: "none", fontWeight: "500" }}>
          Download PDF
        </Link>
        <Link href={`/api/quotations/${id}/docx`} target="_blank" style={{ padding: "12px", background: "#3b82f6", color: "white", borderRadius: "6px", textDecoration: "none", fontWeight: "500" }}>
          Download Word
        </Link>
        <Link href={`/quotations/klean-tech/${id}/edit`} style={{ padding: "12px", background: "#64748b", color: "white", borderRadius: "6px", textDecoration: "none", fontWeight: "500" }}>
          Edit Quotation
        </Link>
      </div>
      
      <hr style={{ border: "0", borderTop: "1px solid #e2e8f0", margin: "20px 0" }} />
      
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/quotation-types" style={{ color: "#0f172a", fontWeight: "500", textDecoration: "none" }}>
          ← Back to Dashboard
        </Link>
        <Link href="/history" style={{ color: "#0369a1", fontWeight: "500", textDecoration: "none" }}>
          View History →
        </Link>
      </div>
    </div>
  );
}
