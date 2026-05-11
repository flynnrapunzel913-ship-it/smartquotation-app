import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const module = searchParams.get("module");

  try {
    if (!module) {
      return NextResponse.json([]);
    }

    const databases = await prisma.productDatabase.findMany({
      where: { module },
      select: {
        id: true,
        name: true,
        module: true,
        sourceFile: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: { products: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(databases);
  } catch (error: any) {
    console.error("GET databases failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, products, sourceFile, module = "MR_INVOICE" } = await req.json();

    // Deactivate all others in this module
    await prisma.productDatabase.updateMany({
      where: { module },
      data: { isActive: false }
    });

    // Create database
    const database = await prisma.productDatabase.create({
      data: {
        name,
        module,
        sourceFile,
        isActive: true,
        products: {
          create: products.map((p: any) => ({
            name: p.name,
            description: p.description,
            productCode: p.productCode,
            defaultRate: p.defaultRate,
            unit: p.unit,
            category: p.category || "Database",
            hsnCode: p.hsnCode,
            gstRate: p.gstRate,
          })),
        },
      },
    });

    return NextResponse.json(database);
  } catch (error: any) {
    console.error("Error creating database:", error);
    return NextResponse.json({ 
      error: `Database Error: ${error.message || "Failed to save database."}`,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}
