"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  quantity: number;
  onChange: (qty: number) => void;
}

export default function QuantitySelector({ quantity, onChange }: Props) {
  const quantityRef = useRef(quantity);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    quantityRef.current = quantity;
  }, [quantity]);

  const clearTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleAction = (increment: boolean) => {
    const nextVal = increment ? quantityRef.current + 1 : Math.max(1, quantityRef.current - 1);
    onChange(nextVal);
  };

  const startAutoChange = (increment: boolean) => {
    handleAction(increment);
    
    // Wait 500ms before starting rapid fire
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        handleAction(increment);
      }, 100);
    }, 500);
  };

  const handleMouseUp = () => {
    clearTimers();
  };

  return (
    <div style={{ 
      display: "inline-flex", 
      alignItems: "center", 
      gap: "4px",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "2px",
      background: "#f8fafc"
    }}>
      <button
        type="button"
        onMouseDown={() => startAutoChange(false)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={() => startAutoChange(false)}
        onTouchEnd={handleMouseUp}
        style={{
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          color: "#475569",
          userSelect: "none",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
        onMouseOut={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
      >
        -
      </button>
      <span style={{ minWidth: "32px", textAlign: "center", fontWeight: "600", color: "#0f172a", fontSize: "0.875rem" }}>{quantity}</span>
      <button
        type="button"
        onMouseDown={() => startAutoChange(true)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={() => startAutoChange(true)}
        onTouchEnd={handleMouseUp}
        style={{
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "600",
          color: "#475569",
          userSelect: "none",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          transition: "all 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
        onMouseOut={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
      >
        +
      </button>
    </div>
  );
}
