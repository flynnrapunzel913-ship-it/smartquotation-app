export function renderKleanTechPdfFooter(): string {
  return `
    <div style="width: 100%; font-size: 8px; line-height: 1.2; color: #444; text-align: center; padding: 0 20px; font-family: Arial, Helvetica, sans-serif;">
      NO.191, "Shri Mallikarjuna", Opp. Police Station, Naveen Park,
      Kusugal Road, Keshwapur, Hubballi-580023.
      GST No: 29AQEPS9928D1ZB.
      Email: kleantechsystems@yahoo.co.in.
      <div style="text-align: right; margin-top: 2px;">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    </div>
  `;
}
