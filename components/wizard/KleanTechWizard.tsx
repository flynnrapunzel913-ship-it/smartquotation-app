"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CategoryTabs from "@/components/klean-tech/CategoryTabs";
import ProductCatalog from "@/components/klean-tech/ProductCatalog";
import SelectedItemsTable from "@/components/klean-tech/SelectedItemsTable";
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
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteId, setQuoteId] = useState<string | null>(id || null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [activeCategory, setActiveCategory] = useState<"MACHINE" | "SPARE">("MACHINE");

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
        newItems[existingItemIndex].quantity += quantity;
        newItems[existingItemIndex].lineTotal = newItems[existingItemIndex].quantity * newItems[existingItemIndex].unitPrice;
        return { ...prev, items: newItems };
      } else {
        const newItem: QuotationItem = {
          type: product.category as "MACHINE" | "SPARE",
          productId: product.id,
          code: product.code || "",
          description: product.name,
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
          { s: 4, name: "Preview" },
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

      <div className="wizard-step-content" style={{ padding: "20px", background: "white", borderRadius: "8px", marginTop: "20px" }}>
        {step === 1 && (
          <div>
            <h2>Step 1: Quotation Details</h2>
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Date</label>
                <input type="date" className="form-control" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} style={{ width: "100%", padding: "8px" }} />
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Invoice To Company Name</label>
                <input type="text" className="form-control" value={formData.invoiceToName} onChange={(e) => handleInputChange("invoiceToName", e.target.value)} style={{ width: "100%", padding: "8px" }} />
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Invoice To Address</label>
                <textarea className="form-control" value={formData.invoiceToAddress} onChange={(e) => handleInputChange("invoiceToAddress", e.target.value)} style={{ width: "100%", padding: "8px", minHeight: "80px" }} />
              </div>
              <div className="form-group">
                <label>GST Percentage</label>
                <input type="number" className="form-control" value={formData.gstPercent} onChange={(e) => handleInputChange("gstPercent", parseFloat(e.target.value))} style={{ width: "100%", padding: "8px" }} />
              </div>
              <div className="form-group">
                <label>Carrying & Forwarding %</label>
                <input type="number" className="form-control" value={formData.carryingForwardPercent} onChange={(e) => handleInputChange("carryingForwardPercent", parseFloat(e.target.value))} style={{ width: "100%", padding: "8px" }} />
              </div>
              <div className="form-group">
                <label>Freight Type</label>
                <input type="text" className="form-control" value={formData.freightType} onChange={(e) => handleInputChange("freightType", e.target.value)} style={{ width: "100%", padding: "8px" }} />
              </div>
              <div className="form-group">
                <label>Service Charges (Optional)</label>
                <input type="number" className="form-control" value={formData.serviceCharges} onChange={(e) => handleInputChange("serviceCharges", parseFloat(e.target.value))} style={{ width: "100%", padding: "8px" }} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Step 2: Add Products</h2>
            <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            <ProductCatalog activeCategory={activeCategory} onAddProduct={handleAddProductFromCatalog} />
            <SelectedItemsTable items={formData.items} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={deleteItem} />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Step 3: Terms & Conditions</h2>
            <div className="form-group">
              <label>Terms & Conditions</label>
              <textarea className="form-control" value={formData.termsAndConditions} onChange={(e) => handleInputChange("termsAndConditions", e.target.value)} style={{ width: "100%", padding: "8px", minHeight: "150px" }} />
            </div>
            <div className="form-group" style={{ marginTop: "15px" }}>
              <label>Payment Terms</label>
              <textarea className="form-control" value={formData.paymentTerms} onChange={(e) => handleInputChange("paymentTerms", e.target.value)} style={{ width: "100%", padding: "8px", minHeight: "80px" }} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2>Step 4: Preview & Generate</h2>
            <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <h3>Quotation Summary</h3>
              <p><strong>Subtotal:</strong> ₹ {subtotal.toFixed(2)}</p>
              <p><strong>Carrying & Forwarding (C&F):</strong> ₹ {carryingForwardCharge.toFixed(2)}</p>
              <p><strong>Service Charges:</strong> ₹ {formData.serviceCharges.toFixed(2)}</p>
              <p><strong>Taxable Amount:</strong> ₹ {taxableAmount.toFixed(2)}</p>
              <p><strong>GST ({formData.gstPercent}%):</strong> ₹ {gstAmount.toFixed(2)}</p>
              <hr style={{ margin: "10px 0" }} />
              <p style={{ fontSize: "18px", color: "#0369a1" }}><strong>Grand Total:</strong> ₹ {grandTotal.toFixed(2)}</p>
            </div>
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button className="btn" style={{ background: "#10b981", color: "white" }} onClick={() => handleSubmit(false)}>Save & Generate</button>
              <button className="btn btn-outline" onClick={() => setStep(1)}>Edit</button>
            </div>
          </div>
        )}
      </div>

      <div className="wizard-footer" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        {step > 1 && (
          <button className="btn btn-outline" onClick={() => setStep(step - 1)}>← Previous</button>
        )}
        {step === 1 && <div></div>}
        
        {step < 4 ? (
          <button className="btn" style={{ background: "#0f172a", color: "white" }} onClick={() => setStep(step + 1)}>Next Step →</button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
