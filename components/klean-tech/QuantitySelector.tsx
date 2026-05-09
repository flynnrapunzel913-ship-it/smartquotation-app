"use client";
import React from "react";

interface Props {
  quantity: number;
  onChange: (qty: number) => void;
}

export default function QuantitySelector({ quantity, onChange }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        style={{
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e2e8f0",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        -
      </button>
      <span style={{ minWidth: "24px", textAlign: "center", fontWeight: "500" }}>{quantity}</span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        style={{
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e2e8f0",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        +
      </button>
    </div>
  );
}
