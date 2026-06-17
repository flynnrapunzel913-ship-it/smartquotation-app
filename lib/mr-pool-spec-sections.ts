import type { ProjectSpecifications } from "@/types";

export type PoolSpecSectionId =
  | "mainPool"
  | "kidPool"
  | "plantRoom"
  | "balancingTank"
  | "turnoverPeriod";

export type SpecSectionFlags = {
  includeMainPool: boolean;
  includeKidPool: boolean;
  includePlantRoom: boolean;
  includeBalancingTank: boolean;
  includeTurnoverPeriod: boolean;
};

export const POOL_SPEC_SECTION_LABELS: Record<PoolSpecSectionId, string> = {
  mainPool: "Main Pool",
  kidPool: "Kid Pool",
  plantRoom: "Plant Room",
  balancingTank: "Balancing Tank",
  turnoverPeriod: "Turnover Period",
};

export const DEFAULT_SPEC_SECTION_FLAGS: SpecSectionFlags = {
  includeMainPool: true,
  includeKidPool: true,
  includePlantRoom: true,
  includeBalancingTank: true,
  includeTurnoverPeriod: true,
};

function hasDims(...values: (string | undefined)[]): boolean {
  return values.some((v) => String(v ?? "").trim() !== "");
}

/** Resolve section visibility from explicit flags or legacy saved dimensions. */
export function resolveSpecSectionFlags(specs: ProjectSpecifications): SpecSectionFlags {
  return {
    includeMainPool: specs.includeMainPool ?? true,
    includeKidPool:
      specs.includeKidPool ?? hasDims(specs.kidPoolLength, specs.kidPoolWidth, specs.kidPoolDepth),
    includePlantRoom:
      specs.includePlantRoom ??
      (hasDims(specs.plantRoomLength, specs.plantRoomWidth, specs.plantRoomHeight) || true),
    includeBalancingTank:
      specs.includeBalancingTank ??
      hasDims(
        specs.balancingTankLength,
        specs.balancingTankWidth,
        specs.balancingTankDepth,
      ),
    includeTurnoverPeriod:
      specs.includeTurnoverPeriod ?? (hasDims(specs.turnoverPeriod) || true),
  };
}

export function specsForMetrics(specs: ProjectSpecifications): ProjectSpecifications {
  const flags = resolveSpecSectionFlags(specs);
  return {
    ...specs,
    poolLength: flags.includeMainPool ? specs.poolLength : "",
    poolWidth: flags.includeMainPool ? specs.poolWidth : "",
    poolDepth: flags.includeMainPool ? specs.poolDepth : "",
    kidPoolLength: flags.includeKidPool ? specs.kidPoolLength : "",
    kidPoolWidth: flags.includeKidPool ? specs.kidPoolWidth : "",
    kidPoolDepth: flags.includeKidPool ? specs.kidPoolDepth : "",
    plantRoomLength: flags.includePlantRoom ? specs.plantRoomLength : "",
    plantRoomWidth: flags.includePlantRoom ? specs.plantRoomWidth : "",
    plantRoomHeight: flags.includePlantRoom ? specs.plantRoomHeight : "",
    balancingTankLength: flags.includeBalancingTank ? specs.balancingTankLength : "",
    balancingTankWidth: flags.includeBalancingTank ? specs.balancingTankWidth : "",
    balancingTankDepth: flags.includeBalancingTank ? specs.balancingTankDepth : "",
    turnoverPeriod: flags.includeTurnoverPeriod ? specs.turnoverPeriod : "",
  };
}

export function removeSpecSection(
  specs: ProjectSpecifications,
  sectionId: PoolSpecSectionId,
): ProjectSpecifications {
  const next: ProjectSpecifications = { ...specs, ...resolveSpecSectionFlags(specs) };

  switch (sectionId) {
    case "mainPool":
      next.includeMainPool = false;
      next.poolLength = "";
      next.poolWidth = "";
      next.poolDepth = "";
      break;
    case "kidPool":
      next.includeKidPool = false;
      next.kidPoolLength = "";
      next.kidPoolWidth = "";
      next.kidPoolDepth = "";
      next.kidPoolSize = "";
      break;
    case "plantRoom":
      next.includePlantRoom = false;
      next.plantRoomLength = "";
      next.plantRoomWidth = "";
      next.plantRoomHeight = "";
      next.plantRoomSize = "";
      break;
    case "balancingTank":
      next.includeBalancingTank = false;
      next.balancingTankLength = "";
      next.balancingTankWidth = "";
      next.balancingTankDepth = "";
      next.balancingTankSize = "";
      break;
    case "turnoverPeriod":
      next.includeTurnoverPeriod = false;
      next.turnoverPeriod = "";
      break;
  }

  return next;
}

export function addSpecSection(
  specs: ProjectSpecifications,
  sectionId: PoolSpecSectionId,
): ProjectSpecifications {
  const next: ProjectSpecifications = { ...specs, ...resolveSpecSectionFlags(specs) };

  switch (sectionId) {
    case "mainPool":
      next.includeMainPool = true;
      break;
    case "kidPool":
      next.includeKidPool = true;
      break;
    case "plantRoom":
      next.includePlantRoom = true;
      break;
    case "balancingTank":
      next.includeBalancingTank = true;
      break;
    case "turnoverPeriod":
      next.includeTurnoverPeriod = true;
      break;
  }

  return next;
}

export function hiddenSpecSections(flags: SpecSectionFlags): PoolSpecSectionId[] {
  return (Object.keys(POOL_SPEC_SECTION_LABELS) as PoolSpecSectionId[]).filter((id) => {
    switch (id) {
      case "mainPool":
        return !flags.includeMainPool;
      case "kidPool":
        return !flags.includeKidPool;
      case "plantRoom":
        return !flags.includePlantRoom;
      case "balancingTank":
        return !flags.includeBalancingTank;
      case "turnoverPeriod":
        return !flags.includeTurnoverPeriod;
      default:
        return false;
    }
  });
}
