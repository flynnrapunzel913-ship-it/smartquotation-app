import { PrismaClient } from "../generated/prisma-client";

const prisma = new PrismaClient();

export async function seedMrAcademy() {
  console.log("Seeding MR Academy products...");

  const products = [
    {
      name: "Swimming Coaching - Monthly (Kids)",
      description: "Basic swimming coaching for kids, 1 hour daily, Monday to Friday.",
      category: "Coaching",
      unitPrice: 2500,
      unit: "Per Month",
    },
    {
      name: "Swimming Coaching - Monthly (Adults)",
      description: "Advanced swimming coaching for adults, 1 hour daily, Monday to Friday.",
      category: "Coaching",
      unitPrice: 3500,
      unit: "Per Month",
    },
    {
      name: "Weekend Batch - 8 Sessions",
      description: "Swimming coaching for weekend batches, Saturday and Sunday.",
      category: "Coaching",
      unitPrice: 2000,
      unit: "Per Course",
    },
    {
      name: "Personal Training - 10 Sessions",
      description: "One-on-one personal swimming training sessions.",
      category: "Training",
      unitPrice: 8000,
      unit: "Per Course",
    },
    {
      name: "Lifeguard Certification Course",
      description: "Professional lifeguard certification and training program.",
      category: "Certification",
      unitPrice: 12000,
      unit: "Per Head",
    },
    {
      name: "Pool Entry - Single Use",
      description: "Single use pool entry ticket.",
      category: "Services",
      unitPrice: 150,
      unit: "Nos",
    },
    {
      name: "Pool Membership - Yearly",
      description: "Annual pool membership for individuals.",
      category: "Membership",
      unitPrice: 25000,
      unit: "Per Year",
    }
  ];

  for (const product of products) {
    await prisma.productCatalog.create({
      data: {
        companyType: "MR_ACADEMY" as any,
        category: product.category,
        name: product.name,
        description: product.description,
        unitPrice: product.unitPrice,
        unit: product.unit,
        source: "MR Academy Catalog"
      }
    });
  }

  console.log(`Seeded ${products.length} MR Academy products.`);
}

if (require.main === module) {
  seedMrAcademy()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}
