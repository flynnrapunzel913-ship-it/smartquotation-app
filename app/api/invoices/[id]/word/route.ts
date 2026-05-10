import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { generateInvoiceDocx } from "@/lib/generate-invoice-docx";

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

    const docxBuffer = await generateInvoiceDocx(invoice);

    return new NextResponse(docxBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="Invoice_${invoice.invoiceNumber}.docx"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice Word:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
