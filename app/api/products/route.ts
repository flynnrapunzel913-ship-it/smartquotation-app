import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const companyType = searchParams.get("companyType");
  
  const limit = parseInt(searchParams.get("limit") || "1000");
  const offset = parseInt(searchParams.get("offset") || "0");
  const search = searchParams.get("search") || "";

  try {
    if (companyType) {
      const catalogProducts = await prisma.productCatalog.findMany({
        where: { companyType: companyType as any },
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          unitPrice: true,
          unit: true,
        },
        orderBy: [{ category: "asc" }, { name: "asc" }]
      });
      // Map to the format expected by the frontend
      return NextResponse.json(catalogProducts.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        category: p.category,
        defaultRate: Number(p.unitPrice),
        unit: p.unit || "Nos",
        warranty: "",
        imagePath: null,
        imageText: null,
        sectionCode: "A"
      })));
    }

    const databaseId = searchParams.get("databaseId");
    const module = searchParams.get("module");

    const where: any = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { productCode: { contains: search, mode: "insensitive" } },
        ]
      }),
      ...(databaseId && { databaseId }),
      ...(module && { database: { module } })
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        take: limit,
        skip: offset,
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          defaultRate: true,
          unit: true,
          warranty: true,
          imagePath: true,
          imageText: true,
          sectionCode: true,
          hsnCode: true,
        },
        orderBy: [{ category: "asc" }, { name: "asc" }]
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json({ 
      products: products.map(p => ({
        ...p,
        unitPrice: Number(p.defaultRate), // Compatibility with InvoiceCatalogManager
        type: p.category // Compatibility with InvoiceCatalogManager
      })), 
      total 
    });
  } catch (error: any) {
    console.error("GET products failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, description, category, defaultRate, unit, warranty, hsnCode, imagePath, databaseId } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        category: category || "General",
        defaultRate: parseFloat(defaultRate.toString()),
        unit: unit || "Nos",
        warranty: warranty || "",
        hsnCode: hsnCode || "",
        imagePath,
        databaseId,
      }
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("POST product failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
