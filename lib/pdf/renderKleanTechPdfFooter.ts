export function renderKleanTechPdfFooter(): string {
  return `
    <div style="width: 100%; padding: 0 24px; box-sizing: border-box;">
      <div style="width: 100%; border: 1px solid #000; border-top: none; padding: 6px 14px; box-sizing: border-box; font-size: 8px; line-height: 1.25; text-align: center; font-family: Arial, Helvetica, sans-serif;">
        <div style="margin-bottom: 4px;">* This is a computer generated document and authenticated by KLEAN TECH SYSTEMS. Hence, it can be considered valid even if not signed manually.</div>
        <div>No. 191, "Shri Mallikarjuna", Opp. Police Station, Naveen Park, Kusugal Road,</div>
        <div>Keshwapur, Hubballi-580023.</div>
        <div>GST No: 29AQEPS9928D1ZB. Email: kleantechsystems@yahoo.co.in.</div>
        <div style="text-align: right; margin-top: 2px;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      </div>
    </div>
  `;
}
