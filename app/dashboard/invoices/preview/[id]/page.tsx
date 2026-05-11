"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import InvoicePreview from "@/components/invoice/InvoicePreview";

export default function InvoicePreviewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/invoices/${id}`)
        .then(res => res.json())
        .then(data => {
          setInvoice(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '40px' }}>Loading...</div>;
  if (!invoice) return <div className="container" style={{ padding: '40px' }}>Invoice not found.</div>;

  const totals = {
    subTotal: Number(invoice.subtotal) || Number(invoice.subTotal),
    cgstAmount: Number(invoice.cgstAmount),
    sgstAmount: Number(invoice.sgstAmount),
    grandTotal: Number(invoice.grandTotal),
    amountInWords: invoice.amountInWords,
  };

  const handleDownloadPdf = () => {
    window.open(`/api/invoices/${id}/pdf`, '_blank');
  };

  const handleDownloadWord = () => {
    window.open(`/api/invoices/${id}/word`, '_blank');
  };

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1>Invoice Preview</h1>
          <p>Invoice No: {invoice.invoiceNumber}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline" onClick={() => router.push("/dashboard/invoices")}>
            Back to History
          </button>
          <button className="btn btn-outline" onClick={handleDownloadWord}>
            Download Word
          </button>
          <button className="btn btn-primary" onClick={handleDownloadPdf}>
            Download PDF
          </button>
        </div>
      </div>

      <div style={{ border: "1px solid #e2e8f0", padding: "40px", background: "#f8fafc", borderRadius: "8px", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <InvoicePreview 
          data={{
            ...invoice,
            cgstRate: invoice.cgstPercent,
            sgstRate: invoice.sgstPercent,
            items: invoice.items as any,
            customerAddress1: (invoice.customerAddress || "").split('\n')[0] || "",
            customerAddress2: (invoice.customerAddress || "").split('\n')[1] || "",
            customerAddress3: (invoice.customerAddress || "").split('\n')[2] || "",
            customerCityPin: (invoice.customerAddress || "").split('\n')[3] || "",
          }} 
          totals={totals} 
        />
      </div>
    </div>
  );
}
