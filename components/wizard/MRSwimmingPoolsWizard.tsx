"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuotationFormValues, QuotationItemForm } from "@/types";
import ProductSelect from "@/components/ProductSelect";
import "@/styles/wizard.css";

const DEFAULT_TERMS = `1. Single phase connection up to the plant room is in your scope of work.
2. Back wash line after the plant room and water supply to balance tank is in your scope.
3. All Civil works mentioned above are at our scope.`;

const DEFAULT_PAYMENT = `1. 30% Payment along with the PO.
2. 30% payment after bar bending.
3. 30% during tile fixing work.
4. 10% on successful commissioning and testing.`;

const DEFAULT_SECTIONS = [
  { code: "A", title: "Section A – MEP & Filtration", included: true, sortOrder: 1 },
  { code: "B", title: "Section B – Pool Equipment", included: true, sortOrder: 2 },
  { code: "C", title: "Section C – Civil & Finishes", included: true, sortOrder: 3 },
  { code: "D", title: "Section D – Supply of Swimming Pool Maintenance Cleaning Kit", included: true, sortOrder: 4 },
  { code: "Part 2", title: "Part 2 – Pool Finishes", included: true, sortOrder: 5 },
];

interface Props {
  id?: string;
  mode?: "edit" | "duplicate";
}

