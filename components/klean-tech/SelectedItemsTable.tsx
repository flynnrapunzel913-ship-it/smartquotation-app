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
    <div style={{ marginTop: "30px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Selected Items</h3>
      <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Sl.No</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Type</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Code</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Description</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Unit Price</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Qty</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Line Total</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "12px" }}>{idx + 1}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "600",
                    background: item.type === "MACHINE" ? "#e0f2fe" : "#fef3c7",
                    color: item.type === "MACHINE" ? "#0369a1" : "#b45309"
                  }}>
                    {item.type}
                  </span>
                </td>
                <td style={{ padding: "12px", fontWeight: "500", color: "#475569" }}>{item.code || "N/A"}</td>
                <td style={{ padding: "12px" }}>{item.description}</td>
                <td style={{ padding: "12px", fontWeight: "600" }}>₹ {Number(item.unitPrice).toLocaleString()}</td>
                <td style={{ padding: "12px" }}>
                  <QuantitySelector quantity={item.quantity} onChange={(qty) => onUpdateQuantity(idx, qty)} />
                </td>
                <td style={{ padding: "12px", fontWeight: "600" }}>₹ {item.lineTotal.toLocaleString()}</td>
                <td style={{ padding: "12px" }}>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(idx)}
                    style={{ color: "#ef4444", border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={8} style={{ padding: "20px", textAlign: "center", color: "#94a3b8" }}>
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
