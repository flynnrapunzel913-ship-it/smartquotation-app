"use client";

import React, { useState, useEffect } from "react";

interface Dataset {
  id: string;
  name: string;
  _count: { products: number };
}

interface Props {
  isOpen: boolean;
  onSelect: (datasetId: string, datasetName: string) => void;
  onSkip: () => void;
}

export default function SelectDatasetModal({ isOpen, onSelect, onSkip }: Props) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchDatasets();
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: "600px" }}>
        <div className="modal-header">
          <h3>Select Product Dataset</h3>
          <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>
            Select a dataset to use its products in your invoice.
          </p>
        </div>
        <div className="modal-body">
          {isLoading ? (
            <p>Loading datasets...</p>
          ) : datasets.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px" }}>
              <p>No datasets found.</p>
              <p style={{ fontSize: "14px", color: "#64748b" }}>You can upload datasets in the Datasets tab of the dashboard.</p>
            </div>
          ) : (
            <div className="grid-list" style={{ display: "grid", gap: "12px" }}>
              {datasets.map((ds) => (
                <div 
                  key={ds.id} 
                  className="card dataset-card" 
                  onClick={() => onSelect(ds.id, ds.name)}
                  style={{ 
                    padding: "16px", 
                    cursor: "pointer", 
                    transition: "all 0.2s",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  <h4 style={{ margin: 0 }}>{ds.name}</h4>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                    {ds._count.products} products available
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="modal-footer" style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="btn btn-outline" onClick={onSkip}>Manual Entry (Skip)</button>
        </div>
      </div>
    </div>
  );
}
