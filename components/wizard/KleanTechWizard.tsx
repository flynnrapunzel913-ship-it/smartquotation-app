"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CategoryTabs from "@/components/klean-tech/CategoryTabs";
import ProductCatalog from "@/components/klean-tech/ProductCatalog";
import SelectedItemsTable from "@/components/klean-tech/SelectedItemsTable";
import ProductManagerModal from "@/components/klean-tech/ProductManagerModal";
import KleanTechQuotationTemplate from "@/components/templates/KleanTechQuotationTemplate";
import { Pencil, Check, X } from "lucide-react";
import "@/styles/wizard.css"; // Reuse existing styles if possible

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultRate: number;
  imagePath?: string | null;
  code?: string;
  hsnCode?: string;
}

interface QuotationItem {
  type: "MACHINE" | "SPARE";
  productId: string | null;
  code: string;
  description: string;
  imagePath: string;
  hsnCode: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  htsCode?: string;
  unit?: string;
  specs?: string;
  notes?: string;
  warranty?: string;
  deliveryTime?: string;
}

interface FormData {
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

const DEFAULT_TERMS = `1. Prices are ex-works Hubli.
2. GST extra as applicable.
3. Delivery within 2-3 weeks from the date of PO.`;

const DEFAULT_PAYMENT = "100% Advance Payment along with Purchase Order";

interface Props {
  id?: string;
  mode?: "edit" | "duplicate";
}

export default function KleanTechWizard({ id, mode = "edit" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [step, setStep] = useState(1);
  const showManageProducts = searchParams.get("manageProducts") === "true";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteId, setQuoteId] = useState<string | null>(id || null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [activeCategory, setActiveCategory] = useState<"MACHINE" | "SPARE">("MACHINE");
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editRowData, setEditRowData] = useState<QuotationItem | null>(null);

  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split("T")[0],
    referenceNumber: `KT-${Date.now().toString().slice(-6)}`,
    invoiceToName: "",
    invoiceToAddress: "",
    gstPercent: 18,
    carryingForwardPercent: 3,
    freightType: "To Pay Basis",
    serviceCharges: 0,
    paymentTerms: DEFAULT_PAYMENT,
    termsAndConditions: DEFAULT_TERMS,
    items: [],
  });

  const [isDuplicateReference, setIsDuplicateReference] = useState(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);

  useEffect(() => {
    const checkDuplicate = async () => {
      if (!formData.referenceNumber) return;
      setIsCheckingDuplicate(true);
      try {
        const res = await fetch(`/api/quotations?search=${formData.referenceNumber}`);
        const data = await res.json();
        const duplicate = data.some((q: any) => q.quoteNumber === formData.referenceNumber);
        setIsDuplicateReference(duplicate);
      } catch (e) {
        console.error("Failed to check duplicate", e);
      } finally {
        setIsCheckingDuplicate(false);
      }
    };

    const timer = setTimeout(checkDuplicate, 500);
    return () => clearTimeout(timer);
  }, [formData.referenceNumber]);

  // Calculate totals
  const subtotal = formData.items.reduce((sum, item) => sum + item.lineTotal, 0);
  const carryingForwardCharge = (subtotal * formData.carryingForwardPercent) / 100;
  const taxableAmount = subtotal + formData.serviceCharges + carryingForwardCharge;
  const gstAmount = (taxableAmount * formData.gstPercent) / 100;
  const grandTotal = taxableAmount + gstAmount;

  useEffect(() => {
    if (!id) {
      const saved = localStorage.getItem("klean_tech_draft");
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing draft", e);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      localStorage.setItem("klean_tech_draft", JSON.stringify(formData));
    }
  }, [formData, id]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProductFromCatalog = (product: Product, quantity: number) => {
    setFormData((prev) => {
      const existingItemIndex = prev.items.findIndex((item) => item.productId === product.id);
      
      if (existingItemIndex >= 0) {
        const newItems = [...prev.items];
        newItems[existingItemIndex].quantity = quantity;
        newItems[existingItemIndex].lineTotal = newItems[existingItemIndex].quantity * newItems[existingItemIndex].unitPrice;
        return { ...prev, items: newItems };
      } else {
        const newItem: QuotationItem = {
          type: product.category as "MACHINE" | "SPARE",
          productId: product.id,
          code: product.code || "",
          description: product.description || product.name,
          imagePath: product.imagePath || "",
          hsnCode: product.hsnCode || "",
          unitPrice: product.defaultRate,
          quantity: quantity,
          lineTotal: product.defaultRate * quantity,
        };
        return { ...prev, items: [...prev.items, newItem] };
      }
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index].quantity = quantity;
      newItems[index].lineTotal = quantity * newItems[index].unitPrice;
      return { ...prev, items: newItems };
    });
  };

  const deleteItem = (index: number) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true);
    
    const mappedData = {
      customerName: formData.invoiceToName,
      customerAddress: formData.invoiceToAddress,
      customerPhone: "", 
      customerEmail: "", 
      quoteNumber: formData.referenceNumber,
      title: "KLEAN TECH SYSTEMS Quotation",
      quotationType: "klean-tech",
      date: formData.date,
      gstPercent: formData.gstPercent,
      projectSpecifications: {
        serviceCharges: formData.serviceCharges,
        carryingForwardPercent: formData.carryingForwardPercent,
        freightType: formData.freightType,
      },
      items: formData.items.map((item, idx) => ({
        section: "A", 
        serialNo: idx + 1,
        category: item.type,
        description: item.description,
        warranty: "N/A",
        qty: item.quantity,
        unit: "Nos",
        rate: item.unitPrice,
        amount: item.lineTotal,
        imageUrl: item.imagePath,
        productId: item.productId,
        variableValues: {
          code: item.code,
          hsnCode: item.hsnCode,
          htsCode: item.htsCode,
          unit: item.unit,
          specs: item.specs,
          notes: item.notes,
          warranty: item.warranty,
          deliveryTime: item.deliveryTime,
        },
      })),
      notes: "",
      terms: formData.termsAndConditions,
      paymentTerms: formData.paymentTerms,
      isDraft: isDraft,
      quotationType: "KLEAN_TECH_SYSTEMS",
    };
    
    try {
      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mappedData),
      });
      
      if (res.ok) {
        const data = await res.json();
        if (!isDraft) {
          localStorage.removeItem("klean_tech_draft");
        }
        router.push(`/quotations/klean-tech/${data.id}/success`);
      } else {
        console.error("Error saving quotation");
      }
    } catch (e) {
      console.error("Error saving quotation", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <h1>KLEAN TECH SYSTEMS</h1>
        <p>Quotation Generator Wizard</p>
      </div>

      <div className="stepper">
        {[
          { s: 1, name: "Details" },
          { s: 2, name: "Products" },
          { s: 3, name: "Terms" },
          { s: 4, name: "Product Details" },
          { s: 5, name: "Preview" },
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

      <div className="wizard-step-content" style={{ padding: "32px", background: "white", borderRadius: "12px", marginTop: "24px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}>
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", marginBottom: "20px" }}>Step 1: Quotation Details</h2>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} />
              </div>
              <div className="form-group">
                <label>QUOTATION NUMBER</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.referenceNumber} 
                  onChange={(e) => handleInputChange("referenceNumber", e.target.value)} 
                  placeholder="KT-559372"
                  style={{ borderColor: isDuplicateReference ? "#ef4444" : "inherit" }}
                />
                {isDuplicateReference && (
                  <div style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "4px" }}>
                    This quotation number already exists. Please use a unique quotation number.
                  </div>
                )}
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Invoice To Company Name</label>
                <input type="text" className="form-control" value={formData.invoiceToName} onChange={(e) => handleInputChange("invoiceToName", e.target.value)} placeholder="Enter company name" />
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Invoice To Address</label>
                <textarea className="form-control" value={formData.invoiceToAddress} onChange={(e) => handleInputChange("invoiceToAddress", e.target.value)} placeholder="Enter full address" style={{ minHeight: "100px" }} />
              </div>
              <div className="form-group">
                <label>GST Percentage</label>
                <input type="number" className="form-control" value={formData.gstPercent} onChange={(e) => handleInputChange("gstPercent", parseFloat(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Carrying & Forwarding %</label>
                <input type="number" className="form-control" value={formData.carryingForwardPercent} onChange={(e) => handleInputChange("carryingForwardPercent", parseFloat(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Freight Type</label>
                <input type="text" className="form-control" value={formData.freightType} onChange={(e) => handleInputChange("freightType", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Service Charges (Optional)</label>
                <input type="number" className="form-control" value={formData.serviceCharges} onChange={(e) => handleInputChange("serviceCharges", parseFloat(e.target.value))} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", marginBottom: "20px" }}>Step 2: Add Products</h2>
            <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
              {/* Left Column - 70% */}
              <div style={{ flex: "0 0 70%", maxWidth: "70%" }}>
                <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
                <ProductCatalog activeCategory={activeCategory} onAddProduct={handleAddProductFromCatalog} selectedItems={formData.items} />
              </div>

              {/* Right Column - 30% */}
              <div style={{ flex: "0 0 30%", maxWidth: "30%", position: "sticky", top: "20px" }}>
                <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
                  <h3 style={{ marginTop: 0, fontSize: "1rem", fontWeight: "700", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", marginBottom: "16px" }}>Selected Items</h3>
                  
                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {formData.items.length === 0 ? (
                      <p style={{ textAlign: "center", color: "#94a3b8", padding: "20px 0", fontSize: "0.875rem" }}>No items selected yet.</p>
                    ) : (
                      formData.items.map((item, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "12px", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "16px" }}>
                          <div style={{ width: "48px", height: "48px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                            {item.imagePath ? (
                              <img src={item.imagePath} alt={item.description} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                            ) : (
                              <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "500" }}>No Image</span>
                            )}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: "600", fontSize: "0.875rem", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.description}</div>
                            <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>{item.quantity} x ₹ {item.unitPrice.toLocaleString()}</div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                              <span style={{ fontWeight: "700", fontSize: "0.875rem", color: "#0f172a" }}>₹ {item.lineTotal.toLocaleString()}</span>
                              <div style={{ display: "flex", gap: "4px" }}>
                                <button 
                                  type="button" 
                                  onClick={() => handleUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                                  style={{ width: "24px", height: "24px", background: "white", border: "1px solid #e2e8f0", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#475569", fontWeight: "600" }}
                                >-</button>
                                <button 
                                  type="button" 
                                  onClick={() => handleUpdateQuantity(idx, item.quantity + 1)}
                                  style={{ width: "24px", height: "24px", background: "white", border: "1px solid #e2e8f0", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#475569", fontWeight: "600" }}
                                >+</button>
                                <button 
                                  type="button" 
                                  onClick={() => deleteItem(idx)}
                                  style={{ width: "24px", height: "24px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", marginLeft: "4px" }}
                                >✕</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ marginTop: "16px", borderTop: "1px solid #e2e8f0", paddingTop: "12px", fontSize: "0.875rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#64748b" }}>
                      <span>Subtotal:</span>
                      <span style={{ fontWeight: "600", color: "#0f172a" }}>₹ {subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#64748b" }}>
                      <span>GST ({formData.gstPercent}%):</span>
                      <span style={{ fontWeight: "600", color: "#0f172a" }}>₹ {gstAmount.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", color: "#4f46e5", fontSize: "1rem", marginTop: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "12px" }}>
                      <span>Grand Total:</span>
                      <span>₹ {grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", marginBottom: "20px" }}>Step 3: Terms & Conditions</h2>
            <div className="form-group">
              <label>Terms & Conditions</label>
              <textarea className="form-control" value={formData.termsAndConditions} onChange={(e) => handleInputChange("termsAndConditions", e.target.value)} style={{ minHeight: "150px" }} />
            </div>
            <div className="form-group" style={{ marginTop: "20px" }}>
              <label>Payment Terms</label>
              <textarea className="form-control" value={formData.paymentTerms} onChange={(e) => handleInputChange("paymentTerms", e.target.value)} style={{ minHeight: "100px" }} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", marginBottom: "20px" }}>Step 4: Product Details</h2>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", background: "white", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                  <tr>
                    <th style={{ padding: "14px 16px", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Sl. No</th>
                    <th style={{ padding: "14px 16px", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</th>
                    <th style={{ padding: "14px 16px", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Image</th>
                    <th style={{ padding: "14px 16px", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>HSN Code</th>
                    <th style={{ padding: "14px 16px", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Unit Price (INR)</th>
                    <th style={{ padding: "14px 16px", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Qty</th>
                    <th style={{ padding: "14px 16px", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Price</th>
                    <th style={{ padding: "14px 16px", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "0.875rem" }}>
                        No products selected. Please go back to Step 2.
                      </td>
                    </tr>
                  ) : (
                    formData.items.map((item, idx) => {
                      const isEditing = editingRowIndex === idx;
                      const displayItem = isEditing ? editRowData! : item;
                      
                      return (
                        <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0", background: isEditing ? "#f0f9ff" : "inherit" }}>
                          <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#475569" }}>{idx + 1}</td>
                          <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#0f172a" }}>
                            {isEditing ? (
                              <input 
                                type="text" 
                                className="form-control" 
                                value={displayItem.description} 
                                onChange={(e) => setEditRowData({ ...displayItem, description: e.target.value })} 
                                style={{ width: "100%", padding: "8px", fontSize: "0.875rem" }}
                              />
                            ) : (
                              displayItem.description
                            )}
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <div style={{ width: "50px", height: "50px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                              {displayItem.imagePath ? (
                                <img src={displayItem.imagePath} alt={displayItem.description} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                              ) : (
                                <span style={{ fontSize: "10px", color: "#94a3b8" }}>No Image</span>
                              )}
                            </div>
                            {isEditing && (
                              <div style={{ marginTop: "4px" }}>
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (evt) => {
                                        setEditRowData({ ...displayItem, imagePath: evt.target?.result as string });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }} 
                                  style={{ fontSize: "0.75rem", width: "100%" }}
                                />
                                {displayItem.imagePath && (
                                  <button 
                                    type="button" 
                                    onClick={() => setEditRowData({ ...displayItem, imagePath: "" })}
                                    style={{ fontSize: "0.75rem", color: "#ef4444", border: "none", background: "none", cursor: "pointer", marginTop: "4px" }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#0f172a" }}>
                            {isEditing ? (
                              <input 
                                type="text" 
                                className="form-control" 
                                value={displayItem.hsnCode} 
                                onChange={(e) => setEditRowData({ ...displayItem, hsnCode: e.target.value })} 
                                style={{ width: "100%", padding: "8px", fontSize: "0.875rem" }}
                              />
                            ) : (
                              displayItem.hsnCode || "N/A"
                            )}
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#0f172a", fontWeight: "600" }}>
                            {isEditing ? (
                              <input 
                                type="number" 
                                className="form-control" 
                                value={displayItem.unitPrice} 
                                onChange={(e) => {
                                  const price = parseFloat(e.target.value) || 0;
                                  setEditRowData({ ...displayItem, unitPrice: price, lineTotal: price * displayItem.quantity });
                                }} 
                                style={{ width: "100%", padding: "8px", fontSize: "0.875rem" }}
                              />
                            ) : (
                              `₹ ${displayItem.unitPrice.toLocaleString()}`
                            )}
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#0f172a" }}>
                            {isEditing ? (
                              <input 
                                type="number" 
                                className="form-control" 
                                value={displayItem.quantity} 
                                onChange={(e) => {
                                  const qty = parseFloat(e.target.value) || 0;
                                  setEditRowData({ ...displayItem, quantity: qty, lineTotal: displayItem.unitPrice * qty });
                                }} 
                                style={{ width: "100%", padding: "8px", fontSize: "0.875rem" }}
                              />
                            ) : (
                              displayItem.quantity
                            )}
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#0f172a", fontWeight: "700" }}>
                            ₹ {displayItem.lineTotal.toLocaleString()}
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            {isEditing ? (
                              <div style={{ display: "flex", gap: "8px" }}>
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    if (!displayItem.description) {
                                      alert("Description cannot be empty");
                                      return;
                                    }
                                    if (displayItem.quantity <= 0) {
                                      alert("Quantity must be greater than 0");
                                      return;
                                    }
                                    const newItems = [...formData.items];
                                    newItems[idx] = displayItem;
                                    setFormData({ ...formData, items: newItems });
                                    setEditingRowIndex(null);
                                    setEditRowData(null);
                                  }}
                                  style={{ background: "#10b981", color: "white", border: "none", borderRadius: "4px", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                  title="Save"
                                >
                                  <Check size={16} />
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    setEditingRowIndex(null);
                                    setEditRowData(null);
                                  }}
                                  style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "4px", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                  title="Cancel"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <button 
                                type="button" 
                                onClick={() => {
                                  setEditingRowIndex(idx);
                                  setEditRowData({ ...item });
                                }}
                                style={{ background: "#4f46e5", color: "white", border: "none", borderRadius: "4px", padding: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", marginBottom: "20px" }}>Step 5: Preview & Generate</h2>
            
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              background: "#f1f5f9", 
              padding: "40px", 
              borderRadius: "12px",
              boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
              maxHeight: "800px",
              overflowY: "auto"
            }}>
              <div style={{ 
                width: "794px", 
                background: "white", 
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                borderRadius: "4px",
                border: "1px solid #e2e8f0",
                overflow: "hidden"
              }}>
                <KleanTechQuotationTemplate data={formData} />
              </div>
            </div>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button className="btn btn-primary" style={{ background: "linear-gradient(135deg, #059669 0%, #10b981 100%)" }} onClick={() => handleSubmit(false)}>Save & Generate</button>
              <button className="btn btn-secondary" onClick={() => setStep(4)}>Edit Details</button>
            </div>
          </div>
        )}
      </div>

      <div className="wizard-footer" style={{ marginTop: "32px", display: "flex", justifyContent: "space-between" }}>
        {step > 1 && (
          <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>← Previous</button>
        )}
        {step === 1 && <div></div>}
        
        {step < 5 ? (
          <button 
            className="btn btn-primary" 
            onClick={() => setStep(step + 1)}
            disabled={step === 1 && isDuplicateReference}
          >
            Next Step →
          </button>
        ) : (
          <div></div>
        )}
      </div>
      {showManageProducts && (
        <ProductManagerModal onClose={() => router.push(pathname)} />
      )}
    </div>
  );
}
