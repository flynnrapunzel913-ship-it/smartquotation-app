"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
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
        // Use the dedicated cleantech API for machines/spares
        const response = await fetch("/api/cleantech/products?limit=100");
        const text = await response.text();
        
        if (!response.ok) {
          throw new Error(text || `Failed to load products: ${response.status}`);
        }
        
        const data = text ? JSON.parse(text) : { products: [], total: 0 };
        const productsArray = Array.isArray(data) ? data : (data.products || []);
        console.log("Loaded products:", productsArray.length);
        
        const ktProducts = productsArray.filter((p: any) => p.category === "MACHINE" || p.category === "SPARE");
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
    <div style={{ marginTop: "24px" }}>
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "250px" }}>
          <button
            type="button"
            onClick={() => router.push(`${pathname}?manageProducts=true`)}
            style={{
              padding: "12px 20px",
              background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            + Add Product
          </button>
        </div>
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ 
              padding: "12px 16px", 
              borderRadius: "10px", 
              border: "1px solid #e2e8f0", 
              background: "white",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              fontSize: "0.875rem",
              cursor: "pointer"
            }}
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
            padding: "12px 20px",
            background: checkedProductIds.size === 0 
              ? "#cbd5e1" 
              : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: checkedProductIds.size === 0 ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "0.875rem",
            boxShadow: checkedProductIds.size === 0 ? "none" : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transition: "all 0.2s"
          }}
        >
          Add Selected Products ({checkedProductIds.size})
        </button>
      </div>

      <div style={{ 
        maxHeight: "500px", 
        overflowY: "auto", 
        border: "1px solid #e2e8f0", 
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        background: "white"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f8fafc", position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Select</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Image</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Code</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product Name</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>HSN</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Unit Price</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Qty</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} style={{ padding: "32px", textAlign: "center", color: "#64748b", fontSize: "0.875rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <span>Loading products...</span>
                  </div>
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={9} style={{ padding: "32px", textAlign: "center", color: "#ef4444", fontSize: "0.875rem" }}>
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
                    background: isChecked ? "#f0f9ff" : "inherit",
                    transition: "background 0.2s"
                  }}
                >
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
                      style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "#4f46e5" }}
                    />
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ 
                      width: "60px", 
                      height: "60px", 
                      background: "#f8fafc", 
                      borderRadius: "8px", 
                      border: "1px solid #e2e8f0",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      overflow: "hidden" 
                    }}>
                      {product.imagePath ? (
                        <img 
                          src={product.imagePath.startsWith("/") ? product.imagePath : `/${product.imagePath}`} 
                          alt={product.name} 
                          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
                        />
                      ) : (
                        <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "500" }}>No Image</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontWeight: "600", color: "#475569", fontSize: "0.875rem" }}>{product.code || "N/A"}</td>
                  <td style={{ padding: "14px 16px", fontWeight: "600", color: "#1e293b", fontSize: "0.875rem" }}>{product.name}</td>
                  <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#64748b", maxWidth: "250px" }}>{product.description}</td>
                  <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "0.875rem" }}>{product.hsnCode || "N/A"}</td>
                  <td style={{ padding: "14px 16px", fontWeight: "700", color: "#0f172a", fontSize: "0.875rem" }}>₹ {Number(product.defaultRate).toLocaleString()}</td>
                  <td style={{ padding: "14px 16px" }}>
                    {isChecked ? (
                      <QuantitySelector quantity={qty} onChange={(val) => handleQuantityChange(product.id, val)} />
                    ) : null}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {isChecked ? (
                      <button
                        type="button"
                        onClick={() => onAddProduct(product, qty)}
                        style={{
                          padding: "8px 16px",
                          background: isAdded 
                            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                            : "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          width: "90px",
                          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.05)",
                          transition: "all 0.2s"
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
                <td colSpan={9} style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "0.875rem" }}>
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
