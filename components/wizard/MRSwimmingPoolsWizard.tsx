"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuotationFormValues, QuotationItemForm } from "@/types";
import ProductSelect from "@/components/ProductSelect";
import { calculatePoolMetrics, renderTemplate, extractTemplateVariables } from "@/lib/utils";
import { MR_MASTER_TEMPLATE } from "@/lib/templates/mr-master-template";
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
    gstPercent: MR_MASTER_TEMPLATE.gstPercent || 18,
    projectSpecifications: {
      ...MR_MASTER_TEMPLATE.projectSpecifications as any,
      poolLength: "30",
      poolWidth: "20",
      poolDepth: "5",
      plantRoomSize: "8'X8'X6'",
      plantRoomLength: "8",
      plantRoomWidth: "8",
      plantRoomHeight: "6",
      turnoverPeriod: "4",
      shapeOfPool: "RECTANGLE POOL",
      typeOfPool: "SKIMMER TYPE",
    },
    items: [...(MR_MASTER_TEMPLATE.items || [])] as any,
    sections: [...(MR_MASTER_TEMPLATE.sections || [])] as any,
    notes: MR_MASTER_TEMPLATE.notes || "",
    terms: MR_MASTER_TEMPLATE.terms || DEFAULT_TERMS,
    paymentTerms: MR_MASTER_TEMPLATE.paymentTerms || DEFAULT_PAYMENT,
    title: "",
  });

  const STEPS = [
    { id: 1, name: "Client Details" },
    { id: 2, name: "Pool Specifications" },
    { id: 3, name: "Calculated Values" },
    { id: 4, name: "Section A - Plant Room" },
    { id: 5, name: "Section B - Electrical" },
    { id: 6, name: "Section C - Control Panel" },
    { id: 7, name: "Section D - Cleaning Kit" },
    { id: 8, name: "Part 2 - Pool Finishes" },
    { id: 9, name: "Review & Generate" },
  ];

  // Helper to generate title
  const autoGenerateTitle = (name: string, address: string) => {
    const n = name?.trim() || "Client";
    const a = address?.split(",")[0].split("\n")[0].trim() || "Site";
    return `Quotation for ${n} - ${a}`;
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
    }, 2000);

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
      setIsLoading(false);
    }
    setShowRecoveryDialog(false);
  };

  const startNew = () => {
    localStorage.removeItem("mr_quotation_draft");
    const initial = {
      ...JSON.parse(JSON.stringify(MR_MASTER_TEMPLATE)),
      quoteNumber: `MR-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split("T")[0],
      customerName: "",
      customerAddress: "",
      customerPhone: "",
      customerEmail: "",
    };
    initial.items = initial.items.map((it: any) => ({
      ...it,
      description: renderTemplate(it.description, it.variableValues || {}),
      templateText: it.description
    }));
    setFormData(initial);
    setIsLoading(false);
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
              ...data.projectSpecifications,
              poolLength: String(data.projectSpecifications?.poolLength ?? ""),
              poolWidth: String(data.projectSpecifications?.poolWidth ?? ""),
              poolDepth: String(data.projectSpecifications?.poolDepth ?? ""),
              plantRoomLength: String(data.projectSpecifications?.plantRoomLength ?? "8"),
              plantRoomWidth: String(data.projectSpecifications?.plantRoomWidth ?? "8"),
              plantRoomHeight: String(data.projectSpecifications?.plantRoomHeight ?? "6"),
              turnoverPeriod: String(data.projectSpecifications?.turnoverPeriod ?? "4"),
            },
            items: data.items.map((it: any) => ({
              ...it,
              variableValues: it.variableValues || {},
            })),
            sections: (data.sections && data.sections.length > 0) ? data.sections : DEFAULT_SECTIONS,
            notes: data.notes || "",
            terms: data.terms || DEFAULT_TERMS,
            paymentTerms: data.paymentTerms || DEFAULT_PAYMENT,
            title: data.title || "",
          };
          setFormData(mappedData);
          if (mode === "duplicate") setQuoteId(null);
          setIsLoading(false);
        });
    } else {
      const saved = localStorage.getItem("mr_quotation_draft");
      if (saved) {
        setShowRecoveryDialog(true);
      } else {
        const initial = {
          ...JSON.parse(JSON.stringify(MR_MASTER_TEMPLATE)),
          quoteNumber: `MR-${Date.now().toString().slice(-6)}`,
          date: new Date().toISOString().split("T")[0],
          customerName: "",
          customerAddress: "",
          customerPhone: "",
          customerEmail: "",
        };
        initial.items = initial.items.map((it: any) => ({
          ...it,
          description: renderTemplate(it.description, it.variableValues || {}),
          templateText: it.description
        }));
        setFormData(initial);
        setIsLoading(false);
      }
    }
  }, [id, mode]);

  const subtotal = formData.items.reduce((sum, item) => {
    const section = formData.sections?.find((s) => s.code === item.section);
    if (section && !section.included) return sum;
    return sum + Number(item.amount || 0);
  }, 0);
  const gstAmount = (subtotal * formData.gstPercent) / 100;
  const grandTotal = subtotal + gstAmount;

  const resetPhase = () => {
    if (!confirm("Are you sure you want to reset this phase to defaults? All changes in this step will be lost.")) return;

    if (step === 1) {
      setFormData(prev => ({
        ...prev,
        customerName: "",
        customerAddress: "",
        customerPhone: "",
        customerEmail: "",
      }));
    } else if (step === 2) {
      setFormData(prev => {
        const nextSpecs = {
          ...prev.projectSpecifications,
          poolLength: "30",
          poolWidth: "20",
          poolDepth: "5",
          shapeOfPool: "Rectangle Pool",
          typeOfPool: "Skimmer Type",
          plantRoomLength: "8",
          plantRoomWidth: "8",
          plantRoomHeight: "6",
          turnoverPeriod: "4",
          poolVolumeOverride: false,
          totalPoolVolumeOverride: false,
          filtrationVolumeOverride: false,
          tilingAreaOverride: false,
          copingAreaOverride: false,
          waterproofingAreaOverride: false,
        };
        const metrics = calculatePoolMetrics(nextSpecs);
        return {
          ...prev,
          projectSpecifications: { ...nextSpecs, ...metrics }
        };
      });
    } else if (step === 3) {
      ["poolVolume", "totalPoolVolume", "filtrationVolume", "tilingArea", "copingArea", "waterproofingArea"].forEach(m => resetMetric(m));
    } else if (step >= 4 && step <= 8) {
      const sectionCodes = ["A", "B", "C", "D", "Part 2"];
      const code = sectionCodes[step - 4];
      const masterItems = MR_MASTER_TEMPLATE.items?.filter(it => it.section === code) || [];
      
      setFormData(prev => {
        const otherItems = prev.items.filter(it => it.section !== code);
        const resetItems = JSON.parse(JSON.stringify(masterItems)).map((it: any) => ({
          ...it,
          description: renderTemplate(it.description, it.variableValues || {}),
          templateText: it.description
        }));
        return { ...prev, items: [...otherItems, ...resetItems].sort((a,b) => a.serialNo - b.serialNo) };
      });
    }
  };

  const nextStep = async () => {
    if (step === 8) {
      await handleSubmit(true, true); // Save silently as draft before showing preview
    }
    setStep((s) => Math.min(s + 1, 9));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleInputChange = (field: keyof QuotationFormValues, value: any) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "customerName" || field === "customerAddress") {
        if (!prev.title || prev.title === autoGenerateTitle(prev.customerName, prev.customerAddress)) {
          next.title = autoGenerateTitle(next.customerName, next.customerAddress);
        }
      }
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleSpecChange = (field: string, value: string) => {
    setFormData((prev) => {
      const nextSpecs = { ...prev.projectSpecifications, [field]: value };
      
      const l = parseFloat(nextSpecs.poolLength) || 0;
      const w = parseFloat(nextSpecs.poolWidth) || 0;
      const d = parseFloat(nextSpecs.poolDepth) || 0;
      const shape = nextSpecs.shapeOfPool || "Rectangle Pool";
      
      if (l > 0 && w > 0 && d > 0) {
        const metrics = calculatePoolMetrics(l, w, d, shape);
        
        // Update values only if they are not overridden
        if (!nextSpecs.poolVolumeOverride) nextSpecs.poolVolume = `${metrics.volumeCubicFeet.toFixed(0)} Cft`;
        if (!nextSpecs.totalPoolVolumeOverride) nextSpecs.totalPoolVolume = `${metrics.volumeLiters} Ltrs`;
        if (!nextSpecs.filtrationVolumeOverride) nextSpecs.filtrationVolume = `${metrics.volumeLiters} Ltrs`;
        if (!nextSpecs.tilingAreaOverride) nextSpecs.tilingArea = `${metrics.tilingArea} Sft`;
        if (!nextSpecs.copingAreaOverride) nextSpecs.copingArea = `${metrics.copingArea} Rft`;
        if (!nextSpecs.waterproofingAreaOverride) nextSpecs.waterproofingArea = `${metrics.waterproofingArea} Sft`;
      }

      const pl = nextSpecs.plantRoomLength || "8";
      const pw = nextSpecs.plantRoomWidth || "8";
      const ph = nextSpecs.plantRoomHeight || "6";
      nextSpecs.plantRoomSize = `${pl}'X${pw}'X${ph}'`;
      
      return { ...prev, projectSpecifications: nextSpecs };
    });
    setHasUnsavedChanges(true);
  };

  const setMetricOverride = (field: string, value: string) => {
    setFormData(prev => {
       const nextSpecs = { 
         ...prev.projectSpecifications, 
         [field]: value,
         [`${field}Override`]: true 
       };
       return { ...prev, projectSpecifications: nextSpecs };
    });
    setHasUnsavedChanges(true);
  };

  const resetMetric = (field: string) => {
    setFormData(prev => {
      const nextSpecs = { ...prev.projectSpecifications, [`${field}Override`]: false };
      
      // Re-trigger calculation
      const l = parseFloat(nextSpecs.poolLength) || 0;
      const w = parseFloat(nextSpecs.poolWidth) || 0;
      const d = parseFloat(nextSpecs.poolDepth) || 0;
      const shape = nextSpecs.shapeOfPool || "Rectangle Pool";
      
      if (l > 0 && w > 0 && d > 0) {
        const metrics = calculatePoolMetrics(l, w, d, shape);
        if (field === "poolVolume") nextSpecs.poolVolume = `${metrics.volumeCubicFeet.toFixed(0)} Cft`;
        if (field === "totalPoolVolume") nextSpecs.totalPoolVolume = `${metrics.volumeLiters} Ltrs`;
        if (field === "filtrationVolume") nextSpecs.filtrationVolume = `${metrics.volumeLiters} Ltrs`;
        if (field === "tilingArea") nextSpecs.tilingArea = `${metrics.tilingArea} Sft`;
        if (field === "copingArea") nextSpecs.copingArea = `${metrics.copingArea} Rft`;
        if (field === "waterproofingArea") nextSpecs.waterproofingArea = `${metrics.waterproofingArea} Sft`;
      }
      
      return { ...prev, projectSpecifications: nextSpecs };
    });
    setHasUnsavedChanges(true);
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
      productId: null,
      variableValues: {},
    };
    setFormData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    setHasUnsavedChanges(true);
  };

  const deleteItem = (index: number) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
    setHasUnsavedChanges(true);
  };

  const updateItem = (index: number, field: keyof QuotationItemForm, value: any) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      
      if (field === "qty" || field === "rate") {
        newItems[index].amount = Number(newItems[index].qty || 0) * Number(newItems[index].rate || 0);
      }
      return { ...prev, items: newItems };
    });
    setHasUnsavedChanges(true);
  };

  const updateVariable = (idx: number, v: string, val: string) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      const item = newItems[idx];
      const newVars = { ...(item.variableValues || {}), [v]: val };
      item.variableValues = newVars;
      
      // Live render if we have the template text
      if (item.templateText && !item.descriptionOverride) {
        item.description = renderTemplate(item.templateText, newVars);
      } else if (item.productId && !item.templateText) {
        // Fallback fetch if templateText is missing
        fetch(`/api/products/${item.productId}`)
          .then(res => res.json())
          .then(prod => {
            if (prod.templateText) {
              updateItem(idx, "templateText", prod.templateText);
              if (!item.descriptionOverride) {
                updateItem(idx, "description", renderTemplate(prod.templateText, newVars));
              }
            }
          });
      }

      return { ...prev, items: newItems };
    });
    setHasUnsavedChanges(true);
  };

  const resetDescription = (idx: number) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      const item = newItems[idx];
      item.descriptionOverride = false;
      if (item.templateText) {
        item.description = renderTemplate(item.templateText, item.variableValues || {});
      }
      return { ...prev, items: newItems };
    });
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (isDraft = false, silent = false) => {
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
          setStep(9);
        } else if (!silent) {
          alert("Draft saved!");
        }
      } else {
        alert("Error saving: " + data.error);
      }
    } catch (e) {
      alert("Network error");
    }
    setIsSubmitting(false);
  };

  const renderProductCard = (idx: number, displaySerial: number) => {
    const item = formData.items[idx];
    const isTemplate = !!item.productId;
    const templateVariables = item.variableValues ? Object.keys(item.variableValues) : [];

    return (
      <div key={idx} className="product-card">
        <div className="product-card-image">
          {item.imageUrl ? <img src={item.imageUrl} alt="product" /> : <div style={{ color: "#94a3b8", fontSize: "12px" }}>No Image</div>}
        </div>
        
        <div className="product-card-content">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
               <h4 className="product-card-title">{displaySerial}. {item.category}</h4>
               {item.descriptionOverride && <span className="badge manual">Manual Paragraph</span>}
               {!item.descriptionOverride && isTemplate && <span className="badge auto">Template Driven</span>}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
               <button className="btn-icon" onClick={() => {
                  updateItem(idx, "isExpanded", !item.isExpanded);
                  if (!item.isExpanded) updateItem(idx, "descriptionOverride", true);
               }}>
                  {item.isExpanded ? "Done Editing" : "Edit Paragraph"}
               </button>
               {item.descriptionOverride && (
                 <button className="btn-icon" onClick={() => resetDescription(idx)}>Reset</button>
               )}
               <button className="btn-icon delete" onClick={() => deleteItem(idx)} title="Delete Item">✕</button>
            </div>
          </div>

          <div className="product-card-description-preview">
            {item.description.split("\n").map((line, i) => (
              <div key={i} style={{ 
                color: line.toUpperCase().includes("MAKE :") ? "#1e40af" : "inherit",
                fontWeight: line.toUpperCase().includes("MAKE :") ? 700 : 400
              }}>{line}</div>
            ))}
          </div>

          {isTemplate && templateVariables.length > 0 && (
            <div className="product-card-variables">
              {templateVariables.map(v => (
                <div key={v} className="variable-field">
                  <label>{v.replace(/([A-Z])/g, ' $1').toLowerCase()}</label>
                  <input type="text" value={item.variableValues?.[v] || ""} onChange={(e) => updateVariable(idx, v, e.target.value)} />
                </div>
              ))}
            </div>
          )}

          {item.isExpanded && (
            <div style={{ marginTop: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, marginBottom: "4px", display: "block" }}>Description Override</label>
              <textarea className="form-control" style={{ fontSize: "13px", minHeight: "120px" }} value={item.description} onChange={(e) => {
                 updateItem(idx, "description", e.target.value);
                 updateItem(idx, "descriptionOverride", true);
              }} />
            </div>
          )}
        </div>

        <div className="product-card-commercials">
          <div className="form-group">
            <label>Warranty</label>
            <input type="text" className="form-control" value={item.warranty} onChange={(e) => updateItem(idx, "warranty", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Qty</label>
            <input type="number" className="form-control" value={item.qty} onChange={(e) => updateItem(idx, "qty", parseFloat(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Unit</label>
            <input type="text" className="form-control" value={item.unit} onChange={(e) => updateItem(idx, "unit", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Rate (₹)</label>
            <input type="number" className="form-control" value={item.rate} onChange={(e) => updateItem(idx, "rate", parseFloat(e.target.value))} />
          </div>
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>Amount</label>
            <div style={{ fontWeight: 700, fontSize: "16px", color: "#0369a1" }}>₹ {Number(item.amount || 0).toLocaleString("en-IN")}</div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="wizard-container">Loading...</div>;

  return (
    <div className="wizard-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(step / 9) * 100}%` }}></div>
      </div>

      <div className="wizard-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>{STEPS[step - 1].name}</h1>
            <p style={{ color: "#64748b" }}>Step {step} of 9</p>
          </div>
          {lastSaved && <span style={{ fontSize: "11px", color: "#94a3b8" }}>Autosaved {lastSaved.toLocaleTimeString()}</span>}
        </div>
      </div>

      {showRecoveryDialog && (
        <div className="recovery-overlay" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="metrics-card" style={{ maxWidth: "400px", textAlign: "center" }}>
            <h3>Resume Draft?</h3>
            <p style={{ margin: "16px 0" }}>We found an unsaved quotation from your last visit.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button className="btn-primary" onClick={resumeDraft}>Resume</button>
              <button className="btn-secondary" onClick={startNew}>Start New</button>
            </div>
          </div>
        </div>
      )}

      <div className="wizard-step-content">
        {step === 1 && (
          <div className="metrics-grid">
             <div className="form-grid">
                <div className="form-group"><label>Client Name</label><input type="text" className="form-control" value={formData.customerName} onChange={(e) => handleInputChange("customerName", e.target.value)} /></div>
                <div className="form-group"><label>Date</label><input type="date" className="form-control" value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} /></div>
                <div className="form-group" style={{ gridColumn: "span 2" }}><label>Site Address</label><textarea className="form-control" value={formData.customerAddress} onChange={(e) => handleInputChange("customerAddress", e.target.value)} /></div>
                <div className="form-group"><label>Phone Number (Optional)</label><input type="text" className="form-control" value={formData.customerPhone} onChange={(e) => handleInputChange("customerPhone", e.target.value)} /></div>
                <div className="form-group" style={{ gridColumn: "span 2" }}><label>Quotation Title</label><input type="text" className="form-control" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} /></div>
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="metrics-container">
            <div className="metrics-card">
              <h3 style={{ marginBottom: "20px" }}>Pool Dimensions</h3>
              <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
                <div className="form-group">
                  <label>Pool Shape</label>
                  <select 
                    className="form-control" 
                    value={formData.projectSpecifications.shapeOfPool} 
                    onChange={(e) => handleSpecChange("shapeOfPool", e.target.value)}
                  >
                    <option value="Rectangle Pool">Rectangle Pool</option>
                    <option value="Square Pool">Square Pool</option>
                    <option value="Circular Pool">Circular Pool</option>
                    <option value="Oval Pool">Oval Pool</option>
                    <option value="L Shape Pool">L Shape Pool</option>
                    <option value="Infinity Pool">Infinity Pool</option>
                    <option value="Custom">Custom</option>
                  </select>
                  {formData.projectSpecifications.shapeOfPool === "Custom" && (
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ marginTop: "8px" }} 
                      placeholder="Enter custom shape..." 
                      onChange={(e) => handleSpecChange("shapeOfPool", e.target.value)} 
                    />
                  )}
                </div>
                <div className="form-group">
                  <label>Pool Type</label>
                  <select 
                    className="form-control" 
                    value={formData.projectSpecifications.typeOfPool} 
                    onChange={(e) => handleSpecChange("typeOfPool", e.target.value)}
                  >
                    <option value="Skimmer Type">Skimmer Type</option>
                    <option value="Overflow Type">Overflow Type</option>
                    <option value="Infinity Type">Infinity Type</option>
                    <option value="Jacuzzi">Jacuzzi</option>
                    <option value="Kids Pool">Kids Pool</option>
                    <option value="Lap Pool">Lap Pool</option>
                    <option value="Custom">Custom</option>
                  </select>
                  {formData.projectSpecifications.typeOfPool === "Custom" && (
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ marginTop: "8px" }} 
                      placeholder="Enter custom type..." 
                      onChange={(e) => handleSpecChange("typeOfPool", e.target.value)} 
                    />
                  )}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label>{formData.projectSpecifications.shapeOfPool?.toLowerCase().includes("circular") ? "Diameter (ft)" : "Length (ft)"}</label>
                    <input type="text" className="form-control" value={formData.projectSpecifications.poolLength} onChange={(e) => handleSpecChange("poolLength", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>{formData.projectSpecifications.shapeOfPool?.toLowerCase().includes("circular") ? "N/A" : "Width (ft)"}</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={formData.projectSpecifications.poolWidth} 
                      disabled={formData.projectSpecifications.shapeOfPool?.toLowerCase().includes("circular")}
                      onChange={(e) => handleSpecChange("poolWidth", e.target.value)} 
                    />
                  </div>
                  <div className="form-group"><label>Depth (ft)</label><input type="text" className="form-control" value={formData.projectSpecifications.poolDepth} onChange={(e) => handleSpecChange("poolDepth", e.target.value)} /></div>
                </div>
              </div>

              <h3 style={{ margin: "24px 0 20px" }}>Plant Room</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div className="form-group"><label>Length (ft)</label><input type="text" className="form-control" value={formData.projectSpecifications.plantRoomLength} onChange={(e) => handleSpecChange("plantRoomLength", e.target.value)} /></div>
                <div className="form-group"><label>Width (ft)</label><input type="text" className="form-control" value={formData.projectSpecifications.plantRoomWidth} onChange={(e) => handleSpecChange("plantRoomWidth", e.target.value)} /></div>
                <div className="form-group"><label>Height (ft)</label><input type="text" className="form-control" value={formData.projectSpecifications.plantRoomHeight} onChange={(e) => handleSpecChange("plantRoomHeight", e.target.value)} /></div>
              </div>

              <div className="form-group" style={{ marginTop: "12px" }}><label>Turnover Period (Hours)</label><input type="text" className="form-control" value={formData.projectSpecifications.turnoverPeriod} onChange={(e) => handleSpecChange("turnoverPeriod", e.target.value)} /></div>
            </div>
            
            <div className="metrics-card read-only">
               <h3 style={{ marginBottom: "20px" }}>Live Metrics Preview</h3>
               <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "24px" }}>These values update as you type.</p>
               <div className="metrics-grid">
                  <div className="metric-row"><span className="metric-label">Water Volume (Cft)</span><span className="metric-value">{formData.projectSpecifications.poolVolume}</span></div>
                  <div className="metric-row"><span className="metric-label">Volume in Liters</span><span className="metric-value">{formData.projectSpecifications.totalPoolVolume}</span></div>
                  <div className="metric-row"><span className="metric-label">Tiling Area</span><span className="metric-value">{formData.projectSpecifications.tilingArea}</span></div>
                  <div className="metric-row"><span className="metric-label">Coping Area</span><span className="metric-value">{formData.projectSpecifications.copingArea}</span></div>
                  <div className="metric-row"><span className="metric-label">Waterproofing Area</span><span className="metric-value">{formData.projectSpecifications.waterproofingArea}</span></div>
                  <div className="metric-row"><span className="metric-label">Plant Room Size</span><span className="metric-value">{formData.projectSpecifications.plantRoomSize}</span></div>
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="metrics-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Calculated Values</h2>
            <p style={{ textAlign: "center", color: "#64748b", marginBottom: "32px" }}>Review and adjust the final technical metrics for this quotation.</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                { label: "Main Pool Volume", key: "poolVolume" },
                { label: "Total Volume (Ltrs)", key: "totalPoolVolume" },
                { label: "Filtration Volume", key: "filtrationVolume" },
                { label: "Tiling Area", key: "tilingArea" },
                { label: "Coping Area", key: "copingArea" },
                { label: "Waterproofing Area", key: "waterproofingArea" },
              ].map((m) => {
                const isOverridden = (formData.projectSpecifications as any)[`${m.key}Override`];
                return (
                  <div key={m.key} className={`metric-card ${isOverridden ? 'manual-override' : ''}`}>
                    <div className="metric-header">
                      <span className="metric-label">{m.label}</span>
                      {isOverridden ? (
                        <span className="badge manual">Manual Override</span>
                      ) : (
                        <span className="badge auto">Auto Calculated</span>
                      )}
                    </div>
                    <div className="metric-body">
                      <input 
                        type="text" 
                        className="metric-input"
                        value={(formData.projectSpecifications as any)[m.key]} 
                        onChange={(e) => setMetricOverride(m.key, e.target.value)}
                      />
                      {isOverridden && (
                        <button className="reset-btn" onClick={() => resetMetric(m.key)}>Reset</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "40px", textAlign: "center" }}>
                 <button className="btn-primary" onClick={nextStep}>Looks Correct, Continue →</button>
            </div>
          </div>
        )}

        {[4, 5, 6, 7].map(sIdx => (
          step === sIdx && (
            <div key={sIdx}>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3>Items for {formData.sections?.[sIdx - 4].title}</h3>
                  <button className="btn-secondary" onClick={() => {/* Add product logic */}}>+ Add Product</button>
               </div>
               {formData.items.filter(it => it.section === (formData.sections?.[sIdx - 4].code)).map((it, i) => {
                  const actualIdx = formData.items.findIndex(orig => orig === it);
                  return renderProductCard(actualIdx, i + 1);
               })}
               <div style={{ marginTop: "24px", padding: "20px", border: "2px dashed #e2e8f0", borderRadius: "12px", textAlign: "center" }}>
                  <ProductSelect
                    placeholder="Search and add a product to this section..."
                    onChange={(product) => {
                      if (product) {
                        const initialVars: Record<string, string> = {};
                        product.templateVariables.forEach(v => initialVars[v] = "");
                        const newItem: QuotationItemForm = {
                          section: formData.sections?.[sIdx - 4].code || "A",
                          serialNo: formData.items.filter(it => it.section === (formData.sections?.[sIdx - 4].code)).length + 1,
                          category: product.category || "General",
                          templateText: product.templateText,
                          description: renderTemplate(product.templateText, initialVars),
                          warranty: product.warranty || "",
                          qty: 1,
                          unit: product.unit || "Nos",
                          rate: Number(product.defaultRate) || 0,
                          amount: Number(product.defaultRate) || 0,
                          productId: product.id,
                          variableValues: initialVars,
                          imageUrl: product.imagePath,
                          imageText: product.imageText,
                        };
                        setFormData(prev => ({ ...prev, items: [...prev.items, newItem] }));
                      }
                    }}
                  />
               </div>
            </div>
          )
        ))}

        {step === 8 && (
          <div>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3>Part 2 - Pool Finishes</h3>
                <button className="btn-secondary" onClick={() => resetPhase()}>Reset Phase</button>
             </div>
             {formData.items.filter(it => it.section === "Part 2").map((it, i) => {
                const actualIdx = formData.items.findIndex(orig => orig === it);
                return renderProductCard(actualIdx, i + 1);
             })}
             <div style={{ marginTop: "24px", padding: "20px", border: "2px dashed #e2e8f0", borderRadius: "12px", textAlign: "center" }}>
                <ProductSelect
                  placeholder="Search and add a product to Part 2..."
                  onChange={(product) => {
                    if (product) {
                      const initialVars: Record<string, string> = {};
                      product.templateVariables.forEach(v => initialVars[v] = "");
                      const newItem: QuotationItemForm = {
                        section: "Part 2",
                        serialNo: formData.items.filter(it => it.section === "Part 2").length + 1,
                        category: product.category || "General",
                        templateText: product.templateText,
                        description: renderTemplate(product.templateText, initialVars),
                        warranty: product.warranty || "",
                        qty: 1,
                        unit: product.unit || "Nos",
                        rate: Number(product.defaultRate) || 0,
                        amount: Number(product.defaultRate) || 0,
                        productId: product.id,
                        variableValues: initialVars,
                        imageUrl: product.imagePath,
                        imageText: product.imageText,
                      };
                      setFormData(prev => ({ ...prev, items: [...prev.items, newItem] }));
                    }
                  }}
                />
                <button className="btn-secondary" style={{ marginTop: "12px" }} onClick={() => addItem("Part 2")}>+ Add Manual Item</button>
             </div>
          </div>
        )}

        {step === 9 && (
          <div style={{ textAlign: "center", padding: "40px" }}>
            {isSubmitting ? (
              <>
                <div className="spinner" style={{ margin: "0 auto 24px" }}></div>
                <h2>Saving Quotation...</h2>
                <p style={{ color: "#64748b" }}>Please wait while we finalize your documents.</p>
              </>
            ) : !quoteId ? (
              <>
                <div style={{ fontSize: "64px", color: "#ef4444", marginBottom: "20px" }}>⚠</div>
                <h2>Save Failed</h2>
                <p style={{ color: "#64748b", marginBottom: "40px" }}>We couldn't save your quotation. Please check your connection and try again.</p>
                <button className="btn-primary" onClick={() => handleSubmit(true)}>Try Saving Again</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: "64px", color: "#10b981", marginBottom: "20px" }}>✓</div>
                <h2 style={{ marginBottom: "12px" }}>Quotation Ready</h2>
                <p style={{ color: "#64748b", marginBottom: "40px" }}>Your quotation has been structured and calculated. Preview the results below.</p>
                
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "48px" }}>
                   <button className="btn-primary" style={{ background: "#6366f1" }} onClick={() => window.open(`/api/quotations/${quoteId}/pdf?disposition=inline`, "_blank")}>Preview PDF</button>
                   <button className="btn-primary" style={{ background: "#2563eb" }} onClick={() => window.open(`/api/quotations/${quoteId}/docx`, "_blank")}>Download Word</button>
                </div>

                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "40px" }}>
                   <button className="btn-secondary" onClick={() => setStep(1)}>Edit Details</button>
                   <button className="btn-secondary" style={{ marginLeft: "12px" }} onClick={() => router.push("/history")}>Back to History</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="sticky-footer">
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {step > 1 && <button className="btn-secondary" onClick={prevStep}>← Back</button>}
          {step < 9 && <button className="btn-icon" style={{ border: "1px solid #fecaca", color: "#ef4444" }} onClick={resetPhase} title="Reset this phase to defaults">Reset Phase</button>}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
           {step < 9 && <button className="btn-secondary" onClick={() => handleSubmit(true)}>Save Draft</button>}
           {step < 9 && <button className="btn-primary" onClick={nextStep}>Next Step →</button>}
        </div>
      </div>
    </div>
  );
}
