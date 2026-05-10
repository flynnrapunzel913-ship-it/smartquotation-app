import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const databases = await prisma.productDatabase.findMany({
      where: { module: "INVOICE" },
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(databases);
  } catch (error: any) {
    console.error("Error fetching databases:", error);
    return NextResponse.json({ 
      error: `Database Error: ${error.message || "Failed to fetch databases."}`,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, products, sourceFile } = await req.json();

    // Create database
    const database = await prisma.productDatabase.create({
      data: {
        name,
        module: "INVOICE",
        sourceFile,
        products: {
          create: products.map((p: any) => ({
            name: p.name,
            description: p.description,
            productCode: p.productCode,
            defaultRate: p.defaultRate,
            unit: p.unit,
            category: "Database",
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
