"use client";

import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (data: any) => void;
}

export default function DatasetUploadModal({ isOpen, onClose, onUploadComplete }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (!name) {
        // Default name from filename
        const baseName = e.target.files[0].name.replace(/\.[^/.]+$/, "");
        setName(baseName);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !name) {
      setError("File and dataset name are required");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    try {
      const response = await fetch("/api/invoice-datasets/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      onUploadComplete(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: "500px" }}>
        <div className="modal-header">
          <h3>Upload Product Dataset</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {error && <div className="error-message" style={{ marginBottom: "16px" }}>{error}</div>}
          
          <div className="form-group">
            <label>Dataset Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. MR Academy April 2026"
            />
          </div>

          <div className="form-group">
            <label>Select File (Excel, CSV, PDF)</label>
            <input
              type="file"
              className="form-control"
              accept=".xlsx,.xls,.csv,.pdf"
              onChange={handleFileChange}
            />
          </div>

          <div style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
            Supported formats: .xlsx, .xls, .csv, .pdf
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose} disabled={isUploading}>Cancel</button>
          <button className="btn btn-primary" onClick={handleUpload} disabled={isUploading || !file || !name}>
            {isUploading ? "Uploading & Parsing..." : "Upload & Parse"}
          </button>
        </div>
      </div>
    </div>
  );
}
