"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatCurrencyINR, convertToWordsINR } from "@/lib/utils";
import ProductSelect from "@/components/ProductSelect";
import "@/styles/wizard.css";
import "@/styles/invoice.css";
import InvoicePreview from "./InvoicePreview";

interface InvoiceItem {
  description: string;
  unitPrice: number;
  qty: number;
  total: number;
}

interface InvoiceForm {
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
}

const DEFAULT_BANK_DETAILS = `OUR BANK DETAILS
M R SWIMMING POOLS AND SPA CONSTRUCTION COMPANY
A/C NO - 38693647843
STATE BANK OF INDIA, KESHWAPUR, HUBLI
IFSC CODE - SBIN0040641`;

interface Props {
  initialData?: any;
}

export default function InvoiceWizard({ initialData }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<InvoiceForm>(initialData || {
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    customerName: "",
    customerAddress1: "",
    customerAddress2: "",
    customerAddress3: "",
    customerCityPin: "",
    customerGST: "",
    customerMobile: "",
    items: [{ description: "", unitPrice: 0, qty: 1, total: 0 }],
    cgstRate: 9,
    sgstRate: 9,
    roundOff: 0,
    bankDetails: DEFAULT_BANK_DETAILS,
  });

  const [totals, setTotals] = useState({
    subTotal: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    grandTotal: 0,
    amountInWords: "",
  });

  useEffect(() => {
    const subTotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    const cgstAmount = (subTotal * formData.cgstRate) / 100;
    const sgstAmount = (subTotal * formData.sgstRate) / 100;
    const grandTotalBeforeRound = subTotal + cgstAmount + sgstAmount + Number(formData.roundOff);
    const grandTotal = Math.round(grandTotalBeforeRound * 100) / 100;
    
    setTotals({
      subTotal,
      cgstAmount,
      sgstAmount,
      grandTotal,
      amountInWords: convertToWordsINR(grandTotal),
    });
  }, [formData.items, formData.cgstRate, formData.sgstRate, formData.roundOff]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "cgstRate" || name === "sgstRate" || name === "roundOff") {
      setFormData((prev) => ({ ...prev, [name]: Number(value || 0) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...formData.items];
    const item = { ...newItems[index], [field]: value };
    
    // Normalize numeric values
    if (field === "unitPrice" || field === "qty") {
      item.unitPrice = Number(item.unitPrice || 0);
      item.qty = Number(item.qty || 0);
      item.total = item.unitPrice * item.qty;
    }
    
    newItems[index] = item;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleProductSelect = (index: number, product: any) => {
    if (!product) return;
    const newItems = [...formData.items];
    const unitPrice = Number(product.defaultRate || 0);
    newItems[index] = {
      ...newItems[index],
      description: product.name,
      unitPrice: unitPrice,
      qty: 1,
      total: unitPrice,
    };
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", unitPrice: 0, qty: 1, total: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (isDraft = false) => {
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...totals,
          isDraft,
        }),
      });
      
      if (response.ok) {
        router.push("/dashboard/invoices");
      } else {
        alert("Failed to save invoice");
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Error saving invoice");
    }
  };

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <h1>MR Swimming Pools & Spa Invoice</h1>
        <div className="stepper">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`step-indicator ${step === s ? "active" : ""} ${step > s ? "completed" : ""}`}
            >
              {s === 1 && "Customer"}
              {s === 2 && "Items"}
              {s === 3 && "Tax"}
              {s === 4 && "Bank"}
              {s === 5 && "Review"}
            </div>
          ))}
        </div>
      </div>

      <div className="wizard-step-content">
        {step === 1 && (
          <div className="step-fade-in">
            <h3>Step 1: Customer Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g. INV/2026/014"
                />
              </div>
              <div className="form-group">
                <label>Invoice Date</label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="customerMobile"
                  value={formData.customerMobile}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Address Line 1</label>
                <input
                  type="text"
                  name="customerAddress1"
                  value={formData.customerAddress1}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Address Line 2</label>
                <input
                  type="text"
                  name="customerAddress2"
                  value={formData.customerAddress2}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Address Line 3</label>
                <input
                  type="text"
                  name="customerAddress3"
                  value={formData.customerAddress3}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>City / PIN</label>
                <input
                  type="text"
                  name="customerCityPin"
                  value={formData.customerCityPin}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Customer GST Number</label>
                <input
                  type="text"
                  name="customerGST"
                  value={formData.customerGST}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-fade-in">
            <h3>Step 2: Invoice Items</h3>
            <table className="items-table">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>SL</th>
                  <th>Description</th>
                  <th style={{ width: "120px" }}>Unit Price</th>
                  <th style={{ width: "80px" }}>Qty</th>
                  <th style={{ width: "120px" }}>Total</th>
                  <th style={{ width: "50px" }}></th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <ProductSelect
                        value={item.description}
                        companyType="MR_ACADEMY"
                        onChange={(prod, manual) => {
                          if (prod) {
                            handleProductSelect(index, prod);
                          } else {
                            handleItemChange(index, "description", manual || "");
                          }
                        }}
                        className="form-control"
                        placeholder="Select or type description..."
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                        className="form-control text-right"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                        className="form-control text-center"
                      />
                    </td>
                    <td className="text-right">{formatCurrencyINR(item.total)}</td>
                    <td>
                      <button className="btn-icon btn-danger" onClick={() => removeItem(index)}>
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-outline" onClick={addItem} style={{ marginTop: "12px" }}>
              + Add Row
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step-fade-in">
            <h3>Step 3: Tax Settings</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>CGST Rate (%)</label>
                <input
                  type="number"
                  name="cgstRate"
                  value={formData.cgstRate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>SGST Rate (%)</label>
                <input
                  type="number"
                  name="sgstRate"
                  value={formData.sgstRate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Round Off</label>
                <input
                  type="number"
                  name="roundOff"
                  value={formData.roundOff}
                  onChange={handleInputChange}
                  className="form-control"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="totals-summary-card">
              <div className="summary-row">
                <span>Sub Total:</span>
                <span>{formatCurrencyINR(totals.subTotal)}</span>
              </div>
              <div className="summary-row">
                <span>CGST ({formData.cgstRate}%):</span>
                <span>{formatCurrencyINR(totals.cgstAmount)}</span>
              </div>
              <div className="summary-row">
                <span>SGST ({formData.sgstRate}%):</span>
                <span>{formatCurrencyINR(totals.sgstAmount)}</span>
              </div>
              <div className="summary-row">
                <span>Round Off:</span>
                <span>{formatCurrencyINR(formData.roundOff)}</span>
              </div>
              <div className="summary-row grand-total">
                <span>Grand Total:</span>
                <span>{formatCurrencyINR(totals.grandTotal)}</span>
              </div>
              <div className="summary-row words">
                <span>{totals.amountInWords}</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-fade-in">
            <h3>Step 4: Bank Details</h3>
            <div className="form-group">
              <label>Edit Bank Details</label>
              <textarea
                name="bankDetails"
                value={formData.bankDetails}
                onChange={handleInputChange}
                className="form-control"
                rows={6}
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="step-fade-in">
            <h3>Step 5: Review & Generate</h3>
            <p>Please review the details before generating the invoice.</p>
            <div style={{ marginTop: "20px", border: "1px solid #e2e8f0", padding: "20px", background: "#f8fafc", borderRadius: "8px", overflow: "auto", maxHeight: "800px" }}>
              <InvoicePreview data={formData} totals={totals} />
            </div>
          </div>
        )}
      </div>

      <div className="wizard-footer">
        <button
          className="btn btn-outline"
          onClick={() => (step === 1 ? router.back() : setStep(step - 1))}
        >
          {step === 1 ? "Cancel" : "Previous"}
        </button>
        <div style={{ display: "flex", gap: "12px" }}>
          {step === 5 ? (
            <>
              <button className="btn btn-outline" onClick={() => handleSave(true)}>
                Save Draft
              </button>
              <button className="btn btn-primary" onClick={() => handleSave(false)}>
                Finalize & Save
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
