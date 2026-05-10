import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const products = await prisma.invoiceProduct.findMany({
      orderBy: [{ name: "asc" }],
      take: limit,
      skip: offset,
    });

    const total = await prisma.invoiceProduct.count();

    return NextResponse.json({ products, total });
  } catch (error: any) {
    console.error("GET invoice products failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      // Bulk insert
      const products = await prisma.invoiceProduct.createMany({
        data: body.map(p => ({
          name: p.name,
          description: p.description,
          type: p.type,
          unitPrice: parseFloat(p.unitPrice.toString()),
          hsnCode: p.hsnCode || "",
          imagePath: p.imagePath,
        }))
      });
      return NextResponse.json({ count: products.count });
    } else {
      const { name, description, type, unitPrice, hsnCode, imagePath } = body;

      // Validate required fields
      if (!name || !unitPrice) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const product = await prisma.invoiceProduct.create({
        data: {
          name,
          description,
          type,
          unitPrice: parseFloat(unitPrice.toString()),
          hsnCode: hsnCode || "",
          imagePath,
        }
      });
      return NextResponse.json(product);
    }
  } catch (error: any) {
    console.error("POST invoice products failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
