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
    <div className="overflow-auto border border-[#f1f5f9] rounded-xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#f8fafc] text-[#64748b] text-[10px] uppercase tracking-widest sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 font-bold">Product Name</th>
            <th className="px-4 py-3 font-bold">Details</th>
            <th className="px-4 py-3 font-bold text-center">Unit</th>
            <th className="px-4 py-3 font-bold text-right">Price</th>
            <th className="px-4 py-3 font-bold text-center">HSN</th>
            <th className="px-4 py-3 font-bold text-center">GST</th>
            {onRemove && <th className="px-4 py-3"></th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {products.length === 0 ? (
            <tr><td colSpan={onRemove ? 7 : 6} className="text-center py-20 text-[#94a3b8]">No products detected.</td></tr>
          ) : (
            products.map((p, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="font-semibold text-[#1e293b] text-sm">{p.name}</div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="text-xs text-[#64748b] line-clamp-2">{p.description}</div>
                </td>
                <td className="px-4 py-3.5 text-center text-xs font-medium text-[#475569]">{p.unit}</td>
                <td className="px-4 py-3.5 text-right font-bold text-[#0ea5e9] text-sm">₹{Number(p.defaultRate).toLocaleString()}</td>
                <td className="px-4 py-3.5 text-center text-[10px] font-mono text-[#94a3b8]">{p.hsnCode || "—"}</td>
                <td className="px-4 py-3.5 text-center text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded-lg">{p.gstRate}%</td>
                {onRemove && (
                  <td className="px-4 py-3.5 text-center">
                    <button className="w-8 h-8 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-all" onClick={() => onRemove(idx)}>×</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
