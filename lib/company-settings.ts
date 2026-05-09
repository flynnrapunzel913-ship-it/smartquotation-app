import { prisma } from "@/lib/prisma";
import type { CompanySettings } from "@prisma/client";

export async function getOrCreateCompanySettings(): Promise<CompanySettings> {
  const first = await prisma.companySettings.findFirst({ orderBy: { createdAt: "asc" } });
  if (first) return first;
  return prisma.companySettings.create({
    data: {
      companyName: "M R Swimming Pools",
      address: "",
      gstin: "",
      phones: "",
      email: "",
      defaultGstRate: 18,
      terms: "",
      paymentTerms: "",
    },
  });
}
