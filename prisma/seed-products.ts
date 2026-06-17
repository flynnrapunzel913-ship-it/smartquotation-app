import { PrismaClient } from "../generated-client";
import { MR_PRODUCT_DEFINITIONS } from "../lib/templates/mr-product-definitions";

const prisma = new PrismaClient();

export async function seedProducts() {
  console.log("Seeding template-driven products...");

  for (const def of MR_PRODUCT_DEFINITIONS) {
    await prisma.product.upsert({
      where: { id: def.id },
      update: {
        name: def.name,
        description: def.description,
        category: def.category,
        sectionCode: def.section,
        defaultRate: def.defaultRate,
        unit: def.unit,
        warranty: def.warranty,
        imagePath: def.imagePath,
        imageText: def.imageText ?? null,
        sortOrder: def.sortOrder,
      },
      create: {
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
        sortOrder: def.sortOrder,
      },
    });
  }

  console.log(`Seeded ${MR_PRODUCT_DEFINITIONS.length} template products.`);
}

if (require.main === module) {
  seedProducts()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}
