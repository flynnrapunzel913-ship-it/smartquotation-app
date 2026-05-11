"use client";

import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  href: string;
  theme: "mr" | "klean" | "mr-invoice";
  disabled?: boolean;
}

export function QuotationTypeCard({ title, description, href, theme, disabled }: Props) {
  return (
    <Link 
      href={disabled ? "#" : href}
      prefetch={true}
      className={`module-card module-card-${theme}`} 
      style={{ 
        opacity: disabled ? 0.7 : 1, 
        cursor: disabled ? "default" : "pointer",
        textDecoration: "none",
        display: "block"
      }}
    >
      <div className="module-card-title">{title}</div>
      <div className="module-card-desc">{description}</div>
      <div className="module-card-action">
        <button 
          className={`btn ${disabled ? "btn-outline" : "btn-primary"}`}
          disabled={disabled}
        >
          {disabled ? "Coming Soon" : (theme === "mr-invoice" ? "Create Invoice" : "Create Quotation")}
        </button>
      </div>
    </Link>
  );
}
