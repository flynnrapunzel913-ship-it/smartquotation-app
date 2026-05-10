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
      // Corrected API endpoint to match the backend structure
      const response = await fetch("/api/invoice-databases/upload", {
        method: "POST",
        body: formData,
      });
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Server returned non-JSON response:", text);
        setError(`Server Error: Received unexpected response format (HTML). This often happens if the route is missing or the server crashed.`);
        return;
      }

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || "An unexpected error occurred during parsing.");
        return;
      }

      setExtractedProducts(data.products);
      setDatabaseName(data.databaseName || data.fileName.split(".")[0]);
      setStep(2);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      setError("Network error: Could not reach the parsing server. Please ensure the dev server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!databaseName.trim()) {
      alert("Please enter a database display name");
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
      <div className={`modal-content !p-0 overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 transform ${step === 2 ? "!max-w-6xl w-[95vw]" : "!max-w-md w-full"}`}>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/80 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-[#1e293b]">
              {step === 1 ? "Upload Database" : "Extract & Preview"}
            </h3>
            <p className="text-xs text-[#64748b] mt-1 font-medium">
              {step === 1 ? "Import price lists from Excel, PDF, or Word" : `Review extracted records for "${file?.name}"`}
            </p>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all text-2xl" onClick={handleClose}>×</button>
        </div>

        {/* Body */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-4 items-start animate-in fade-in slide-in-from-top-2">
              <span className="text-2xl">🚫</span>
              <div className="flex-1">
                <div className="text-sm font-black text-red-700 uppercase tracking-tight">Parsing Failed</div>
                <div className="text-xs text-red-600 mt-1 leading-relaxed">{error}</div>
              </div>
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-6">
              <div 
                className={`border-3 border-dashed rounded-3xl p-12 text-center transition-all ${file ? "border-blue-500 bg-blue-50/50" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setFile(e.dataTransfer.files[0]);
                }}
              >
                <div className="text-6xl mb-6">{file ? "📄" : "📥"}</div>
                {file ? (
                  <div>
                    <div className="text-base font-black text-[#1e293b] truncate max-w-[280px] mx-auto">{file.name}</div>
                    <div className="text-xs text-[#94a3b8] mt-2 font-bold uppercase tracking-widest">{(file.size / 1024).toFixed(1)} KB • Ready</div>
                    <button className="text-xs text-red-500 font-black mt-6 px-4 py-2 rounded-lg hover:bg-red-50 transition-all" onClick={() => setFile(null)}>CHANGE FILE</button>
                  </div>
                ) : (
                  <div>
                    <label className="cursor-pointer group">
                      <div className="text-blue-600 font-black text-lg group-hover:underline">Click to browse price list</div>
                      <div className="text-slate-400 text-sm mt-1">or drag and drop here</div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".xlsx,.xls,.csv,.pdf,.docx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </label>
                    <div className="flex gap-2 justify-center mt-8">
                       <span className="px-2 py-1 bg-slate-100 text-[9px] font-black text-slate-500 rounded">XLSX</span>
                       <span className="px-2 py-1 bg-slate-100 text-[9px] font-black text-slate-500 rounded">PDF</span>
                       <span className="px-2 py-1 bg-slate-100 text-[9px] font-black text-slate-500 rounded">CSV</span>
                       <span className="px-2 py-1 bg-slate-100 text-[9px] font-black text-slate-500 rounded">DOCX</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-[#64748b] uppercase tracking-widest mb-2">Database Display Name</label>
                  <input 
                    type="text" 
                    className="form-control h-14 rounded-2xl border-slate-200 text-lg font-bold focus:border-blue-500 focus:ring-8 focus:ring-blue-50 transition-all shadow-sm" 
                    value={databaseName}
                    onChange={(e) => setDatabaseName(e.target.value)}
                    placeholder="e.g. Swimming Pool Equipment 2025"
                  />
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                   <div>
                      <div className="text-[10px] font-black text-[#94a3b8] uppercase">Extracted</div>
                      <div className="text-2xl font-black text-blue-600">{extractedProducts.length}</div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-[#94a3b8] uppercase">Status</div>
                      <div className="text-xs font-black text-emerald-600">VALIDATED</div>
                   </div>
                </div>
              </div>

              <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-2xl bg-white">
                <div className="max-h-[450px] overflow-auto custom-scrollbar">
                  <DatabaseProductsTable products={extractedProducts} onRemove={(idx) => setExtractedProducts(prev => prev.filter((_, i) => i !== idx))} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
           <div>
              {step === 2 && (
                <button className="text-blue-600 font-black text-xs hover:underline" onClick={() => setStep(1)} disabled={isLoading}>
                  ← Back to Upload
                </button>
              )}
           </div>
           <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-xl text-sm font-black text-slate-400 hover:text-slate-600 transition-all" onClick={handleClose} disabled={isLoading}>Cancel</button>
            {step === 1 ? (
              <button 
                className="px-10 py-3 rounded-2xl text-sm font-black bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-50 disabled:grayscale" 
                onClick={handleUpload} 
                disabled={!file || isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin text-lg">◌</span> PROCESSING...
                  </span>
                ) : "EXTRACT & PREVIEW"}
              </button>
            ) : (
              <button 
                className="px-10 py-3 rounded-2xl text-sm font-black bg-emerald-600 text-white shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-50" 
                onClick={handleSave} 
                disabled={isLoading || extractedProducts.length === 0}
              >
                {isLoading ? "SAVING..." : `FINALIZE & SAVE DATABASE`}
              </button>
            )}
           </div>
        </div>
      </div>
    </div>
  );
}
