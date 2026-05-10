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
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/invoice-databases/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "An unexpected error occurred during parsing.");
        return;
      }

      setExtractedProducts(data.products);
      setDatabaseName(data.fileName.split(".")[0]);
      setStep(2);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      setError("Network error: Could not reach the parsing server.");
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
        reset();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to save database.");
      }
    } catch (error) {
      console.error("Error saving database:", error);
      setError("Network error: Could not save the database.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setFile(null);
    setExtractedProducts([]);
    setError(null);
    setDatabaseName("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content !p-0 overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 ${step === 2 ? "!max-w-4xl" : "!max-w-md"}`}>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-[#1e293b]">
              {step === 1 ? "Upload Database" : "Database Preview"}
            </h3>
            <p className="text-xs text-[#64748b] mt-1">
              {step === 1 ? "Import price lists from Excel, PDF, or Word" : `Detected ${extractedProducts.length} products`}
            </p>
          </div>
          <button className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-slate-400" onClick={handleClose}>×</button>
        </div>

        {/* Body */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 items-start animate-in fade-in slide-in-from-top-1">
              <span className="text-xl">⚠️</span>
              <div>
                <div className="text-sm font-bold text-red-700">Parsing Error</div>
                <div className="text-xs text-red-600 mt-1">{error}</div>
              </div>
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${file ? "border-blue-400 bg-blue-50/30" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/50"}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setFile(e.dataTransfer.files[0]);
                }}
              >
                <div className="text-4xl mb-4">{file ? "📄" : "☁️"}</div>
                {file ? (
                  <div>
                    <div className="text-sm font-bold text-[#1e293b] truncate max-w-[200px] mx-auto">{file.name}</div>
                    <div className="text-xs text-[#94a3b8] mt-1">{(file.size / 1024).toFixed(1)} KB</div>
                    <button className="text-xs text-red-500 font-semibold mt-3 hover:underline" onClick={() => setFile(null)}>Remove File</button>
                  </div>
                ) : (
                  <div>
                    <label className="cursor-pointer">
                      <span className="text-blue-600 font-bold hover:underline">Click to upload</span>
                      <span className="text-slate-500"> or drag and drop</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".xlsx,.xls,.csv,.pdf,.docx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </label>
                    <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-medium">Supported: XLSX, PDF, CSV, DOCX</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-[#64748b] uppercase mb-2">Database Display Name</label>
                  <input 
                    type="text" 
                    className="form-control h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all" 
                    value={databaseName}
                    onChange={(e) => setDatabaseName(e.target.value)}
                    placeholder="e.g. MR Academy Products"
                  />
                </div>
              </div>
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50/30">
                <div className="max-h-[350px] overflow-auto">
                  <DatabaseProductsTable products={extractedProducts} onRemove={(idx) => setExtractedProducts(prev => prev.filter((_, i) => i !== idx))} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3">
          <button className="px-6 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-white transition-all" onClick={handleClose} disabled={isLoading}>Cancel</button>
          {step === 1 ? (
            <button 
              className="px-8 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all disabled:opacity-50 disabled:grayscale" 
              onClick={handleUpload} 
              disabled={!file || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin text-lg">◌</span> Parsing File...
                </span>
              ) : "Extract & Preview"}
            </button>
          ) : (
            <button 
              className="px-8 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl transition-all disabled:opacity-50" 
              onClick={handleSave} 
              disabled={isLoading || extractedProducts.length === 0}
            >
              {isLoading ? "Saving..." : `Save ${extractedProducts.length} Products`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
