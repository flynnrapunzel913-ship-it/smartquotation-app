"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FileText, ArrowRight } from "lucide-react";
import { MR_SAMPLE_CATALOG } from "@/lib/mr-sample-catalog";
import type { MrSampleListEntry } from "@/lib/sample-mr-quotation";

const RecentActivity = dynamic(() => import("@/components/RecentActivity"), {
  loading: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 56, borderRadius: 12 }} />
      ))}
    </div>
  ),
});

const SAMPLES: MrSampleListEntry[] = MR_SAMPLE_CATALOG.map((s) => ({
  filename: s.filename,
  displayName: s.displayName,
  description: s.description,
  quoteNumber: s.quoteNumber,
  sourceBill: s.sourceBill,
  poolType: s.poolType,
  isSample: true as const,
}));

type Props = {
  onSelectBlank?: () => void;
  onSelectSample?: (filename: string) => void;
  compact?: boolean;
};

function Tag({ label, variant }: { label: string; variant: "sample" | "pool" }) {
  const styles: Record<typeof variant, React.CSSProperties> = {
    sample: { background: "#fef3c7", color: "#b45309" },
    pool: { background: "#ecfdf5", color: "#047857" },
  };
  return (
    <span className="mr-picker-tag" style={styles[variant]}>
      {label}
    </span>
  );
}

export default function MRSamplePicker({ onSelectBlank, onSelectSample, compact }: Props) {
  if (compact) {
    return null;
  }

  return (
    <div className="mr-start-picker">
      <section className="mr-picker-section">
        <div className="mr-picker-section-header">
          <h2>Start from a sample quotation</h2>
          <p>Pre-filled quotations from your bills folder — edit and generate PDF/DOCX.</p>
        </div>

        <div className="mr-picker-grid">
          {SAMPLES.map((sample) => (
            <button
              key={sample.filename}
              type="button"
              className="mr-picker-card mr-picker-card--sample"
              onClick={() => onSelectSample?.(sample.filename)}
            >
              <div className="mr-picker-card-top">
                <div className="mr-picker-card-title-row">
                  <div className="mr-picker-card-icon">
                    <FileText size={18} />
                  </div>
                  <div>
                    <div className="mr-picker-card-title">{sample.displayName}</div>
                    <div className="mr-picker-card-subtitle">{sample.quoteNumber}</div>
                  </div>
                </div>
                <ArrowRight size={16} className="mr-picker-card-arrow" />
              </div>
              <p className="mr-picker-card-desc">{sample.description}</p>
              <div className="mr-picker-card-tags">
                <Tag label="Sample" variant="sample" />
                {sample.poolType ? <Tag label={sample.poolType} variant="pool" /> : null}
              </div>
            </button>
          ))}

          {onSelectBlank && (
            <button type="button" className="mr-picker-card mr-picker-card--blank" onClick={onSelectBlank}>
              Start with blank template
            </button>
          )}
        </div>
      </section>

      <section className="mr-picker-section">
        <div className="mr-picker-section-header">
          <h2>Your MR quotation history</h2>
          <p>Click a completed quotation to preview PDF, or a draft to continue editing.</p>
        </div>
        <RecentActivity
          limit={20}
          filter="mr-quotations"
          showCardHeader={false}
          viewAllHref="/activity"
          emptyMessage="No finalized MR quotations yet. Complete a quotation to see it here."
        />
      </section>
    </div>
  );
}
