import "dotenv/config";
import { PrismaClient } from "../generated/prisma-client";
import bcrypt from "bcryptjs";
import { seedProducts } from "./seed-products";

const prisma = new PrismaClient();

// We now use seed-products.ts for this

async function main() {
  const adminEmail = "admin@smartquotation.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe!Smart2026";
  const hash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      passwordHash: hash,
      role: "ADMIN",
    },
    update: { passwordHash: hash },
  });

  if ((await prisma.companySettings.count()) === 0) {
    await prisma.companySettings.create({
      data: {
        companyName: "M R Swimming Pools",
        address: "Your business address\nCity, State — PIN",
        gstin: "",
        phones: "+91 …",
        email: "quotes@example.com",
        defaultGstRate: 18,
        terms:
          "Rates are valid for 30 days from the date of quotation.\nExecution timeline subject to site readiness and weather.",
        paymentTerms:
          "40% advance with order.\n40% on completion of civil & equipment.\n20% on commissioning & handover.",
      },
    });
  }

  // Seed new product master
  await seedProducts();

  console.log("Seed complete. Admin login:", adminEmail, "Password:", adminPassword);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
