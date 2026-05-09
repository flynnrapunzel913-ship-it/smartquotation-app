import fs from "fs";
import path from "path";
import type { CompanySettings } from "@prisma/client";
import type { QuotationWithRelations } from "@/types";

const SAMPLE_DIR = path.join(process.cwd(), "data");

export function listMrQuotationSamples(): string[] {
  if (!fs.existsSync(SAMPLE_DIR)) return [];
  return fs
    .readdirSync(SAMPLE_DIR)
    .filter((file) => /^sample-mr-.*\.json$/.test(file))
    .sort();
}

export function resolveMrQuotationSample(sample?: string | null): string {
  const samples = listMrQuotationSamples();
  const requested = sample?.trim();
  if (requested && samples.includes(requested)) return requested;
  return samples[0] ?? "sample-mr-quotation.json";
}

export function loadMrQuotationSample(sample?: string | null): QuotationWithRelations {
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
  } as QuotationWithRelations;
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
