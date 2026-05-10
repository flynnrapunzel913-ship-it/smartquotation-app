"use client";
import React from "react";

interface Props {
  activeCategory: "MACHINE" | "SPARE";
  onCategoryChange: (category: "MACHINE" | "SPARE") => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: Props) {
  return (
    <div style={{ 
      display: "flex", 
      gap: "4px", 
      marginBottom: "24px", 
      background: "#f1f5f9", 
      padding: "4px", 
      borderRadius: "12px" 
    }}>
      <button
        type="button"
        onClick={() => onCategoryChange("MACHINE")}
        style={{
          flex: 1,
          padding: "12px",
          fontSize: "0.875rem",
          fontWeight: "600",
          textAlign: "center",
          borderRadius: "8px",
          border: "none",
          background: activeCategory === "MACHINE" ? "white" : "transparent",
          color: activeCategory === "MACHINE" ? "#0f172a" : "#64748b",
          cursor: "pointer",
          boxShadow: activeCategory === "MACHINE" ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" : "none",
          transition: "all 0.2s"
        }}
      >
        MACHINES
      </button>
      <button
        type="button"
        onClick={() => onCategoryChange("SPARE")}
        style={{
          flex: 1,
          padding: "12px",
          fontSize: "0.875rem",
          fontWeight: "600",
          textAlign: "center",
          borderRadius: "8px",
          border: "none",
          background: activeCategory === "SPARE" ? "white" : "transparent",
          color: activeCategory === "SPARE" ? "#0f172a" : "#64748b",
          cursor: "pointer",
          boxShadow: activeCategory === "SPARE" ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" : "none",
          transition: "all 0.2s"
        }}
      >
        SPARE PARTS
      </button>
    </div>
  );
}
