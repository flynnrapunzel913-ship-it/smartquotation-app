import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CompanyType } from "@/generated/prisma-client";
import { MR_PRODUCT_DEFINITIONS } from "@/lib/templates/mr-product-definitions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyType = searchParams.get("companyType") as CompanyType;
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  if (!companyType) {
    return NextResponse.json({ error: "companyType is required" }, { status: 400 });
  }

  try {
    if (companyType === "MR_SWIMMING_POOLS") {
      const normalizedQuery = query.toLowerCase();
      const products = MR_PRODUCT_DEFINITIONS.filter((def) => {
        const matchesCategory = !category || def.category === category;
        const matchesQuery =
          !normalizedQuery ||
          def.name.toLowerCase().includes(normalizedQuery) ||
          def.title.toLowerCase().includes(normalizedQuery) ||
          def.category.toLowerCase().includes(normalizedQuery) ||
          def.section.toLowerCase().includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      }).map((def) => ({
        id: def.id,
        companyType,
        category: def.category,
        code: def.id,
        name: def.name,
        description: def.description,
        unitPrice: def.defaultRate,
        unit: def.unit,
        sectionCode: def.section,
        warranty: def.warranty,
        imagePath: def.imagePath,
        imageText: def.imageText ?? null,
        poolTypeFilter: def.poolTypeFilter ?? null,
        templateVariables: def.templateVariables ?? [],
        defaultVariableValues: def.defaultVariableValues ?? {},
      }));

      return NextResponse.json(products);
    }

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
      select: {
        id: true,
        companyType: true,
        category: true,
        code: true,
        name: true,
        description: true,
        unitPrice: true,
        unit: true,
        specifications: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching catalog:", error);
    return NextResponse.json({ error: "Failed to fetch catalog" }, { status: 500 });
  }
}
