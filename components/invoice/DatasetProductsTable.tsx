"use client";

import React from "react";

interface Product {
  name: string;
  description: string;
  defaultRate: number;
  unit: string;
  hsnCode?: string;
  gstRate?: number;
  sectionCode?: string;
}

interface Props {
  products: Product[];
  onRemove?: (index: number) => void;
  readOnly?: boolean;
}

export default function DatasetProductsTable({ products, onRemove, readOnly = false }: Props) {
  if (products.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#64748b", background: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
        No products found in this dataset.
      </div>
    );
  }

  return (
    <div className="table-container" style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
      <table className="items-table" style={{ margin: 0 }}>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>SL</th>
            <th>Product Name</th>
            <th>Description</th>
            <th style={{ width: "100px" }}>Rate</th>
            <th style={{ width: "60px" }}>Unit</th>
            <th style={{ width: "100px" }}>HSN/Code</th>
            {!readOnly && <th style={{ width: "40px" }}></th>}
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td className="text-center">{i + 1}</td>
              <td style={{ fontWeight: 600 }}>{p.name}</td>
              <td style={{ fontSize: "12px", color: "#64748b" }}>{p.description}</td>
              <td className="text-right">₹{Number(p.defaultRate).toLocaleString()}</td>
              <td className="text-center">{p.unit}</td>
              <td style={{ fontSize: "11px" }}>
                {p.hsnCode && <div>HSN: {p.hsnCode}</div>}
                {p.sectionCode && <div>Code: {p.sectionCode}</div>}
              </td>
              {!readOnly && (
                <td>
                  <button className="btn-icon btn-danger" onClick={() => onRemove?.(i)}>×</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
