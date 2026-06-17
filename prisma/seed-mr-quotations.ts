import fs from "fs";
import path from "path";
import { PrismaClient } from "../generated-client";
import { MR_SAMPLE_CATALOG } from "../lib/mr-sample-catalog";
import { convertToWordsINR } from "../lib/utils";

const prisma = new PrismaClient();
const DATA_DIR = path.join(process.cwd(), "data");

export async function seedMrQuotations() {
  console.log("Seeding MR sample quotations...");

  for (const config of MR_SAMPLE_CATALOG) {
    const filePath = path.join(DATA_DIR, config.filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`  Skipping ${config.filename} — file not found. Run: npx tsx scripts/generate-mr-sample-json.ts`);
      continue;
    }

    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const productIds = raw.items.map((i: { productId?: string }) => i.productId).filter(Boolean) as string[];
    const validProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    });
    const validIds = new Set(validProducts.map((p) => p.id));

    const customer = await prisma.customer.upsert({
      where: { id: raw.customer.id },
      create: {
        id: raw.customer.id,
        name: raw.customer.name,
        address: raw.customer.address,
        phone: raw.customer.phone || null,
        email: raw.customer.email || null,
      },
      update: {
        name: raw.customer.name,
        address: raw.customer.address,
        phone: raw.customer.phone || null,
        email: raw.customer.email || null,
      },
    });

    const subtotal = raw.items.reduce((s: number, i: { amount: number }) => s + Number(i.amount), 0);
    const gstPercent = Number(raw.gstPercent) || 18;
    const gstAmount = (subtotal * gstPercent) / 100;
    const grandTotal = subtotal + gstAmount;

    const existing = await prisma.quotation.findUnique({ where: { quoteNumber: raw.quoteNumber } });

    if (existing) {
      await prisma.quotationItem.deleteMany({ where: { quotationId: existing.id } });
      await prisma.quotation.update({
        where: { id: existing.id },
        data: {
          title: raw.title,
          customerId: customer.id,
          date: new Date(raw.date),
          gstPercent,
          subtotal,
          gstAmount,
          grandTotal,
          amountInWords: convertToWordsINR(grandTotal),
          notes: raw.notes ?? "",
          terms: raw.terms ?? "",
          paymentTerms: raw.paymentTerms ?? "",
          projectSpecifications: raw.projectSpecifications,
          sections: raw.sections ?? [],
          isDraft: false,
          items: {
            create: raw.items.map((item: Record<string, unknown>) => ({
              section: item.section as string,
              serialNo: item.serialNo as number,
              category: (item.category as string) || "General",
              title: (item.title as string) || (item.category as string) || "",
              description: item.description as string,
              warranty: (item.warranty as string) || "",
              qty: item.qty as number,
              unit: item.unit as string,
              rate: item.rate as number,
              amount: item.amount as number,
              imageUrl: (item.imageUrl as string) || null,
              imageText: (item.imageText as string) || null,
              productId:
                item.productId && validIds.has(item.productId as string)
                  ? (item.productId as string)
                  : null,
              variableValues: (item.variableValues as object) ?? {},
            })),
          },
        },
      });
      console.log(`  Updated ${raw.quoteNumber}`);
    } else {
      await prisma.quotation.create({
        data: {
          id: raw.id,
          quoteNumber: raw.quoteNumber,
          title: raw.title,
          customerId: customer.id,
          date: new Date(raw.date),
          gstPercent,
          subtotal,
          gstAmount,
          grandTotal,
          amountInWords: convertToWordsINR(grandTotal),
          notes: raw.notes ?? "",
          terms: raw.terms ?? "",
          paymentTerms: raw.paymentTerms ?? "",
          projectSpecifications: raw.projectSpecifications,
          sections: raw.sections ?? [],
          isDraft: false,
          items: {
            create: raw.items.map((item: Record<string, unknown>) => ({
              section: item.section as string,
              serialNo: item.serialNo as number,
              category: (item.category as string) || "General",
              title: (item.title as string) || (item.category as string) || "",
              description: item.description as string,
              warranty: (item.warranty as string) || "",
              qty: item.qty as number,
              unit: item.unit as string,
              rate: item.rate as number,
              amount: item.amount as number,
              imageUrl: (item.imageUrl as string) || null,
              imageText: (item.imageText as string) || null,
              productId:
                item.productId && validIds.has(item.productId as string)
                  ? (item.productId as string)
                  : null,
              variableValues: (item.variableValues as object) ?? {},
            })),
          },
        },
      });
      console.log(`  Created ${raw.quoteNumber}`);
    }
  }
}

if (require.main === module) {
  seedMrQuotations()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}
