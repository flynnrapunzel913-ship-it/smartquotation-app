import type { CatalogProduct } from "@/lib/catalog-cache";

export type InvoiceCatalogProduct = {
  id: string;
  name: string;
  description: string;
  defaultRate: number;
  hsnCode: string;
  gstRate: number;
  unit: string;
  imagePath?: string | null;
  sectionCode?: string;
};

export function mapCatalogToInvoiceProduct(p: CatalogProduct): InvoiceCatalogProduct {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    defaultRate: p.defaultRate,
    hsnCode: p.hsnCode ?? "",
    gstRate: p.gstRate ?? 18,
    unit: p.unit || "Nos",
    imagePath: p.imagePath,
    sectionCode: p.sectionCode,
  };
}

export function filterInvoiceProducts(
  products: InvoiceCatalogProduct[],
  query: string,
  limit = 8,
): InvoiceCatalogProduct[] {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 1) return [];

  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.hsnCode.toLowerCase().includes(q) ||
        (p.sectionCode?.toLowerCase().includes(q) ?? false),
    )
    .slice(0, limit);
}

/** Fetch latest product row from the shared MR Product table (live pricing). */
export async function fetchLiveMRProduct(id: string): Promise<InvoiceCatalogProduct | null> {
  try {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) return null;
    const p = await res.json();
    return {
      id: p.id,
      name: p.name,
      description: p.description || "",
      defaultRate: Number(p.defaultRate),
      hsnCode: p.hsnCode || "",
      gstRate: Number(p.gstRate ?? 18),
      unit: p.unit || "Nos",
      imagePath: p.imagePath,
      sectionCode: p.sectionCode,
    };
  } catch {
    return null;
  }
}

export function invoiceItemFromProduct(
  p: InvoiceCatalogProduct,
  qty = 1,
): {
  productId: string;
  description: string;
  unitPrice: number;
  qty: number;
  total: number;
  hsn: string;
  gstRate: number;
  unit: string;
  imageUrl?: string | null;
} {
  return {
    productId: p.id,
    description: p.name,
    unitPrice: p.defaultRate,
    qty,
    total: p.defaultRate * qty,
    hsn: p.hsnCode,
    gstRate: p.gstRate,
    unit: p.unit,
    imageUrl: p.imagePath,
  };
}
