"use client";

import React, { useState, useEffect } from "react";
import DatasetUploadModal from "./DatasetUploadModal";
import DatasetProductsTable from "./DatasetProductsTable";

interface Dataset {
  id: string;
  name: string;
  sourceFile: string;
  createdAt: string;
  _count: { products: number };
}

export default function InvoiceDatasetManager() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/invoice-datasets");
      const data = await response.json();
      setDatasets(data);
    } catch (error) {
      console.error("Error fetching datasets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadComplete = (data: any) => {
    setPreviewData(data);
    setIsUploadModalOpen(false);
  };

  const handleSaveDataset = async () => {
    if (!previewData) return;
    setIsSaving(true);
    try {
      const response = await fetch("/api/invoice-datasets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: previewData.name,
          sourceFile: previewData.fileName,
          products: previewData.products,
        }),
      });

      if (response.ok) {
        setPreviewData(null);
        fetchDatasets();
      } else {
        alert("Failed to save dataset");
      }
    } catch (error) {
      console.error("Error saving dataset:", error);
      alert("Error saving dataset");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDataset = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dataset? This will also delete all associated products.")) return;
    
    try {
      const response = await fetch(`/api/invoice-datasets/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchDatasets();
      }
    } catch (error) {
      console.error("Error deleting dataset:", error);
    }
  };

  const handleRemoveProductFromPreview = (index: number) => {
    if (!previewData) return;
    const newProducts = [...previewData.products];
    newProducts.splice(index, 1);
    setPreviewData({ ...previewData, products: newProducts });
  };

  return (
    <div className="dataset-manager">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2>Dataset Management</h2>
        <button className="btn btn-primary" onClick={() => setIsUploadModalOpen(true)}>
          + Upload New Dataset
        </button>
      </div>

      {previewData ? (
        <div className="preview-section card" style={{ padding: "24px", marginBottom: "32px", border: "2px solid #0ea5e9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ margin: 0 }}>Preview Extracted Products</h3>
              <p style={{ color: "#64748b", margin: "4px 0 0 0" }}>Dataset: {previewData.name} ({previewData.products.length} products found)</p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn btn-outline" onClick={() => setPreviewData(null)} disabled={isSaving}>Discard</button>
              <button className="btn btn-primary" onClick={handleSaveDataset} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Dataset"}
              </button>
            </div>
          </div>
          <DatasetProductsTable 
            products={previewData.products} 
            onRemove={handleRemoveProductFromPreview} 
          />
        </div>
      ) : null}

      <div className="datasets-list">
        <h3>Existing Datasets</h3>
        {isLoading ? (
          <p>Loading datasets...</p>
        ) : datasets.length === 0 ? (
          <div className="empty-state">
            <p>No datasets uploaded yet.</p>
          </div>
        ) : (
          <div className="grid-list">
            {datasets.map((ds) => (
              <div key={ds.id} className="card" style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ margin: 0 }}>{ds.name}</h4>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                    {ds._count.products} products • Uploaded {new Date(ds.createdAt).toLocaleDateString()}
                  </div>
                  {ds.sourceFile && <div style={{ fontSize: "11px", color: "#94a3b8" }}>Source: {ds.sourceFile}</div>}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="btn-icon btn-danger" title="Delete Dataset" onClick={() => handleDeleteDataset(ds.id)}>
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DatasetUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}
