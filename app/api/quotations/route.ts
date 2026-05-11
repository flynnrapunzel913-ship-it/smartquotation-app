import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { QuotationFormValues } from "@/types";
import { listQuotations } from "@/lib/data/quotations";
import { convertToWordsINR } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;
    
    console.log("Fetching quotations with search:", search);
    const quotations = await listQuotations({ search });
    console.log("Quotations found:", quotations?.length || 0);
    
    return NextResponse.json(quotations || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: QuotationFormValues = await req.json();

    // Upsert customer
    const customer = await prisma.customer.create({
      data: {
        name: data.customerName,
        address: data.customerAddress,
        phone: data.customerPhone || null,
        email: data.customerEmail || null,
      },
    });

    // Calculate totals
    const subtotal = data.items.reduce((sum, item) => sum + Number(item.amount), 0);
    const gstPercent = Number(data.gstPercent) || 18;
    const gstAmount = (subtotal * gstPercent) / 100;
    const grandTotal = subtotal + gstAmount;

    // Convert total to words (basic implementation, you can refine this later)
    const amountInWords = convertToWordsINR(grandTotal);

    // 1. Verify all productIds exist
    const productIds = data.items.map(i => i.productId).filter(Boolean) as string[];
    const validProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true }
    });
    const validProductIds = new Set(validProducts.map(p => p.id));

    const sanitizedItems = data.items.map(item => ({
      ...item,
      productId: item.productId && validProductIds.has(item.productId) ? item.productId : null
    }));

    // Upsert quotation based on quoteNumber
    const quotation = await prisma.quotation.upsert({
      where: { quoteNumber: data.quoteNumber },
      create: {
        quoteNumber: data.quoteNumber,
        title: data.title || "",
        customerId: customer.id,
        date: new Date(data.date),
        gstPercent: gstPercent,
        subtotal: subtotal,
        gstAmount: gstAmount,
        grandTotal: grandTotal,
        amountInWords: amountInWords,
        notes: data.notes || "",
        terms: data.terms || "",
        paymentTerms: data.paymentTerms || "",
        isDraft: data.isDraft || false,
        projectSpecifications: {
          ...(data.projectSpecifications as any),
          quotationType: (data as any).quotationType || "MR_SWIMMING_POOLS",
        },
        sections: (data.sections as any) || [],
        items: {
          create: sanitizedItems.map((item) => ({
            section: item.section,
            serialNo: item.serialNo,
            category: item.category || "General",
            description: item.description,
            warranty: item.warranty || "",
            qty: item.qty,
            unit: item.unit,
            rate: item.rate,
            amount: item.amount,
            imageUrl: item.imageUrl || null,
            productId: item.productId || null,
            variableValues: item.variableValues || {},
            isCustom: item.isCustom || false,
          })),
        },
      },
      update: {
        title: data.title || "",
        date: new Date(data.date),
        gstPercent: gstPercent,
        subtotal: subtotal,
        gstAmount: gstAmount,
        grandTotal: grandTotal,
        amountInWords: amountInWords,
        notes: data.notes || "",
        terms: data.terms || "",
        paymentTerms: data.paymentTerms || "",
        isDraft: data.isDraft || false,
        projectSpecifications: data.projectSpecifications as any,
        sections: (data.sections as any) || [],
        items: {
          deleteMany: {},
          create: sanitizedItems.map((item) => ({
            section: item.section,
            serialNo: item.serialNo,
            category: item.category || "General",
            description: item.description,
            warranty: item.warranty || "",
            qty: item.qty,
            unit: item.unit,
            rate: item.rate,
            amount: item.amount,
            imageUrl: item.imageUrl || null,
            productId: item.productId || null,
            variableValues: item.variableValues || {},
            isCustom: item.isCustom || false,
          })),
        },
      }
    });

    return NextResponse.json({ success: true, id: quotation.id });
  } catch (error: unknown) {
    console.error("Error creating quotation:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}

