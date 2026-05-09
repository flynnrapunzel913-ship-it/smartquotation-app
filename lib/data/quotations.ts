import { prisma } from "@/lib/prisma";
import type { QuotationWithRelations } from "@/types";

export async function getQuotationById(id: string): Promise<QuotationWithRelations | null> {
  return prisma.quotation.findFirst({
    where: { id, deletedAt: null },
    include: { customer: true, items: { orderBy: [{ section: "asc" }, { serialNo: "asc" }] } },
  });
}

export async function listQuotations(filters: {
  search?: string;
  from?: Date;
  to?: Date;
}) {
  const where: {
    deletedAt: null;
    OR?: object[];
    date?: { gte?: Date; lte?: Date };
  } = { deletedAt: null };

  if (filters.from || filters.to) {
    where.date = {};
    if (filters.from) where.date.gte = filters.from;
    if (filters.to) where.date.lte = filters.to;
  }

  if (filters.search?.trim()) {
    const q = filters.search.trim();
    where.OR = [
      { quoteNumber: { contains: q, mode: "insensitive" } },
      { title: { contains: q, mode: "insensitive" } },
      { customer: { name: { contains: q, mode: "insensitive" } } },
    ];
  }

  return prisma.quotation.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });
}

export async function dashboardStats() {
  const [totalQuotations, revenueAgg, recent] = await Promise.all([
    prisma.quotation.count({ where: { deletedAt: null } }),
    prisma.quotation.aggregate({
      where: { deletedAt: null },
      _sum: { grandTotal: true },
    }),
    prisma.quotation.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { customer: true },
    }),
  ]);

  return {
    totalQuotations,
    totalRevenue: Number(revenueAgg._sum.grandTotal ?? 0),
    recent,
  };
}
