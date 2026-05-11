import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { htmlToPdfBuffer } from "@/lib/generate-pdf";
import { generateInvoiceHtml } from "@/lib/templates/invoice-html";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    let logoBase64 = "";
    try {
      const logoPath = path.join(process.cwd(), "public", "templates", "mr-swimming-pools", "logo.png");
      if (fs.existsSync(logoPath)) {
        logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
      }
    } catch (e) {
      console.error("Error reading logo for PDF:", e);
    }

    const html = generateInvoiceHtml(invoice, logoBase64);
    const pdfBuffer = await htmlToPdfBuffer(html);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Invoice_${invoice.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
