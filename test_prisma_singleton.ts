import { prisma } from "./lib/prisma";

async function main() {
  const result = await prisma.product.findMany({ take: 1 });
  console.log("SUCCESS! Found product with imageText:", result[0].imageText);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("FAILURE:", e);
    prisma.$disconnect();
    process.exit(1);
  });
