"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface KpiCardProps {
  title: string;
  metric: string | number;
  trend?: string;
  icon: LucideIcon;
  color: string;
}

export default function KpiCard({ title, metric, trend, icon: Icon, color }: KpiCardProps) {
  return (
    <motion.div 
      className="card-premium"
      whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "160px", padding: "20px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ 
          padding: "12px", 
          borderRadius: "14px", 
          background: `${color}10`, 
          color: color,
          border: `1px solid ${color}20`
        }}>
          <Icon size={24} />
        </div>
        {trend && (
          <span style={{ 
            fontSize: "12px", 
            fontWeight: "700", 
            color: trend.startsWith("+") ? "var(--accent-green)" : "var(--text-subtle)",
            background: trend.startsWith("+") ? "rgba(22, 163, 74, 0.1)" : "var(--bg-main)",
            padding: "4px 10px",
            borderRadius: "20px",
            border: trend.startsWith("+") ? "1px solid rgba(22, 163, 74, 0.2)" : "1px solid var(--border-subtle)"
          }}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-subtle)", letterSpacing: "0.01em" }}>{title}</div>
        <div style={{ fontSize: "32px", fontWeight: "800", color: "var(--text-main)", marginTop: "6px", letterSpacing: "-0.02em" }}>{metric}</div>
      </div>
    </motion.div>
  );
}

