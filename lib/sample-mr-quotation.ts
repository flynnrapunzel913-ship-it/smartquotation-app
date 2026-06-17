import fs from "fs";
import path from "path";
import type { CompanySettings } from "@prisma/client";
import type { QuotationFormValues, QuotationSection, QuotationWithRelations } from "@/types";
import {
  MR_SAMPLE_CATALOG,
  getMrSampleByFilename,
  getMrSampleDisplayName,
} from "@/lib/mr-sample-catalog";

const SAMPLE_DIR = path.join(process.cwd(), "data");

export type MrSampleListEntry = {
  filename: string;
  displayName: string;
  description: string;
  quoteNumber: string;
  sourceBill: string;
  poolType?: string;
  isSample: true;
};

export function listMrQuotationSamples(): string[] {
  const files = fs.existsSync(SAMPLE_DIR)
    ? fs.readdirSync(SAMPLE_DIR).filter((file) => /^sample-mr-.*\.json$/.test(file))
    : [];
  return ["MASTER_TEMPLATE", ...files.sort()];
}

export function listMrSampleCatalog(): MrSampleListEntry[] {
  return MR_SAMPLE_CATALOG.map((s) => ({
    filename: s.filename,
    displayName: s.displayName,
    description: s.description,
    quoteNumber: s.quoteNumber,
    sourceBill: s.sourceBill,
    poolType: s.poolType,
    isSample: true as const,
  }));
}

export { getMrSampleDisplayName };

export function resolveMrQuotationSample(sample?: string | null): string {
  const samples = listMrQuotationSamples();
  const requested = sample?.trim();
  if (requested && samples.includes(requested)) return requested;
  const catalogDefault = MR_SAMPLE_CATALOG[0]?.filename;
  if (catalogDefault && samples.includes(catalogDefault)) return catalogDefault;
  return samples.find((s) => s !== "MASTER_TEMPLATE") ?? catalogDefault ?? "sample-mr-mundgod-overflow.json";
}

import { MR_MASTER_TEMPLATE } from "./templates/mr-master-template";

export function getMrMasterTemplate(): QuotationWithRelations {
  const now = new Date();
  return {
    ...MR_MASTER_TEMPLATE,
    id: "master-template",
    date: now,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    customer: {
      id: "master-customer",
      name: "Valued Customer",
      address: "Site Location",
      phone: "",
      email: "",
      createdAt: now,
      updatedAt: now,
    },
    items: (MR_MASTER_TEMPLATE.items || []).map((it, idx) => ({
      ...it,
      id: `master-item-${idx}`,
      quotationId: "master-template",
    })),
  } as unknown as QuotationWithRelations;
}

export function loadMrQuotationSample(sample?: string | null): QuotationWithRelations {
  if (sample === "MASTER_TEMPLATE") return getMrMasterTemplate();
  const filename = resolveMrQuotationSample(sample);
  const samplePath = path.join(SAMPLE_DIR, filename);
  const raw = JSON.parse(fs.readFileSync(samplePath, "utf-8"));

  return {
    ...raw,
    date: new Date(raw.date),
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
    deletedAt: raw.deletedAt ? new Date(raw.deletedAt) : null,
    customer: {
      ...raw.customer,
      createdAt: new Date(raw.customer.createdAt),
      updatedAt: new Date(raw.customer.updatedAt),
    },
    items: (raw.items ?? []).map((item: Record<string, unknown>) => ({
      ...item,
      qty: Number(item.qty),
      rate: Number(item.rate),
      amount: Number(item.amount),
    })),
  } as QuotationWithRelations;
}

export function mrSampleToFormValues(quote: QuotationWithRelations): QuotationFormValues {
  const specs = quote.projectSpecifications as QuotationFormValues["projectSpecifications"];
  return {
    customerName: quote.customer.name,
    customerAddress: quote.customer.address,
    customerPhone: quote.customer.phone || "",
    customerEmail: quote.customer.email || "",
    quoteNumber: quote.quoteNumber,
    date: new Date(quote.date).toISOString().split("T")[0],
    gstPercent: Number(quote.gstPercent),
    title: quote.title || "",
    notes: quote.notes || "",
    terms: quote.terms || "",
    paymentTerms: quote.paymentTerms || "",
    projectSpecifications: {
      ...specs,
      poolLength: String(specs.poolLength ?? ""),
      poolWidth: String(specs.poolWidth ?? ""),
      poolDepth: String(specs.poolDepth ?? ""),
      plantRoomLength: String(specs.plantRoomLength ?? "12"),
      plantRoomWidth: String(specs.plantRoomWidth ?? "12"),
      plantRoomHeight: String(specs.plantRoomHeight ?? "6"),
      kidPoolLength: String(specs.kidPoolLength ?? ""),
      kidPoolWidth: String(specs.kidPoolWidth ?? ""),
      kidPoolDepth: String(specs.kidPoolDepth ?? ""),
      balancingTankLength: String(specs.balancingTankLength ?? ""),
      balancingTankWidth: String(specs.balancingTankWidth ?? ""),
      balancingTankDepth: String(specs.balancingTankDepth ?? ""),
      turnoverPeriod: String(specs.turnoverPeriod ?? "4"),
    },
    sections: (quote.sections as QuotationSection[]) ?? [],
    items: quote.items.map((it) => ({
      section: it.section,
      serialNo: it.serialNo,
      category: it.category,
      title: it.title || it.category,
      description: it.description,
      warranty: it.warranty || "",
      qty: Number(it.qty),
      unit: it.unit,
      rate: Number(it.rate),
      amount: Number(it.amount),
      imageUrl: it.imageUrl,
      imageText: it.imageText,
      productId: it.productId,
      variableValues: (it.variableValues as Record<string, string>) ?? {},
      templateText: it.description,
      poolTypeFilter: (it as { poolTypeFilter?: "skimmer" | "overflow" }).poolTypeFilter,
    })),
  };
}

export function loadMrSampleFormValues(sample?: string | null): QuotationFormValues {
  const quote = loadMrQuotationSample(sample);
  const meta = getMrSampleByFilename(resolveMrQuotationSample(sample));
  const values = mrSampleToFormValues(quote);
  if (meta?.title) values.title = meta.title;
  return values;
}

export function getSampleCompanySettings(): CompanySettings {
  const now = new Date("2026-05-09T00:00:00.000Z");
  return {
    id: "sample-company",
    companyName: "MR SWIMMING POOLS & SPA CONSTRUCTION COMPANY",
    logoUrl: null,
    address: "",
    gstin: "",
    phones: "",
    email: "",
    signatureUrl: null,
    defaultGstRate: 18,
    terms: "",
    paymentTerms: "",
    createdAt: now,
    updatedAt: now,
  } as unknown as CompanySettings;
}
