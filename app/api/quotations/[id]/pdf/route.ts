import { getSession } from "@/lib/session";
import { getQuotationById } from "@/lib/data/quotations";
import { getOrCreateCompanySettings } from "@/lib/company-settings";
import { buildQuotationHtml } from "@/templates/quotation-html";
import { htmlToPdfBuffer } from "@/lib/generate-pdf";

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
  try {
    const company = await getOrCreateCompanySettings();
    const html = buildQuotationHtml(quote, company);
    const buffer = await htmlToPdfBuffer(html);

    const { searchParams } = new URL(_req.url);
    const disposition = searchParams.get("disposition") === "inline" ? "inline" : "attachment";

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${quote.quoteNumber}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    return new Response(`Error generating PDF: ${error.message}`, { status: 500 });
  }
}
