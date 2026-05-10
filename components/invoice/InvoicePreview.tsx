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
    bankDetails: string;
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
    <div className="invoice-paper">
      <div className="invoice-header">
        <img src="/templates/mr-swimming-pools/logo.png" alt="Logo" className="invoice-logo" />
        <div className="invoice-company-info">
           <div>+91 9538840277 | mracademyhubli@gmail.com</div>
           <div>+91 9845326115 | www.mrswimmingpool.com</div>
           <div>Regd. Office: #191, Sri Mallikarjuna, Naveen Park, Kusugal Road, Keshwapur, Hubballi - 580 023</div>
           <div style={{ fontWeight: 800, marginTop: '5px' }}>GSTNo:29ABMFM0120E1ZL</div>
        </div>
      </div>

      <div className="invoice-title">Tax Invoice No: {data.invoiceNumber || "___"}</div>

      <div className="invoice-meta">
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
        <div style={{ whiteSpace: 'pre-wrap' }}>{data.bankDetails}</div>
      </div>

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
