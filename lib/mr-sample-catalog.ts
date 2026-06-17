import type { ProjectSpecifications } from "@/types";

export type MrSampleConfig = {
  filename: string;
  id: string;
  displayName: string;
  description: string;
  quoteNumber: string;
  title: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  sourceBill: string;
  customer: {
    name: string;
    address: string;
    phone?: string;
    email?: string;
  };
  poolType?: string;
  specs?: Partial<ProjectSpecifications>;
};

/** Sample MR quotations sourced from bills/ reference documents. */
export const MR_SAMPLE_CATALOG: MrSampleConfig[] = [
  {
    filename: "sample-mr-skimmer-30x20.json",
    id: "sample-mr-skimmer-30x20",
    displayName: "30×20 Skimmer Pool",
    description: "30×20×4.5 ft skimmer pool — reference skimmer quotation",
    quoteNumber: "MRSP-2026-SKIMMER-30X20",
    title: "Quotation for Skimmer Swimming Pool 30×20",
    date: "2026-06-09",
    sourceBill: "bills/reference-skimmer-30x20.pdf",
    customer: {
      name: "Skimmer Pool Project",
      address: "Site Location",
    },
    poolType: "Skimmer Pool",
    specs: {
      poolLength: "30",
      poolWidth: "20",
      poolDepth: "4.5",
      shapeOfPool: "Rectangle Pool",
      typeOfPool: "Skimmer Pool",
      turnoverPeriod: "4 Hours",
      includeMainPool: true,
      includeKidPool: false,
      includePlantRoom: true,
      includeBalancingTank: false,
      includeTurnoverPeriod: true,
      plantRoomLength: "8",
      plantRoomWidth: "8",
      plantRoomHeight: "6",
      tilingArea: "1,100 Sft",
      tilingAreaOverride: true,
    },
  },
];

export function getMrSampleByFilename(filename: string): MrSampleConfig | undefined {
  return MR_SAMPLE_CATALOG.find((s) => s.filename === filename);
}

export function getMrSampleDisplayName(filename: string): string {
  return getMrSampleByFilename(filename)?.displayName ?? filename;
}
