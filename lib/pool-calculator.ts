/**
 * MR Swimming Pools — calculation engine.
 * Formulas match real MR quotation PDFs (skimmer + overflow); rectangle L×W×D only.
 */

import type { ProjectSpecifications } from "@/types";
import { specsForMetrics } from "@/lib/mr-pool-spec-sections";

/** Cubic feet → liters (standard conversion used in MR quotations). */
export const LITERS_PER_CUBIC_FOOT = 28.3168;

/** Nominal overflow gutter strip depth (ft) for waterproofing area when gutter dims are not entered. */
export const DEFAULT_OVERFLOW_GUTTER_DEPTH_FT = 2;

export type PoolBoxDimensions = {
  lengthFt: number;
  widthFt: number;
  depthFt: number;
};

export type PoolCalculatorInput = Pick<
  ProjectSpecifications,
  | "poolLength"
  | "poolWidth"
  | "poolDepth"
  | "typeOfPool"
  | "turnoverPeriod"
  | "kidPoolLength"
  | "kidPoolWidth"
  | "kidPoolDepth"
  | "balancingTankLength"
  | "balancingTankWidth"
  | "balancingTankDepth"
  | "plantRoomLength"
  | "plantRoomWidth"
  | "plantRoomHeight"
>;

export type PoolCalculatorResult = {
  mainPoolVolumeCuFt: number;
  mainPoolVolumeLiters: number;
  kidPoolVolumeCuFt: number;
  kidPoolVolumeLiters: number;
  balancingTankVolumeCuFt: number;
  balancingTankVolumeLiters: number;
  actualTotalPoolVolumeLiters: number;
  mainPoolTilingSqFt: number;
  kidPoolTilingSqFt: number;
  actualTilingSqFt: number;
  plantRoomInternalSqFt: number;
  balancingTankInternalSqFt: number;
  overflowGutterSqFt: number;
  actualWaterproofingSqFt: number;
  mainPoolCopingRft: number;
  kidPoolCopingRft: number;
  overflowChannelCopingRft: number;
  actualCopingRft: number;
  filtrationVolumeLiters: number;
  filtrationFlowRateLitersPerHour: number;
  kidPoolSize: string;
  balancingTankSize: string;
  plantRoomSize: string;
};

/**
 * Parse a single feet dimension from user input.
 * Uses only the leading number — avoids "30X60" → 3060 bugs from stripping all non-digits.
 */
export function parseFeetDimension(value?: string): number {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return 0;
  const match = trimmed.match(/^(\d+(?:\.\d+)?)/);
  if (!match) return 0;
  const n = parseFloat(match[1]);
  return Number.isFinite(n) ? n : 0;
}

export function parseTurnoverHours(value?: string): number {
  const n = parseFeetDimension(value);
  return n > 0 ? n : 4;
}

export function isOverflowPoolType(poolType?: string): boolean {
  return (poolType ?? "").toLowerCase().includes("overflow");
}

export function readPoolBox(
  length?: string,
  width?: string,
  depth?: string,
): PoolBoxDimensions | null {
  const lengthFt = parseFeetDimension(length);
  const widthFt = parseFeetDimension(width);
  const depthFt = parseFeetDimension(depth);
  if (lengthFt <= 0 || widthFt <= 0 || depthFt <= 0) return null;
  return { lengthFt, widthFt, depthFt };
}

/** Pool volume in cubic feet: L × W × D */
export function poolVolumeCubicFeet(box: PoolBoxDimensions): number {
  return box.lengthFt * box.widthFt * box.depthFt;
}

export function cubicFeetToLiters(cuFt: number): number {
  return Math.round(cuFt * LITERS_PER_CUBIC_FOOT);
}

/** Tiling: floor (L×W) + walls 2×L×D + 2×W×D */
export function poolTilingSqFt(box: PoolBoxDimensions): number {
  const floor = box.lengthFt * box.widthFt;
  const walls = 2 * box.lengthFt * box.depthFt + 2 * box.widthFt * box.depthFt;
  return Math.round(floor + walls);
}

/**
 * Internal waterproofing surface for a rectangular room/tank:
 * 2×(L×D) + 2×(W×D) + (L×W)
 */
export function internalSurfaceSqFt(box: PoolBoxDimensions): number {
  const { lengthFt: l, widthFt: w, depthFt: d } = box;
  return Math.round(2 * l * d + 2 * w * d + l * w);
}

/** Pool perimeter in running feet */
export function poolPerimeterRft(lengthFt: number, widthFt: number): number {
  return Math.round(2 * (lengthFt + widthFt));
}

/**
 * Overflow gutter waterproofing strip (when gutter dimensions are not specified):
 * main pool perimeter × nominal gutter depth.
 */
export function overflowGutterSqFt(mainPool: PoolBoxDimensions, gutterDepthFt = DEFAULT_OVERFLOW_GUTTER_DEPTH_FT): number {
  return Math.round(poolPerimeterRft(mainPool.lengthFt, mainPool.widthFt) * gutterDepthFt);
}

