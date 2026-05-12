"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ArrowRight, ShieldCheck, Database, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  href: string;
  theme: "mr" | "klean" | "mr-invoice";
  disabled?: boolean;
  compact?: boolean;
  logoUrl?: string;
}

export function QuotationTypeCard({ title, description, href, theme, disabled, compact, logoUrl }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getThemeConfig = () => {
    switch (theme) {
      case "mr":
        return {
          icon: <ShieldCheck size={28} />,
          color: "var(--accent-teal)",
          badges: ["Templates", "History", "PDF"],
          cta: "Create Quotation"
        };
      case "klean":
        return {
          icon: <Database size={28} />,
          color: "var(--accent-green)",
          badges: ["Templates", "Inventory", "GST Ready"],
          cta: "Create Quotation"
        };
      case "mr-invoice":
        return {
          icon: <FileText size={28} />,
          color: "var(--accent-orange)",
          badges: ["GST Ready", "PDF", "Archive"],
          cta: "Create Invoice"
        };
      default:
        return {
          icon: <FileText size={28} />,
          color: "var(--accent-slate)",
          badges: [],
          cta: "Open Module"
        };
    }
  };

  const config = getThemeConfig();

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.1), 0 18px 36px -18px rgba(0, 0, 0, 0.05)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ height: "100%" }}
    >
      <div 
        onClick={(e) => {
          if (disabled || isLoading) return;
          setIsLoading(true);
          router.push(href);
        }}
        className="card-premium" 
        style={{ 
          opacity: disabled || isLoading ? 0.7 : 1, 
          cursor: disabled || isLoading ? "default" : "pointer",
          textDecoration: "none",
          display: "flex",
          flexDirection: "column",
          gap: compact ? "16px" : "24px",
          position: "relative",
          height: "100%",
          padding: compact ? "16px 20px" : "28px"
        }}
      >
        {!compact && (
          <button 
            onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
            style={{ 
              position: "absolute", 
              top: "24px", 
              right: "24px", 
              color: isFavorite ? "var(--accent-orange)" : "var(--text-subtle)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "var(--bg-main)"}
            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
          >
            <Star size={20} fill={isFavorite ? "var(--accent-orange)" : "none"} />
          </button>
        )}

        <div style={{ 
          width: compact ? "40px" : "64px", 
          height: compact ? "40px" : "64px", 
          borderRadius: compact ? "12px" : "18px", 
          background: logoUrl ? "white" : `${config.color}08`, 
          color: config.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: logoUrl ? "1px solid var(--border-subtle)" : `1px solid ${config.color}15`,
          overflow: "hidden",
          padding: logoUrl ? (compact ? "4px" : "8px") : "0"
        }}>
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={title} 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "contain" 
              }} 
            />
          ) : (
            React.cloneElement(config.icon as React.ReactElement, { size: compact ? 20 : 28 })
          )}
        </div>

        <div>
          <h3 style={{ fontSize: compact ? "16px" : "20px", fontWeight: "700", color: "var(--text-main)", marginBottom: compact ? "4px" : "12px", letterSpacing: "-0.01em" }}>{title}</h3>
          <p style={{ fontSize: compact ? "13px" : "15px", color: "var(--text-subtle)", lineHeight: "1.5" }}>{description}</p>
        </div>

        {!compact && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {config.badges.map(badge => (
              <span key={badge} style={{ 
                fontSize: "12px", 
                fontWeight: "700", 
                color: "var(--text-subtle)", 
                background: "var(--bg-main)", 
                padding: "4px 12px", 
                borderRadius: "20px",
                border: "1px solid var(--border-subtle)"
              }}>
                {badge}
              </span>
            ))}
          </div>
        )}

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: compact ? "0" : "8px" }}>
          <div 
            className="btn-module-cta"
            style={{ 
              padding: compact ? "6px 12px" : "10px 20px",
              borderRadius: "10px",
              fontSize: compact ? "12px" : "14px",
              fontWeight: "700",
              border: `1px solid ${config.color}`,
              color: config.color,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              background: "white"
            }}
          >
            {isLoading ? "Opening..." : config.cta}
            {isLoading ? <Loader2 className="animate-spin" size={compact ? 14 : 18} /> : <ArrowRight size={compact ? 14 : 18} />}
          </div>
          {!compact && <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-subtle)" }}>Last used 2h ago</span>}
        </div>
      </div>
      
      <style jsx>{`
        .btn-module-cta {
          background: white;
        }
        :global(.card-premium:hover) .btn-module-cta {
          background: ${config.color} !important;
          color: white !important;
        }
      `}</style>
    </motion.div>
  );
}


