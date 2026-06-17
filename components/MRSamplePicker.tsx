"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, ArrowRight, Loader2 } from "lucide-react";
import RecentActivity from "@/components/RecentActivity";
import type { MrSampleListEntry } from "@/lib/sample-mr-quotation";

type Props = {
  onSelectBlank?: () => void;
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

export default function MRSamplePicker({ onSelectBlank, compact }: Props) {
  const router = useRouter();
  const [samples, setSamples] = useState<MrSampleListEntry[]>([]);
  const [loadingSamples, setLoadingSamples] = useState(true);

  useEffect(() => {
    fetch("/api/quotations/samples")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSamples(data);
      })
      .catch(() => setSamples([]))
      .finally(() => setLoadingSamples(false));
  }, []);

  if (loadingSamples && compact) {
    return (
      <div className="mr-picker-loading">
        <Loader2 size={18} className="animate-spin" />
        <span>Loading quotations…</span>
      </div>
    );
  }

  return (
    <div className={`mr-start-picker${compact ? " mr-start-picker--compact" : ""}`}>
      {!compact && (
        <section className="mr-picker-section">
          <div className="mr-picker-section-header">
            <h2>Start from a sample quotation</h2>
            <p>Pre-filled quotations from your bills folder — edit and generate PDF/DOCX.</p>
          </div>

          {loadingSamples ? (
            <div className="mr-picker-loading">
              <Loader2 size={18} className="animate-spin" />
              <span>Loading samples…</span>
            </div>
          ) : (
            <div className="mr-picker-grid">
              {samples.map((sample) => (
                <button
                  key={sample.filename}
                  type="button"
                  className="mr-picker-card mr-picker-card--sample"
                  onClick={() =>
                    router.push(
                      `/quotations/mr-swimming-pools/new?sample=${encodeURIComponent(sample.filename)}`,
                    )
                  }
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
          )}
        </section>
      )}

      {!compact && (
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
      )}
    </div>
  );
}
