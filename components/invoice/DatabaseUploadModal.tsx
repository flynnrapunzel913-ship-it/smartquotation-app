"use client";

import React, { useState } from "react";
import DatabaseProductsTable from "./DatabaseProductsTable";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DatabaseUploadModal({ isOpen, onClose, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [databaseName, setDatabaseName] = useState("");
  const [extractedProducts, setExtractedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Upload, 2: Preview

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/invoice-databases/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setExtractedProducts(data.products);
      setDatabaseName(data.fileName.split(".")[0]);
      setStep(2);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to parse file");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!databaseName) {
      alert("Please enter a database name");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/invoice-databases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: databaseName,
          sourceFile: file?.name,
          products: extractedProducts,
        }),
      });

      if (response.ok) {
        onSuccess();
        onClose();
        setStep(1);
        setFile(null);
        setExtractedProducts([]);
      }
    } catch (error) {
      console.error("Error saving database:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: step === 2 ? "1000px" : "500px" }}>
        <div className="modal-header">
          <h3>{step === 1 ? "Upload Product Database" : "Preview Extracted Products"}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {step === 1 ? (
            <div className="upload-step">
              <div className="form-group">
                <label>Select Price List File (Excel, PDF, CSV, Word)</label>
                <input 
                  type="file" 
                  className="form-control" 
                  accept=".xlsx,.xls,.csv,.pdf,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
              <p style={{ fontSize: "12px", color: "#64748b" }}>Supported formats: .xlsx, .xls, .csv, .pdf, .docx</p>
            </div>
          ) : (
            <div className="preview-step">
              <div className="form-group">
                <label>Database Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={databaseName}
                  onChange={(e) => setDatabaseName(e.target.value)}
                  placeholder="e.g. MR Academy Products"
                />
              </div>
              <div style={{ height: "400px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                <DatabaseProductsTable products={extractedProducts} onRemove={(idx) => setExtractedProducts(prev => prev.filter((_, i) => i !== idx))} />
              </div>
              <p style={{ marginTop: "12px", fontWeight: 600 }}>{extractedProducts.length} products found.</p>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose} disabled={isLoading}>Cancel</button>
          {step === 1 ? (
            <button className="btn btn-primary" onClick={handleUpload} disabled={!file || isLoading}>
              {isLoading ? "Parsing..." : "Extract Products"}
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Database"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
