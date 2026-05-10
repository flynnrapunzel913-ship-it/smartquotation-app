"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  description: string;
  href: string;
  theme: "mr" | "klean" | "mr-invoice";
  disabled?: boolean;
}

export function QuotationTypeCard({ title, description, href, theme, disabled }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (!disabled) {
      router.push(href);
    }
  };

  return (
    <div 
      className={`module-card module-card-${theme}`} 
      onClick={handleClick}
      style={{ opacity: disabled ? 0.7 : 1, cursor: disabled ? "default" : "pointer" }}
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
    </div>
  );
}
