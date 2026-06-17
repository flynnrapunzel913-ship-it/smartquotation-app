"use client";

import React, { useEffect, useState } from "react";
import { FileText, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  type ActivityFilter,
  type ActivityItem,
  fetchRecentActivities,
  filterActivities,
  openActivityItem,
} from "@/lib/activity";

type Props = {
  limit?: number;
  filter?: ActivityFilter;
  showCardHeader?: boolean;
  viewAllHref?: string;
  emptyMessage?: string;
  className?: string;
};

function StatusBadge({ status }: { status: string }) {
  const isPositive = status === "Completed" || status === "Generated";
  return (
    <div
      style={{
        fontSize: "11px",
        fontWeight: 800,
        color: isPositive ? "var(--accent-green)" : "var(--accent-orange)",
        background: isPositive ? "rgba(22, 163, 74, 0.1)" : "rgba(234, 88, 12, 0.1)",
        padding: "3px 10px",
        borderRadius: "12px",
        border: isPositive ? "1px solid rgba(22, 163, 74, 0.2)" : "1px solid rgba(234, 88, 12, 0.2)",
      }}
    >
      {status.toUpperCase()}
    </div>
  );
}

function ActivityRow({ item, idx }: { item: ActivityItem; idx: number }) {
  return (
    <motion.button
      type="button"
      key={item.id + idx}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
      onClick={() => openActivityItem(item)}
      className="activity-row"
      title={item.isDraft ? "Open to edit" : "Click to preview"}
    >
      <div
        style={{
          padding: "10px",
          borderRadius: "12px",
          background: "var(--bg-main)",
          border: "1px solid var(--border-subtle)",
          color: item.type === "invoice" ? "var(--accent-orange)" : "var(--accent-teal)",
        }}
      >
        {item.type === "invoice" ? <FileCheck size={18} /> : <FileText size={18} />}
      </div>
      <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--text-main)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </div>
        <div style={{ fontSize: "12px", color: "var(--text-subtle)", marginTop: "2px" }}>{item.module}</div>
      </div>
      <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {item.isSample ? (
            <span className="activity-tag activity-tag--sample">Sample</span>
          ) : null}
          <StatusBadge status={item.status} />
        </div>
        <div style={{ fontSize: "11px", color: "var(--text-subtle)" }}>
          {new Date(item.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </div>
      </div>
    </motion.button>
  );
}

export default function RecentActivity({
  limit = 8,
  filter = "all",
  showCardHeader = true,
  viewAllHref = "/activity",
  emptyMessage = "No recent activity found.",
  className = "",
}: Props) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchRecentActivities(100)
      .then((items) => {
        if (!cancelled) {
          setActivities(filterActivities(items, filter).slice(0, limit));
        }
      })
      .catch(() => {
        if (!cancelled) setActivities([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [limit, filter]);

  return (
    <div className={`card-premium activity-card ${className}`} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {showCardHeader && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-main)" }}>Recent Activity</h3>
          <Link href={viewAllHref} style={{ fontSize: "13px", color: "var(--accent-teal)", fontWeight: "600", textDecoration: "none" }}>
            View All
          </Link>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: "56px", borderRadius: "12px" }} />
          ))
        ) : activities.length > 0 ? (
          activities.map((item, idx) => <ActivityRow key={item.id} item={item} idx={idx} />)
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-subtle)", fontSize: "14px" }}>
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
