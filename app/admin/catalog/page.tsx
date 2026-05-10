"use client";

import React, { useState, useEffect } from "react";

interface CatalogProduct {
  id: string;
  companyType: string;
  category: string;
  code: string | null;
  name: string;
  description: string;
  unitPrice: number;
  unit: string | null;
}

export default function CatalogAdminPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [companyType, setCompanyType] = useState<string>("MR_SWIMMING_POOLS");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCatalog();
  }, [companyType]);

  const fetchCatalog = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/catalog?companyType=${companyType}&query=${searchTerm}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1>Product Catalog Admin</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <select 
            className="form-control" 
            value={companyType} 
            onChange={(e) => setCompanyType(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="MR_SWIMMING_POOLS">MR Swimming Pools</option>
            <option value="KLEAN_TECH_SYSTEMS">Klean Tech Systems</option>
          </select>
          <button className="btn-primary" onClick={fetchCatalog}>Refresh</button>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchCatalog()}
        />
      </div>

      <div className="metrics-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <tr>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600 }}>Code</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600 }}>Category</th>
              <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: 600 }}>Name</th>
              <th style={{ padding: "12px", textAlign: "right", fontSize: "12px", fontWeight: 600 }}>Price</th>
              <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} style={{ padding: "40px", textAlign: "center" }}>Loading...</td></tr>
            ) : products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px", fontSize: "13px", fontWeight: 500 }}>{p.code || "-"}</td>
                  <td style={{ padding: "12px", fontSize: "13px" }}><span className="badge auto">{p.category}</span></td>
                  <td style={{ padding: "12px", fontSize: "13px" }}>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", maxWidth: "400px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description}</div>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", fontSize: "13px", fontWeight: 700, color: "#059669" }}>₹{Number(p.unitPrice).toLocaleString()}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button className="btn-icon" style={{ fontSize: "11px" }}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
