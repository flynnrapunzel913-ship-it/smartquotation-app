import type { Customer, Quotation, QuotationItem, Product, CompanySettings } from "@prisma/client";

export type ProjectSpecifications = {
  poolLength: string;
  poolWidth: string;
  poolDepth: string;
  poolVolume: string;
  plantRoomSize: string;
  shapeOfPool: string;
  typeOfPool: string;
  totalPoolVolume?: string;
  filtrationVolume?: string;
  turnoverPeriod?: string;
  tilingArea?: string;
  copingArea?: string;
  waterproofingArea?: string;
};

export const SECTIONS = ["A", "B", "C", "D"] as const;
export type BillSection = (typeof SECTIONS)[number];

export type QuotationItemForm = {
  id?: string;
  section: string;
  serialNo: number;
  category: string;
  description: string;
  warranty: string;
  qty: number;
  unit: string;
  rate: number;
  amount: number;
  imageUrl?: string | null;
  imageText?: string | null;
  productId?: string | null;
  variableValues?: Record<string, string>;
};

export type QuotationSection = {
  code: string;
  title: string;
  included: boolean;
  sortOrder: number;
};

export type QuotationFormValues = {
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  quoteNumber: string;
  title?: string;
  date: string;
  gstPercent: number;
  projectSpecifications: ProjectSpecifications;
  items: QuotationItemForm[];
  sections?: QuotationSection[];
  notes: string;
  terms: string;
  paymentTerms: string;
};

export type QuotationWithRelations = Quotation & {
  customer: Customer;
  items: QuotationItem[];
};

export type { Customer, Quotation, QuotationItem, Product, CompanySettings };
