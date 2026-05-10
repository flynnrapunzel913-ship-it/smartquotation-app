import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const datasets = await prisma.productDataset.findMany({
      where: { module: "INVOICE" },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(datasets);
  } catch (error) {
    console.error("Error fetching datasets:", error);
    return NextResponse.json({ error: "Failed to fetch datasets" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, products, sourceFile } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const dataset = await prisma.productDataset.create({
      data: {
        name,
        module: "INVOICE",
        sourceFile,
        products: {
          create: (products || []).map((p: any) => ({
            name: p.name,
            description: p.description || "",
            defaultRate: p.defaultRate || 0,
            unit: p.unit || "Nos",
            hsnCode: p.hsnCode || "",
            gstRate: p.gstRate || 0,
            sectionCode: p.sectionCode || "",
            category: "Dataset",
          })),
        },
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json(dataset);
  } catch (error) {
    console.error("Error creating dataset:", error);
    return NextResponse.json({ error: "Failed to create dataset" }, { status: 500 });
  }
}
