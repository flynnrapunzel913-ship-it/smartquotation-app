"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatCurrencyINR, convertToWordsINR } from "@/lib/utils";
import "@/styles/wizard.css";
import "@/styles/invoice.css";
import dynamic from "next/dynamic";
const InvoicePreview = dynamic(() => import("./InvoicePreview"), {
  loading: () => (
    <div style={{ padding: "40px", textAlign: "center", background: "#f8fafc", borderRadius: "16px", border: "2px dashed #e2e8f0", color: "#64748b" }}>
      Loading Invoice Preview...
    </div>
  ),
  ssr: false
});
import InvoiceProductManagerModal from "./InvoiceProductManagerModal";
import { InvoiceItemRow } from "./InvoiceItemRow";
import Button from "@/components/ui/Button";

interface InvoiceItem {
  description: string;
  unitPrice: number;
  qty: number;
  total: number;
  hsn?: string;
  gstRate?: number;
  unit?: string;
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
  bankDetails: BankDetails;
  sectionHeadings: Record<string, string>;
  customSections: CustomSection[];
  pdfMode: string;
}

const DEFAULT_BANK_DETAILS: BankDetails = {
  accountHolder: "M R SWIMMING POOLS AND SPA CONSTRUCTION COMPANY",
  accountNumber: "38693647843",
  bankName: "STATE BANK OF INDIA",
  branch: "KESHWAPUR, HUBLI",
  ifscCode: "SBIN0040641",
};

