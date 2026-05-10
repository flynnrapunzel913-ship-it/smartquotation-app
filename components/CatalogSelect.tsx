"use client";

import React, { useState, useEffect, useRef } from "react";

interface CatalogProduct {
  id: string;
  companyType: string;
  category: string;
  code: string | null;
  name: string;
  description: string;
  specifications: any;
  unitPrice: number;
  unit: string | null;
}

interface CatalogSelectProps {
  companyType: "MR_SWIMMING_POOLS" | "KLEAN_TECH_SYSTEMS";
  onSelect: (product: CatalogProduct) => void;
  placeholder?: string;
}

export default function CatalogSelect({ companyType, onSelect, placeholder }: CatalogSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (searchTerm.length < 2) {
      setProducts([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setIsLoading(true);
      fetch(`/api/catalog?companyType=${companyType}&query=${encodeURIComponent(searchTerm)}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching catalog:", err);
          setIsLoading(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, companyType]);

  const handleSelect = (product: CatalogProduct) => {
    onSelect(product);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="catalog-select-container" ref={containerRef} style={{ position: "relative", width: "100%" }}>
      <div className="search-input-wrapper" style={{ position: "relative" }}>
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder || "Search catalog (code or name)..."}
          style={{ 
            width: "100%", 
            padding: "10px 12px", 
            borderRadius: "8px", 
            border: "1px solid #cbd5e1",
            fontSize: "14px"
          }}
        />
        {isLoading && (
          <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}>
            <div className="spinner-small"></div>
          </div>
        )}
      </div>

      {isOpen && (searchTerm.length >= 2) && (
        <div className="product-dropdown" style={{ 
          position: "absolute", 
          top: "100%", 
          left: 0, 
          right: 0, 
          zIndex: 1000, 
          background: "white", 
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          marginTop: "4px",
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #e2e8f0"
        }}>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="product-item"
                onClick={() => handleSelect(product)}
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: "600", fontSize: "13px", color: "#1e293b" }}>
                    {product.code ? `[${product.code}] ` : ""}{product.name}
                  </div>
                  <div style={{ fontWeight: "700", color: "#059669", fontSize: "13px" }}>
                    ₹{Number(product.unitPrice).toLocaleString()}
                  </div>
                </div>
                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {product.category} • {product.description}
                </div>
              </div>
            ))
          ) : !isLoading ? (
            <div style={{ padding: "12px", color: "#94a3b8", fontSize: "13px", textAlign: "center" }}>
              No catalog products found for "{searchTerm}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
