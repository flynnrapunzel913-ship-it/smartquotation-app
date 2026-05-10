"use client";

import React, { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  defaultRate: number;
  unit: string;
}

interface Props {
  isOpen: boolean;
  datasetId: string;
  onSelect: (product: any) => void;
  onClose: () => void;
}

export default function AddProductFromDatasetModal({ isOpen, datasetId, onSelect, onClose }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && datasetId) {
      fetchProducts();
    }
  }, [isOpen, datasetId]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/invoice-datasets/${datasetId}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: "800px" }}>
        <div className="modal-header">
          <h3>Add Product from Dataset</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <div className="products-list" style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
            {isLoading ? (
              <p style={{ padding: "20px", textAlign: "center" }}>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No products found matching your search.</p>
            ) : (
              <table className="items-table" style={{ margin: 0 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th style={{ width: "100px" }}>Rate</th>
                    <th style={{ width: "60px" }}>Unit</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td style={{ fontSize: "12px", color: "#64748b" }}>{p.description}</td>
                      <td className="text-right">₹{Number(p.defaultRate).toLocaleString()}</td>
                      <td className="text-center">{p.unit}</td>
                      <td>
                        <button 
                          className="btn btn-primary btn-sm" 
                          onClick={() => onSelect(p)}
                          style={{ padding: "4px 8px", fontSize: "12px" }}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
