import { calculatePoolMetrics } from "@/lib/pool-calculator";
import type { ProjectSpecifications, QuotationItemForm } from "@/types";

export type PoolTypeFilter = "skimmer" | "overflow";

export {
  calculatePoolMetrics,
  parseFeetDimension,
  isOverflowPoolType as isOverflowPool,
} from "@/lib/pool-calculator";

import { isOverflowPoolType } from "@/lib/pool-calculator";

const SKIMMER_ONLY_TITLES = new Set(["STD SKIMMER"]);
const OVERFLOW_ONLY_TITLES = new Set([
  "OVERFLOW GRATING",
  "WALL CONDUITS",
  "VACUUM POINT",
]);

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
  if (filter === "overflow") return isOverflowPoolType(poolType);
  return isSkimmerPool(poolType);
}

export function filterItemsForPoolType<T extends { title?: string; poolTypeFilter?: PoolTypeFilter }>(
  items: T[],
  poolType?: string,
): T[] {
  return items.filter((item) => isProductVisibleForPoolType(item, poolType));
}

function formatLiters(value: number): string {
  return `${Math.round(value).toLocaleString("en-IN")} Ltrs`;
}

function formatCubicFeet(value: number): string {
  return `${Math.round(value).toLocaleString("en-IN")} Cft`;
}

function formatArea(value: number, unit: string): string {
  return `${Math.round(value).toLocaleString("en-IN")} ${unit}`;
}

function formatFlowRate(litersPerHour: number): string {
  return `${Math.round(litersPerHour).toLocaleString("en-IN")} L/Hr`;
}

function formatTurnover(hours: number): string {
  if (!hours) return "";
  return `${hours} Hour${hours === 1 ? "" : "s"}`;
}

/** @deprecated Use calculatePoolMetrics from lib/pool-calculator */
export function calculateMRPoolMetrics(
  specs: Parameters<typeof calculatePoolMetrics>[0],
) {
  return calculatePoolMetrics(specs);
}

/**
 * Applies calculated metrics to project specifications.
 * Actual values are always refreshed; design/PDF fields update unless admin-overridden.
 */
export function applyMRPoolMetricsToSpecs(
  specs: ProjectSpecifications,
): ProjectSpecifications {
  const metrics = calculatePoolMetrics(specs);
  const next = { ...specs };

  next.actualWaterVolumeLiters = formatLiters(metrics.mainPoolVolumeLiters);
  next.actualTotalPoolVolume = formatLiters(metrics.actualTotalPoolVolumeLiters);
  next.actualTilingArea = formatArea(metrics.actualTilingSqFt, "Sft");
  next.actualWaterproofingArea = formatArea(metrics.actualWaterproofingSqFt, "Sft");
  next.actualCopingArea = formatArea(metrics.actualCopingRft, "Rft");

  if (!next.poolVolumeOverride) {
    next.poolVolume = formatCubicFeet(metrics.mainPoolVolumeCuFt);
  }
  if (!next.waterVolumeLitersOverride) {
    next.waterVolumeLiters = formatLiters(metrics.mainPoolVolumeLiters);
  }
  if (!next.totalPoolVolumeOverride) {
    next.totalPoolVolume = formatLiters(metrics.actualTotalPoolVolumeLiters);
  }
  if (!next.filtrationVolumeOverride) {
    next.filtrationVolume = formatLiters(metrics.filtrationVolumeLiters);
  }
  if (!next.filtrationFlowRateOverride) {
    next.filtrationFlowRate = formatFlowRate(metrics.filtrationFlowRateLitersPerHour);
  }
  if (!next.tilingAreaOverride) {
    next.tilingArea = formatArea(metrics.actualTilingSqFt, "Sft");
  }
  if (!next.copingAreaOverride) {
    next.copingArea = formatArea(metrics.actualCopingRft, "Rft");
  }
  if (!next.waterproofingAreaOverride) {
    next.waterproofingArea = formatArea(metrics.actualWaterproofingSqFt, "Sft");
  }

  const turnoverHours = parseTurnoverHoursFromSpecs(specs.turnoverPeriod);
  if (turnoverHours && !String(next.turnoverPeriod ?? "").toLowerCase().includes("hour")) {
    next.turnoverPeriod = formatTurnover(turnoverHours);
  }

  next.kidPoolSize = metrics.kidPoolSize;
  next.balancingTankSize = metrics.balancingTankSize;
  next.plantRoomSize = metrics.plantRoomSize;

  return next;
}

function parseTurnoverHoursFromSpecs(value?: string): number {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return 0;
  const match = trimmed.match(/^(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

/** Default line items for a pool type (template only). Manually added items are never filtered. */
export function getDefaultMRItems(
  allItems: QuotationItemForm[],
  poolType?: string,
): QuotationItemForm[] {
  return filterItemsForPoolType(allItems, poolType);
}
