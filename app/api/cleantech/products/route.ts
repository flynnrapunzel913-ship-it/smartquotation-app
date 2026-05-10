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

    const products = await prisma.product.findMany({
      where: {
        category: {
          in: ["MACHINE", "SPARE"]
        }
      },
      orderBy: [{ category: "asc" }, { name: "asc" }],
      take: limit,
      skip: offset,
    });

    const total = await prisma.product.count({
      where: {
        category: {
          in: ["MACHINE", "SPARE"]
        }
      }
    });

    return NextResponse.json({ products, total });
  } catch (error: any) {
    console.error("GET products failed:", error);
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
      const products = await prisma.product.createMany({
        data: body.map(p => ({
          name: p.name,
          description: p.description,
          category: p.category,
          defaultRate: parseFloat(p.defaultRate.toString()),
          hsnCode: p.hsnCode || "",
          imagePath: p.imagePath,
          unit: p.unit || "Nos"
        }))
      });
      return NextResponse.json({ count: products.count });
    } else {
      const { name, description, category, defaultRate, hsnCode, imagePath, unit } = body;
 
      // Validate required fields
      if (!name || !description || !category || !defaultRate) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
 
      const product = await prisma.product.create({
        data: {
          name,
          description,
          category,
          defaultRate: parseFloat(defaultRate.toString()),
          hsnCode: hsnCode || "",
          imagePath,
          unit: unit || "Nos"
        }
      });
      return NextResponse.json(product);
    }
  } catch (error: any) {
    console.error("POST products failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
