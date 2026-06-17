"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, ArrowRight, Loader2 } from "lucide-react";
import type { MrSampleListEntry } from "@/lib/sample-mr-quotation";

type Props = {
  onSelectBlank?: () => void;
  compact?: boolean;
};

export default function MRSamplePicker({ onSelectBlank, compact }: Props) {
  const router = useRouter();
  const [samples, setSamples] = useState<MrSampleListEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/quotations/samples")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSamples(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", padding: compact ? "8px 0" : "16px 0" }}>
        <Loader2 size={18} className="animate-spin" />
        <span>Loading sample quotations…</span>
      </div>
    );
  }

  if (!samples.length) return null;

  return (
    <div style={{ marginBottom: compact ? 16 : 28 }}>
      {!compact && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: "0 0 4px" }}>
            Start from a sample quotation
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
            Pre-filled quotations from your bills folder — edit and generate PDF/DOCX.
          </p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {samples.map((sample) => (
          <button
            key={sample.filename}
            type="button"
            onClick={() => router.push(`/quotations/mr-swimming-pools/new?sample=${encodeURIComponent(sample.filename)}`)}
            style={{
              textAlign: "left",
              padding: "16px 18px",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              background: "white",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0d9488";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(13,148,136,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#f0fdfa",
                    color: "#0d9488",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileText size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{sample.displayName}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{sample.quoteNumber}</div>
                </div>
              </div>
              <ArrowRight size={16} color="#94a3b8" />
            </div>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.45 }}>{sample.description}</p>
            {sample.poolType && (
              <span
                style={{
                  alignSelf: "flex-start",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 6,
                  background: "#ecfdf5",
                  color: "#047857",
                }}
              >
                {sample.poolType}
              </span>
            )}
          </button>
        ))}

        {onSelectBlank && (
          <button
            type="button"
            onClick={onSelectBlank}
            style={{
              textAlign: "left",
              padding: "16px 18px",
              borderRadius: 12,
              border: "1px dashed #cbd5e1",
              background: "#f8fafc",
              cursor: "pointer",
              fontWeight: 600,
              color: "#475569",
              fontSize: 14,
            }}
          >
            Start with blank template
          </button>
        )}
      </div>
    </div>
  );
}
