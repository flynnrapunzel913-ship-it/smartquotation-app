import { formatCurrencyINR } from "../utils";

export function generateInvoiceHtml(data: any) {
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
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      color: #000;
      background: #fff;
    }
    .invoice-paper {
      width: 210mm;
      min-height: 297mm;
      padding: 12mm;
      box-sizing: border-box;
      position: relative;
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10mm;
    }
    .invoice-logo {
      height: 22mm;
    }
    .invoice-company-info {
      text-align: right;
      font-size: 10px;
      line-height: 1.4;
    }
    .invoice-title {
      text-align: center;
      font-weight: 800;
      font-size: 18px;
      text-decoration: underline;
      margin: 5mm 0;
      text-transform: uppercase;
    }
    .invoice-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8mm;
      font-size: 13px;
    }
    .invoice-to h4 {
      margin: 0 0 2mm 0;
      font-size: 14px;
    }
    .invoice-details {
      text-align: right;
      font-weight: 600;
    }
    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 5mm;
    }
    .invoice-table th, .invoice-table td {
      border: 1px solid #000;
      padding: 6px;
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
      padding: 5px 8px;
      font-size: 12px;
    }
    .totals-table td:first-child {
      font-weight: 700;
      width: 60%;
    }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .amount-words-section {
      margin-top: 5mm;
      font-weight: 700;
      font-size: 13px;
    }
    .bank-details-section {
      margin-top: 8mm;
      font-size: 11px;
    }
    .bank-details-section h4 {
      text-decoration: underline;
      margin-bottom: 2mm;
    }
    .signature-section {
      margin-top: 10mm;
      text-align: right;
    }
    .signature-line {
      margin-top: 15mm;
      font-weight: 800;
      font-size: 13px;
    }
    .footer-banner {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 12mm;
      background: #0369a1;
      clip-path: polygon(0 40%, 100% 0, 100% 100%, 0% 100%);
    }
  </style>
</head>
<body>
  <div class="invoice-paper">
    <div class="invoice-header">
      <img src="https://smart-quotation-app.vercel.app/templates/mr-swimming-pools/logo.png" alt="Logo" class="invoice-logo" />
      <div class="invoice-company-info">
         <div>+91 9538840277 | mracademyhubli@gmail.com</div>
         <div>+91 9845326115 | www.mrswimmingpool.com</div>
         <div>Regd. Office: #191, Sri Mallikarjuna, Naveen Park, Kusugal Road, Keshwapur, Hubballi - 580 023</div>
         <div style="font-weight: 800; margin-top: 5px;">GSTNo:29ABMFM0120E1ZL</div>
      </div>
    </div>

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
      <div style="white-space: pre-wrap;">${data.bankDetails}</div>
    </div>

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
