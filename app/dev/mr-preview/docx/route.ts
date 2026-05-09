import { quotationToDocxBuffer } from "@/lib/generate-docx";
import { getSampleCompanySettings, loadMrQuotationSample } from "@/lib/sample-mr-quotation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sample = url.searchParams.get("sample");
  const quote = loadMrQuotationSample(sample);
  const company = getSampleCompanySettings();
  const buffer = await quotationToDocxBuffer(quote, company);
  const disposition = url.searchParams.get("download") === "1" ? "attachment" : "inline";

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `${disposition}; filename="${quote.quoteNumber}.docx"`,
      "Cache-Control": "no-store",
    },
  });
}
