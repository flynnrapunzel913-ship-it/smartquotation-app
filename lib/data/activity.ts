import { prisma } from "@/lib/prisma";
import {
  type ActivityFilter,
  type ActivityItem,
  filterActivities,
  mapInvoiceToActivity,
  mapQuotationToActivity,
} from "@/lib/activity";

export async function listRecentActivity(options: {
  limit?: number;
  filter?: ActivityFilter;
}): Promise<ActivityItem[]> {
  const limit = Math.min(Math.max(options.limit ?? 20, 1), 100);
  const filter = options.filter ?? "all";

  const fetchQuotations = filter !== "invoices";
  const fetchInvoices = filter === "all" || filter === "invoices";

  const quotationTake =
    filter === "mr-quotations" ? Math.min(limit * 6, 120) : Math.min(limit * 2, 80);
  const invoiceTake = Math.min(limit * 2, 80);

  const [quotations, invoices] = await Promise.all([
    fetchQuotations
      ? prisma.quotation.findMany({
          where: { deletedAt: null },
          select: {
            id: true,
            quoteNumber: true,
            title: true,
            isDraft: true,
            createdAt: true,
            date: true,
            projectSpecifications: true,
          },
          orderBy: { createdAt: "desc" },
          take: quotationTake,
        })
      : Promise.resolve([]),
    fetchInvoices
      ? prisma.invoice.findMany({
          select: {
            id: true,
            invoiceNumber: true,
            isDraft: true,
            createdAt: true,
            invoiceDate: true,
          },
          orderBy: { createdAt: "desc" },
          take: invoiceTake,
        })
      : Promise.resolve([]),
  ]);

  const items: ActivityItem[] = [
    ...quotations.map((q) =>
      mapQuotationToActivity({
        id: q.id,
        quoteNumber: q.quoteNumber,
        title: q.title,
        isDraft: q.isDraft,
        createdAt: q.createdAt.toISOString(),
        date: q.date.toISOString(),
        projectSpecifications: q.projectSpecifications as { quotationType?: string },
      }),
    ),
    ...invoices.map((i) =>
      mapInvoiceToActivity({
        ...i,
        createdAt: i.createdAt.toISOString(),
        invoiceDate: i.invoiceDate.toISOString(),
      }),
    ),
  ];

  return filterActivities(items, filter)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}
