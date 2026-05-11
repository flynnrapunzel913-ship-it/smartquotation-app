"use client";

import React from "react";
import { formatCurrencyINR } from "@/lib/utils";
import "@/styles/invoice.css";

interface InvoiceItem {
  description: string;
  unitPrice: number;
  qty: number;
  total: number;
}

interface BankDetails {
  accountHolder: string;
  accountNumber: string;
  bankName: string;
  branch: string;
  ifscCode: string;
}

interface CustomSection {
  title: string;
  content: string;
}

interface Props {
  data: {
    invoiceNumber: string;
    invoiceDate: string;
    customerName: string;
    customerAddress1: string;
    customerAddress2: string;
    customerAddress3: string;
    customerCityPin: string;
    customerGST: string;
    customerMobile: string;
    items: InvoiceItem[];
    cgstRate: number;
    sgstRate: number;
    roundOff: number;
    bankDetails: BankDetails;
    customSections?: CustomSection[];
    pdfMode?: string;
  };
  totals: {
    subTotal: number;
    cgstAmount: number;
    sgstAmount: number;
    grandTotal: number;
    amountInWords: string;
  };
}

export default function InvoicePreview({ data, totals }: Props) {
  return (
    <div className={`invoice-paper ${data.pdfMode === "SINGLE_PAGE" ? "single-page" : ""}`} style={{ padding: "12px 24px" }}>
      <div className="header-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px", columnGap: "12px" }}>
        {/* Left: Logo (34%) */}
        <div style={{ width: "34%" }}>
          <img src="/templates/mr-swimming-pools/logo.png" alt="Logo" style={{ width: "200px", height: "auto" }} />
        </div>

        {/* Center: Phones (28%) */}
        <div className="contact-blue" style={{ width: "28%", color: "#0E5EA8", fontSize: "12px", fontWeight: 700, lineHeight: 1.35, display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>☎</span> +91 9538840277
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>☎</span> +91 9845326115
          </div>
        </div>

        {/* Right: Online (38%) */}
        <div className="contact-blue" style={{ width: "38%", color: "#0E5EA8", fontSize: "12px", fontWeight: 700, lineHeight: 1.35, display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-end", textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>✉</span> mracademyhubli@gmail.com
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span>🌐</span> www.mrswimmingacademy.com
          </div>
        </div>
      </div>

      <div className="address-tier" style={{ textAlign: "center", color: "#0E5EA8", fontSize: "10.5px", fontWeight: 600, marginTop: "0", marginBottom: "2px", lineHeight: "1.3" }}>
        Regd. Office: #91, Sri Mallikarjuna, Naveen Park, Kusugal Road, Keshwapur, Hubballi - 580 023
      </div>

      <div className="branches-tier" style={{ textAlign: "center", color: "#0E5EA8", fontSize: "10px", fontWeight: 600, marginBottom: "2px" }}>
        Branches: &bull; Bengaluru &bull; Mysuru &bull; Kalaburagi
      </div>

      <div className="gst-tier" style={{ textAlign: "center", color: "#111111", fontSize: "12px", fontWeight: 700, marginBottom: "3px" }}>
        GSTNo:29ABMFM0120E1ZL
      </div>

      <div className="blue-divider" style={{ height: "2px", backgroundColor: "#0E5EA8", width: "100%", marginTop: "4px", marginBottom: "8px" }}></div>

      <div className="invoice-title" style={{ margin: "2mm 0", fontSize: "18px", textDecoration: "underline", fontWeight: 800, textAlign: "center", textTransform: "uppercase", color: "#1F2937" }}>Tax Invoice No: {data.invoiceNumber || "___"}</div>

      <div className="invoice-meta" style={{ marginBottom: "4mm", fontSize: "11px", display: "flex", justifyContent: "space-between" }}>
        <div className="invoice-to">
          <h4>To</h4>
          <div>M/s. {data.customerName || "____________________"},</div>
          <div>{data.customerAddress1}</div>
          {data.customerAddress2 && <div>{data.customerAddress2}</div>}
          {data.customerAddress3 && <div>{data.customerAddress3}</div>}
          <div>{data.customerCityPin}</div>
          {data.customerGST && <div style={{ marginTop: '10px', fontWeight: 600 }}>GST: {data.customerGST}</div>}
          {data.customerMobile && <div style={{ fontWeight: 600 }}>MOB: {data.customerMobile}</div>}
        </div>
        <div className="invoice-details">
          <div>Date: {new Date(data.invoiceDate).toLocaleDateString("en-GB").replace(/\//g, ".")}</div>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>SL. No</th>
            <th>Description</th>
            <th style={{ width: "100px" }}>Unit Per</th>
            <th style={{ width: "60px" }}>Qty</th>
            <th style={{ width: "120px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td style={{ textTransform: 'uppercase', whiteSpace: 'pre-wrap' }}>{item.description}</td>
              <td className="text-right">{Number(item.unitPrice || 0).toFixed(2)}</td>
              <td className="text-center">{item.qty}</td>
              <td className="text-right">{Number(item.total || 0).toFixed(2)}</td>
            </tr>
          ))}
          {/* Fill empty rows to maintain height if needed, or just let it be dynamic */}
        </tbody>
      </table>

      <div className="invoice-totals-section">
        <table className="totals-table">
          <tbody>
            <tr>
              <td>Sub Total</td>
              <td className="text-right">{Number(totals.subTotal || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td>CGST@{data.cgstRate}%</td>
              <td className="text-right">{Number(totals.cgstAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
            <tr>
              <td>SGST@{data.sgstRate}%</td>
              <td className="text-right">{Number(totals.sgstAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
            {Number(data.roundOff) !== 0 && (
              <tr>
                <td>Round Off</td>
                <td className="text-right">{Number(data.roundOff || 0).toFixed(2)}</td>
              </tr>
            )}
            <tr>
              <td>Grand Total</td>
              <td className="text-right" style={{ fontWeight: 800 }}>{Number(totals.grandTotal || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="amount-words-section">
        RUPEES : {totals.amountInWords}
      </div>

      <div className="bank-details-section">
        <h4>OUR BANK DETAILS-</h4>
        <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
          <div>{data.bankDetails.accountHolder}</div>
          <div>A/C NO - {data.bankDetails.accountNumber}</div>
          <div>{data.bankDetails.bankName}, {data.bankDetails.branch}</div>
          <div>IFSC CODE - {data.bankDetails.ifscCode}</div>
        </div>
      </div>

      {(data.customSections || []).map((section, idx) => (
        <div key={idx} className="custom-section" style={{ marginTop: '20px' }}>
          <h4 style={{ textDecoration: 'underline', marginBottom: '8px' }}>{section.title}</h4>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{section.content}</div>
        </div>
      ))}

      <div className="signature-section">
        <div style={{ fontWeight: 800 }}>For M R SWIMMING POOL AND SPA CONSTRUCTION CO,</div>
        {/* Placeholder for stamp/signature */}
        <div style={{ height: '80px' }}></div>
        <div className="signature-line">AUTHORISED SIGNATORY.</div>
      </div>

      {/* Footer graphic */}
      <div style={{ 
        height: '40px', 
        width: 'calc(100% + 80px)', 
        marginLeft: '-40px', 
        marginBottom: '-40px',
        marginTop: '20px',
        background: 'linear-gradient(90deg, #0284c7 0%, #0369a1 100%)',
        clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0% 100%)'
      }}></div>
    </div>
  );
}
