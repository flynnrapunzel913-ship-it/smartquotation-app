import { htmlToPdfBuffer } from "@/lib/generate-pdf";
import { getSampleCompanySettings, loadMrQuotationSample } from "@/lib/sample-mr-quotation";
import { buildQuotationHtml } from "@/templates/quotation-html";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sample = url.searchParams.get("sample");
  const quote = loadMrQuotationSample(sample);
  const company = getSampleCompanySettings();
  const html = buildQuotationHtml(quote, company, { title: "MR Swimming Pools Dev Preview" });
  const buffer = await htmlToPdfBuffer(html);
  const disposition = url.searchParams.get("download") === "1" ? "attachment" : "inline";

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${quote.quoteNumber}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
