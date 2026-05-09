import { getSession } from "@/lib/session";
import { getQuotationById } from "@/lib/data/quotations";
import { getOrCreateCompanySettings } from "@/lib/company-settings";
import { buildQuotationHtml } from "@/templates/quotation-html";

export const runtime = "nodejs";

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
  const html = buildQuotationHtml(quote, company);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
