"use client";

import React from "react";
import { formatCurrencyINR } from "@/lib/utils";
import "@/styles/klean-tech-template.css";

interface QuotationItem {
  type: "MACHINE" | "SPARE";
  code: string;
  description: string;
  imagePath: string;
  hsnCode: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

interface QuotationData {
  date: string;
  referenceNumber: string;
  invoiceToName: string;
  invoiceToAddress: string;
  gstPercent: number;
  carryingForwardPercent: number;
  freightType: string;
  serviceCharges: number;
  paymentTerms: string;
  termsAndConditions: string;
  items: QuotationItem[];
}

interface Props {
  data: QuotationData;
}

export default function KleanTechQuotationTemplate({ data }: Props) {
  const subtotal = data.items.reduce((sum, item) => sum + item.lineTotal, 0);
  const carryingForwardCharge = (subtotal * data.carryingForwardPercent) / 100;
  const taxableAmount = subtotal + data.serviceCharges + carryingForwardCharge;
  const gstAmount = (taxableAmount * data.gstPercent) / 100;
  const grandTotal = taxableAmount + gstAmount;

  return (
    <div className="quotation-template">
      {/* Header */}
      <div className="header">
        <div className="logo-section">
          <img src="/templates/klean-tech/roots-logo.png" alt="ROOTS" className="logo" />
        </div>
        
        <div className="company-details">
          <div className="company-name">KLEAN TECH SYSTEMS</div>
          <div>NO.191, “Shri Mallikarjuna”,</div>
          <div>Opp. Keshwapur Police Station, Naveen Park,</div>
          <div>Keshwapur, Hubli-580023</div>
          <div>GSTIN: 29AQEPS9928D1ZB</div>
          <div>Mob No: +91 9538840277</div>
          <div>Email: kleantechsystems@yahoo.co.in</div>
        </div>
        
        <div className="quote-meta">
          <div className="quote-title">QUOTATION</div>
          <div>{data.referenceNumber}</div>
          <div>DATE: {data.date}</div>
        </div>
      </div>

      {/* Invoice To */}
      <div className="invoice-to">
        <div className="invoice-to-title">Invoice To:</div>
        <div><strong>{data.invoiceToName}</strong></div>
        <div style={{ whiteSpace: "pre-wrap" }}>{data.invoiceToAddress}</div>
      </div>

      {/* Product Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Sl.No</th>
            <th style={{ width: "45%" }}>Description</th>
            <th style={{ width: "15%" }}>Image</th>
            <th style={{ width: "10%" }}>HSN Code</th>
            <th style={{ width: "10%" }}>Unit Price (INR)</th>
            <th style={{ width: "5%" }}>Qty</th>
            <th style={{ width: "10%" }}>Total Price exclusive. Of Tax Rs.</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, idx) => {
            const lines = item.description.split("\n");
            const title = lines[0];
            const specs = lines.slice(1).join("\n");
            
            return (
              <tr key={idx}>
                <td className="numeric-cell">{idx + 1}</td>
                <td>
                  <span className="product-description-title">{title}</span>
                  {specs && <span className="product-description-specs">{specs}</span>}
                </td>
                <td>
                  {item.imagePath ? (
                    <img src={item.imagePath.replace(".jpg", ".png")} alt={item.description} className="product-image" />
                  ) : (
                    <div style={{ textAlign: "center", color: "#999", fontSize: "10px" }}>No Image</div>
                  )}
                </td>
                <td className="numeric-cell">{item.hsnCode}</td>
                <td style={{ textAlign: "right" }}>{formatCurrencyINR(item.unitPrice).replace("₹", "").trim()}</td>
                <td className="numeric-cell">{item.quantity}</td>
                <td style={{ textAlign: "right" }}>{formatCurrencyINR(item.lineTotal).replace("₹", "").trim()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Payment Term */}
      <div className="payment-term">
        <span className="payment-term-label">Payment Term : </span>
        <span>{data.paymentTerms || "100% Advance Payment along with Purchase Order"}</span>
      </div>

      {/* Footer Line */}
      <div className="footer-line">
        <div>No: 191, “Shri Mallikarjuna” Opp. Police Station, Naveen Park,</div>
        <div>Kusugal Road, Keshwapur, Hubballi-580023.</div>
        <div>GST No: 29AQEPS9928D1ZB. email: kleantechsystems@yahoo.co.in.</div>
      </div>

      <div style={{ pageBreakBefore: "always" }}></div>

      {/* Terms and Conditions */}
      <div className="terms-section">
        <div className="terms-title">TERMS AND CONDITIONS:</div>
        <ul className="terms-list">
          <li>• Prices: Price quoted Ex Godown.</li>
          <li>• Tax Applicable: GST {data.gstPercent}% Extra</li>
          <li>• Carrying & Forwarding: {data.carryingForwardPercent}% Extra</li>
          <li>• Freight: {data.freightType || "To be paid by buyer"}</li>
          <li>• Delivery: Within 2 weeks from the date of receipt of your Purchase Order.</li>
          <li>• Warranty: 12 Months from the date of delivery...</li>
          <li>• Validity: The rates and terms are valid for 30 days...</li>
          <li>• Commissioning & Training: Will be done by our Engineer at your site.</li>
        </ul>
      </div>

      {/* Bank Details */}
      <div className="bank-details">
        <div className="bank-details-title">* The Bank Details.</div>
        <div className="bank-details-grid">
          <span className="bank-details-label">Account Name:</span>
          <span>KLEAN TECH SYSTEMS</span>
          
          <span className="bank-details-label">Bank Account Number:</span>
          <span>37116560016</span>
          
          <span className="bank-details-label">Bank Name:</span>
          <span>State Bank of India</span>
          
          <span className="bank-details-label">Bank Branch Name:</span>
          <span>Kusugal Road Branch Hubli.</span>
          
          <span className="bank-details-label">IFSC Code of Bank Branch:</span>
          <span>SBIN0040641</span>
          
          <span className="bank-details-label">Our E-mail ID (For sending payment advice):</span>
          <span>kleantechsystems@yahoo.co.in</span>
          
          <span className="bank-details-label">GST No:</span>
          <span>29AQEPS9928D1ZB</span>
          
          <span className="bank-details-label">PAN No:</span>
          <span>AQEPS9928D</span>
        </div>
      </div>

      {/* Signature Block */}
      <div className="signature-block">
        <div>For KLEAN TECH SYSTEMS</div>
        <div style={{ height: "60px" }}></div>
        <div>Rajesh V Shetti.</div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">
        * This is a computer generated document and authenticated by KLEAN TECH SYSTEMS. 
        Hence, it can be considered valid even if not signed manually.
      </div>
    </div>
  );
}
