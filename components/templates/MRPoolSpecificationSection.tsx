export type MRPoolSpecificationSectionProps = {
  poolLength?: string;
  poolWidth?: string;
  poolDepth?: string;
  waterVolume?: string;
  waterVolumeLiters?: string;
  totalPoolVolume?: string;
  filtrationVolume?: string;
  filtrationFlowRate?: string;
  turnoverPeriod?: string;
  tilingArea?: string;
  copingArea?: string;
  waterproofingArea?: string;
  plantRoomSize?: string;
  plantRoomLength?: string;
  plantRoomWidth?: string;
  plantRoomDepth?: string;
  kidPoolLength?: string;
  kidPoolWidth?: string;
  kidPoolDepth?: string;
  kidPoolSize?: string;
  balancingTankLength?: string;
  balancingTankWidth?: string;
  balancingTankDepth?: string;
  balancingTankSize?: string;
  poolShape?: string;
  poolType?: string;
  showBalancingTank?: boolean;
  includeMainPool?: boolean;
  includeKidPool?: boolean;
  includePlantRoom?: boolean;
  includeBalancingTank?: boolean;
  includeTurnoverPeriod?: boolean;
};

export const MR_POOL_SPECIFICATION_TITLE =
  "ELECTRO - MECHANICAL AND WATERPROOFING, POOL TILING WORKS SPECIFICATIONS";

function valueOrBlank(value?: string): string {
  return value?.trim() ? value : "";
}

