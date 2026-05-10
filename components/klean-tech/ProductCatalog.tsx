"use client";
import React, { useState, useEffect } from "react";
import QuantitySelector from "./QuantitySelector";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultRate: number;
  imagePath?: string | null;
  code?: string;
  hsnCode?: string;
}

interface Props {
  activeCategory: "MACHINE" | "SPARE";
  onAddProduct: (product: Product, quantity: number) => void;
  selectedItems: { productId: string | null; quantity: number }[];
}

export default function ProductCatalog({ activeCategory, onAddProduct, selectedItems }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedProductIds, setCheckedProductIds] = useState<Set<string>>(new Set());

  // Remove useEffect that syncs checkedProductIds with selectedItems
  // to allow independent selection and clearing after addition.

  const handleBulkAdd = () => {
    const productsToAdd = products.filter((p) => checkedProductIds.has(p.id) && p.category === activeCategory);
    productsToAdd.forEach((product) => {
      const qty = quantities[product.id] || 1;
      onAddProduct(product, qty);
    });
    setCheckedProductIds(new Set());
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/products");
        const text = await response.text();
        
        if (!response.ok) {
          throw new Error(text || `Failed to load products: ${response.status}`);
        }
        
        const data = text ? JSON.parse(text) : [];
        console.log("Loaded products:", data.length);
        
        const ktProducts = data.filter((p: any) => p.category === "MACHINE" || p.category === "SPARE");
        setProducts(ktProducts);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleQuantityChange = (productId: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  const handleCheckboxChange = (productId: string, checked: boolean) => {
    setCheckedProductIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(productId);
      } else {
        next.delete(productId);
      }
      return next;
    });
  };

  const getFilteredAndSortedProducts = () => {
    let result = products.filter((p) => p.category === activeCategory);

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          (p.code && p.code.toLowerCase().includes(lowerSearch)) ||
          p.description.toLowerCase().includes(lowerSearch)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price_low") {
        return Number(a.defaultRate) - Number(b.defaultRate);
      } else if (sortBy === "price_high") {
        return Number(b.defaultRate) - Number(a.defaultRate);
      }
      return 0;
    });

    return result;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", gap: "15px", marginBottom: "15px", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            placeholder="Search by name, code or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />
        </div>
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "white" }}
          >
            <option value="name">Sort by Name</option>
            <option value="price_low">Price (Low to High)</option>
            <option value="price_high">Price (High to Low)</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleBulkAdd}
          disabled={checkedProductIds.size === 0}
          style={{
            padding: "10px 16px",
            background: checkedProductIds.size === 0 ? "#94a3b8" : "#10b981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: checkedProductIds.size === 0 ? "not-allowed" : "pointer",
            fontWeight: "500",
            transition: "background 0.2s"
          }}
        >
          Add Selected Products (${checkedProductIds.size})
        </button>
      </div>

      <div style={{ maxHeight: "500px", overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f8fafc", position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Select</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Image</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Code</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Product Name</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Description</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>HSN</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Unit Price</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Qty</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
                  Loading products...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={8} style={{ padding: "20px", textAlign: "center", color: "#ef4444" }}>
                  Error: {error}
                </td>
              </tr>
            )}
            {!loading && !error && filteredProducts.map((product) => {
              const qty = quantities[product.id] || 1;
              const isChecked = checkedProductIds.has(product.id);
              const isAdded = selectedItems.some((item) => item.productId === product.id);
              
              return (
                <tr 
                  key={product.id} 
                  style={{ 
                    borderBottom: "1px solid #e2e8f0",
                    background: isChecked ? "#f0f9ff" : "inherit"
                  }}
                >
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                      style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    />
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ width: "50px", height: "50px", background: "#f1f5f9", borderRadius: "#4px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {product.imagePath ? (
                        <img 
                          src={product.imagePath.startsWith("/") ? product.imagePath : `/${product.imagePath}`} 
                          alt={product.name} 
                          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
                        />
                      ) : (
                        <span style={{ fontSize: "10px", color: "#94a3b8" }}>No Image</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "12px", fontWeight: "500", color: "#475569" }}>{product.code || "N/A"}</td>
                  <td style={{ padding: "12px", fontWeight: "500" }}>{product.name}</td>
                  <td style={{ padding: "12px", fontSize: "14px", color: "#64748b" }}>{product.description}</td>
                  <td style={{ padding: "12px", color: "#64748b" }}>{product.hsnCode || "N/A"}</td>
                  <td style={{ padding: "12px", fontWeight: "600" }}>₹ {Number(product.defaultRate).toLocaleString()}</td>
                  <td style={{ padding: "12px" }}>
                    {isChecked ? (
                      <QuantitySelector quantity={qty} onChange={(val) => handleQuantityChange(product.id, val)} />
                    ) : null}
                  </td>
                  <td style={{ padding: "12px" }}>
                    {isChecked ? (
                      <button
                        type="button"
                        onClick={() => onAddProduct(product, qty)}
                        style={{
                          padding: "6px 12px",
                          background: isAdded ? "#10b981" : "#0f172a",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "500",
                          width: "80px"
                        }}
                      >
                        {isAdded ? "Update" : "Add"}
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
            {!loading && !error && filteredProducts.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>
                  No products found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
