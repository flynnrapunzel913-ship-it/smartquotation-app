"use client";

import React, { useState, useEffect } from "react";

interface Product {
  name: string;
  description: string;
  unit: string;
  defaultRate: number;
  hsnCode?: string;
  gstRate?: number;
}

interface Props {
  products?: Product[];
  databaseId?: string;
  onRemove?: (index: number) => void;
}

export default function DatabaseProductsTable({ products: initialProducts, databaseId, onRemove }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [isLoading, setIsLoading] = useState(!!databaseId);

  useEffect(() => {
    if (databaseId) {
      fetchProducts();
    }
  }, [databaseId]);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/invoice-databases/${databaseId}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p className="text-center" style={{ padding: "20px" }}>Loading products...</p>;

  return (
    <table className="items-table" style={{ margin: 0 }}>
      <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#f8fafc" }}>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th style={{ width: "60px" }}>Unit</th>
          <th style={{ width: "100px" }}>Rate</th>
          <th style={{ width: "80px" }}>HSN</th>
          <th style={{ width: "60px" }}>GST%</th>
          {onRemove && <th style={{ width: "50px" }}></th>}
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr><td colSpan={onRemove ? 7 : 6} className="text-center" style={{ padding: "20px", color: "#64748b" }}>No products found.</td></tr>
        ) : (
          products.map((p, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: 600 }}>{p.name}</td>
              <td style={{ fontSize: "12px", color: "#64748b" }}>{p.description}</td>
              <td className="text-center">{p.unit}</td>
              <td className="text-right">₹{Number(p.defaultRate).toLocaleString()}</td>
              <td className="text-center" style={{ fontSize: "11px" }}>{p.hsnCode}</td>
              <td className="text-center" style={{ fontSize: "11px" }}>{p.gstRate}%</td>
              {onRemove && (
                <td className="text-center">
                  <button className="btn-icon btn-danger" onClick={() => onRemove(idx)} style={{ padding: "4px" }}>×</button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
