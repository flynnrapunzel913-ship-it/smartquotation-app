"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import InvoiceWizard from "@/components/invoice/InvoiceWizard";

export default function DuplicateInvoicePage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/invoices/${id}`)
        .then(res => res.json())
        .then(data => {
          const addr = data.customerAddress || "";
          const lines = addr.split('\n');
          setInvoice({
            ...data,
            id: undefined, // Remove ID for duplication
            invoiceNumber: data.invoiceNumber + "-COPY", // Suggest a new number
            invoiceDate: new Date().toISOString().split('T')[0],
            customerAddress1: lines[0] || "",
            customerAddress2: lines[1] || "",
            customerAddress3: lines[2] || "",
            customerCityPin: lines[3] || "",
            cgstRate: Number(data.cgstPercent),
            sgstRate: Number(data.sgstPercent),
          });
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <InvoiceWizard initialData={invoice} />
    </div>
  );
}
