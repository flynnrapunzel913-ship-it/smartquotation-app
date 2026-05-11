"use client";

import React, { useEffect, useState } from "react";
import { FileText, FileCheck, UploadCloud, ChevronRight, Info } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

interface ActivityItem {
  id: string;
  type: "quotation" | "invoice";
  name: string;
  module: string;
  status: string;
  timestamp: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const [qRes, iRes] = await Promise.all([
          fetch("/api/quotations?limit=5"),
          fetch("/api/invoices?limit=5")
        ]);

        const qData = await qRes.json();
        const iData = await iRes.json();

        const merged: ActivityItem[] = [
          ...qData.slice(0, 5).map((q: any) => ({
            id: q.id,
            type: "quotation",
            name: q.quoteNumber || "Untitled Quote",
            module: q.quotationType === "KLEAN_TECH_SYSTEMS" ? "Klean Tech" : "MR Construction",
            status: q.isDraft ? "Draft" : "Completed",
            timestamp: q.createdAt || q.date
          })),
          ...iData.slice(0, 5).map((i: any) => ({
            id: i.id,
            type: "invoice",
            name: i.invoiceNumber || "Untitled Invoice",
            module: "MR Invoice",
            status: i.isDraft ? "Draft" : "Generated",
            timestamp: i.createdAt || i.invoiceDate
          }))
        ];

        merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setActivities(merged.slice(0, 8));
      } catch (err) {
        console.error("Failed to fetch activity", err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, []);

  return (
    <div className={`card-premium ${roboto.className}`} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-main)" }}>Recent Activity</h3>
        <Link href="/history" style={{ fontSize: "13px", color: "var(--accent-teal)", fontWeight: "600", textDecoration: "none" }}>
          View All
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: "56px", borderRadius: "12px" }}></div>
          ))
        ) : activities.length > 0 ? (
          activities.map((item, idx) => (
            <motion.div 
              key={item.id + idx}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              style={{ display: "flex", alignItems: "center", gap: "16px", padding: "6px 0" }}
            >
              <div style={{ 
                padding: "10px", 
                borderRadius: "12px", 
                background: "var(--bg-main)", 
                border: "1px solid var(--border-subtle)",
                color: item.type === "invoice" ? "var(--accent-orange)" : "var(--accent-teal)" 
              }}>
                {item.type === "invoice" ? <FileCheck size={18} /> : <FileText size={18} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-main)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-subtle)", marginTop: "2px" }}>{item.module}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ 
                  fontSize: "11px", 
                  fontWeight: "800", 
                  color: item.status === "Completed" || item.status === "Generated" ? "var(--accent-green)" : "var(--accent-orange)",
                  background: item.status === "Completed" || item.status === "Generated" ? "rgba(22, 163, 74, 0.1)" : "rgba(234, 88, 12, 0.1)",
                  padding: "3px 10px",
                  borderRadius: "12px",
                  border: item.status === "Completed" || item.status === "Generated" ? "1px solid rgba(22, 163, 74, 0.2)" : "1px solid rgba(234, 88, 12, 0.2)"
                }}>
                  {item.status.toUpperCase()}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-subtle)", marginTop: "4px" }}>
                  {new Date(item.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-subtle)", fontSize: "14px" }}>
            No recent activity found.
          </div>
        )}
      </div>



    </div>
  );
}