function escapeHtml(value?: string): string {
  return valueOrBlank(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatPoolSize(length?: string, width?: string, depth?: string): string {
  const parts = [length, width, depth].map((v) => valueOrBlank(v)).filter(Boolean);
  return parts.length ? parts.join("X") : "";
}

function buildSubtitle(props: MRPoolSpecificationSectionProps): string {
  const main =
    props.includeMainPool !== false
      ? formatPoolSize(props.poolLength, props.poolWidth, props.poolDepth)
      : "";
  const kid =
    props.includeKidPool !== false
      ? formatPoolSize(props.kidPoolLength, props.kidPoolWidth, props.kidPoolDepth)
      : "";
  let subtitle = main ? `(Main Pool -${main}` : "(Main Pool";
  if (kid) subtitle += `Kid pool ${kid} within`;
  subtitle += ")";
  return subtitle;
}

function buildFacilityLine(props: MRPoolSpecificationSectionProps): string {
  const parts: string[] = [];
  if (props.includePlantRoom !== false && valueOrBlank(String(props.plantRoomSize ?? ""))) {
    parts.push(`Plant Room -${valueOrBlank(String(props.plantRoomSize ?? ""))}`);
  }
  const showTank =
    props.includeBalancingTank !== false &&
    (props.showBalancingTank ?? props.includeBalancingTank !== false);
  if (showTank && valueOrBlank(props.balancingTankSize)) {
    parts.push(`balancing Tank -${valueOrBlank(props.balancingTankSize)}`);
  }
  return parts.join(" ");
}

function buildDimensionTableHtml(
  title: string,
  length?: string,
  width?: string,
  depth?: string,
  extraRow?: { label: string; value?: string },
): string {
  const hasDims = [length, width, depth].some((v) => valueOrBlank(v));
  if (!hasDims && !extraRow?.value) return "";

  const rows = [
    `<tr><th>${escapeHtml(title)}</th><th>In FT</th></tr>`,
    `<tr><td>Length</td><td class="spec-value-cell">${escapeHtml(length)}</td></tr>`,
    `<tr><td>Width</td><td class="spec-value-cell">${escapeHtml(width)}</td></tr>`,
    `<tr><td>Depth</td><td class="spec-value-cell">${escapeHtml(depth)}</td></tr>`,
  ];

  if (extraRow?.value) {
    rows.push(
      `<tr><td>${escapeHtml(extraRow.label)}</td><td class="spec-value-cell">${escapeHtml(extraRow.value)}</td></tr>`,
    );
  }

  return `
    <table class="spec-table spec-main-pool-table">
      <tbody>${rows.join("")}</tbody>
    </table>`;
}

function buildDetailsRows(props: MRPoolSpecificationSectionProps): string {
  const rows: Array<[string, string | undefined]> = [
    ["Total Pool Volume in Liters", props.totalPoolVolume],
    ["Total Filtration Volume in Ltrs", props.filtrationVolume],
    ...(props.includeTurnoverPeriod !== false
      ? ([["Turnover Period", props.turnoverPeriod]] as Array<[string, string | undefined]>)
      : []),
    ["Filtration Flow rate Required", props.filtrationFlowRate],
    ["Total Tiling Area in Sft", props.tilingArea],
    ["Total Coping Area in Rft", props.copingArea],
    ["Total Waterproofing Area in Sft", props.waterproofingArea],
  ];

  return rows
    .map(
      ([label, value]) =>
        `<tr><td>${escapeHtml(label)}</td><td class="spec-value-cell">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
}

export function buildMRPoolSpecificationSectionHtml(props: MRPoolSpecificationSectionProps): string {
  const subtitle = buildSubtitle(props);
  const facilityLine = buildFacilityLine(props);
  const waterDisplay = valueOrBlank(props.waterVolumeLiters) || valueOrBlank(props.waterVolume);
  const kidTable =
    props.includeKidPool !== false
      ? buildDimensionTableHtml(
          "KID POOL",
          props.kidPoolLength,
          props.kidPoolWidth,
          props.kidPoolDepth,
        )
      : "";
  const plantRoomTable =
    props.includePlantRoom !== false
      ? buildDimensionTableHtml(
          "PLANT ROOM",
          props.plantRoomLength,
          props.plantRoomWidth,
          props.plantRoomDepth,
        )
      : "";
  const balancingTankTable =
    props.includeBalancingTank !== false &&
    (props.showBalancingTank ?? true)
      ? buildDimensionTableHtml(
          "BALANCING TANK",
          props.balancingTankLength,
          props.balancingTankWidth,
          props.balancingTankDepth,
        )
      : "";

  const mainPoolTable =
    props.includeMainPool !== false
      ? buildDimensionTableHtml("MAIN POOL", props.poolLength, props.poolWidth, props.poolDepth, {
          label: "Water Volume Ltrs",
          value: waterDisplay,
        })
      : "";

  return `
    <section class="pool-spec-section">
      <div class="pool-spec-title">${MR_POOL_SPECIFICATION_TITLE}</div>
      <table class="spec-table spec-top-table">
        <tbody>
          <tr>
            <td class="spec-top-left">
              <div class="spec-heading">SWIMMING POOL SPECIFICATIONS</div>
              <div class="spec-centered">${escapeHtml(subtitle)}</div>
              ${facilityLine ? `<div class="spec-centered">${escapeHtml(facilityLine)}</div>` : ""}
            </td>
            <td class="spec-top-right">
              <div class="spec-line"><strong>SHAPE OF POOL</strong> - ${escapeHtml(props.poolShape)}</div>
              <div class="spec-line"><strong>TYPE OF POOL</strong> - ${escapeHtml(props.poolType)}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="spec-side-by-side">
        <div class="spec-left-stack">
          ${mainPoolTable}
          ${kidTable}
          ${plantRoomTable}
          ${balancingTankTable}
        </div>
        <table class="spec-table spec-details-table">
          <tbody>${buildDetailsRows(props)}</tbody>
        </table>
      </div>
    </section>`;
}

export function MRPoolSpecificationSection(props: MRPoolSpecificationSectionProps) {
  const subtitle = buildSubtitle(props);
  const facilityLine = buildFacilityLine(props);
  const waterDisplay = valueOrBlank(props.waterVolumeLiters) || valueOrBlank(props.waterVolume);
  const detailRows: Array<[string, string | undefined]> = [
    ["Total Pool Volume in Liters", props.totalPoolVolume],
    ["Total Filtration Volume in Ltrs", props.filtrationVolume],
    ...(props.includeTurnoverPeriod !== false
      ? ([["Turnover Period", props.turnoverPeriod]] as Array<[string, string | undefined]>)
      : []),
    ["Filtration Flow rate Required", props.filtrationFlowRate],
    ["Total Tiling Area in Sft", props.tilingArea],
    ["Total Coping Area in Rft", props.copingArea],
    ["Total Waterproofing Area in Sft", props.waterproofingArea],
  ];

  const renderDimTable = (
    title: string,
    length?: string,
    width?: string,
    depth?: string,
    extraRow?: { label: string; value?: string },
  ) => {
    const hasDims = [length, width, depth].some((v) => valueOrBlank(v));
    if (!hasDims && !extraRow?.value) return null;

    return (
      <table className="spec-table spec-main-pool-table">
        <tbody>
          <tr>
            <th>{title}</th>
            <th>In FT</th>
          </tr>
          <tr>
            <td>Length</td>
            <td className="spec-value-cell">{valueOrBlank(length)}</td>
          </tr>
          <tr>
            <td>Width</td>
            <td className="spec-value-cell">{valueOrBlank(width)}</td>
          </tr>
          <tr>
            <td>Depth</td>
            <td className="spec-value-cell">{valueOrBlank(depth)}</td>
          </tr>
          {extraRow?.value ? (
            <tr>
              <td>{extraRow.label}</td>
              <td className="spec-value-cell">{valueOrBlank(extraRow.value)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    );
  };

  return (
    <section className="pool-spec-section">
      <div className="pool-spec-title">{MR_POOL_SPECIFICATION_TITLE}</div>

      <table className="spec-table spec-top-table">
        <tbody>
          <tr>
            <td className="spec-top-left">
              <div className="spec-heading">SWIMMING POOL SPECIFICATIONS</div>
              <div className="spec-centered">{subtitle}</div>
              {facilityLine ? <div className="spec-centered">{facilityLine}</div> : null}
            </td>
            <td className="spec-top-right">
              <div className="spec-line">
                <strong>SHAPE OF POOL</strong> - {valueOrBlank(props.poolShape)}
              </div>
              <div className="spec-line">
                <strong>TYPE OF POOL</strong> - {valueOrBlank(props.poolType)}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="spec-side-by-side">
        <div className="spec-left-stack">
          {props.includeMainPool !== false
            ? renderDimTable("MAIN POOL", props.poolLength, props.poolWidth, props.poolDepth, {
                label: "Water Volume Ltrs",
                value: waterDisplay,
              })
            : null}
          {props.includeKidPool !== false
            ? renderDimTable("KID POOL", props.kidPoolLength, props.kidPoolWidth, props.kidPoolDepth)
            : null}
          {props.includePlantRoom !== false
            ? renderDimTable(
                "PLANT ROOM",
                props.plantRoomLength,
                props.plantRoomWidth,
                props.plantRoomDepth,
              )
            : null}
          {props.includeBalancingTank !== false &&
          (props.showBalancingTank ?? true)
            ? renderDimTable(
                "BALANCING TANK",
                props.balancingTankLength,
                props.balancingTankWidth,
                props.balancingTankDepth,
              )
            : null}
        </div>

        <table className="spec-table spec-details-table">
          <tbody>
            {detailRows.map(([label, value]) => (
              <tr key={label}>
                <td>{label}</td>
                <td className="spec-value-cell">{valueOrBlank(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
