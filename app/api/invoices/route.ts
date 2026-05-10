import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const {
      invoiceNumber,
      invoiceDate,
      customerName,
      customerAddress1,
      customerAddress2,
      customerAddress3,
      customerCityPin,
      customerGST,
      customerMobile,
      items,
      subTotal,
      cgstRate,
      sgstRate,
      cgstAmount,
      sgstAmount,
      roundOff,
      grandTotal,
      amountInWords,
      bankDetails,
      sectionHeadings,
      customSections,
      isDraft,
    } = data;

    const fullAddress = [customerAddress1, customerAddress2, customerAddress3, customerCityPin]
      .filter(Boolean)
      .join("\n");

    const invoice = await prisma.invoice.upsert({
      where: { invoiceNumber },
      update: {
        invoiceDate: new Date(invoiceDate),
        customerName,
        customerAddress: fullAddress,
        customerGST,
        customerMobile,
        items,
        subTotal,
        cgstPercent: cgstRate,
        sgstPercent: sgstRate,
        cgstAmount,
        sgstAmount,
        roundOff,
        grandTotal,
        amountInWords,
        bankDetails,
        sectionHeadings,
        customSections,
        isDraft,
      },
      create: {
        invoiceNumber,
        invoiceDate: new Date(invoiceDate),
        customerName,
        customerAddress: fullAddress,
        customerGST,
        customerMobile,
        items,
        subTotal,
        cgstPercent: cgstRate,
        sgstPercent: sgstRate,
        cgstAmount,
        sgstAmount,
        roundOff,
        grandTotal,
        amountInWords,
        bankDetails,
        sectionHeadings,
        customSections,
        isDraft,
      },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error creating/updating invoice:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");

  try {
    const invoices = await prisma.invoice.findMany({
      where: search ? {
        OR: [
          { invoiceNumber: { contains: search, mode: "insensitive" } },
          { customerName: { contains: search, mode: "insensitive" } },
        ]
      } : {},
      orderBy: { invoiceDate: "desc" },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
