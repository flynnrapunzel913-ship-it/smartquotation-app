/**
 * Generates data/sample-mr-*.json files from MR_SAMPLE_CATALOG + master product template.
 * Run: npx tsx scripts/generate-mr-sample-json.ts
 */
import fs from "fs";
import path from "path";
import { MR_MASTER_TEMPLATE } from "../lib/templates/mr-master-template";
import { buildMRTemplateItems } from "../lib/templates/mr-template-items";
import { MR_SAMPLE_CATALOG } from "../lib/mr-sample-catalog";
import { applyMRPoolMetricsToSpecs } from "../lib/mr-pool-utils";
import { DEFAULT_SPEC_SECTION_FLAGS } from "../lib/mr-pool-spec-sections";
import { convertToWordsINR, renderTemplate } from "../lib/utils";
import type { ProjectSpecifications } from "../types";

const DATA_DIR = path.join(process.cwd(), "data");

function buildSampleJson(config: (typeof MR_SAMPLE_CATALOG)[number]) {
  const baseSpecs = {
    ...(MR_MASTER_TEMPLATE.projectSpecifications as ProjectSpecifications),
    ...DEFAULT_SPEC_SECTION_FLAGS,
    ...(config.specs ?? {}),
    typeOfPool: config.poolType ?? MR_MASTER_TEMPLATE.projectSpecifications?.typeOfPool ?? "Overflow Pool",
  };

  const projectSpecifications = applyMRPoolMetricsToSpecs(baseSpecs);
  const items = buildMRTemplateItems().map((item, idx) => ({
    id: `${config.id}-item-${idx + 1}`,
    quotationId: config.id,
    section: item.section,
    serialNo: item.serialNo,
    category: item.category,
    title: item.title ?? item.category,
    description: renderTemplate(item.templateText ?? item.description, item.variableValues ?? {}),
    warranty: item.warranty,
    qty: item.qty,
    unit: item.unit,
    rate: item.rate,
    amount: item.amount,
    productId: item.productId ?? null,
    variableValues: item.variableValues ?? {},
    imageUrl: item.imageUrl ?? null,
    imageText: item.imageText ?? null,
    poolTypeFilter: item.poolTypeFilter ?? null,
  }));

  const subtotal = items.reduce((sum, item) => sum + Number(item.amount), 0);
  const gstPercent = Number(MR_MASTER_TEMPLATE.gstPercent ?? 18);
  const gstAmount = (subtotal * gstPercent) / 100;
  const grandTotal = subtotal + gstAmount;
  const stamp = `${config.date}T00:00:00.000Z`;

  return {
    id: config.id,
    quoteNumber: config.quoteNumber,
    title: config.title,
    date: stamp,
    gstPercent,
    subtotal,
    gstAmount,
    grandTotal,
    amountInWords: convertToWordsINR(grandTotal),
    notes: MR_MASTER_TEMPLATE.notes ?? "",
    terms: MR_MASTER_TEMPLATE.terms ?? "",
    paymentTerms: MR_MASTER_TEMPLATE.paymentTerms ?? "",
    isDraft: false,
    deletedAt: null,
    createdAt: stamp,
    updatedAt: stamp,
    customerId: `${config.id}-customer`,
    customer: {
      id: `${config.id}-customer`,
      name: config.customer.name,
      address: config.customer.address,
      phone: config.customer.phone ?? "",
      email: config.customer.email ?? "",
      createdAt: stamp,
      updatedAt: stamp,
    },
    projectSpecifications: {
      ...projectSpecifications,
      quotationType: "MR_SWIMMING_POOLS",
      sourceBill: config.sourceBill,
    },
    sections: MR_MASTER_TEMPLATE.sections ?? [],
    items,
  };
}

function main() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  for (const config of MR_SAMPLE_CATALOG) {
    const json = buildSampleJson(config);
    const outPath = path.join(DATA_DIR, config.filename);
    fs.writeFileSync(outPath, JSON.stringify(json, null, 2), "utf-8");
    console.log(`Wrote ${config.filename} — ${json.items.length} items, subtotal ₹${json.subtotal.toLocaleString("en-IN")}`);
  }
}

main();
