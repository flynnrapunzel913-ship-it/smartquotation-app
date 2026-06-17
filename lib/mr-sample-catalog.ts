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
    filename: "sample-mr-mundgod-overflow.json",
    id: "sample-mr-mundgod-overflow",
    displayName: "MUNDGOD Overflow Pool",
    description:
      "30×60×4.5 ft designer overflow pool with kid pool, plant room & balancing tank — from DOC-20260609-WA0044..pdf",
    quoteNumber: "MRSP-2026-MUNDGOD",
    title: "Quotation for MUNDGOD - Overflow Swimming Pool",
    date: "2026-06-09",
    sourceBill: "bills/DOC-20260609-WA0044..pdf",
    customer: {
      name: "MUNDGOD Swimming Pool Project",
      address: "Mundgod, Uttara Kannada District, Karnataka",
    },
    poolType: "Overflow Pool",
    specs: {
      poolLength: "30",
      poolWidth: "60",
      poolDepth: "4.5",
      shapeOfPool: "Designer Pool",
      typeOfPool: "Overflow Pool",
      kidPoolLength: "10",
      kidPoolWidth: "10",
      kidPoolDepth: "2.5",
      balancingTankLength: "12",
      balancingTankWidth: "12",
      balancingTankDepth: "6",
      plantRoomLength: "12",
      plantRoomWidth: "12",
      plantRoomHeight: "6",
      plantRoomSize: "12'X12'X6'",
      turnoverPeriod: "4 Hours",
      includeMainPool: true,
      includeKidPool: true,
      includePlantRoom: true,
      includeBalancingTank: true,
      includeTurnoverPeriod: true,
    },
  },
];

export function getMrSampleByFilename(filename: string): MrSampleConfig | undefined {
  return MR_SAMPLE_CATALOG.find((s) => s.filename === filename);
}

export function getMrSampleDisplayName(filename: string): string {
  return getMrSampleByFilename(filename)?.displayName ?? filename;
}
