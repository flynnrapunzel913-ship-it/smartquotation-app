import { getSession } from "@/lib/session";
import { getQuotationById } from "@/lib/data/quotations";
import { getOrCreateCompanySettings } from "@/lib/company-settings";
import { quotationToDocxBuffer } from "@/lib/generate-docx";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { id } = await params;
  const quote = await getQuotationById(id);
  if (!quote) {
    return new Response("Not found", { status: 404 });
  }
  const company = await getOrCreateCompanySettings();
  const buffer = await quotationToDocxBuffer(quote, company);
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${quote.quoteNumber}.docx"`,
    },
  });
}
