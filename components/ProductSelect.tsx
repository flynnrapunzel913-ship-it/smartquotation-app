"use client";

import React, { useState, useEffect, useRef } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  sectionCode: string;
  unit: string;
  warranty: string;
  defaultRate: number;
  imagePath?: string | null;
  imageText?: string | null;
  templateText?: string;
  templateVariables?: string[];
}

interface ProductSelectProps {
  value: string;
  onChange: (product: Product | null, manualValue?: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ProductSelect({ value, onChange, placeholder, className }: ProductSelectProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const enriched = data.map(p => {
          const tText = p.description || "";
          // Extract variables like {{VarName}}
          const matches = tText.matchAll(/{{(\w+)}}/g);
          const vars = Array.from(new Set(Array.from(matches).map(m => m[1])));
          return {
            ...p,
            templateText: tText,
            templateVariables: vars
          };
        });
        setProducts(enriched);
        setFilteredProducts(enriched);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredProducts(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerSearch) ||
            p.category.toLowerCase().includes(lowerSearch) ||
            p.sectionCode.toLowerCase().includes(lowerSearch)
        )
      );
    }
  }, [searchTerm, products]);

  const handleSelect = (product: Product) => {
    setSearchTerm(product.name);
    setIsOpen(false);
    onChange(product);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onChange(null, val); // Allow manual override
    if (!isOpen) setIsOpen(true);
  };

  // Group products by Section
  const sections = Array.from(new Set(filteredProducts.map((p) => p.sectionCode))).sort();

  return (
    <div className="product-select-container" ref={containerRef} style={{ position: "relative" }}>
      <textarea
        className={className}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        style={{ minHeight: "60px", width: "100%" }}
      />
      
      {isOpen && (filteredProducts.length > 0 || searchTerm !== "") && (
        <div className="product-dropdown">
          {sections.map(section => (
            <div key={section}>
              <div className="product-section-header">
                Section {section}
              </div>
              {filteredProducts.filter(p => p.sectionCode === section).map((product) => (
                <div
                  key={product.id}
                  className="product-item"
                  onClick={() => handleSelect(product)}
                >
                  <div style={{ fontWeight: "500", fontSize: "14px" }}>{product.name}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{product.category} • ₹{Number(product.defaultRate).toLocaleString()}</div>
                </div>
              ))}
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ padding: "12px", color: "#94a3b8", fontSize: "14px", textAlign: "center" }}>
              No matching products found. Keep typing to use custom description.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
