import { z } from "zod";

const projectSpecsSchema = z.object({
  poolLength: z.string().default(""),
  poolWidth: z.string().default(""),
  poolDepth: z.string().default(""),
  poolVolume: z.string().default(""),
  plantRoomSize: z.string().default(""),
  shapeOfPool: z.string().default(""),
  typeOfPool: z.string().default(""),
  totalPoolVolume: z.string().default(""),
  filtrationVolume: z.string().default(""),
  turnoverPeriod: z.string().default(""),
  tilingArea: z.string().default(""),
  copingArea: z.string().default(""),
  waterproofingArea: z.string().default(""),
});

const itemSchema = z.object({
  id: z.string().optional(),
  section: z.enum(["A", "B", "C", "D"]),
  serialNo: z.coerce.number().int().min(1),
  description: z.string().min(1, "Description required"),
  warranty: z.string().default(""),
  qty: z.coerce.number().positive(),
  unit: z.string().min(1),
  rate: z.coerce.number().min(0),
  amount: z.coerce.number().min(0),
});

export const quotationFormSchema = z.object({
  customerName: z.string().min(1, "Client name required"),
  customerAddress: z.string().min(1, "Site address required"),
  customerPhone: z.string().optional().default(""),
  customerEmail: z
    .string()
    .default("")
    .refine((val) => val === "" || z.string().email().safeParse(val).success, "Invalid email"),
  quoteNumber: z.string().min(1),
  date: z.string().min(1),
  gstPercent: z.coerce.number().min(0).max(100),
  projectSpecifications: projectSpecsSchema,
  items: z.array(itemSchema).min(1, "Add at least one line item"),
  notes: z.string().default(""),
  terms: z.string().default(""),
  paymentTerms: z.string().default(""),
});

export type QuotationFormSchema = z.infer<typeof quotationFormSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password required"),
});

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(""),
  category: z.string().default("General"),
  defaultRate: z.coerce.number().min(0),
  unit: z.string().min(1),
  warranty: z.string().default(""),
});

export const companySettingsSchema = z.object({
  companyName: z.string().min(1),
  address: z.string().default(""),
  gstin: z.string().default(""),
  phones: z.string().default(""),
  email: z.string().default(""),
  defaultGstRate: z.coerce.number().min(0).max(100),
  terms: z.string().default(""),
  paymentTerms: z.string().default(""),
});
