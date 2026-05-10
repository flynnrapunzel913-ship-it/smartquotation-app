"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatCurrencyINR, convertToWordsINR } from "@/lib/utils";
import "@/styles/wizard.css";
import "@/styles/invoice.css";
import InvoicePreview from "./InvoicePreview";
import SelectDatasetModal from "./SelectDatasetModal";
import AddProductFromDatasetModal from "./AddProductFromDatasetModal";

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
  });

  const [totals, setTotals] = useState({
    subTotal: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    grandTotal: 0,
    amountInWords: "",
  });

  const [datasetId, setDatasetId] = useState<string>("");
  const [datasetName, setDatasetName] = useState<string>("");
  const [showDatasetModal, setShowDatasetModal] = useState(!initialData);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

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

  const handleDatasetSelect = (id: string, name: string) => {
    setDatasetId(id);
    setDatasetName(name);
    setShowDatasetModal(false);
  };

  const handleAddProductFromDataset = (product: any) => {
    const unitPrice = Number(product.defaultRate || 0);
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: product.name + (product.description ? `\n${product.description}` : ""),
          unitPrice,
          qty: 1,
          total: unitPrice,
        },
      ],
    }));
    setShowAddProductModal(false);
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <SectionHeader stepKey="step2" defaultTitle="Step 2: Invoice Items" />
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {datasetId ? (
                  <div className="dataset-badge" style={{ padding: "6px 12px", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "6px", fontSize: "14px", color: "#0369a1" }}>
                    Dataset: <strong>{datasetName}</strong>
                    <button 
                      onClick={() => setShowDatasetModal(true)} 
                      style={{ marginLeft: "8px", background: "none", border: "none", color: "#0ea5e9", cursor: "pointer", textDecoration: "underline", fontSize: "12px" }}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-outline btn-sm" onClick={() => setShowDatasetModal(true)}>
                    Select Dataset
                  </button>
                )}
              </div>
            </div>

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
                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                    <td>
                      <textarea
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        className="form-control"
                        rows={2}
                        placeholder="Description"
                        style={{ resize: 'vertical', minHeight: '40px' }}
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
                    <td className="text-right" style={{ verticalAlign: 'middle' }}>{formatCurrencyINR(item.total)}</td>
                    <td style={{ verticalAlign: 'middle' }}>
                      <button className="btn-icon btn-danger" onClick={() => removeItem(index)}>
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowAddProductModal(true)}
                disabled={!datasetId}
                title={!datasetId ? "Select a dataset first" : ""}
              >
                + Add from Dataset
              </button>
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
                    <div key={index} className="card" style={{ padding: "16px", background: "#f8fafc" }}>
                      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                        <input 
                          type="text"
                          className="form-control"
                          style={{ fontWeight: 700 }}
                          value={section.title}
                          onChange={(e) => handleCustomSectionChange(index, "title", e.target.value)}
                          placeholder="Section Title (e.g. Terms & Conditions)"
                        />
                        <button className="btn-icon btn-danger" onClick={() => removeCustomSection(index)}>×</button>
                      </div>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={section.content}
                        onChange={(e) => handleCustomSectionChange(index, "content", e.target.value)}
                        placeholder="Section content..."
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="step-fade-in">
            <SectionHeader stepKey="step5" defaultTitle="Step 5: Review & Generate" />
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

      <SelectDatasetModal
        isOpen={showDatasetModal}
        onSelect={handleDatasetSelect}
        onSkip={() => setShowDatasetModal(false)}
      />

      <AddProductFromDatasetModal
        isOpen={showAddProductModal}
        datasetId={datasetId}
        onSelect={handleAddProductFromDataset}
        onClose={() => setShowAddProductModal(false)}
      />
    </div>
  );
}
