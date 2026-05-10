import { format } from "date-fns";
import { formatCurrencyINR } from "@/lib/utils";
import type { QuotationWithRelations } from "@/types";
import type { CompanySettings } from "@prisma/client";
import type { ProjectSpecifications } from "@/types";
import fs from "fs";
import path from "path";
import { buildMRPoolSpecificationSectionHtml } from "@/components/templates/MRPoolSpecificationSection";
import { buildMRQuotationSummaryHtml } from "@/components/templates/MRQuotationSummary";

function escapeHtml(s: string): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatAmountWithoutCurrency(amount: number | string): string {
  return formatCurrencyINR(amount).replace("₹", "").trim();
}

function imageToBase64(src: string): string {
  if (!src) return "";
  if (src.startsWith("data:")) return src;
  
  try {
    const publicPath = path.join(process.cwd(), "public", src.startsWith("/") ? src.slice(1) : src);
    if (fs.existsSync(publicPath)) {
      const buffer = fs.readFileSync(publicPath);
      const ext = path.extname(publicPath).slice(1) || "png";
      return `data:image/${ext};base64,${buffer.toString("base64")}`;
    }
  } catch (e) {
    console.error("Error reading image for base64", e);
  }
  return src;
}

const HEADER_CONTACTS = {
  phone1: "+91 9538840277",
  phone2: "+91 9845326115",
  email: "mracademyhubli@gmail.com",
  website: "www.mrswimmingacademy.com",
  registeredOffice: "Regd. Office: #191, Sri Mallikarjuna, Naveen Park, Kusugal Road, Keshwapur, Hubballi - 580 023",
  branches: "Branches: Bengaluru &bull; Mysuru &bull; Kalburgi",
};