export function calculateCopingRft(params: {
  poolType?: string;
  mainPool: PoolBoxDimensions;
  kidPool?: PoolBoxDimensions | null;
}): {
  mainPoolCopingRft: number;
  kidPoolCopingRft: number;
  overflowChannelCopingRft: number;
  totalCopingRft: number;
} {
  const mainPoolCopingRft = poolPerimeterRft(params.mainPool.lengthFt, params.mainPool.widthFt);
  const kidPoolCopingRft = params.kidPool
    ? poolPerimeterRft(params.kidPool.lengthFt, params.kidPool.widthFt)
    : 0;

  const overflowChannelCopingRft = isOverflowPoolType(params.poolType) ? mainPoolCopingRft : 0;

  return {
    mainPoolCopingRft,
    kidPoolCopingRft,
    overflowChannelCopingRft,
    totalCopingRft: mainPoolCopingRft + kidPoolCopingRft + overflowChannelCopingRft,
  };
}

function formatSize(length?: string, width?: string, depth?: string): string {
  const parts = [length, width, depth].map((v) => String(v ?? "").trim()).filter(Boolean);
  return parts.length ? `${parts.join("'X")}'` : "";
}

/**
 * Primary MR pool metrics entry point.
 * All formulas are rectangle-based per MR quotation practice.
 */
export function calculatePoolMetrics(specs: PoolCalculatorInput): PoolCalculatorResult {
  const active = specsForMetrics(specs as ProjectSpecifications);

  const mainPool = readPoolBox(active.poolLength, active.poolWidth, active.poolDepth);
  const kidPool = readPoolBox(active.kidPoolLength, active.kidPoolWidth, active.kidPoolDepth);
  const balancingTank = readPoolBox(
    active.balancingTankLength,
    active.balancingTankWidth,
    active.balancingTankDepth,
  );
  const plantRoom = readPoolBox(
    active.plantRoomLength,
    active.plantRoomWidth,
    active.plantRoomHeight,
  );

  const mainPoolVolumeCuFt = mainPool ? poolVolumeCubicFeet(mainPool) : 0;
  const mainPoolVolumeLiters = cubicFeetToLiters(mainPoolVolumeCuFt);

  const kidPoolVolumeCuFt = kidPool ? poolVolumeCubicFeet(kidPool) : 0;
  const kidPoolVolumeLiters = cubicFeetToLiters(kidPoolVolumeCuFt);

  const balancingTankVolumeCuFt = balancingTank ? poolVolumeCubicFeet(balancingTank) : 0;
  const balancingTankVolumeLiters = cubicFeetToLiters(balancingTankVolumeCuFt);

  const actualTotalPoolVolumeLiters = mainPoolVolumeLiters + kidPoolVolumeLiters;

  const mainPoolTilingSqFt = mainPool ? poolTilingSqFt(mainPool) : 0;
  const kidPoolTilingSqFt = kidPool ? poolTilingSqFt(kidPool) : 0;
  const actualTilingSqFt = mainPoolTilingSqFt + kidPoolTilingSqFt;

  const plantRoomInternalSqFt = plantRoom ? internalSurfaceSqFt(plantRoom) : 0;
  const balancingTankInternalSqFt = balancingTank ? internalSurfaceSqFt(balancingTank) : 0;

  const overflow = isOverflowPoolType(active.typeOfPool);
  const overflowGutterArea = overflow && mainPool ? overflowGutterSqFt(mainPool) : 0;

  const actualWaterproofingSqFt =
    actualTilingSqFt +
    plantRoomInternalSqFt +
    balancingTankInternalSqFt +
    (overflow ? overflowGutterArea : 0);

  const coping = mainPool
    ? calculateCopingRft({ poolType: active.typeOfPool, mainPool, kidPool })
    : {
        mainPoolCopingRft: 0,
        kidPoolCopingRft: 0,
        overflowChannelCopingRft: 0,
        totalCopingRft: 0,
      };

  const turnoverHours = parseTurnoverHours(active.turnoverPeriod);
  const filtrationVolumeLiters = overflow
    ? actualTotalPoolVolumeLiters + balancingTankVolumeLiters
    : mainPoolVolumeLiters;
  const filtrationFlowRateLitersPerHour =
    turnoverHours > 0 ? Math.round(filtrationVolumeLiters / turnoverHours) : 0;

  const pl = active.plantRoomLength || "8";
  const pw = active.plantRoomWidth || "8";
  const ph = active.plantRoomHeight || "6";

  return {
    mainPoolVolumeCuFt,
    mainPoolVolumeLiters,
    kidPoolVolumeCuFt,
    kidPoolVolumeLiters,
    balancingTankVolumeCuFt,
    balancingTankVolumeLiters,
    actualTotalPoolVolumeLiters,
    mainPoolTilingSqFt,
    kidPoolTilingSqFt,
    actualTilingSqFt,
    plantRoomInternalSqFt,
    balancingTankInternalSqFt,
    overflowGutterSqFt: overflowGutterArea,
    actualWaterproofingSqFt,
    mainPoolCopingRft: coping.mainPoolCopingRft,
    kidPoolCopingRft: coping.kidPoolCopingRft,
    overflowChannelCopingRft: coping.overflowChannelCopingRft,
    actualCopingRft: coping.totalCopingRft,
    filtrationVolumeLiters,
    filtrationFlowRateLitersPerHour,
    kidPoolSize: formatSize(active.kidPoolLength, active.kidPoolWidth, active.kidPoolDepth),
    balancingTankSize: formatSize(
      active.balancingTankLength,
      active.balancingTankWidth,
      active.balancingTankDepth,
    ),
    plantRoomSize: `${pl}'X${pw}'X${ph}'`,
  };
}
