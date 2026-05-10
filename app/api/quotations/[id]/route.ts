import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { getQuotationById } from "@/lib/data/quotations";
import { convertToWordsINR } from "@/lib/utils";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const quote = await getQuotationById(id);

  if (!quote) {
    return NextResponse.json({ error: "Quotation not found" }, { status: 404 });
  }

  return NextResponse.json(quote);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await req.json();

  // 0. Verify all productIds exist
  const productIds = data.items.map((i: any) => i.productId).filter(Boolean) as string[];
  const validProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true }
  });
  const validProductIds = new Set(validProducts.map(p => p.id));

  const sanitizedItems = data.items.map((item: any) => ({
    ...item,
    productId: item.productId && validProductIds.has(item.productId) ? item.productId : null
  }));

  try {
    // 1. Update the quotation and customer in a transaction
    const updatedQuote = await prisma.$transaction(async (tx) => {
      // Find current quote to get customerId
      const current = await tx.quotation.findUnique({
        where: { id },
        select: { customerId: true },
      });

      if (!current) throw new Error("Quotation not found");

      // Update Customer
      await tx.customer.update({
        where: { id: current.customerId },
        data: {
          name: data.customerName,
          address: data.customerAddress,
          phone: data.customerPhone,
          email: data.customerEmail,
        },
      });

      // Update Quotation
      const quote = await tx.quotation.update({
        where: { id },
        data: {
          quoteNumber: data.quoteNumber,
          title: data.title || "",
          date: new Date(data.date),
          gstPercent: Number(data.gstPercent),
          grandTotal: data.grandTotal || 0,
          subtotal: data.subtotal || 0,
          projectSpecifications: data.projectSpecifications,
          amountInWords: convertToWordsINR(data.grandTotal || 0),
          notes: data.notes,
          terms: data.terms,
          paymentTerms: data.paymentTerms,
          sections: (data.sections as any) || [],
          isDraft: data.isDraft || false,
          updatedAt: new Date(),
        },
      });

      // Delete existing items and recreate them
      // (This is simpler than trying to diff and update)
      await tx.quotationItem.deleteMany({ where: { quotationId: id } });

      await tx.quotationItem.createMany({
        data: sanitizedItems.map((item: any) => ({
          quotationId: id,
          section: item.section,
          serialNo: item.serialNo,
          category: item.category || "General",
          description: item.description,
          warranty: item.warranty || "",
          qty: Number(item.qty),
          unit: item.unit,
          rate: Number(item.rate),
          amount: Number(item.amount),
          imageUrl: item.imageUrl || null,
          imageText: item.imageText || null,
          productId: item.productId || null,
          variableValues: item.variableValues || {},
          isCustom: item.isCustom || false,
        })),
      });

      return quote;
    });

    return NextResponse.json({ success: true, id: updatedQuote.id });
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Soft delete
    await prisma.quotation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
