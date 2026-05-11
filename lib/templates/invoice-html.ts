import { formatCurrencyINR } from "../utils";

export function generateInvoiceHtml(data: any, logoBase64?: string) {
  const logoSrc = logoBase64 ? `data:image/png;base64,${logoBase64}` : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/templates/mr-swimming-pools/logo.png`;

  const totals = {
    subTotal: Number(data.subTotal),
    cgstAmount: Number(data.cgstAmount),
    sgstAmount: Number(data.sgstAmount),
    grandTotal: Number(data.grandTotal),
    amountInWords: data.amountInWords,
  };

  const invoiceDate = new Date(data.invoiceDate).toLocaleDateString("en-GB").replace(/\//g, ".");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Invoice ${data.invoiceNumber}</title>
  <style>
    @page {
      size: A4;
      margin: 12px 24px;
    }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #1F2937;
      background: #fff;
    }
    .invoice-paper {
      width: 100%;
      max-width: 100%;
      padding: 0;
      margin: 0;
      background: white;
      position: relative;
      font-size: 12px;
      line-height: 1.3;
    }
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 6px;
    }
    .invoice-logo {
      width: 190px;
      height: auto;
    }
    .header-content-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 20px;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: auto auto;
      column-gap: 48px;
      row-gap: 6px;
      color: #0E5EA8;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .address-tier {
      text-align: center;
      color: #0E5EA8;
      font-size: 11.5px;
      font-weight: 600;
      margin-bottom: 2px;
      width: 100%;
      max-width: 480px;
    }
    .branches-tier {
      text-align: center;
      color: #0E5EA8;
      font-size: 10.5px;
      font-weight: 600;
      margin-bottom: 8px; /* Gap before GST */
      width: 100%;
    }
    .gst-tier {
      text-align: center;
      color: #111111;
      font-size: 14px;
      font-weight: 800;
      margin-bottom: 2px; /* Gap before Divider */
      width: 100%;
    }
    .blue-divider {
      height: 2px;
      background-color: #0E5EA8;
      width: 100%;
      margin-top: 2px;
      margin-bottom: 8px;
      clear: both;
    }
    .invoice-title {
      text-align: center;
      font-weight: 800;
      font-size: 18px;
      text-decoration: underline;
      margin: 2mm 0;
      text-transform: uppercase;
      color: #1F2937;
    }
    .invoice-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4mm;
      font-size: 11px;
    }
    .invoice-to h4 {
      margin: 0 0 1mm 0;
      font-size: 12px;
    }
    .invoice-details {
      text-align: right;
      font-weight: 600;
    }
    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 4mm;
    }
    .invoice-table th, .invoice-table td {
      border: 1px solid #000;
      padding: 5px;
      font-size: 11px;
    }
    .invoice-table th {
      background: #f8fafc;
      text-transform: uppercase;
      font-weight: 700;
      color: #1e293b;
    }
    .invoice-totals-section {
      display: flex;
      justify-content: flex-end;
    }
    .totals-table {
      width: 80mm;
      border-collapse: collapse;
    }
    .totals-table td {
      border: 1px solid #000;
      padding: 4px 8px;
      font-size: 11px;
    }
    .totals-table td:first-child {
      font-weight: 700;
      width: 60%;
    }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .amount-words-section {
      margin-top: 3mm;
      font-weight: 700;
      font-size: 12px;
    }
    .bank-details-section {
      margin-top: 6px;
      font-size: 11px;
      color: #374151;
      line-height: 1.6;
    }
    .bank-details-section h4 {
      font-size: 12px;
      font-weight: 700;
      text-decoration: underline;
      margin-bottom: 4px;
      color: #111111;
      text-transform: uppercase;
    }
    .signature-section {
      margin-top: 8mm;
      margin-bottom: 5mm;
      text-align: right;
    }
    .signature-line {
      margin-top: 10mm;
      font-weight: 800;
      font-size: 12px;
    }
    .footer-banner {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 12mm;
      background: #0E5EA8;
      clip-path: polygon(0 50%, 100% 0, 100% 100%, 0% 100%);
      z-index: -1;
    }
    /* Single Page Mode Adjustments */
    .single-page .invoice-title { margin: 1mm 0; font-size: 16px; }
    .single-page .invoice-table th, .single-page .invoice-table td { padding: 3px 5px; font-size: 10px; }
    .single-page .totals-table td { padding: 3px 6px; font-size: 10px; }
    .single-page .signature-section { margin-top: 3mm; }
    .single-page .custom-section { margin-bottom: 2mm; }
    .single-page .amount-in-words { margin-bottom: 2mm; font-size: 10px; }
    .single-page .invoice-paper { padding-bottom: 10mm; }
  </style>
</head>
<body class="${data.pdfMode === 'SINGLE_PAGE' ? 'single-page' : ''}">
  <div class="invoice-paper">
    <div class="header-top">
      <!-- Left: Logo (190px) -->
      <div style="width: 190px;">
        <img src="${logoSrc}" alt="Logo" class="invoice-logo" />
      </div>

      <!-- Right: Content Column (Shifted Right) -->
      <div class="header-content-right">
        <div class="contact-grid">
          <div>☎ +91 9538840277</div>
          <div>✉ mracademyhubli@gmail.com</div>
          <div>☎ +91 9845326115</div>
          <div>🌐 www.mrswimmingacademy.com</div>
        </div>

        <div class="address-tier">
          Regd. Office: #191, Sri Mallikarjuna, Naveen Park, Kusugal Road, Keshwapur, Hubballi - 580 023
        </div>

        <div class="branches-tier">
          Branches: &bull; Bengaluru &bull; Mysuru &bull; Kalaburagi
        </div>

        <div class="gst-tier">
          GSTNo:29ABMFM0120E1ZL
        </div>
      </div>
    </div>

    <div class="blue-divider"></div>

    <div class="invoice-title">Tax Invoice No: ${data.invoiceNumber}</div>

    <div class="invoice-meta">
      <div class="invoice-to">
        <h4>To</h4>
        <div>M/s. ${data.customerName},</div>
        <div style="white-space: pre-wrap;">${data.customerAddress}</div>
        ${data.customerGST ? `<div style="margin-top: 3mm; font-weight: 600;">GST: ${data.customerGST}</div>` : ""}
        ${data.customerMobile ? `<div style="font-weight: 600;">MOB: ${data.customerMobile}</div>` : ""}
      </div>
      <div class="invoice-details">
        <div>Date: ${invoiceDate}</div>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th style="width: 40px;">SL. No</th>
          <th>Description</th>
          <th style="width: 80px;">Unit Per</th>
          <th style="width: 50px;">Qty</th>
          <th style="width: 100px;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map((item: any, index: number) => `
          <tr>
            <td class="text-center">${index + 1}</td>
            <td style="text-transform: uppercase; white-space: pre-wrap;">${item.description}</td>
            <td class="text-right">${Number(item.unitPrice).toFixed(2)}</td>
            <td class="text-center">${item.qty}</td>
            <td class="text-right">${Number(item.total).toFixed(2)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="invoice-totals-section">
      <table class="totals-table">
        <tbody>
          <tr>
            <td>Sub Total</td>
            <td class="text-right">${totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
          </tr>
          <tr>
            <td>CGST@${data.cgstPercent}%</td>
            <td class="text-right">${totals.cgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
          </tr>
          <tr>
            <td>SGST@${data.sgstPercent}%</td>
            <td class="text-right">${totals.sgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
          </tr>
          ${Number(data.roundOff) !== 0 ? `
            <tr>
              <td>Round Off</td>
              <td class="text-right">${Number(data.roundOff).toFixed(2)}</td>
            </tr>
          ` : ""}
          <tr style="background: #f0f0f0;">
            <td>Grand Total</td>
            <td class="text-right" style="font-weight: 800;">${totals.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="amount-words-section">
      RUPEES : ${totals.amountInWords}
    </div>

    <div class="bank-details-section">
      <h4>OUR BANK DETAILS-</h4>
      <div style="font-weight: 500;">
        <div>${data.bankDetails?.accountHolder || "M R SWIMMING POOLS AND SPA CONSTRUCTION COMPANY"}</div>
        <div style="margin-top: 4px;">A/C NO - ${data.bankDetails?.accountNumber || "38693647843"}</div>
        <div style="margin-top: 4px;">${data.bankDetails?.bankName || "STATE BANK OF INDIA"}, ${data.bankDetails?.branch || "KESHWAPUR, HUBLI"}</div>
        <div style="margin-top: 4px;">IFSC CODE - ${data.bankDetails?.ifscCode || "SBIN0040641"}</div>
      </div>
    </div>

    ${(data.customSections || []).map((section: any) => `
      <div style="margin-top: 5mm;">
        <h4 style="text-decoration: underline; font-size: 13px; margin-bottom: 2mm;">${section.title}</h4>
        <div style="white-space: pre-wrap; font-size: 11px;">${section.content}</div>
      </div>
    `).join("")}

    <div class="signature-section">
      <div style="font-weight: 800;">For M R SWIMMING POOL AND SPA CONSTRUCTION CO,</div>
      <div style="height: 20mm;"></div>
      <div class="signature-line">AUTHORISED SIGNATORY.</div>
    </div>

    <div class="footer-banner"></div>
  </div>
</body>
</html>
  `;
}
