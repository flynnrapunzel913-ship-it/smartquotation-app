import { MR_SAMPLE_CATALOG } from "@/lib/mr-sample-catalog";

export type ActivityItem = {
  id: string;
  type: "quotation" | "invoice";
  name: string;
  module: string;
  status: string;
  timestamp: string;
  isDraft: boolean;
  quotationType?: string;
  isSample?: boolean;
  isKleanTech?: boolean;
};

const SAMPLE_QUOTE_NUMBERS = new Set(MR_SAMPLE_CATALOG.map((s) => s.quoteNumber));

const MODULE_LABELS: Record<string, string> = {
  "klean-tech": "Klean Tech Systems",
  KLEAN_TECH_SYSTEMS: "Klean Tech Systems",
  "mr-construction": "MR Construction",
  "mr-invoice": "MR Invoice",
  MR_SWIMMING_POOLS: "MR Swimming Pools & Spa Construction Company",
};

export function isKleanTechQuotation(q: {
  quotationType?: string;
  title?: string;
  projectSpecifications?: { quotationType?: string };
}): boolean {
  const specs = q.projectSpecifications;
  const t = String(q.quotationType ?? specs?.quotationType ?? "").toLowerCase();
  return t === "klean-tech" || t === "klean_tech_systems" || q.title === "KLEAN TECH SYSTEMS Quotation";
}

export function isMrSwimmingPoolsQuotation(q: {
  quotationType?: string;
  projectSpecifications?: { quotationType?: string };
}): boolean {
  if (isKleanTechQuotation(q)) return false;
  const specs = q.projectSpecifications;
  const t = String(q.quotationType ?? specs?.quotationType ?? "").toUpperCase();
  return t === "MR_SWIMMING_POOLS" || t === "" || t === "MR-CONSTRUCTION" || t === "MR_CONSTRUCTION";
}

export function mapQuotationToActivity(q: {
  id: string;
  quoteNumber?: string;
  title?: string;
  isDraft?: boolean;
  createdAt?: string;
  date?: string;
  projectSpecifications?: { quotationType?: string };
}): ActivityItem {
  const quoteNumber = q.quoteNumber || "Untitled Quote";
  const specs = q.projectSpecifications;
  let module = "MR Construction";
  if (isKleanTechQuotation(q)) {
    module = "Klean Tech Systems";
  } else if (specs?.quotationType === "MR_SWIMMING_POOLS" || isMrSwimmingPoolsQuotation(q)) {
    module = "MR Swimming Pools & Spa Construction Company";
  } else if (specs?.quotationType) {
    module = MODULE_LABELS[specs.quotationType] || "MR Construction";
  }

  return {
    id: q.id,
    type: "quotation",
    name: quoteNumber,
    module,
    status: q.isDraft ? "Draft" : "Completed",
    timestamp: q.createdAt || q.date || new Date().toISOString(),
    isDraft: !!q.isDraft,
    quotationType: specs?.quotationType,
    isSample: SAMPLE_QUOTE_NUMBERS.has(quoteNumber),
    isKleanTech: isKleanTechQuotation(q),
  };
}

export function mapInvoiceToActivity(i: {
  id: string;
  invoiceNumber?: string;
  isDraft?: boolean;
  createdAt?: string;
  invoiceDate?: string;
}): ActivityItem {
  return {
    id: i.id,
    type: "invoice",
    name: i.invoiceNumber || "Untitled Invoice",
    module: "MR Invoice",
    status: i.isDraft ? "Draft" : "Generated",
    timestamp: i.createdAt || i.invoiceDate || new Date().toISOString(),
    isDraft: !!i.isDraft,
  };
}

export type ActivityFilter = "all" | "mr-quotations" | "quotations" | "invoices";

export function filterActivities(items: ActivityItem[], filter: ActivityFilter): ActivityItem[] {
  if (filter === "all") return items;
  if (filter === "invoices") return items.filter((i) => i.type === "invoice");
  if (filter === "quotations") return items.filter((i) => i.type === "quotation");
  return items.filter((i) => i.type === "quotation" && !i.isKleanTech);
}

export function getQuotationEditPath(item: ActivityItem): string {
  if (item.isKleanTech) {
    return `/quotations/klean-tech/${item.id}/edit`;
  }
  return `/quotations/mr-swimming-pools/new?id=${item.id}`;
}

export function openActivityItem(item: ActivityItem): void {
  if (item.type === "invoice") {
    if (item.isDraft) {
      window.location.href = `/dashboard/invoices/edit/${item.id}`;
    } else {
      window.open(`/dashboard/invoices/preview/${item.id}`, "_blank");
    }
    return;
  }

  if (item.isDraft) {
    window.location.href = getQuotationEditPath(item);
  } else {
    window.open(`/api/quotations/${item.id}/pdf?disposition=inline`, "_blank");
  }
}

export async function fetchRecentActivities(limit = 50): Promise<ActivityItem[]> {
  const [qRes, iRes] = await Promise.all([
    fetch("/api/quotations"),
    fetch("/api/invoices"),
  ]);

  const qData = await qRes.json();
  const iData = await iRes.json();

  const quotations = Array.isArray(qData) ? qData.map(mapQuotationToActivity) : [];
  const invoices = Array.isArray(iData) ? iData.map(mapInvoiceToActivity) : [];

  const merged = [...quotations, ...invoices].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return merged.slice(0, limit);
}
