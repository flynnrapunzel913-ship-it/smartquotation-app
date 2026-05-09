"use client";

import React, { useState, useEffect, useRef } from "react";

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

interface ProductPickerProps {
  value: string;
  onChange: (product: Product | null, manualValue?: string) => void;
  placeholder?: string;
  className?: string;
  filterCategory?: string | null;
}

export default function ProductPicker({ value, onChange, placeholder, className, filterCategory }: ProductPickerProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Filter for Klean Tech products
        const ktProducts = data.filter((p: any) => p.category === "MACHINE" || p.category === "SPARE");
        setProducts(ktProducts);
        setFilteredProducts(ktProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    let result = products;
    
    if (filterCategory) {
      result = result.filter(p => p.category === filterCategory);
    }

    if (searchTerm !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          (p.code && p.code.toLowerCase().includes(lowerSearch)) ||
          p.category.toLowerCase().includes(lowerSearch)
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, products, filterCategory]);

  const handleSelect = (product: Product) => {
    setSearchTerm(product.name);
    setIsOpen(false);
    onChange(product);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onChange(null, val); // Allow manual override
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div className="product-select-container" ref={containerRef} style={{ position: "relative" }}>
      <input
        type="text"
        className={className}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        style={{ width: "100%" }}
      />
      
      {isOpen && (filteredProducts.length > 0 || searchTerm !== "") && (
        <div className="product-dropdown" style={{ maxHeight: "300px", overflowY: "auto", position: "absolute", zIndex: 10, width: "100%", background: "white", border: "1px solid #ddd", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleSelect(product)}
              style={{ padding: "8px", borderBottom: "1px solid #eee", cursor: "pointer" }}
            >
              <div style={{ fontWeight: "500", fontSize: "14px" }}>{product.name}</div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                {product.code ? `Code: ${product.code} • ` : ""}{product.category} • ₹{Number(product.defaultRate).toLocaleString()}
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ padding: "12px", color: "#94a3b8", fontSize: "14px", textAlign: "center" }}>
              No matching products found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
