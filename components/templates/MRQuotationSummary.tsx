export type MRQuotationSummaryProps = {
  part1Total: string;
  part2Total: string;
  subtotal: string;
  gstPercent: string | number;
  terms?: string;
  paymentTerms?: string;
};

function escapeHtml(value?: string | number): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function multiline(value?: string): string {
  return escapeHtml(value).replace(/\n/g, "<br/>");
}

export function buildMRQuotationSummaryHtml({
  part1Total,
  part2Total,
  subtotal,
  gstPercent,
  terms,
  paymentTerms,
}: MRQuotationSummaryProps): string {
  return `
    <section class="quotation-summary-section">
      <table class="quotation-summary-table">
        <tbody>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>Cost for Pool Electromechanical works</td>
            <td class="summary-center">1</td>
            <td class="summary-center">Set</td>
            <td class="summary-amount">${escapeHtml(part1Total)}</td>
          </tr>
          <tr>
            <td>Cost for Waterproofing, Granite Copping &amp; Swimming Pool Tiles work</td>
            <td class="summary-center">1</td>
            <td class="summary-center">Set</td>
            <td class="summary-amount">${escapeHtml(part2Total)}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="summary-total-label">*TOTAL Rs.</td>
            <td class="summary-amount">${escapeHtml(subtotal)}</td>
          </tr>
        </tbody>
      </table>

      <div class="quotation-gst-note">*GST@${escapeHtml(gstPercent)}% EXTRA</div>

      <div class="terms-section">
        <h4>TERMS &amp; CONDITIONS</h4>
        <div class="terms-content">${multiline(terms)}</div>

        <h4>PAYMENT TERMS</h4>
        <div class="terms-content">${multiline(paymentTerms)}</div>
      </div>

      <div class="closing-signature-block">
        <div>Thanking you,</div>
        <div>For M R SWIMMING POOL &amp; SPA CONSTRUCTION COMPANY</div>
        <div>(Rajesh V Shetti)</div>
        <div>9538840277 / 9845326115</div>
      </div>
    </section>`;
}

export function MRQuotationSummary({
  part1Total,
  part2Total,
  subtotal,
  gstPercent,
  terms,
  paymentTerms,
}: MRQuotationSummaryProps) {
  return (
    <section className="quotation-summary-section">
      <table className="quotation-summary-table">
        <tbody>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>Cost for Pool Electromechanical works</td>
            <td className="summary-center">1</td>
            <td className="summary-center">Set</td>
            <td className="summary-amount">{part1Total}</td>
          </tr>
          <tr>
            <td>Cost for Waterproofing, Granite Copping & Swimming Pool Tiles work</td>
            <td className="summary-center">1</td>
            <td className="summary-center">Set</td>
            <td className="summary-amount">{part2Total}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="summary-total-label">*TOTAL Rs.</td>
            <td className="summary-amount">{subtotal}</td>
          </tr>
        </tbody>
      </table>

      <div className="quotation-gst-note">*GST@{gstPercent}% EXTRA</div>

      <div className="terms-section">
        <h4>TERMS & CONDITIONS</h4>
        <div className="terms-content">{terms}</div>

        <h4>PAYMENT TERMS</h4>
        <div className="terms-content">{paymentTerms}</div>
      </div>

      <div className="closing-signature-block">
        <div>Thanking you,</div>
        <div>For M R SWIMMING POOL & SPA CONSTRUCTION COMPANY</div>
        <div>(Rajesh V Shetti)</div>
        <div>9538840277 / 9845326115</div>
      </div>
    </section>
  );
}
