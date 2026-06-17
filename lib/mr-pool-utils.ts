import { calculatePoolMetrics } from "@/lib/utils";
import { specsForMetrics } from "@/lib/mr-pool-spec-sections";
import type { ProjectSpecifications, QuotationItemForm } from "@/types";

export type PoolTypeFilter = "skimmer" | "overflow";

const SKIMMER_ONLY_TITLES = new Set(["STD SKIMMER"]);
const OVERFLOW_ONLY_TITLES = new Set([
  "OVERFLOW GRATING",
  "WALL CONDUITS",
  "VACUUM POINT",
]);

export function isOverflowPool(poolType?: string): boolean {
  return (poolType ?? "").toLowerCase().includes("overflow");
}

export function isSkimmerPool(poolType?: string): boolean {
  const normalized = (poolType ?? "").toLowerCase();
  if (normalized.includes("overflow")) return false;
  if (normalized.includes("skimmer")) return true;
  return !normalized.includes("overflow");
}

export function getItemPoolTypeFilter(item: {
  title?: string;
  poolTypeFilter?: PoolTypeFilter;
}): PoolTypeFilter | null {
  if (item.poolTypeFilter) return item.poolTypeFilter;
  const title = (item.title ?? "").toUpperCase().trim();
  if (SKIMMER_ONLY_TITLES.has(title)) return "skimmer";
  if (OVERFLOW_ONLY_TITLES.has(title)) return "overflow";
  return null;
}

export function isProductVisibleForPoolType(
  item: { title?: string; poolTypeFilter?: PoolTypeFilter },
  poolType?: string,
): boolean {
  const filter = getItemPoolTypeFilter(item);
  if (!filter) return true;
  if (filter === "overflow") return isOverflowPool(poolType);
  return isSkimmerPool(poolType);
}

export function filterItemsForPoolType<T extends { title?: string; poolTypeFilter?: PoolTypeFilter }>(
  items: T[],
  poolType?: string,
): T[] {
  return items.filter((item) => isProductVisibleForPoolType(item, poolType));
}

export interface MRPoolMetricsResult {
  volumeCubicFeet: number;
  volumeLiters: number;
  waterVolumeLiters: number;
  tilingArea: number;
  copingArea: number;
  waterproofingArea: number;
  totalPoolVolumeLiters: number;
  filtrationVolumeLiters: number;
  filtrationFlowRate: string;
  kidPoolSize: string;
  balancingTankSize: string;
}

