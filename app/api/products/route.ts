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
  
  try {
    if (companyType) {
      const catalogProducts = await prisma.productCatalog.findMany({
        where: { companyType: companyType as any },
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

    const products = await prisma.product.findMany({ 
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
