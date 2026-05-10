import { PrismaClient } from "../generated/prisma-client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const catalogPath = path.join(process.cwd(), "scratch", "aqvastar_parsed.json");
  if (!fs.existsSync(catalogPath)) {
    console.error("Parsed catalog JSON not found. Run scratch/parse-aqvastar.ts first.");
    return;
  }

  const products = JSON.parse(fs.readFileSync(catalogPath, "utf8"));

  console.log(`Seeding ${products.length} products into ProductCatalog...`);

  // Clear existing MR_SWIMMING_POOLS products to avoid duplicates if re-seeding
  await prisma.productCatalog.deleteMany({
    where: { companyType: "MR_SWIMMING_POOLS" }
  });

  for (const product of products) {
    await prisma.productCatalog.create({
      data: {
        companyType: "MR_SWIMMING_POOLS",
        category: product.category,
        code: product.code,
        name: product.name,
        description: product.description,
        specifications: product.specifications,
        unitPrice: product.unitPrice,
        unit: product.unit,
        source: "Aqvastar 2025 Price List"
      }
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
