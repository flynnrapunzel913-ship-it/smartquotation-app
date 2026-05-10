import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CompanyType } from "@/generated/prisma-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyType = searchParams.get("companyType") as CompanyType;
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  if (!companyType) {
    return NextResponse.json({ error: "companyType is required" }, { status: 400 });
  }

  try {
    const products = await prisma.productCatalog.findMany({
      where: {
        companyType,
        AND: [
          category ? { category } : {},
          query ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { code: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          } : {},
        ],
      },
      orderBy: { name: "asc" },
      take: 50,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching catalog:", error);
    return NextResponse.json({ error: "Failed to fetch catalog" }, { status: 500 });
  }
}
