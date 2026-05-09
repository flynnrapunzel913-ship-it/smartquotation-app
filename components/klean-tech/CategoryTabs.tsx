"use client";
import React from "react";

interface Props {
  activeCategory: "MACHINE" | "SPARE";
  onCategoryChange: (category: "MACHINE" | "SPARE") => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: Props) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <button
        type="button"
        onClick={() => onCategoryChange("MACHINE")}
        style={{
          flex: 1,
          padding: "15px",
          fontSize: "16px",
          fontWeight: "600",
          textAlign: "center",
          borderRadius: "8px",
          border: "2px solid",
          borderColor: activeCategory === "MACHINE" ? "#0f172a" : "#e2e8f0",
          background: activeCategory === "MACHINE" ? "#0f172a" : "white",
          color: activeCategory === "MACHINE" ? "white" : "#0f172a",
          cursor: "pointer",
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
          padding: "15px",
          fontSize: "16px",
          fontWeight: "600",
          textAlign: "center",
          borderRadius: "8px",
          border: "2px solid",
          borderColor: activeCategory === "SPARE" ? "#0f172a" : "#e2e8f0",
          background: activeCategory === "SPARE" ? "#0f172a" : "white",
          color: activeCategory === "SPARE" ? "white" : "#0f172a",
          cursor: "pointer",
          transition: "all 0.2s"
        }}
      >
        SPARE PARTS
      </button>
    </div>
  );
}
