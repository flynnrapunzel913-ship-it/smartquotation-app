"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export default function Button({
  loading = false,
  loadingText = "Loading...",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn ${className}`}
      disabled={disabled || loading}
      {...props}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        position: "relative",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.7 : 1,
        ...props.style
      }}
    >
      {loading && <Loader2 className="animate-spin" size={16} />}
      {loading ? loadingText : children}
    </button>
  );
}
