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
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
          background: "#e2e8f0",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          userSelect: "none"
        }}
      >
        -
      </button>
      <span style={{ minWidth: "24px", textAlign: "center", fontWeight: "500" }}>{quantity}</span>
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
          background: "#e2e8f0",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          userSelect: "none"
        }}
      >
        +
      </button>
    </div>
  );
}
