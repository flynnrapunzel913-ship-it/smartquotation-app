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
    <div className={`invoice-paper ${data.pdfMode === "SINGLE_PAGE" ? "single-page" : ""}`} style={{ padding: "20px 25px" }}>
      <div className="invoice-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
        {/* Left: Logo */}
        <div style={{ width: "22%" }}>
          <img src="/templates/mr-swimming-pools/logo.png" alt="Logo" className="invoice-logo" style={{ width: "100%", height: "auto", maxHeight: "120px", objectFit: "contain" }} />
        </div>

        {/* Center: Contact & Address */}
        <div style={{ width: "48%", color: "#1e3a5f", fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", gap: "8px", borderLeft: "1px solid #cbd5e1", borderRight: "1px solid #cbd5e1", padding: "0 15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ background: "#0369a1", borderRadius: "50%", width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <span style={{ fontSize: "11px", fontWeight: "600" }}>+91 9538840277, +91 9845326115</span>
            </div>
          </div>
          <div style={{ fontSize: "10px", lineHeight: "1.4", color: "#1e3a5f" }}>
            <strong style={{ fontWeight: 700, fontSize: "11px", display: "block", marginBottom: "2px" }}>Regd. Office:</strong>
            #91, Sri Mallikarjuna,<br />
            Naveen Park, Kusugal Road,<br />
            Keshwapur, Hubballi – 580023
          </div>
        </div>

        {/* Right: Email & Website */}
        <div style={{ width: "25%", color: "#1e3a5f", fontFamily: "Arial, sans-serif", display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end", textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "11px", fontWeight: "600" }}>mracademyhubli@gmail.com</span>
            <div style={{ background: "#0369a1", borderRadius: "50%", width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "11px", fontWeight: "600" }}>www.mrswimmingacademy.com</span>
            <div style={{ background: "#0369a1", borderRadius: "50%", width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Header Row: Branches & GST */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1.5px solid #0369a1", paddingTop: "4px", marginBottom: "8px" }}>
        <div style={{ width: "25%" }}></div>
        <div style={{ width: "50%", textAlign: "center", fontSize: "11px", fontWeight: "600", color: "#0369a1" }}>
          Branches: Bengaluru &bull; Mysuru &bull; Kalaburagi
        </div>
        <div style={{ width: "25%", textAlign: "right", fontWeight: 800, fontSize: "14px", color: "#000" }}>
          GSTNo: 29ABMFM0120E1ZL
        </div>
      </div>
      <div style={{ borderTop: "2px solid #0369a1", marginTop: "2px", marginBottom: "10px" }}></div>

      <div className="invoice-title" style={{ margin: "2mm 0", fontSize: "20px" }}>Tax Invoice No: {data.invoiceNumber || "___"}</div>

      <div className="invoice-meta" style={{ marginBottom: "4mm" }}>
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