function parseDim(value?: string): number {
  const n = parseFloat(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatLiters(value: number): string {
  return `${Math.round(value).toLocaleString("en-IN")} Ltrs`;
}

function formatArea(value: number, unit: string): string {
  return `${Math.round(value).toLocaleString("en-IN")} ${unit}`;
}

function formatCubicFeet(value: number): string {
  return `${Math.round(value).toLocaleString("en-IN")} Cft`;
}

function formatFlowRate(litersPerHour: number): string {
  return `${Math.round(litersPerHour).toLocaleString("en-IN")} L/Hr`;
}

function formatTurnover(hours: number): string {
  if (!hours) return "";
  return `${hours} Hour${hours === 1 ? "" : "s"}`;
}

function formatSize(length?: string, width?: string, depth?: string): string {
  const parts = [length, width, depth].map((v) => String(v ?? "").trim()).filter(Boolean);
  return parts.length ? `${parts.join("'X")}'` : "";
}

export function calculateMRPoolMetrics(
  specs: Pick<
    ProjectSpecifications,
    | "poolLength"
    | "poolWidth"
    | "poolDepth"
    | "shapeOfPool"
    | "typeOfPool"
    | "turnoverPeriod"
    | "kidPoolLength"
    | "kidPoolWidth"
    | "kidPoolDepth"
    | "balancingTankLength"
    | "balancingTankWidth"
    | "balancingTankDepth"
  >,
): MRPoolMetricsResult {
  const activeSpecs = specsForMetrics(specs);
  const shape = activeSpecs.shapeOfPool || "Rectangle Pool";
  const mainL = parseDim(activeSpecs.poolLength);
  const mainW = parseDim(activeSpecs.poolWidth);
  const mainD = parseDim(activeSpecs.poolDepth);

  const mainMetrics =
    mainL > 0 && mainW > 0 && mainD > 0
      ? calculatePoolMetrics(mainL, mainW, mainD, shape)
      : {
          volumeCubicFeet: 0,
          volumeLiters: 0,
          tilingArea: 0,
          copingArea: 0,
          waterproofingArea: 0,
          floorArea: 0,
          wallArea: 0,
        };

  const kidL = parseDim(activeSpecs.kidPoolLength);
  const kidW = parseDim(activeSpecs.kidPoolWidth);
  const kidD = parseDim(activeSpecs.kidPoolDepth);
  const kidMetrics =
    kidL > 0 && kidW > 0 && kidD > 0
      ? calculatePoolMetrics(kidL, kidW, kidD, "Rectangle Pool")
      : {
          volumeCubicFeet: 0,
          volumeLiters: 0,
          tilingArea: 0,
          copingArea: 0,
          waterproofingArea: 0,
        };

  const tankL = parseDim(activeSpecs.balancingTankLength);
  const tankW = parseDim(activeSpecs.balancingTankWidth);
  const tankD = parseDim(activeSpecs.balancingTankDepth);
  const tankMetrics =
    tankL > 0 && tankW > 0 && tankD > 0
      ? calculatePoolMetrics(tankL, tankW, tankD, "Rectangle Pool")
      : {
          volumeCubicFeet: 0,
          volumeLiters: 0,
          tilingArea: 0,
          copingArea: 0,
          waterproofingArea: 0,
        };

  const totalPoolVolumeLiters = mainMetrics.volumeLiters + kidMetrics.volumeLiters;
  const overflow = isOverflowPool(activeSpecs.typeOfPool);
  const filtrationVolumeLiters = overflow
    ? totalPoolVolumeLiters + tankMetrics.volumeLiters
    : mainMetrics.volumeLiters;

  const turnoverHours = parseDim(activeSpecs.turnoverPeriod) || 4;
  const flowRate = turnoverHours > 0 ? filtrationVolumeLiters / turnoverHours : 0;

  let tilingArea = mainMetrics.tilingArea;
  let copingArea = mainMetrics.copingArea;
  let waterproofingArea = mainMetrics.waterproofingArea;

  if (kidMetrics.tilingArea > 0) {
    tilingArea += kidMetrics.tilingArea;
    copingArea += kidMetrics.copingArea;
    waterproofingArea += kidMetrics.waterproofingArea;
  }

  if (overflow && tankMetrics.waterproofingArea > 0) {
    waterproofingArea += tankMetrics.waterproofingArea;
  }

  return {
    volumeCubicFeet: mainMetrics.volumeCubicFeet,
    volumeLiters: mainMetrics.volumeLiters,
    waterVolumeLiters: mainMetrics.volumeLiters,
    tilingArea,
    copingArea,
    waterproofingArea,
    totalPoolVolumeLiters,
    filtrationVolumeLiters,
    filtrationFlowRate: formatFlowRate(flowRate),
    kidPoolSize: formatSize(activeSpecs.kidPoolLength, activeSpecs.kidPoolWidth, activeSpecs.kidPoolDepth),
    balancingTankSize: formatSize(
      activeSpecs.balancingTankLength,
      activeSpecs.balancingTankWidth,
      activeSpecs.balancingTankDepth,
    ),
  };
}

export function applyMRPoolMetricsToSpecs(
  specs: ProjectSpecifications,
): ProjectSpecifications {
  const metrics = calculateMRPoolMetrics(specs);
  const next = { ...specs };

  if (!next.poolVolumeOverride) {
    next.poolVolume = formatCubicFeet(metrics.volumeCubicFeet);
  }
  if (!next.waterVolumeLitersOverride) {
    next.waterVolumeLiters = formatLiters(metrics.waterVolumeLiters);
  }
  if (!next.totalPoolVolumeOverride) {
    next.totalPoolVolume = formatLiters(metrics.totalPoolVolumeLiters);
  }
  if (!next.filtrationVolumeOverride) {
    next.filtrationVolume = formatLiters(metrics.filtrationVolumeLiters);
  }
  if (!next.filtrationFlowRateOverride) {
    next.filtrationFlowRate = metrics.filtrationFlowRate;
  }
  if (!next.tilingAreaOverride) {
    next.tilingArea = formatArea(metrics.tilingArea, "Sft");
  }
  if (!next.copingAreaOverride) {
    next.copingArea = formatArea(metrics.copingArea, "Rft");
  }
  if (!next.waterproofingAreaOverride) {
    next.waterproofingArea = formatArea(metrics.waterproofingArea, "Sft");
  }

  const turnoverHours = parseDim(specs.turnoverPeriod);
  if (turnoverHours && !String(next.turnoverPeriod ?? "").toLowerCase().includes("hour")) {
    next.turnoverPeriod = formatTurnover(turnoverHours);
  }

  next.kidPoolSize = metrics.kidPoolSize;
  next.balancingTankSize = metrics.balancingTankSize;

  const pl = next.plantRoomLength || "8";
  const pw = next.plantRoomWidth || "8";
  const ph = next.plantRoomHeight || "6";
  next.plantRoomSize = `${pl}'X${pw}'X${ph}'`;

  return next;
}

/** Default line items for a pool type (template only). Manually added items are never filtered. */
export function getDefaultMRItems(
  allItems: QuotationItemForm[],
  poolType?: string,
): QuotationItemForm[] {
  return filterItemsForPoolType(allItems, poolType);
}
