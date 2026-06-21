"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Search, X, Package, ChevronRight } from "lucide-react";
import { fetchCatalogProducts } from "@/lib/catalog-cache";

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
  defaultVariableValues?: Record<string, string>;
  poolTypeFilter?: "skimmer" | "overflow" | null;
}

interface ProductSelectProps {
  value: string;
  companyType: "MR_SWIMMING_POOLS" | "KLEAN_TECH_SYSTEMS" | "MR_ACADEMY";
  onChange: (product: Product | null, manualValue?: string) => void;
  placeholder?: string;
  className?: string;
  /** When set, only show catalog products for this quotation section (e.g. A, B, Part 2). */
  sectionFilter?: string;
}

export default function ProductSelect({
  value,
  companyType,
  onChange,
  placeholder,
  className,
  sectionFilter,
}: ProductSelectProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!companyType) return;
    setLoading(true);
    fetchCatalogProducts(companyType)
      .then((enriched) => setProducts(enriched))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [companyType]);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (sectionFilter) {
      list = list.filter((p) => p.sectionCode === sectionFilter);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sectionCode.toLowerCase().includes(q),
      );
    }
    return list;
  }, [products, searchTerm, sectionFilter]);

  useEffect(() => {
    setHighlightIndex(0);
  }, [searchTerm, sectionFilter, filteredProducts.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (product: Product) => {
      setSearchTerm("");
      setIsOpen(false);
      onChange(product);
      inputRef.current?.blur();
    },
    [onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filteredProducts.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filteredProducts[highlightIndex]) {
      e.preventDefault();
      handleSelect(filteredProducts[highlightIndex]);
    }
  };

  useEffect(() => {
    if (!listRef.current || !isOpen) return;
    const el = listRef.current.querySelector(`[data-index="${highlightIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, isOpen]);

  const showDropdown = isOpen && !loading;

  return (
    <div className={`product-select-container ${className ?? ""}`} ref={containerRef}>
      <div className={`product-search-field${isOpen ? " is-open" : ""}`}>
        <Search className="product-search-icon" size={18} aria-hidden />
        <input
          ref={inputRef}
          type="search"
          className="product-search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onChange(null, e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "Search products by name or category…"}
          autoComplete="off"
          spellCheck={false}
        />
        {searchTerm ? (
          <button
            type="button"
            className="product-search-clear"
            onClick={() => {
              setSearchTerm("");
              onChange(null, "");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      <p className="product-search-hint">
        {loading
          ? "Loading product catalog…"
          : sectionFilter
            ? `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} in this section · click to add`
            : "Type to search · ↑↓ navigate · Enter to add"}
      </p>

      {showDropdown && (
        <div className="product-dropdown" ref={listRef} role="listbox">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <button
                key={product.id}
                type="button"
                role="option"
                data-index={index}
                aria-selected={index === highlightIndex}
                className={`product-item${index === highlightIndex ? " is-highlighted" : ""}`}
                onMouseEnter={() => setHighlightIndex(index)}
                onClick={() => handleSelect(product)}
              >
                <div className="product-item-thumb">
                  {product.imagePath ? (
                    <img src={product.imagePath} alt="" />
                  ) : product.imageText ? (
                    <span className="product-item-thumb-text">{product.imageText}</span>
                  ) : (
                    <Package size={20} strokeWidth={1.5} />
                  )}
                </div>
                <div className="product-item-body">
                  <div className="product-item-name">{product.name}</div>
                  <div className="product-item-meta">
                    <span>{product.category}</span>
                    {!sectionFilter && <span>Section {product.sectionCode}</span>}
                    {product.poolTypeFilter ? (
                      <span className="product-item-badge">{product.poolTypeFilter}</span>
                    ) : null}
                  </div>
                </div>
                <div className="product-item-price">
                  ₹{Number(product.defaultRate).toLocaleString("en-IN")}
                  <ChevronRight size={14} className="product-item-chevron" />
                </div>
              </button>
            ))
          ) : (
            <div className="product-dropdown-empty">
              <Package size={28} strokeWidth={1.25} />
              <p>No matching products</p>
              <span>Try a different search term</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
