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
    <div style="position: fixed; top: 10px; bottom: 10px; left: 10px; right: 10px; border: 1px solid #000; pointer-events: none; box-sizing: border-box;"></div>
    <div style="font-family: Arial, sans-serif; font-size: 9px; width: 100%; display: flex; justify-content: space-between; padding: 10px 30px; border-bottom: 1px solid #000; box-sizing: border-box;">
      <div style="flex: 0 0 20%;">
        ${logoBase64 ? `<img src="${logoBase64}" style="max-width: 100px; height: auto;" />` : ""}
      </div>
      <div style="flex: 0 0 50%; border-left: 1px solid #000; padding-left: 10px;">
        <div style="font-size: 11px; font-weight: bold;">KLEAN TECH SYSTEMS</div>
        <div>NO.191, “Shri Mallikarjuna”,</div>
        <div>Opp. Keshwapur Police Station, Naveen Park,</div>
        <div>Keshwapur, Hubli-580023</div>
        <div>GSTIN: 29AQEPS9928D1ZB</div>
        <div>Mob No: +91 9538840277</div>
        <div>Email: kleantechsystems@yahoo.co.in</div>
      </div>
      <div style="flex: 0 0 30%; text-align: right;">
        <div style="font-size: 12px; font-weight: bold;">QUOTATION</div>
        <div>${quote.quoteNumber}</div>
        <div>DATE: ${format(new Date(quote.date), "dd.MM.yyyy")}</div>
      </div>
    </div>
  `;
}
