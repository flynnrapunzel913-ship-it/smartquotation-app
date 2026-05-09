import fs from "fs";
import path from "path";
import type { CompanySettings } from "@prisma/client";
import type { QuotationWithRelations } from "@/types";

const SAMPLE_DIR = path.join(process.cwd(), "data");

export function listMrQuotationSamples(): string[] {
  const files = fs.existsSync(SAMPLE_DIR) 
    ? fs.readdirSync(SAMPLE_DIR).filter((file) => /^sample-mr-.*\.json$/.test(file))
    : [];
  return ["MASTER_TEMPLATE", ...files.sort()];
}

export function resolveMrQuotationSample(sample?: string | null): string {
  const samples = listMrQuotationSamples();
  const requested = sample?.trim();
  if (requested && samples.includes(requested)) return requested;
  return samples[0] ?? "sample-mr-quotation.json";
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
