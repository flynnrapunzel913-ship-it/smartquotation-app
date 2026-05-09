export type MRPoolSpecificationSectionProps = {
  poolLength?: string;
  poolWidth?: string;
  poolDepth?: string;
  waterVolume?: string;
  totalPoolVolume?: string;
  filtrationVolume?: string;
  turnoverPeriod?: string;
  tilingArea?: string;
  copingArea?: string;
  waterproofingArea?: string;
  plantRoomSize?: string;
  poolShape?: string;
  poolType?: string;
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

export function buildMRPoolSpecificationSectionHtml(props: MRPoolSpecificationSectionProps): string {
  const mainPoolSize = [props.poolLength, props.poolWidth, props.poolDepth]
    .map(escapeHtml)
    .filter(Boolean)
    .join("X");

  return `
    <section class="pool-spec-section">
      <div class="pool-spec-title">${MR_POOL_SPECIFICATION_TITLE}</div>
      <table class="spec-table spec-top-table">
        <tbody>
          <tr>
            <td class="spec-top-left">
              <div class="spec-heading">SWIMMING POOL SPECIFICATIONS</div>
              <div class="spec-centered">(Main Pool ${mainPoolSize})</div>
              <div class="spec-centered">Plant Room -${escapeHtml(String(props.plantRoomSize ?? ""))}</div>
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
          <table class="spec-table spec-main-pool-table">
            <tbody>
              <tr><th>MAIN POOL</th><th>In FT</th></tr>
              <tr><td>Length</td><td class="spec-value-cell">${escapeHtml(props.poolLength)}</td></tr>
              <tr><td>Width</td><td class="spec-value-cell">${escapeHtml(props.poolWidth)}</td></tr>
              <tr><td>Depth</td><td class="spec-value-cell">${escapeHtml(props.poolDepth)}</td></tr>
              <tr><td>Water Volume</td><td class="spec-value-cell">${escapeHtml(props.waterVolume)}</td></tr>
            </tbody>
          </table>
          <table class="spec-table spec-plant-room-table">
            <tbody>
              <tr><th>PLANT ROOM SIZE</th><td class="spec-value-cell">${escapeHtml(String(props.plantRoomSize ?? ""))}</td></tr>
            </tbody>
          </table>
        </div>
        <table class="spec-table spec-details-table">
          <tbody>
            <tr><td>Total Pool Volume in Liters</td><td class="spec-value-cell">${escapeHtml(props.totalPoolVolume)}</td></tr>
            <tr><td>Total Filtration Volume in Ltrs</td><td class="spec-value-cell">${escapeHtml(props.filtrationVolume)}</td></tr>
            <tr><td>Turnover Period</td><td class="spec-value-cell">${escapeHtml(props.turnoverPeriod)}</td></tr>
            <tr><td>Total Tiling Area in Sft</td><td class="spec-value-cell">${escapeHtml(props.tilingArea)}</td></tr>
            <tr><td>Total Coping Area in Rft</td><td class="spec-value-cell">${escapeHtml(props.copingArea)}</td></tr>
            <tr><td>Total Waterproofing Area in Sft</td><td class="spec-value-cell">${escapeHtml(props.waterproofingArea)}</td></tr>
          </tbody>
        </table>
      </div>
    </section>`;
}

export function MRPoolSpecificationSection({
  poolLength,
  poolWidth,
  poolDepth,
  waterVolume,
  totalPoolVolume,
  filtrationVolume,
  turnoverPeriod,
  tilingArea,
  copingArea,
  waterproofingArea,
  plantRoomSize,
  poolShape,
  poolType,
}: MRPoolSpecificationSectionProps) {
  const mainPoolSize = [poolLength, poolWidth, poolDepth].map(valueOrBlank).filter(Boolean).join("X");

  return (
    <section className="pool-spec-section">
      <div className="pool-spec-title">
        {MR_POOL_SPECIFICATION_TITLE}
      </div>

      <table className="spec-table spec-top-table">
        <tbody>
          <tr>
            <td className="spec-top-left">
              <div className="spec-heading">SWIMMING POOL SPECIFICATIONS</div>
              <div className="spec-centered">(Main Pool {mainPoolSize})</div>
              <div className="spec-centered">Plant Room -{String(plantRoomSize ?? "")}</div>
            </td>
            <td className="spec-top-right">
              <div className="spec-line">
                <strong>SHAPE OF POOL</strong> - {valueOrBlank(poolShape)}
              </div>
              <div className="spec-line">
                <strong>TYPE OF POOL</strong> - {valueOrBlank(poolType)}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="spec-side-by-side">
        <div className="spec-left-stack">
          <table className="spec-table spec-main-pool-table">
            <tbody>
              <tr>
                <th>MAIN POOL</th>
                <th>In FT</th>
              </tr>
              <tr>
                <td>Length</td>
                <td className="spec-value-cell">{valueOrBlank(poolLength)}</td>
              </tr>
              <tr>
                <td>Width</td>
                <td className="spec-value-cell">{valueOrBlank(poolWidth)}</td>
              </tr>
              <tr>
                <td>Depth</td>
                <td className="spec-value-cell">{valueOrBlank(poolDepth)}</td>
              </tr>
              <tr>
                <td>Water Volume</td>
                <td className="spec-value-cell">{valueOrBlank(waterVolume)}</td>
              </tr>
            </tbody>
          </table>

          <table className="spec-table spec-plant-room-table">
            <tbody>
              <tr>
                <th>PLANT ROOM SIZE</th>
                <td className="spec-value-cell">{valueOrBlank(String(plantRoomSize ?? ""))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="spec-table spec-details-table">
          <tbody>
            <tr>
              <td>Total Pool Volume in Liters</td>
              <td className="spec-value-cell">{valueOrBlank(totalPoolVolume)}</td>
            </tr>
            <tr>
              <td>Total Filtration Volume in Ltrs</td>
              <td className="spec-value-cell">{valueOrBlank(filtrationVolume)}</td>
            </tr>
            <tr>
              <td>Turnover Period</td>
              <td className="spec-value-cell">{valueOrBlank(turnoverPeriod)}</td>
            </tr>
            <tr>
              <td>Total Tiling Area in Sft</td>
              <td className="spec-value-cell">{valueOrBlank(tilingArea)}</td>
            </tr>
            <tr>
              <td>Total Coping Area in Rft</td>
              <td className="spec-value-cell">{valueOrBlank(copingArea)}</td>
            </tr>
            <tr>
              <td>Total Waterproofing Area in Sft</td>
              <td className="spec-value-cell">{valueOrBlank(waterproofingArea)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
