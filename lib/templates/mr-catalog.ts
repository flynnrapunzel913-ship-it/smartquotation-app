import { prisma } from "@/lib/prisma";
import { MR_PRODUCT_DEFINITIONS } from "@/lib/templates/mr-product-definitions";

const DEF_BY_ID = new Map(MR_PRODUCT_DEFINITIONS.map((d) => [d.id, d]));

function extractTemplateVariables(description: string): string[] {
  const matches = description.matchAll(/{{(\w+)}}/g);
  return Array.from(new Set(Array.from(matches, (m) => m[1])));
}

type DbProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  sectionCode: string;
  defaultRate: { toString(): string } | number;
  unit: string;
  warranty: string;
  imagePath: string | null;
  imageText: string | null;
  hsnCode?: string | null;
  gstRate?: { toString(): string } | number | null;
};

export type MRCatalogProduct = {
  id: string;
  companyType: "MR_SWIMMING_POOLS";
  category: string;
  code: string;
  name: string;
  description: string;
  unitPrice: number;
  unit: string;
  sectionCode: string;
  warranty: string;
  imagePath: string | null;
  imageText: string | null;
  hsnCode: string;
  gstRate: number;
  poolTypeFilter: "skimmer" | "overflow" | null;
  templateVariables: string[];
  defaultVariableValues: Record<string, string>;
};

export function enrichMRProduct(db: DbProduct): MRCatalogProduct {
  const def = DEF_BY_ID.get(db.id);
  const description = db.description || def?.description || "";
  return {
    id: db.id,
    companyType: "MR_SWIMMING_POOLS",
    category: db.category,
    code: db.id,
    name: db.name,
    description,
    unitPrice: Number(db.defaultRate),
    unit: db.unit,
    sectionCode: db.sectionCode,
    warranty: db.warranty,
    imagePath: db.imagePath ?? def?.imagePath ?? null,
    imageText: db.imageText ?? def?.imageText ?? null,
    hsnCode: db.hsnCode ?? "",
    gstRate: Number(db.gstRate ?? 18),
    poolTypeFilter: def?.poolTypeFilter ?? null,
    templateVariables: def?.templateVariables?.length
      ? def.templateVariables
      : extractTemplateVariables(description),
    defaultVariableValues: def?.defaultVariableValues ?? {},
  };
}

/** All MR template products from the database (full catalog for any pool type). */
export async function fetchMRCatalogProducts(options?: {
  query?: string;
  category?: string;
}): Promise<MRCatalogProduct[]> {
  const query = (options?.query ?? "").toLowerCase();
  const category = options?.category ?? "";

  const rows = await prisma.product.findMany({
    where: { id: { startsWith: "seed-temp-prod" } },
    orderBy: [{ sectionCode: "asc" }, { sortOrder: "asc" }],
  });

  return rows
    .map(enrichMRProduct)
    .filter((p) => {
      const matchesCategory = !category || p.category === category;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.sectionCode.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
}

/** In-memory fallback when DB is unavailable (definitions only). */
export function getMRCatalogProductsFromDefinitions(options?: {
  query?: string;
  category?: string;
}): MRCatalogProduct[] {
  const query = (options?.query ?? "").toLowerCase();
  const category = options?.category ?? "";

  return MR_PRODUCT_DEFINITIONS.filter((def) => {
    const matchesCategory = !category || def.category === category;
    const matchesQuery =
      !query ||
      def.name.toLowerCase().includes(query) ||
      def.title.toLowerCase().includes(query) ||
      def.category.toLowerCase().includes(query) ||
      def.section.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  }).map((def) =>
    enrichMRProduct({
      id: def.id,
      name: def.name,
      description: def.description,
      category: def.category,
      sectionCode: def.section,
      defaultRate: def.defaultRate,
      unit: def.unit,
      warranty: def.warranty,
      imagePath: def.imagePath,
      imageText: def.imageText ?? null,
    }),
  );
}
