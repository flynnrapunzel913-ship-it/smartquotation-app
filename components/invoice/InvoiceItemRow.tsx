import React from "react";
import { formatCurrencyINR } from "@/lib/utils";

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
  filteredProducts: any[];
  selectProduct: (index: number, product: any) => void;
}

export const InvoiceItemRow = React.memo(({
  index,
  item,
  handleItemChange,
  removeItem,
  showDropdown,
  setShowDropdown,
  filteredProducts,
  selectProduct
}: InvoiceItemRowProps) => {
  return (
    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
      <td style={{ padding: "12px", width: "40px", textAlign: "center", color: "#94a3b8", fontSize: "0.875rem" }}>{index + 1}</td>
      <td style={{ padding: "12px", position: "relative" }}>
        <input
          type="text"
          value={item.description}
          onChange={(e) => {
            handleItemChange(index, "description", e.target.value);
            setShowDropdown(index);
          }}
          onFocus={() => setShowDropdown(index)}
          className="form-control"
          placeholder="Enter item description..."
        />
        {showDropdown && filteredProducts.length > 0 && (
          <div className="product-dropdown" style={{
            position: "absolute",
            top: "100%",
            left: "12px",
            right: "12px",
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            zIndex: 100,
            maxHeight: "200px",
            overflowY: "auto"
          }}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="dropdown-item"
                style={{
                  padding: "10px 14px",
                  cursor: "pointer",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                onClick={() => selectProduct(index, product)}
              >
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "#0f172a" }}>{product.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>HSN: {product.hsnCode}</div>
                </div>
                <div style={{ fontWeight: "600", color: "#4f46e5", fontSize: "14px" }}>{formatCurrencyINR(product.defaultRate)}</div>
              </div>
            ))}
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
          className="form-control"
          style={{ textAlign: "right" }}
        />
      </td>
      <td style={{ padding: "12px", width: "100px" }}>
        <input
          type="number"
          value={item.qty}
          onChange={(e) => handleItemChange(index, "qty", e.target.value)}
          className="form-control"
          style={{ textAlign: "center" }}
        />
      </td>
      <td style={{ padding: "12px", textAlign: "right", fontWeight: "600", color: "#0f172a", fontSize: "0.875rem", width: "120px" }}>
        {formatCurrencyINR(item.total)}
      </td>
      <td style={{ padding: "12px", textAlign: "center", width: "50px" }}>
        <button 
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
