import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const products = await prisma.product.findMany({ 
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        defaultRate: true,
        unit: true,
      },
      orderBy: [{ category: "asc" }, { name: "asc" }] 
    });
    console.log("Products returned:", products.length);
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("API products error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load products" },
      { status: 500 }
    );
  }
}
