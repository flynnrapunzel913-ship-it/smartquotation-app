import { getSession } from "@/lib/session";
import { getQuotationById } from "@/lib/data/quotations";
import { getOrCreateCompanySettings } from "@/lib/company-settings";
import { buildQuotationHtml } from "@/templates/quotation-html";
import { htmlToPdfBuffer } from "@/lib/generate-pdf";
import { renderKleanTechPdfHeader } from "@/lib/pdf/renderKleanTechPdfHeader";
import { renderKleanTechPdfFooter } from "@/lib/pdf/renderKleanTechPdfFooter";

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
    
    let pdfOptions = {};
    const specs = quote.projectSpecifications as any;
    if ((quote as any).quotationType === "KLEAN_TECH_SYSTEMS" || specs?.quotationType === "KLEAN_TECH_SYSTEMS") {
      pdfOptions = {
        displayHeaderFooter: true,
        headerTemplate: renderKleanTechPdfHeader(quote),
        footerTemplate: renderKleanTechPdfFooter(),
        margin: { top: "150px", bottom: "80px", left: "30px", right: "30px" }
      };
    }

    const buffer = await htmlToPdfBuffer(html, pdfOptions);

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
