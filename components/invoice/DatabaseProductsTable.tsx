"use client";

import React, { useState, useEffect } from "react";

interface Product {
  productCode?: string;
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
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    try {
      const response = await fetch(`/api/invoice-databases/${databaseId}`);
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response from database API:", text);
        setError("Could not load products. The server returned an invalid response (HTML). This usually means the database connection is down.");
        return;
      }

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to load database products.");
      } else {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Network error: Could not reach the database API.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p className="text-center py-20 text-[#94a3b8] animate-pulse">Loading products...</p>;

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 border border-red-100 rounded-2xl mx-auto max-w-lg my-10">
        <div className="text-4xl mb-4">⚠️</div>
        <div className="text-sm font-black text-red-700 uppercase tracking-tight mb-2">Connection Error</div>
        <div className="text-xs text-red-600 leading-relaxed">{error}</div>
        <button 
          className="mt-6 px-6 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-all"
          onClick={() => fetchProducts()}
        >
          RETRY CONNECTION
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-[#f1f5f9] rounded-xl shadow-sm">
      <table className="w-full text-left border-collapse table-fixed">
        <thead className="bg-[#f8fafc] text-[#64748b] text-[10px] uppercase tracking-widest sticky top-0 z-10 border-b border-[#f1f5f9]">
          <tr>
            <th className="px-4 py-3 font-bold w-[12%]">Code</th>
            <th className="px-4 py-3 font-bold w-[25%]">Product Name</th>
            <th className="px-4 py-3 font-bold w-[23%]">Details</th>
            <th className="px-4 py-3 font-bold text-center w-[8%]">Unit</th>
            <th className="px-4 py-3 font-bold text-right w-[12%]">Rate</th>
            <th className="px-4 py-3 font-bold text-center w-[10%]">HSN</th>
            <th className="px-4 py-3 font-bold text-center w-[10%]">GST</th>
            {onRemove && <th className="px-4 py-3 w-[5%]"></th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9] bg-white">
          {products.length === 0 ? (
            <tr><td colSpan={onRemove ? 8 : 7} className="text-center py-24 text-[#94a3b8]">No products detected in this database.</td></tr>
          ) : (
            products.map((p, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-4 py-3.5 text-[11px] font-mono font-bold text-blue-600 truncate">
                  {p.productCode || "—"}
                </td>
                <td className="px-4 py-3.5">
                  <div className="font-bold text-[#1e293b] text-sm leading-tight">{p.name}</div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="text-xs text-[#64748b] line-clamp-2 italic">{p.description || "No details provided"}</div>
                </td>
                <td className="px-4 py-3.5 text-center text-xs font-medium text-[#475569]">{p.unit}</td>
                <td className="px-4 py-3.5 text-right font-black text-slate-900 text-sm">₹{Number(p.defaultRate).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                <td className="px-4 py-3.5 text-center text-[10px] font-bold text-slate-400">{p.hsnCode || "—"}</td>
                <td className="px-4 py-3.5 text-center">
                   <span className="inline-block px-2 py-1 rounded-md text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100">
                     {p.gstRate}%
                   </span>
                </td>
                {onRemove && (
                  <td className="px-4 py-3.5 text-center">
                    <button 
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100" 
                      onClick={() => onRemove(idx)}
                    >
                      ×
                    </button>
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
