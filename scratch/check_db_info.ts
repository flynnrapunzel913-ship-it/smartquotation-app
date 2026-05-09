import { PrismaClient } from "../generated/prisma-client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`
    SELECT current_database(), current_schema();
  `;
  console.log(JSON.stringify(result, null, 2));
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
