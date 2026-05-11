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
      margin: 20px 25px;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      color: #000;
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
    .invoice-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
    .invoice-logo {
      height: 32mm;
    }
    .invoice-company-info {
      text-align: right;
      font-size: 13px;
      line-height: 1.5;
    }
    .invoice-title {
      text-align: center;
      font-weight: 800;
      font-size: 20px;
      text-decoration: underline;
      margin: 2mm 0;
      text-transform: uppercase;
    }
    .invoice-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4mm;
      font-size: 13px;
    }
    .invoice-to h4 {
      margin: 0 0 1mm 0;
      font-size: 14px;
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
      font-size: 12px;
    }
    .invoice-table th {
      background: #eee;
      text-transform: uppercase;
      font-weight: 700;
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
      font-size: 12px;
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
      font-size: 13px;
    }
    .bank-details-section {
      margin-top: 5mm;
      font-size: 11px;
    }
    .bank-details-section h4 {
      text-decoration: underline;
      margin-bottom: 1.5mm;
    }
    .signature-section {
      margin-top: 10mm;
      margin-bottom: 5mm;
      text-align: right;
    }
    .signature-line {
      margin-top: 10mm;
      font-weight: 800;
      font-size: 13px;
    }
    .footer-banner {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 12mm;
      background: #0369a1;
      clip-path: polygon(0 50%, 100% 0, 100% 100%, 0% 100%);
      z-index: -1;
    }
    /* Single Page Mode Adjustments */
    .single-page .invoice-header { margin-bottom: 1mm; }
    .single-page .invoice-title { margin: 1mm 0; font-size: 18px; }
    .single-page .invoice-company-info { font-size: 11px; }
    .single-page .invoice-info-grid { margin-bottom: 2mm; font-size: 11px; }
    .single-page .invoice-table th, .single-page .invoice-table td { padding: 3px 5px; font-size: 11px; }
    .single-page .totals-table td { padding: 3px 6px; font-size: 11px; }
    .single-page .signature-section { margin-top: 3mm; }
    .single-page .custom-section { margin-bottom: 2mm; }
    .single-page .custom-section h4 { font-size: 11px; margin-bottom: 1mm; }
    .single-page .custom-section p { font-size: 10px; }
    .single-page .amount-in-words { margin-bottom: 2mm; font-size: 11px; }
    .single-page .bank-details { font-size: 10px; margin-top: 1.5mm; }
    .single-page .invoice-paper { padding-bottom: 10mm; }
  </style>
</head>
<body class="${data.pdfMode === 'SINGLE_PAGE' ? 'single-page' : ''}">
  <div class="invoice-paper">
    <div class="invoice-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
      <!-- Left: Logo -->
      <div style="width: 22%;">
        <img src="${logoSrc}" alt="Logo" class="invoice-logo" style="width: 100%; height: auto; max-height: 120px; object-fit: contain;" />
      </div>

      <!-- Center: Contact & Address -->
      <div style="width: 48%; color: #1e3a5f; font-family: Arial, sans-serif; display: flex; flex-direction: column; gap: 8px; border-left: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; padding: 0 15px;">
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="background: #0369a1; border-radius: 50%; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <span style="font-size: 11px; font-weight: 600;">+91 9538840277, +91 9845326115</span>
          </div>
        </div>
        <div style="font-size: 10px; line-height: 1.4; color: #1e3a5f;">
          <strong style="font-weight: 700; font-size: 11px; display: block; margin-bottom: 2px;">Regd. Office:</strong>
          #91, Sri Mallikarjuna,<br />
          Naveen Park, Kusugal Road,<br />
          Keshwapur, Hubballi – 580023
        </div>
      </div>

      <!-- Right: Email & Website -->
      <div style="width: 25%; color: #1e3a5f; font-family: Arial, sans-serif; display: flex; flex-direction: column; gap: 6px; align-items: flex-end; text-align: right;">
        <div style="display: flex; align-items: center; gap: 6px; justify-content: flex-end;">
          <span style="font-size: 11px; font-weight: 600;">mracademyhubli@gmail.com</span>
          <div style="background: #0369a1; border-radius: 50%; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; justify-content: flex-end;">
          <span style="font-size: 11px; font-weight: 600;">www.mrswimmingacademy.com</span>
          <div style="background: #0369a1; border-radius: 50%; width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Header Row: Branches & GST -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1.5px solid #0369a1; padding-top: 4px; margin-bottom: 8px;">
      <div style="width: 25%;"></div>
      <div style="width: 50%; text-align: center; font-size: 11px; font-weight: 600; color: #0369a1;">
        Branches: Bengaluru &bull; Mysuru &bull; Kalaburagi
      </div>
      <div style="width: 25%; text-align: right; font-weight: 800; font-size: 14px; color: #000;">
        GSTNo: 29ABMFM0120E1ZL
      </div>
    </div>
    <div style="border-top: 2px solid #0369a1; margin-top: 2px; margin-bottom: 10px;"></div>

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
      <div style="line-height: 1.5;">
        <div>${data.bankDetails?.accountHolder || ""}</div>
        <div>A/C NO - ${data.bankDetails?.accountNumber || ""}</div>
        <div>${data.bankDetails?.bankName || ""}, ${data.bankDetails?.branch || ""}</div>
        <div>IFSC CODE - ${data.bankDetails?.ifscCode || ""}</div>
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
