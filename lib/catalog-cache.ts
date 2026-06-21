export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  sectionCode: string;
  unit: string;
  warranty: string;
  defaultRate: number;
  hsnCode?: string;
  gstRate?: number;
  imagePath?: string | null;
  imageText?: string | null;
  templateText?: string;
  templateVariables?: string[];
  defaultVariableValues?: Record<string, string>;
  poolTypeFilter?: "skimmer" | "overflow" | null;
};

function enrichCatalogRow(p: Record<string, unknown>): CatalogProduct {
  const tText = String(p.description || "");
  const matches = tText.matchAll(/{{(\w+)}}/g);
  const extractedVars = Array.from(new Set(Array.from(matches, (m) => m[1])));
  const templateVariables = (p.templateVariables as string[] | undefined)?.length
    ? (p.templateVariables as string[])
    : extractedVars;
  const specs = (p.specifications ?? {}) as Record<string, unknown>;

  return {
    id: String(p.id),
    name: String(p.name),
    description: tText,
    category: String(p.category || "General"),
    sectionCode: String(p.sectionCode || specs.sectionCode || "A"),
    unit: String(p.unit || "Nos"),
    warranty: String(p.warranty || specs.warranty || ""),
    defaultRate: Number(p.unitPrice) || 0,
    hsnCode: String(p.hsnCode ?? ""),
    gstRate: Number(p.gstRate ?? 18),
    imagePath: (p.imagePath as string | null) ?? (specs.imagePath as string | null) ?? null,
    imageText: (p.imageText as string | null) ?? (specs.imageText as string | null) ?? null,
    templateText: tText,
    templateVariables,
    defaultVariableValues: (p.defaultVariableValues as Record<string, string>) || {},
    poolTypeFilter: (p.poolTypeFilter as CatalogProduct["poolTypeFilter"]) || (specs.poolTypeFilter as CatalogProduct["poolTypeFilter"]) || null,
  };
}

const cache = new Map<string, Promise<CatalogProduct[]>>();

export function invalidateCatalogCache(companyType?: string) {
  if (companyType) cache.delete(companyType);
  else cache.clear();
}

export function fetchCatalogProducts(companyType: string, options?: { fresh?: boolean }): Promise<CatalogProduct[]> {
  const key = companyType;
  if (options?.fresh) cache.delete(key);
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(`/api/catalog?companyType=${companyType}`)
        .then((res) => res.json())
        .then((data: Record<string, unknown>[]) => data.map(enrichCatalogRow))
        .catch((err) => {
          cache.delete(key);
          throw err;
        }),
    );
  }
  return cache.get(key)!;
}
