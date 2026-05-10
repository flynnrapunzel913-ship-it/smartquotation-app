"use client";
import React from "react";
import QuantitySelector from "./QuantitySelector";

interface QuotationItem {
  type: "MACHINE" | "SPARE";
  productId: string | null;
  code: string;
  description: string;
  imagePath: string;
  hsnCode: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

interface Props {
  items: QuotationItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}

export default function SelectedItemsTable({ items, onUpdateQuantity, onRemoveItem }: Props) {
  return (
    <div style={{ marginTop: "32px" }}>
      <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "16px", color: "#0f172a" }}>Selected Items</h3>
      <div style={{ 
        border: "1px solid #e2e8f0", 
        borderRadius: "12px", 
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        background: "white"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Sl.No</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Type</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Code</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Unit Price</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Qty</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Line Total</th>
              <th style={{ padding: "14px 16px", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0", transition: "background 0.2s" }}>
                <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#64748b" }}>{idx + 1}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    background: item.type === "MACHINE" ? "#e0f2fe" : "#fef3c7",
                    color: item.type === "MACHINE" ? "#0369a1" : "#b45309"
                  }}>
                    {item.type}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", fontWeight: "600", color: "#475569", fontSize: "0.875rem" }}>{item.code || "N/A"}</td>
                <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#0f172a" }}>{item.description}</td>
                <td style={{ padding: "14px 16px", fontWeight: "600", color: "#0f172a", fontSize: "0.875rem" }}>₹ {Number(item.unitPrice).toLocaleString()}</td>
                <td style={{ padding: "14px 16px" }}>
                  <QuantitySelector quantity={item.quantity} onChange={(qty) => onUpdateQuantity(idx, qty)} />
                </td>
                <td style={{ padding: "14px 16px", fontWeight: "700", color: "#0f172a", fontSize: "0.875rem" }}>₹ {item.lineTotal.toLocaleString()}</td>
                <td style={{ padding: "14px 16px" }}>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(idx)}
                    style={{ 
                      color: "#dc2626", 
                      border: "none", 
                      background: "#fee2e2", 
                      cursor: "pointer", 
                      fontSize: "12px",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#fecaca"}
                    onMouseOut={(e) => e.currentTarget.style.background = "#fee2e2"}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "0.875rem" }}>
                  No items selected yet. Add products from the catalog above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
