import { prisma } from "@/lib/prisma";

const QUOTE_PREFIX = "MRSP";

export async function generateQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);
  const count = await prisma.quotation.count({
    where: {
      deletedAt: null,
      date: { gte: start, lt: end },
    },
  });
  const seq = String(count + 1).padStart(3, "0");
  return `${QUOTE_PREFIX}-${year}-${seq}`;
}
