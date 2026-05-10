import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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
  } catch (error) {
    console.error("Error fetching databases:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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
  } catch (error) {
    console.error("Error creating database:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
