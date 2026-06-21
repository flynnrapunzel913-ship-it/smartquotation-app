"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, Package } from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";
import type { InvoiceCatalogProduct } from "@/lib/mr-invoice-product";

interface InvoiceItem {
  description: string;
  unitPrice: number;
  qty: number;
  total: number;
  hsn?: string;
  gstRate?: number;
  unit?: string;
}

interface InvoiceItemRowProps {
  index: number;
  item: InvoiceItem;
  handleItemChange: (index: number, field: keyof InvoiceItem, value: any) => void;
  removeItem: (index: number) => void;
  showDropdown: boolean;
  setShowDropdown: (index: number | null) => void;
  filteredProducts: InvoiceCatalogProduct[];
  selectProduct: (index: number, product: InvoiceCatalogProduct) => void;
}

export const InvoiceItemRow = React.memo(({
  index,
  item,
  handleItemChange,
  removeItem,
  showDropdown,
  setShowDropdown,
  filteredProducts,
  selectProduct,
}: InvoiceItemRowProps) => {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasQuery = item.description.trim().length > 0;
  const isOpen = showDropdown && hasQuery;

  useEffect(() => {
    setHighlightIndex(0);
  }, [item.description, filteredProducts.length]);

  useEffect(() => {
    if (!listRef.current || !isOpen) return;
    const el = listRef.current.querySelector(`[data-index="${highlightIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, isOpen]);

  const pickProduct = (product: InvoiceCatalogProduct) => {
    selectProduct(index, product);
    setShowDropdown(null);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      if (hasQuery) setShowDropdown(index);
      return;
    }
    if (e.key === "Escape") {
      setShowDropdown(null);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, Math.max(filteredProducts.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filteredProducts[highlightIndex]) {
      e.preventDefault();
      pickProduct(filteredProducts[highlightIndex]);
    }
  };

  return (
    <tr className={isOpen ? "invoice-row-dropdown-open" : undefined} style={{ borderBottom: "1px solid #f1f5f9" }}>
      <td className="number-font" style={{ padding: "12px", width: "40px", textAlign: "center", color: "#94a3b8", fontSize: "0.875rem" }}>{index + 1}</td>
      <td className="description-cell invoice-description-cell" style={{ padding: "12px", position: "relative" }}>
        <input
          ref={inputRef}
          type="text"
          value={item.description}
          onChange={(e) => {
            handleItemChange(index, "description", e.target.value);
            setShowDropdown(index);
          }}
          onFocus={() => setShowDropdown(index)}
          onKeyDown={handleKeyDown}
          className="form-control"
          placeholder="Search or enter item description…"
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />
        {isOpen && (
          <div
            ref={listRef}
            className="product-dropdown invoice-item-dropdown"
            role="listbox"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, i) => (
                <button
                  key={product.id}
                  type="button"
                  role="option"
                  data-index={i}
                  aria-selected={i === highlightIndex}
                  className={`product-item${i === highlightIndex ? " is-highlighted" : ""}`}
                  onMouseEnter={() => setHighlightIndex(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pickProduct(product)}
                >
                  <div className="product-item-thumb">
                    {product.imagePath ? (
                      <img src={product.imagePath} alt="" />
                    ) : (
                      <Package size={20} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="product-item-body">
                    <div className="product-item-name">{product.name}</div>
                    <div className="product-item-meta">
                      <span>{product.hsnCode ? `HSN ${product.hsnCode}` : "HSN —"}</span>
                      <span>{product.unit || "Nos"}</span>
                      {product.gstRate != null && product.gstRate > 0 ? (
                        <span>GST {product.gstRate}%</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="product-item-price">
                    {formatCurrencyINR(product.defaultRate)}
                    <ChevronRight size={14} className="product-item-chevron" />
                  </div>
                </button>
              ))
            ) : (
              <div className="product-dropdown-empty">
                <Package size={28} strokeWidth={1.25} />
                <p>No matching products</p>
                <span>Try a different search term or add a blank row</span>
              </div>
            )}
          </div>
        )}
      </td>
      <td style={{ padding: "12px", width: "120px" }}>
        <input
          type="text"
          value={item.hsn || ""}
          onChange={(e) => handleItemChange(index, "hsn", e.target.value)}
          className="form-control"
          style={{ textAlign: "center" }}
        />
      </td>
      <td style={{ padding: "12px", width: "120px" }}>
        <input
          type="number"
          value={item.unitPrice}
          onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
          className="form-control number-font"
          style={{ textAlign: "right" }}
        />
      </td>
      <td style={{ padding: "12px", width: "100px" }}>
        <input
          type="number"
          value={item.qty}
          onChange={(e) => handleItemChange(index, "qty", e.target.value)}
          className="form-control number-font"
          style={{ textAlign: "center" }}
        />
      </td>
      <td className="number-font" style={{ padding: "12px", textAlign: "right", fontWeight: "600", color: "#0f172a", fontSize: "0.875rem", width: "120px" }}>
        {formatCurrencyINR(item.total)}
      </td>
      <td style={{ padding: "12px", textAlign: "center", width: "50px" }}>
        <button
          type="button"
          className="btn-icon"
          style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "4px", width: "28px", height: "28px", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => removeItem(index)}
        >
          ✕
        </button>
      </td>
    </tr>
  );
});

InvoiceItemRow.displayName = "InvoiceItemRow";
