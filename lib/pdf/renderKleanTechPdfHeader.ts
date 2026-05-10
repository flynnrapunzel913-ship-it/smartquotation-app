import { format } from "date-fns";
import type { QuotationWithRelations } from "@/types";
import fs from "fs";
import path from "path";

export function renderKleanTechPdfHeader(quote: QuotationWithRelations): string {
  const logoPath = path.join(process.cwd(), "templates", "klean-tech", "roots-logo.png");
  let logoBase64 = "";
  if (fs.existsSync(logoPath)) {
    const buffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/png;base64,${buffer.toString("base64")}`;
  }

  return `
    <div style="width: 100%; padding: 0 24px; box-sizing: border-box; position: relative;">
      <!-- Full Page Fixed Borders -->
      <div style="position: fixed; top: 0; left: 24px; right: 24px; height: 100vh; border-left: 1px solid #000; border-right: 1px solid #000; pointer-events: none; box-sizing: border-box;"></div>
      
      <div style="width: 100%; font-family: Arial, Helvetica, sans-serif; font-size: 10px; line-height: 1.2; border: 1px solid #000; border-bottom: none; padding: 8px 14px; box-sizing: border-box; position: relative; z-index: 1;">
        <div style="display: grid; grid-template-columns: 110px 1fr 200px; column-gap: 14px; align-items: start;">
          <div class="logo-section">
            ${logoBase64 ? `<img src="${logoBase64}" style="max-height: 85px; width: auto; object-fit: contain;" />` : ""}
          </div>
          
          <div style="text-align: left; font-size: 11px; border-left: 1px solid #000; padding-left: 10px; line-height: 1.35; font-weight: 500;">
            <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px; line-height: 1.1;">KLEAN TECH SYSTEMS</div>
            <div>No. 191, "Shri Mallikarjuna",</div>
            <div>Opp. Police Station, Naveen Park, Kusugal Road,</div>
            <div>Keshwapur, Hubballi-580023.</div>
            <div>GST No: 29AQEPS9928D1ZB</div>
            <div>Email: kleantechsystems@yahoo.co.in</div>
          </div>
          
          <div style="text-align: right; width: 100%; overflow: hidden; word-break: break-word; font-size: 12px; line-height: 1.5; font-weight: 500;">
            <div style="font-size: 20px; font-weight: 700; margin-bottom: 6px; line-height: 1.1; letter-spacing: 0.5px;">QUOTATION</div>
            <div>${quote.quoteNumber}</div>
            <div>DATE: ${format(new Date(quote.date), "dd.MM.yyyy")}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
