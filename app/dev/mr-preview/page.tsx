import { buildQuotationHtml } from "@/templates/quotation-html";
import {
  getSampleCompanySettings,
  listMrQuotationSamples,
  loadMrQuotationSample,
  resolveMrQuotationSample,
} from "@/lib/sample-mr-quotation";

export const dynamic = "force-dynamic";

export default async function MRPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ sample?: string }>;
}) {
  const params = await searchParams;
  const selectedSample = resolveMrQuotationSample(params.sample);
  const samples = listMrQuotationSamples();
  const quote = loadMrQuotationSample(selectedSample);
  const company = getSampleCompanySettings();
  const html = buildQuotationHtml(quote, company, { title: "MR Swimming Pools Dev Preview" });
  const query = `sample=${encodeURIComponent(selectedSample)}`;

  return (
    <main style={{ minHeight: "100vh", background: "#e5e7eb" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "12px 16px",
          background: "#0f172a",
          color: "#fff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <form action="/dev/mr-preview" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label htmlFor="sample" style={{ fontSize: 13, fontWeight: 700 }}>
            Sample
          </label>
          <select
            id="sample"
            name="sample"
            defaultValue={selectedSample}
            style={{ height: 32, borderRadius: 4, border: "1px solid #94a3b8", padding: "0 8px" }}
          >
            {samples.map((sample) => (
              <option key={sample} value={sample}>
                {sample}
              </option>
            ))}
          </select>
          <button
            type="submit"
            style={{ height: 32, borderRadius: 4, border: 0, padding: "0 12px", fontWeight: 700 }}
          >
            Load
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a className="dev-preview-link" href={`/dev/mr-preview/pdf?${query}`} target="_blank">
            View PDF
          </a>
          <a className="dev-preview-link" href={`/dev/mr-preview/pdf?${query}&download=1`}>
            Download PDF
          </a>
          <a className="dev-preview-link" href={`/dev/mr-preview/docx?${query}`} target="_blank">
            View Word
          </a>
          <a className="dev-preview-link" href={`/dev/mr-preview/docx?${query}&download=1`}>
            Download Word
          </a>
        </div>
      </div>

      <iframe
        title="MR Swimming Pools quotation preview"
        srcDoc={html}
        style={{
          display: "block",
          width: "100%",
          height: "calc(100vh - 56px)",
          border: 0,
          background: "#fff",
        }}
      />

      <style>{`
        .dev-preview-link {
          display: inline-flex;
          align-items: center;
          height: 32px;
          padding: 0 12px;
          border-radius: 4px;
          background: #2563eb;
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }
        .dev-preview-link:nth-child(2),
        .dev-preview-link:nth-child(4) {
          background: #16a34a;
        }
      `}</style>
    </main>
  );
}