function buildKleanTechQuotationHtml(
  quote: QuotationWithRelations,
  company: CompanySettings | null,
): string {
  const subtotal = quote.items.reduce((sum, item) => sum + Number(item.amount), 0);
  const specs = quote.projectSpecifications as any;
  const serviceCharges = specs?.serviceCharges ? Number(specs.serviceCharges) : 0;
  const cfPercent = specs?.carryingForwardPercent ? Number(specs.carryingForwardPercent) : 3;
  const carryingForwardCharge = (subtotal * cfPercent) / 100;
  const taxableAmount = subtotal + serviceCharges + carryingForwardCharge;
  const gstPercent = Number(quote.gstPercent) || 18;
  const gstAmount = (taxableAmount * gstPercent) / 100;
  const grandTotal = taxableAmount + gstAmount;

  const cssPath = path.join(process.cwd(), "styles", "klean-tech-template.css");
  let cssContent = "";
  if (fs.existsSync(cssPath)) {
    cssContent = fs.readFileSync(cssPath, "utf-8");
  }

  const logoPath = path.join(process.cwd(), "templates", "klean-tech", "roots-logo.png");
  let logoHtml = "";
  if (fs.existsSync(logoPath)) {
    const buffer = fs.readFileSync(logoPath);
    logoHtml = `<img src="data:image/png;base64,${buffer.toString("base64")}" class="logo" />`;
  }

  const itemsHtml = quote.items.map((item, idx) => {
    const lines = item.description.split("\n");
    const title = lines[0];
    const itemSpecs = lines.slice(1).join("\n");
    
    return `
      <tr>
        <td class="numeric-cell">${idx + 1}</td>
        <td>
          <span class="product-description-title">${escapeHtml(title)}</span>
          ${itemSpecs ? `<span class="product-description-specs">${escapeHtml(itemSpecs)}</span>` : ""}
        </td>
        <td>
          ${item.imageUrl ? `<img src="${imageToBase64(item.imageUrl.replace(".jpg", ".png"))}" class="product-image" />` : "No Image"}
        </td>
        <td class="numeric-cell">${escapeHtml((item as any).hsnCode || "")}</td>
        <td style="text-align: right;">${formatAmountWithoutCurrency(item.rate)}</td>
        <td class="numeric-cell">${Number(item.qty)}</td>
        <td style="text-align: right;">${formatAmountWithoutCurrency(item.amount)}</td>
      </tr>
    `;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Quotation ${quote.quoteNumber}</title>
  <style>
    ${cssContent}
  </style>
</head>
<body>
  <div class="page-border"></div>
  <div class="quotation-template">
    <!-- Header -->
    <div class="header">
      <div class="logo-section">
        ${logoHtml}
      </div>
      
      <div class="company-details">
        <div class="company-name">KLEAN TECH SYSTEMS</div>
        <div>NO.191, “Shri Mallikarjuna”,</div>
        <div>Opp. Keshwapur Police Station, Naveen Park,</div>
        <div>Keshwapur, Hubli-580023</div>
        <div>GSTIN: 29AQEPS9928D1ZB</div>
        <div>Mob No: +91 9538840277</div>
        <div>Email: kleantechsystems@yahoo.co.in</div>
      </div>
      
      <div class="quote-meta">
        <div class="quote-title">QUOTATION</div>
        <div>${escapeHtml(quote.quoteNumber)}</div>
        <div>DATE: ${format(new Date(quote.date), "dd.MM.yyyy")}</div>
      </div>
    </div>

    <!-- Invoice To -->
    <div class="invoice-to">
      <div class="invoice-to-title">Invoice To:</div>
      <div><strong>${escapeHtml(quote.customer.name)}</strong></div>
      <div style="white-space: pre-wrap;">${escapeHtml(quote.customer.address)}</div>
    </div>

    <!-- Product Table -->
    <table class="product-table">
      <thead>
        <tr>
          <th style="width: 5%">Sl.No</th>
          <th style="width: 45%">Description</th>
          <th style="width: 15%">Image</th>
          <th style="width: 10%">HSN Code</th>
          <th style="width: 10%">Unit Price (INR)</th>
          <th style="width: 5%">Qty</th>
          <th style="width: 10%">Total Price exclusive. Of Tax Rs.</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <!-- Payment Term -->
    <div class="payment-term">
      <span class="payment-term-label">Payment Term : </span>
      <span>${escapeHtml(quote.paymentTerms || "100% Advance Payment along with Purchase Order")}</span>
    </div>

    <!-- Footer Line -->
    <div class="footer-line">
      <div>No: 191, “Shri Mallikarjuna” Opp. Police Station, Naveen Park,</div>
      <div>Kusugal Road, Keshwapur, Hubballi-580023.</div>
      <div>GST No: 29AQEPS9928D1ZB. email: kleantechsystems@yahoo.co.in.</div>
    </div>

    <div style="page-break-before: always;"></div>

    <!-- Terms and Conditions -->
    <div class="terms-section">
      <div class="terms-title">TERMS AND CONDITIONS:</div>
      <ul class="terms-list">
        <li>• Prices: Price quoted Ex Godown.</li>
        <li>• Tax Applicable: GST ${gstPercent}% Extra</li>
        <li>• Carrying & Forwarding: ${cfPercent}% Extra</li>
        <li>• Freight: ${escapeHtml(specs?.freightType || "To be paid by buyer")}</li>
        <li>• Delivery: Within 2 weeks from the date of receipt of your Purchase Order.</li>
        <li>• Warranty: 12 Months from the date of delivery...</li>
        <li>• Validity: The rates and terms are valid for 30 days...</li>
        <li>• Commissioning & Training: Will be done by our Engineer at your site.</li>
      </ul>
    </div>

    <!-- Bank Details -->
    <div class="bank-details">
      <div class="bank-details-title">* The Bank Details.</div>
      <div class="bank-details-grid">
        <span class="bank-details-label">Account Name:</span>
        <span>KLEAN TECH SYSTEMS</span>
        
        <span class="bank-details-label">Bank Account Number:</span>
        <span>37116560016</span>
        
        <span class="bank-details-label">Bank Name:</span>
        <span>State Bank of India</span>
        
        <span class="bank-details-label">Bank Branch Name:</span>
        <span>Kusugal Road Branch Hubli.</span>
        
        <span class="bank-details-label">IFSC Code of Bank Branch:</span>
        <span>SBIN0040641</span>
        
        <span class="bank-details-label">Our E-mail ID (For sending payment advice):</span>
        <span>kleantechsystems@yahoo.co.in</span>
        
        <span class="bank-details-label">GST No:</span>
        <span>29AQEPS9928D1ZB</span>
        
        <span class="bank-details-label">PAN No:</span>
        <span>AQEPS9928D</span>
      </div>
    </div>

    <!-- Signature Block -->
    <div class="signature-block">
      <div>For KLEAN TECH SYSTEMS</div>
      <div style="height: 60px;"></div>
      <div>Rajesh V Shetti.</div>
    </div>

    <!-- Disclaimer -->
    <div class="disclaimer">
      * This is a computer generated document and authenticated by KLEAN TECH SYSTEMS. 
      Hence, it can be considered valid even if not signed manually.
    </div>
    <div class="body-footer">
      NO.191, “Shri Mallikarjuna” Opp. Police Station, Naveen Park, Kusugal Road, Keshwapur, Hubballi-580023. GST No: 29AQEPS9928D1ZB. Email: kleantechsystems@yahoo.co.in.
    </div>
  </body>
</html>`;
}
export function buildQuotationHtml(
  quote: QuotationWithRelations,
  company: CompanySettings | null,
  options?: { title?: string },
): string {
  let specs = quote.projectSpecifications as any;
  if (typeof specs === "string") {
    try {
      specs = JSON.parse(specs);
    } catch (e) {
      specs = {};
    }
  }

  if ((quote as any).quotationType === "KLEAN_TECH_SYSTEMS" || specs?.quotationType === "KLEAN_TECH_SYSTEMS") {
    return buildKleanTechQuotationHtml(quote, company);
  }
  const title = options?.title ?? `Quotation ${quote.quoteNumber}`;
  const c = company;

  // Use the extracted logo if it exists, otherwise fallback to DB
  const localLogoPath = path.join(process.cwd(), "public", "templates", "mr-swimming-pools", "logo.png");
  let logoHtml = `<div class="logo-placeholder">${escapeHtml(c?.companyName ?? "MR SWIMMING POOLS & SPA CONSTRUCTION COMPANY")}</div>`;
  
  if (fs.existsSync(localLogoPath)) {
    logoHtml = `<img class="logo" src="${imageToBase64("/templates/mr-swimming-pools/logo.png")}" alt="logo" />`;
  } else if (c?.logoUrl) {
    logoHtml = `<img class="logo" src="${imageToBase64(c.logoUrl)}" alt="logo" />`;
  }

  // Same for CSS
  const cssPath = path.join(process.cwd(), "styles", "mr-swimming-pools-template.css");
  let cssContent = "";
  if (fs.existsSync(cssPath)) {
    cssContent = fs.readFileSync(cssPath, "utf-8");
  }

  const itemsBySection = new Map<string, typeof quote.items>();
  for (const item of quote.items) {
    const list = itemsBySection.get(item.section) ?? [];
    list.push(item);
    itemsBySection.set(item.section, list);
  }

  // Use dynamic sections if available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = (quote as any).sections && (quote as any).sections.length > 0
    ? (quote as any).sections.filter((s: any) => s.included)
    : [
        { code: "A", title: "Section A - MEP & Filtration" },
        { code: "B", title: "Section B - Testing & Electrical" },
        { code: "C", title: "Section C - Maintenance Cleaning Kit" },
        { code: "Part 2", title: "Part 2 - Pool Finishes" },
      ];

  const sumSections = (sectionCodes: string[]) =>
    quote.items
      .filter((item) => sectionCodes.includes(item.section))
      .reduce((total, item) => total + Number(item.amount), 0);

  const part1Total = sumSections(["A", "B", "C", "D"]);
  const part2Total = sumSections(["Part 2"]);

  let tablesHtml = `
    <div style="text-align: center; margin-top: 30px; margin-bottom: 20px;">
      <h2 style="text-decoration: underline; margin: 5px 0;">BILL OF QUANTITY</h2>
      <h3 style="margin: 5px 0;">PART-1 - MEP</h3>
      <h4 style="margin: 5px 0;">POOL FILTRATION & BASIN EQUIPMENTS / ACCESSORIES - MEP</h4>
    </div>
  `;
  for (const sec of sections) {
    const rows = itemsBySection.get(sec.code);
    if (!rows?.length) continue;
    tablesHtml += `
      <div class="section-title">${sec.title}</div>
      <table class="boq-table">
        <thead>
          <tr>
            <th style="width: 5%;">SL No.</th>
            <th style="width: 40%;">Description</th>
            <th style="width: 12%;">Image</th>
            <th style="width: 10%;">Warranty</th>
            <th style="width: 5%;">Qty</th>
            <th style="width: 6%;">Unit</th>
            <th style="width: 10%;">Rate</th>
            <th style="width: 12%;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((it: (typeof quote.items)[number], index: number) => {
              const title = (it as any).title || it.description.split("\n")[0];
              const rest = (it as any).title ? it.description : it.description.split("\n").slice(1).join("\n");
              
              // Highlight MAKE : lines
              const formattedBody = rest.split("\n").map(line => {
                if (line.toUpperCase().includes("MAKE :")) {
                  return `<div class="item-make">${escapeHtml(line)}</div>`;
                }
                return `<div class="item-body">${escapeHtml(line)}</div>`;
              }).join("");

              return `
              <tr>
                <td class="cen" style="vertical-align: top;">${index + 1}</td>
                <td>
                  <div class="item-title">${escapeHtml(title)}</div>
                  ${formattedBody}
                </td>
                <td class="cen">
                  <div class="item-image-container">
                    ${it.imageUrl ? `<img src="${imageToBase64(it.imageUrl)}" class="item-image" />` : 
                      ((it as any).imageText ? `<div style="font-weight: 700; font-size: 14px;">${escapeHtml((it as any).imageText)}</div>` : "")}
                  </div>
                </td>
                <td class="numeric-cell">${escapeHtml(it.warranty)}</td>
                <td class="numeric-cell">${Number(it.qty)}</td>
                <td class="numeric-cell">${escapeHtml(it.unit)}</td>
                <td class="num" style="vertical-align: middle;">${formatAmountWithoutCurrency(Number(it.rate))}</td>
                <td class="num" style="vertical-align: middle; font-weight: 700;">${formatAmountWithoutCurrency(Number(it.amount))}</td>
              </tr>`;
            }).join("")}
        </tbody>
      </table>`;
    
    if (sec.code === "D") {
      tablesHtml += `
        <table class="boq-table" style="margin-top: -21px; border-top: 0;">
          <tbody>
            <tr>
              <td colspan="7" style="text-align: right; padding: 10px; font-weight: 700;">TOTAL (A+B+C+D)</td>
              <td class="num" style="width: 100px; padding: 10px; font-weight: 700; background: #f8fafc;">${formatAmountWithoutCurrency(part1Total)}</td>
            </tr>
          </tbody>
        </table>
      `;
    }
  }

  const specificationSectionHtml = buildMRPoolSpecificationSectionHtml({
      poolLength: specs.poolLength,
      poolWidth: specs.poolWidth,
      poolDepth: specs.poolDepth,
      waterVolume: specs.poolVolume,
      totalPoolVolume: specs.totalPoolVolume,
      filtrationVolume: specs.filtrationVolume,
      turnoverPeriod: specs.turnoverPeriod,
      tilingArea: specs.tilingArea,
      copingArea: specs.copingArea,
      waterproofingArea: specs.waterproofingArea,
      plantRoomSize: specs.plantRoomSize,
      poolShape: specs.shapeOfPool,
      poolType: specs.typeOfPool,
    });
  const summaryHtml = buildMRQuotationSummaryHtml({
    part1Total: formatCurrencyINR(part1Total),
    part2Total: formatCurrencyINR(part2Total),
    subtotal: formatCurrencyINR(Number(quote.subtotal)),
    gstPercent: Number(quote.gstPercent),
    terms: quote.terms,
    paymentTerms: quote.paymentTerms,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>${cssContent}</style>
</head>
<body>
  <div class="template-wrapper">
    <header class="header-block">
      <div class="header-main-row">
        <div class="logo-container">${logoHtml}</div>
        <div class="header-contacts" aria-label="MR Swimming Pools contact information">
          <div class="contact-group contact-group-left">
            <div class="contact-item"><span class="contact-icon">Tel</span><strong>${HEADER_CONTACTS.phone1}</strong></div>
            <div class="contact-item"><span class="contact-icon">Tel</span><strong>${HEADER_CONTACTS.phone2}</strong></div>
          </div>
          <div class="contact-group contact-group-right">
            <div class="contact-item"><span class="contact-icon">Mail</span><strong>${HEADER_CONTACTS.email}</strong></div>
            <div class="contact-item"><span class="contact-icon">Web</span><strong>${HEADER_CONTACTS.website}</strong></div>
          </div>
        </div>
      </div>
      <div class="header-address-row">
        <div>${HEADER_CONTACTS.registeredOffice}</div>
        <div>${HEADER_CONTACTS.branches}</div>
      </div>
    </header>
    <div class="doc-title">QUOTATION</div>

    <div class="client-meta-grid">
      <div class="meta-box">
        <h4>Client Details</h4>
        <div class="kv-row"><div class="kv-key">Name:</div><div class="kv-val">${escapeHtml(quote.customer.name)}</div></div>
        <div class="kv-row"><div class="kv-key">Site:</div><div class="kv-val">${escapeHtml(quote.customer.address).replace(/\n/g, "<br/>")}</div></div>
      </div>
      <div class="meta-box">
        <h4>Quote Details</h4>
        <div class="kv-row"><div class="kv-key">Date:</div><div class="kv-val">${format(new Date(quote.date), "dd MMM yyyy")}</div></div>
      </div>
    </div>

    ${specificationSectionHtml}

    ${tablesHtml}

    ${summaryHtml}
  </div>
</body>
</html>`;
}