export default function MRSwimmingPoolsWizard({ id, mode = "edit" }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteId, setQuoteId] = useState<string | null>(id || null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);

  const [formData, setFormData] = useState<QuotationFormValues>({
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: "",
    quoteNumber: `MR-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split("T")[0],
    gstPercent: 18,
    projectSpecifications: {
      poolLength: "",
      poolWidth: "",
      poolDepth: "",
      poolVolume: "",
      plantRoomSize: "",
      shapeOfPool: "",
      typeOfPool: "",
      totalPoolVolume: "",
      filtrationVolume: "",
      turnoverPeriod: "",
      tilingArea: "",
      copingArea: "",
      waterproofingArea: "",
    },
    items: [],
    sections: DEFAULT_SECTIONS,
    notes: "",
    terms: DEFAULT_TERMS,
    paymentTerms: DEFAULT_PAYMENT,
    title: "",
  });

  // Helper to generate title
  const autoGenerateTitle = (name: string, address: string) => {
    if (name?.trim()) return `${name.trim()} Swimming Pool Quotation`;
    if (address?.trim()) {
      const part = address.split(",")[0].split("\n")[0].trim();
      return `${part} Quotation`;
    }
    return "Untitled Quotation";
  };

  // Recovery logic
  useEffect(() => {
    if (!id) {
      const saved = localStorage.getItem("mr_quotation_draft");
      if (saved) {
        setShowRecoveryDialog(true);
      }
    }
  }, [id]);

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Auto-save to localStorage
  useEffect(() => {
    if (hasUnsavedChanges) {
      localStorage.setItem("mr_quotation_draft", JSON.stringify(formData));
    }
  }, [formData, hasUnsavedChanges]);

  // Debounced server auto-save
  useEffect(() => {
    if (!hasUnsavedChanges || isSubmitting) return;

    const timer = setTimeout(() => {
      handleAutoSave();
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData, hasUnsavedChanges, isSubmitting]);

  const handleAutoSave = async () => {
    if (!quoteId) return; // Only auto-save to server if we have an ID
    try {
      const payload = { ...formData, subtotal, grandTotal, isDraft: true };
      await fetch(`/api/quotations/${quoteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (e) {
      console.error("Auto-save failed", e);
    }
  };

  const resumeDraft = () => {
    const saved = localStorage.getItem("mr_quotation_draft");
    if (saved) {
      setFormData(JSON.parse(saved));
      setHasUnsavedChanges(true);
    }
    setShowRecoveryDialog(false);
  };

  const startNew = () => {
    localStorage.removeItem("mr_quotation_draft");
    setShowRecoveryDialog(false);
  };

  useEffect(() => {
    if (id) {
      fetch(`/api/quotations/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert("Error loading quotation: " + data.error);
            return;
          }
          // Map data to form structure
          const mappedData: QuotationFormValues = {
            customerName: data.customer.name,
            customerAddress: data.customer.address,
            customerPhone: data.customer.phone || "",
            customerEmail: data.customer.email || "",
            quoteNumber: mode === "duplicate" ? `MR-${Date.now().toString().slice(-6)}` : data.quoteNumber,
            date: new Date(data.date).toISOString().split("T")[0],
            gstPercent: data.gstPercent,
            projectSpecifications: {
              poolLength: String(data.projectSpecifications?.poolLength ?? ""),
              poolWidth: String(data.projectSpecifications?.poolWidth ?? ""),
              poolDepth: String(data.projectSpecifications?.poolDepth ?? ""),
              poolVolume: String(data.projectSpecifications?.poolVolume ?? ""),
              plantRoomSize: String(data.projectSpecifications?.plantRoomSize ?? ""),
              shapeOfPool: String(data.projectSpecifications?.shapeOfPool ?? ""),
              typeOfPool: String(data.projectSpecifications?.typeOfPool ?? ""),
              totalPoolVolume: String(data.projectSpecifications?.totalPoolVolume ?? ""),
              filtrationVolume: String(data.projectSpecifications?.filtrationVolume ?? ""),
              turnoverPeriod: String(data.projectSpecifications?.turnoverPeriod ?? ""),
              tilingArea: String(data.projectSpecifications?.tilingArea ?? ""),
              copingArea: String(data.projectSpecifications?.copingArea ?? ""),
              waterproofingArea: String(data.projectSpecifications?.waterproofingArea ?? ""),
            },
            items: data.items.map((it: any) => ({
              section: it.section,
              serialNo: it.serialNo,
              category: it.category,
              description: it.description,
              warranty: it.warranty,
              qty: it.qty,
              unit: it.unit,
              rate: it.rate,
              amount: it.amount,
              imageUrl: it.imageUrl,
            })),
            sections: (data.sections && data.sections.length > 0) ? data.sections : DEFAULT_SECTIONS,
            notes: data.notes || "",
            terms: data.terms || DEFAULT_TERMS,
            paymentTerms: data.paymentTerms || DEFAULT_PAYMENT,
          };
          setFormData(mappedData);
          if (mode === "duplicate") setQuoteId(null);
          setIsLoading(false);
        });
    }
  }, [id, mode]);

  // Calculate totals - only include included sections
  const subtotal = formData.items.reduce((sum, item) => {
    const section = formData.sections?.find((s) => s.code === item.section);
    if (section && !section.included) return sum;
    return sum + Number(item.amount || 0);
  }, 0);
  const gstAmount = (subtotal * formData.gstPercent) / 100;
  const grandTotal = subtotal + gstAmount;

  const nextStep = () => setStep((s) => Math.min(s + 1, 7));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: keyof QuotationFormValues, value: any) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "customerName" || field === "customerAddress") {
        next.title = autoGenerateTitle(next.customerName, next.customerAddress);
      }
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleSpecChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      projectSpecifications: { ...prev.projectSpecifications, [field]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSectionChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const newSections = [...(prev.sections || [])];
      newSections[index] = { ...newSections[index], [field]: value };
      return { ...prev, sections: newSections };
    });
    setHasUnsavedChanges(true);
  };

  const addCustomSection = () => {
    const code = `S${(formData.sections?.length || 0) + 1}`;
    const newSection = { code, title: "Custom Section", included: true, sortOrder: (formData.sections?.length || 0) + 1 };
    setFormData((prev) => ({ ...prev, sections: [...(prev.sections || []), newSection] }));
  };

  const addItem = (section: string) => {
    const newItem: QuotationItemForm = {
      section,
      serialNo: formData.items.filter((i) => i.section === section).length + 1,
      category: "General",
      description: "",
      warranty: "",
      qty: 1,
      unit: "Nos",
      rate: 0,
      amount: 0,
    };
    setFormData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateItem = (index: number, field: keyof QuotationItemForm, value: any) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      if (field === "qty" || field === "rate") {
        newItems[index].amount = Number(newItems[index].qty) * Number(newItems[index].rate);
      }
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

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateItem(index, "imageUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true);
    try {
      const payload = { ...formData, subtotal, grandTotal, isDraft };
      const url = quoteId ? `/api/quotations/${quoteId}` : "/api/quotations";
      const method = quoteId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setQuoteId(data.id);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        localStorage.removeItem("mr_quotation_draft");
        if (!isDraft) {
          setStep(7); // Go to preview
        } else {
          alert("Draft saved!");
        }
      } else {
        alert("Error saving quotation: " + data.error);
      }
    } catch (e) {
      alert("Network error");
    }
    setIsSubmitting(false);
  };

  if (isLoading) return <div className="wizard-container">Loading quotation data...</div>;

  const renderTableForSection = (section: string, title: string) => {
    return (
      <div style={{ marginBottom: "32px" }}>
        <h3>{title}</h3>
        <table className="wizard-table">
          <thead>
            <tr>
              <th className="col-small">SL</th>
              <th className="col-large">Description & Image</th>
              <th className="col-medium">Warranty</th>
              <th className="col-small">Qty</th>
              <th className="col-small">Unit</th>
              <th className="col-medium">Rate (₹)</th>
              <th className="col-medium">Amount (₹)</th>
              <th className="col-action"></th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, idx) => {
              if (item.section !== section) return null;
              return (
                <tr key={idx}>
                  <td>
                    <input type="number" className="form-control" value={item.serialNo} onChange={(e) => updateItem(idx, "serialNo", parseInt(e.target.value))} />
                  </td>
                  <td>
                    <ProductSelect
                      className="form-control"
                      value={item.description}
                      onChange={(product, manualValue) => {
                        if (product) {
                          // Auto-fill multiple fields
                          setFormData((prev) => {
                            const newItems = [...prev.items];
                            newItems[idx] = {
                              ...newItems[idx],
                              description: product.specification || product.name,
                              warranty: product.warranty || newItems[idx].warranty,
                              unit: product.unit || newItems[idx].unit,
                              rate: Number(product.defaultRate) || newItems[idx].rate,
                              category: product.category || newItems[idx].category,
                              section: product.sectionCode || newItems[idx].section,
                            };
                            newItems[idx].amount = Number(newItems[idx].qty) * Number(newItems[idx].rate);
                            return { ...prev, items: newItems };
                          });
                        } else if (manualValue !== undefined) {
                          updateItem(idx, "description", manualValue);
                        }
                      }}
                      placeholder="Search products or type..."
                    />
                    <div className="image-upload-wrapper">
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(idx, e)} style={{ fontSize: "11px" }} />
                      {item.imageUrl && <img src={item.imageUrl} className="image-preview" alt="preview" />}
                    </div>
                  </td>
                  <td>
                    <input type="text" className="form-control" value={item.warranty} onChange={(e) => updateItem(idx, "warranty", e.target.value)} />
                  </td>
                  <td>
                    <input type="number" className="form-control" value={item.qty} onChange={(e) => updateItem(idx, "qty", parseFloat(e.target.value))} />
                  </td>
                  <td>
                    <input type="text" className="form-control" value={item.unit} onChange={(e) => updateItem(idx, "unit", e.target.value)} />
                  </td>
                  <td>
                    <input type="number" className="form-control" value={item.rate} onChange={(e) => updateItem(idx, "rate", parseFloat(e.target.value))} />
                  </td>
                  <td>
                    <input type="number" className="form-control" value={item.amount} readOnly style={{ background: "#f8fafc" }} />
                  </td>
                  <td className="col-action">
                    <button className="btn-icon" onClick={() => deleteItem(idx)} title="Delete">✕</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn-add-row" onClick={() => addItem(section)}>+ Add Row to {section}</button>
      </div>
    );
  };

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <h1>MR SWIMMING POOLS & SPA CONSTRUCTION COMPANY</h1>
        <p>Quotation Generator Wizard</p>
        {lastSaved && (
          <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
            Last auto-saved at {lastSaved.toLocaleTimeString()}
          </div>
        )}
      </div>

      {showRecoveryDialog && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{ background: "white", padding: "32px", borderRadius: "12px", maxWidth: "400px", textAlign: "center", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginBottom: "12px" }}>Draft Found</h3>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>A saved draft was found from your previous session. Would you like to resume it?</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button className="btn" style={{ background: "#0369a1", color: "white" }} onClick={resumeDraft}>Resume Draft</button>
              <button className="btn btn-outline" onClick={startNew}>Start New</button>
            </div>
          </div>
        </div>
      )}

      <div className="stepper">
        {[
          { s: 1, name: "Client" },
          { s: 2, name: "Specs" },
          { s: 3, name: "MEP" },
          { s: 4, name: "Finishes" },
          { s: 5, name: "Totals" },
          { s: 6, name: "Terms" },
          { s: 7, name: "Preview" },
        ].map(({ s, name }) => (
          <div
            key={s}
            className={`step-indicator ${step === s ? "active" : step > s ? "completed" : ""}`}
            onClick={() => setStep(s)}
            style={{ cursor: "pointer" }}
            title={`Jump to ${name}`}
          >
            <span className="step-num">{s}</span>
            <span className="step-text">{name}</span>
          </div>
        ))}
      </div>

      <div className="wizard-step-content">
        {step === 1 && (
          <div>
            <h2>Step 1: Client Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Quote Number</label>
                <input type="text" className="form-control" value={formData.quoteNumber} onChange={(e) => handleInputChange("quoteNumber", e.target.value)} />
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Quotation Title (Auto-generated)</label>
                <input type="text" className="form-control" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="e.g., Tadas Swimming Pool Quotation" />
              </div>
              <div className="form-group">
                <label>Client Name</label>
                <input type="text" className="form-control" value={formData.customerName} onChange={(e) => handleInputChange("customerName", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Site Address</label>
                <textarea className="form-control" value={formData.customerAddress} onChange={(e) => handleInputChange("customerAddress", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" value={formData.customerPhone} onChange={(e) => handleInputChange("customerPhone", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={formData.customerEmail} onChange={(e) => handleInputChange("customerEmail", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Step 2: Pool Specifications</h2>
            <div className="form-grid">
              <div className="form-group"><label>Pool Length</label><input type="text" className="form-control" value={formData.projectSpecifications.poolLength} onChange={(e) => handleSpecChange("poolLength", e.target.value)} /></div>
              <div className="form-group"><label>Pool Width</label><input type="text" className="form-control" value={formData.projectSpecifications.poolWidth} onChange={(e) => handleSpecChange("poolWidth", e.target.value)} /></div>
              <div className="form-group"><label>Pool Depth</label><input type="text" className="form-control" value={formData.projectSpecifications.poolDepth} onChange={(e) => handleSpecChange("poolDepth", e.target.value)} /></div>
              <div className="form-group"><label>Water Volume</label><input type="text" className="form-control" value={formData.projectSpecifications.poolVolume} onChange={(e) => handleSpecChange("poolVolume", e.target.value)} /></div>
              <div className="form-group"><label>Plant Room Size</label><input type="text" className="form-control" value={formData.projectSpecifications.plantRoomSize} onChange={(e) => handleSpecChange("plantRoomSize", e.target.value)} /></div>
              <div className="form-group"><label>Shape of Pool</label><input type="text" className="form-control" value={formData.projectSpecifications.shapeOfPool} onChange={(e) => handleSpecChange("shapeOfPool", e.target.value)} /></div>
              <div className="form-group"><label>Type of Pool</label><input type="text" className="form-control" value={formData.projectSpecifications.typeOfPool} onChange={(e) => handleSpecChange("typeOfPool", e.target.value)} /></div>
              <div className="form-group"><label>Total Pool Volume in Liters</label><input type="text" className="form-control" value={formData.projectSpecifications.totalPoolVolume || ""} onChange={(e) => handleSpecChange("totalPoolVolume", e.target.value)} /></div>
              <div className="form-group"><label>Total Filtration Volume in Ltrs</label><input type="text" className="form-control" value={formData.projectSpecifications.filtrationVolume || ""} onChange={(e) => handleSpecChange("filtrationVolume", e.target.value)} /></div>
              <div className="form-group"><label>Turnover Period</label><input type="text" className="form-control" value={formData.projectSpecifications.turnoverPeriod || ""} onChange={(e) => handleSpecChange("turnoverPeriod", e.target.value)} /></div>
              <div className="form-group"><label>Total Tiling Area in Sft</label><input type="text" className="form-control" value={formData.projectSpecifications.tilingArea || ""} onChange={(e) => handleSpecChange("tilingArea", e.target.value)} /></div>
              <div className="form-group"><label>Total Coping Area in Rft</label><input type="text" className="form-control" value={formData.projectSpecifications.copingArea || ""} onChange={(e) => handleSpecChange("copingArea", e.target.value)} /></div>
              <div className="form-group"><label>Total Waterproofing Area in Sft</label><input type="text" className="form-control" value={formData.projectSpecifications.waterproofingArea || ""} onChange={(e) => handleSpecChange("waterproofingArea", e.target.value)} /></div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Step 3: Manage Sections & MEP</h2>
            
            <div className="section-manager" style={{ marginBottom: "24px", padding: "16px", background: "#f1f5f9", borderRadius: "8px" }}>
              <h4 style={{ marginBottom: "12px" }}>Manage Quotation Sections</h4>
              <div style={{ display: "grid", gap: "8px" }}>
                {formData.sections?.map((s, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", background: "white", padding: "8px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                    <input type="checkbox" checked={s.included} onChange={(e) => handleSectionChange(idx, "included", e.target.checked)} />
                    <input type="text" className="form-control" style={{ flex: 1, height: "32px", fontSize: "13px" }} value={s.title} onChange={(e) => handleSectionChange(idx, "title", e.target.value)} />
                    <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600" }}>{s.code}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-small" style={{ marginTop: "12px", background: "#334155", color: "white" }} onClick={addCustomSection}>+ Add Custom Section</button>
            </div>

            <p style={{ color: "#64748b", marginBottom: "16px" }}>Add items for Filtration, Equipment, and Cleaning Kit.</p>
            {formData.sections?.filter(s => ["A", "B", "C", "D"].includes(s.code)).map((s, idx) => (
               s.included && renderTableForSection(s.code, s.title)
            ))}
          </div>
        )}

        {step === 4 && (
          <div>
            <h2>Step 4: Pool Finishes</h2>
            <p style={{ color: "#64748b", marginBottom: "16px" }}>Add items for Civil, Waterproofing, Tiles, Coping, Labour.</p>
            {formData.sections?.filter(s => !["A", "B", "C", "D"].includes(s.code)).map((s, idx) => (
               s.included && renderTableForSection(s.code, s.title)
            ))}
          </div>
        )}

        {step === 5 && (
          <div>
            <h2>Step 5: GST and Totals</h2>
            <div style={{ maxWidth: "400px", background: "#f8fafc", padding: "24px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <strong>Subtotal:</strong>
                <span>₹ {subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                <strong>GST Percentage:</strong>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input type="number" className="form-control" style={{ width: "80px" }} value={formData.gstPercent} onChange={(e) => handleInputChange("gstPercent", parseFloat(e.target.value))} />
                  <span>%</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <strong>GST Amount:</strong>
                <span>₹ {gstAmount.toFixed(2)}</span>
              </div>
              <hr style={{ margin: "16px 0", borderColor: "#cbd5e1" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", color: "#0369a1" }}>
                <strong>Grand Total:</strong>
                <strong>₹ {grandTotal.toFixed(2)}</strong>
              </div>
            </div>
            
            <div style={{ marginTop: "24px" }}>
              <p style={{ fontSize: "13px", color: "#64748b" }}>Note: Only "Included" sections contribute to the totals.</p>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2>Step 6: Terms & Payment Terms</h2>
            <div className="form-group">
              <label>Terms & Conditions</label>
              <textarea className="form-control" style={{ minHeight: "150px" }} value={formData.terms} onChange={(e) => handleInputChange("terms", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Payment Terms</label>
              <textarea className="form-control" style={{ minHeight: "150px" }} value={formData.paymentTerms} onChange={(e) => handleInputChange("paymentTerms", e.target.value)} />
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2>Step 7: Preview & Generate</h2>
            {quoteId ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <div style={{ fontSize: "48px", color: "#10b981", marginBottom: "16px" }}>✓</div>
                <h3 style={{ fontSize: "24px", marginBottom: "24px" }}>Quotation is Ready!</h3>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
                  <button className="btn" style={{ background: "#6366f1", color: "white" }} onClick={() => window.open(`/api/quotations/${quoteId}/pdf?disposition=inline`, "_blank")}>
                    Preview PDF
                  </button>
                  <button className="btn" style={{ background: "#ef4444", color: "white" }} onClick={() => window.open(`/api/quotations/${quoteId}/pdf?disposition=attachment`, "_blank")}>
                    Download PDF
                  </button>
                  <button className="btn" style={{ background: "#2563eb", color: "white" }} onClick={() => window.open(`/api/quotations/${quoteId}/docx`, "_blank")}>
                    Download Word
                  </button>
                </div>
                
                <div style={{ display: "flex", justifyContent: "center", gap: "12px", borderTop: "1px solid #e2e8f0", paddingTop: "32px" }}>
                  <button className="btn" style={{ background: "#0f172a", color: "white" }} onClick={() => setStep(1)}>
                    Edit Quotation
                  </button>
                  <button className="btn" style={{ background: "#10b981", color: "white" }} onClick={() => handleSubmit(false)}>
                    Save Changes
                  </button>
                  <button className="btn btn-outline" onClick={() => router.push("/history")}>
                    Back to History
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <h3>Preview and Finalize</h3>
                <p>Click the button below to save and generate your documents.</p>
                <button className="btn" style={{ background: "#10b981", color: "white", marginTop: "20px" }} onClick={() => handleSubmit(false)}>
                  Save & Generate Documents
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="wizard-footer">
        {step > 1 && step < 7 && (
          <button className="btn btn-outline" onClick={prevStep}>← Previous</button>
        )}
        {step === 1 && <div></div>}
        
        <div style={{ display: "flex", gap: "12px" }}>
          {step < 7 && (
            <button className="btn btn-outline" onClick={() => handleSubmit(true)} disabled={isSubmitting}>
              {isSubmitting ? "..." : "Save Draft"}
            </button>
          )}
          
          {step < 6 && (
            <button className="btn" style={{ background: "#0f172a", color: "white" }} onClick={nextStep}>Next Step →</button>
          )}
          
          {step === 6 && (
            <button className="btn" style={{ background: "#10b981", color: "white" }} onClick={() => handleSubmit(false)} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save & Preview"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