const DEFAULT_SECTION_HEADINGS: Record<string, string> = {
  step1: "Step 1: Customer Details",
  step2: "Step 2: Invoice Items",
  step3: "Step 3: Tax Summary",
  step4: "Step 4: Bank Details",
  step5: "Step 5: Review & Generate",
};

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
    sectionHeadings: DEFAULT_SECTION_HEADINGS,
    customSections: [],
    pdfMode: "STANDARD",
  });


  const [databaseId, setDatabaseId] = useState<string>("");
  const [databaseName, setDatabaseName] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [showDatabaseModal, setShowDatabaseModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savedInvoiceId, setSavedInvoiceId] = useState<string | null>(null);
  const [savedInvoiceNumber, setSavedInvoiceNumber] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchActiveDatabase();
    fetchProducts();
  }, []);



  const fetchActiveDatabase = async () => {
    try {
      const response = await fetch("/api/invoice-databases?module=MR_INVOICE");
      const data = await response.json();
      const active = data.find((db: any) => db.isActive);
      if (active) {
        setDatabaseId(active.id);
        setDatabaseName(active.name);
      }
    } catch (error) {
      console.error("Error fetching active database:", error);
    }
  };

  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await fetch("/api/products?module=MR_INVOICE");
      const data = await response.json();
      // Handle both array and object responses for backward compatibility
      const productsArray = Array.isArray(data) ? data : (data.products || []);
      setProducts(productsArray);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const selectProduct = (index: number, product: any) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      description: (product.name || product.description || "").trim(),
      unitPrice: Number(product.defaultRate || 0),
      hsn: product.hsnCode || "",
      gstRate: Number(product.gstRate || 0),
      unit: product.unit || "Nos",
      total: Number(product.defaultRate || 0) * newItems[index].qty
    };
    setFormData((prev) => ({ ...prev, items: newItems }));
    setShowDropdown(null);
  };

  const totals = React.useMemo(() => {
    const subTotal = formData.items.reduce((sum, item) => sum + (item.total || 0), 0);
    const cgstAmount = (subTotal * (formData.cgstRate || 0)) / 100;
    const sgstAmount = (subTotal * (formData.sgstRate || 0)) / 100;
    const grandTotalBeforeRound = subTotal + cgstAmount + sgstAmount + Number(formData.roundOff || 0);
    const grandTotal = Math.round(grandTotalBeforeRound * 100) / 100;
    
    return {
      subTotal,
      cgstAmount,
      sgstAmount,
      grandTotal,
      amountInWords: convertToWordsINR(grandTotal),
    };
  }, [formData.items, formData.cgstRate, formData.sgstRate, formData.roundOff]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown !== null) {
        const target = event.target as HTMLElement;
        if (!target.closest(".description-cell")) {
          setShowDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

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

  const handleHeadingChange = (stepKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sectionHeadings: { ...prev.sectionHeadings, [stepKey]: value },
    }));
  };

  const resetHeading = (stepKey: string) => {
    setFormData((prev) => ({
      ...prev,
      sectionHeadings: { ...prev.sectionHeadings, [stepKey]: DEFAULT_SECTION_HEADINGS[stepKey] },
    }));
  };

  const addCustomSection = () => {
    setFormData((prev) => ({
      ...prev,
      customSections: [...(prev.customSections || []), { title: "New Section", content: "" }],
    }));
  };

  const removeCustomSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== index),
    }));
  };

  const handleCustomSectionChange = (index: number, field: "title" | "content", value: string) => {
    const newSections = [...formData.customSections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData((prev) => ({ ...prev, customSections: newSections }));
  };

  const handleBankDetailChange = (field: keyof BankDetails, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: value },
    }));
  };

  const resetBankDetails = () => {
    setFormData((prev) => ({ ...prev, bankDetails: DEFAULT_BANK_DETAILS }));
  };

  const SectionHeader = ({ stepKey, defaultTitle }: { stepKey: string, defaultTitle: string }) => {
    const [isEditing, setIsEditing] = useState(false);
    const title = formData.sectionHeadings?.[stepKey] || defaultTitle;

    return (
      <div className="section-header-editable" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        {isEditing ? (
          <div style={{ display: "flex", gap: "8px", flex: 1 }}>
            <input 
              type="text" 
              className="form-control" 
              value={title} 
              onChange={(e) => handleHeadingChange(stepKey, e.target.value)}
              autoFocus
              onBlur={() => setIsEditing(false)}
            />
            <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(false)}>Done</button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
            <h3 style={{ margin: 0 }}>{title}</h3>
            <button 
              className="btn-text" 
              onClick={() => setIsEditing(true)}
              style={{ fontSize: "12px", color: "#0ea5e9", display: "flex", alignItems: "center", gap: "4px" }}
            >
              <span>✏</span> Edit Title
            </button>
            {title !== defaultTitle && (
              <button 
                className="btn-text" 
                onClick={() => resetHeading(stepKey)}
                style={{ fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span>↺</span> Reset
              </button>
            )}
          </div>
        )}
      </div>
    );
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
    setIsSaving(true);
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
        const savedData = await response.json();
        setSavedInvoiceId(savedData.id);
        setSavedInvoiceNumber(savedData.invoiceNumber);
        setIsSaved(true);
      } else {
        const errData = await response.json();
        alert(`Failed to save invoice: ${errData.details || errData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Error saving invoice");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingProducts && step === 1 && products.length === 0) {
    return (
      <div className="wizard-container">
        <div style={{ padding: "100px", textAlign: "center" }}>
          <div className="skeleton-line" style={{ height: "40px", width: "300px", margin: "0 auto 40px", background: "#f1f5f9", borderRadius: "12px" }}></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
            <div className="skeleton-line" style={{ height: "80px", background: "#f1f5f9", borderRadius: "12px" }}></div>
            <div className="skeleton-line" style={{ height: "80px", background: "#f1f5f9", borderRadius: "12px" }}></div>
            <div className="skeleton-line" style={{ height: "80px", background: "#f1f5f9", borderRadius: "12px" }}></div>
            <div className="skeleton-line" style={{ height: "80px", background: "#f1f5f9", borderRadius: "12px" }}></div>
          </div>
          <p style={{ marginTop: "32px", color: "#94a3b8", fontWeight: "500" }}>Preparing your invoice workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <h1>MR Swimming Pools & Spa Invoice</h1>
        <div className="stepper">
          {[
            { s: 1, name: "Customer" },
            { s: 2, name: "Items" },
            { s: 3, name: "Tax" },
            { s: 4, name: "Bank" },
            { s: 5, name: "Review" },
          ].map(({ s, name }) => (
            <div
              key={s}
              className={`step-indicator ${step === s ? "active" : step > s ? "completed" : ""}`}
              onClick={() => setStep(s)}
              style={{ cursor: "pointer" }}
            >
              <span className="step-num">{s}</span>
              <span className="step-text">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="wizard-step-content" style={{ padding: "32px", background: "white", borderRadius: "12px", marginTop: "24px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}>
        {step === 1 && (
          <div className="step-fade-in">
            <SectionHeader stepKey="step1" defaultTitle="Step 1: Customer Details" />
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
            <div style={{ marginBottom: "16px" }}>
              <SectionHeader stepKey="step2" defaultTitle="Step 2: Invoice Items" />
            </div>

            <table className="items-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ padding: "12px", textAlign: "center", width: "60px", color: "#475569", fontWeight: "600", fontSize: "0.875rem" }}>SL</th>
                  <th style={{ padding: "12px", textAlign: "left", color: "#475569", fontWeight: "600", fontSize: "0.875rem" }}>Description</th>
                  <th style={{ padding: "12px", textAlign: "center", width: "120px", color: "#475569", fontWeight: "600", fontSize: "0.875rem" }}>HSN</th>
                  <th style={{ padding: "12px", textAlign: "right", width: "120px", color: "#475569", fontWeight: "600", fontSize: "0.875rem" }}>Unit Price</th>
                  <th style={{ padding: "12px", textAlign: "center", width: "100px", color: "#475569", fontWeight: "600", fontSize: "0.875rem" }}>Qty</th>
                  <th style={{ padding: "12px", textAlign: "right", width: "120px", color: "#475569", fontWeight: "600", fontSize: "0.875rem" }}>Total</th>
                  <th style={{ padding: "12px", width: "60px" }}></th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => {
                  const filteredProducts = products.filter(p => 
                    (p.name && p.name.toLowerCase().includes(item.description.toLowerCase())) ||
                    (p.description && p.description.toLowerCase().includes(item.description.toLowerCase())) ||
                    (p.hsnCode && p.hsnCode.includes(item.description))
                  ).slice(0, 5);

                  return (
                    <InvoiceItemRow
                      key={index}
                      index={index}
                      item={item}
                      handleItemChange={handleItemChange}
                      removeItem={removeItem}
                      showDropdown={showDropdown === index}
                      setShowDropdown={setShowDropdown}
                      filteredProducts={filteredProducts}
                      selectProduct={selectProduct}
                    />
                  );
                })}
              </tbody>
            </table>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>

              <button className="btn btn-outline" onClick={addItem}>
                + Add Blank Row
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-fade-in">
            <SectionHeader stepKey="step3" defaultTitle="Step 3: Tax Summary" />
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
                <label style={{ display: "flex", justifyContent: "space-between" }}>
                  Round Off
                  <button 
                    className="btn-text" 
                    onClick={() => {
                      const subTotal = formData.items.reduce((sum, item) => sum + item.total, 0);
                      const cgstAmount = (subTotal * formData.cgstRate) / 100;
                      const sgstAmount = (subTotal * formData.sgstRate) / 100;
                      const totalBeforeRound = subTotal + cgstAmount + sgstAmount;
                      const roundedTotal = Math.round(totalBeforeRound);
                      const calculatedRoundOff = Number((roundedTotal - totalBeforeRound).toFixed(2));
                      setFormData(prev => ({ ...prev, roundOff: calculatedRoundOff }));
                    }}
                    style={{ fontSize: "11px", color: "#4f46e5" }}
                  >
                    Auto Round
                  </button>
                </label>
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
            
            <div className="totals-summary-card" style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0", maxWidth: "450px", marginLeft: "auto", marginTop: "24px", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
              <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.875rem", color: "#64748b" }}>
                <span>Sub Total:</span>
                <span style={{ fontWeight: "500", color: "#0f172a" }}>{formatCurrencyINR(totals.subTotal)}</span>
              </div>
              <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.875rem", color: "#64748b" }}>
                <span>CGST ({formData.cgstRate}%):</span>
                <span style={{ fontWeight: "500", color: "#0f172a" }}>{formatCurrencyINR(totals.cgstAmount)}</span>
              </div>
              <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.875rem", color: "#64748b" }}>
                <span>SGST ({formData.sgstRate}%):</span>
                <span style={{ fontWeight: "500", color: "#0f172a" }}>{formatCurrencyINR(totals.sgstAmount)}</span>
              </div>
              <div className="summary-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.875rem", color: "#64748b" }}>
                <span>Round Off:</span>
                <span style={{ fontWeight: "500", color: "#0f172a" }}>{formatCurrencyINR(formData.roundOff)}</span>
              </div>
              <div className="summary-row grand-total" style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "2px solid #e2e8f0", fontSize: "1.125rem", fontWeight: "700", color: "#0f172a" }}>
                <span>Grand Total:</span>
                <span style={{ color: "#4f46e5" }}>{formatCurrencyINR(totals.grandTotal)}</span>
              </div>
              <div className="summary-row words" style={{ marginTop: "8px", fontSize: "0.75rem", color: "#64748b", fontStyle: "italic", textAlign: "right" }}>
                <span>{totals.amountInWords}</span>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <SectionHeader stepKey="step4" defaultTitle="Step 4: Bank Details" />
              <button className="btn btn-outline btn-sm" onClick={resetBankDetails}>Use Default</button>
            </div>
            
            <div className="form-grid" style={{ marginBottom: "32px" }}>
              <div className="form-group">
                <label>Account Holder Name</label>
                <input
                  type="text"
                  value={formData.bankDetails.accountHolder}
                  onChange={(e) => handleBankDetailChange("accountHolder", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) => handleBankDetailChange("accountNumber", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={formData.bankDetails.bankName}
                  onChange={(e) => handleBankDetailChange("bankName", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <input
                  type="text"
                  value={formData.bankDetails.branch}
                  onChange={(e) => handleBankDetailChange("branch", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>IFSC Code</label>
                <input
                  type="text"
                  value={formData.bankDetails.ifscCode}
                  onChange={(e) => handleBankDetailChange("ifscCode", e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div className="custom-sections-manager">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderTop: "1px solid #e2e8f0", paddingTop: "24px" }}>
                <h4>Additional Custom Sections</h4>
                <button className="btn btn-outline btn-sm" onClick={addCustomSection}>+ Add Section</button>
              </div>

              {(formData.customSections || []).length === 0 ? (
                <p style={{ color: "#64748b", fontSize: "14px", fontStyle: "italic" }}>No custom sections added yet. (e.g. Terms, Notes, etc.)</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {formData.customSections.map((section, index) => (
                    <div key={index} className="card" style={{ padding: "20px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
                      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                        <input 
                          type="text"
                          className="form-control"
                          style={{ fontWeight: 700, color: "#0f172a" }}
                          value={section.title}
                          onChange={(e) => handleCustomSectionChange(index, "title", e.target.value)}
                          placeholder="Section Title (e.g. Terms & Conditions)"
                        />
                        <button 
                          className="btn-icon" 
                          style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "4px", width: "28px", height: "28px", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                          onClick={() => removeCustomSection(index)}
                        >
                          ✕
                        </button>
                      </div>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={section.content}
                        onChange={(e) => handleCustomSectionChange(index, "content", e.target.value)}
                        placeholder="Section content..."
                        style={{ minHeight: "80px" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 5 && !isSaved && (
          <div className="step-fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <SectionHeader stepKey="step5" defaultTitle="Step 5: Review & Generate" />
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "white", padding: "8px 16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#64748b" }}>PDF Layout:</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button 
                    className={`btn-sm ${formData.pdfMode === "STANDARD" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setFormData(prev => ({ ...prev, pdfMode: "STANDARD" }))}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                  >
                    Standard
                  </button>
                  <button 
                    className={`btn-sm ${formData.pdfMode === "SINGLE_PAGE" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setFormData(prev => ({ ...prev, pdfMode: "SINGLE_PAGE" }))}
                    style={{ fontSize: "12px", padding: "6px 12px" }}
                  >
                    1 Page
                  </button>
                </div>
              </div>
            </div>
            <p style={{ marginBottom: "20px" }}>Please review the details before generating the invoice.</p>
            <div style={{ 
              marginTop: "20px", 
              border: "1px solid #e2e8f0", 
              padding: "40px", 
              background: "#f8fafc", 
              borderRadius: "12px", 
              overflow: "auto", 
              maxHeight: "800px", 
              boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)" 
            }}>
              <InvoicePreview 
                data={{
                  ...formData,
                  cgstRate: formData.cgstRate,
                  sgstRate: formData.sgstRate,
                  customerAddress1: (formData.customerAddress1 || ""),
                  customerAddress2: (formData.customerAddress2 || ""),
                  customerAddress3: (formData.customerAddress3 || ""),
                  customerCityPin: (formData.customerCityPin || ""),
                }} 
                totals={totals} 
              />
            </div>
          </div>
        )}

        {isSaved && (
          <div className="step-fade-in" style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: "64px", marginBottom: "24px" }}>✅</div>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#1e293b", marginBottom: "12px" }}>Invoice Created Successfully!</h2>
            <p style={{ fontSize: "1.125rem", color: "#64748b", marginBottom: "40px" }}>
              Invoice <strong>{savedInvoiceNumber}</strong> has been saved to your records.
            </p>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "40px" }}>
              <a 
                href={`/api/invoices/${savedInvoiceId}/pdf`} 
                target="_blank"
                className="btn btn-primary"
                style={{ padding: "14px 28px", fontSize: "1rem", display: "flex", alignItems: "center", gap: "10px" }}
              >
                📄 Download PDF
              </a>
              <a 
                href={`/api/invoices/${savedInvoiceId}/word`} 
                target="_blank"
                className="btn btn-outline"
                style={{ padding: "14px 28px", fontSize: "1rem", display: "flex", alignItems: "center", gap: "10px" }}
              >
                📝 Download Word
              </a>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button 
                className="btn btn-text" 
                onClick={() => router.push("/dashboard/invoices")}
                style={{ color: "#64748b" }}
              >
                Go to History
              </button>
              <button 
                className="btn btn-outline" 
                onClick={() => window.location.reload()}
              >
                Create Another Invoice
              </button>
            </div>
          </div>
        )}
      </div>

      {!isSaved && (
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
                <Button className="btn-outline" onClick={() => handleSave(true)} loading={isSaving} loadingText="Saving...">
                  Save Draft
                </Button>
                <Button className="btn-primary" onClick={() => handleSave(false)} loading={isSaving} loadingText="Saving...">
                  Finalize & Save
                </Button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                Next
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
