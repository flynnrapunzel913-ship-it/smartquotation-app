"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuotationTypeCard } from "@/components/QuotationTypeCard";
import RecentActivity from "@/components/RecentActivity";
import { Sparkles, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import TimeBasedGreeting from "@/components/dashboard/TimeBasedGreeting";

export default function QuotationTypesPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Aggressively hide the Next.js dev indicator
    const hideDevOverlay = () => {
      const selectors = ['nextjs-portal', '[data-nextjs-toast]', '#nextjs-dev-overlay', '.nextjs-static-indicator-container'];
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
          }
        });
      });
    };

    hideDevOverlay();
    const interval = setInterval(hideDevOverlay, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    router.prefetch("/history");
    router.prefetch("/dashboard/invoices");
    router.prefetch("/quotations/mr-swimming-pools/new");
    router.prefetch("/quotations/klean-tech/new");
  }, [router]);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen" style={{ 
      position: "relative", 
      overflowX: "hidden",
      backgroundImage: "url('/background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}>

      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "24px 2rem",
        position: "relative",
        zIndex: 1,
        width: "100%"
      }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {/* Centered Hero Section */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "0px",
              paddingBottom: "16px",
              textAlign: "center",
              width: "100%"
            }}
          >
            <TimeBasedGreeting />
          </motion.div>

          {/* Module Cards Row */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              marginBottom: "32px",
              width: "100%"
            }}
          >
            <QuotationTypeCard
              theme="mr"
              title="MR Quotation"
              description="Complete pool construction quotation builder."
              href="/quotations/mr-swimming-pools/new"
              logoUrl="/templates/mr-swimming-pools/logo.png"
            />
            <QuotationTypeCard
              theme="klean"
              title="Klean Tech Systems"
              description="Water treatment systems and industrial quotes."
              href="/quotations/klean-tech/new"
              logoUrl="/templates/klean-tech/roots-logo.png"
            />
            <QuotationTypeCard
              theme="mr-invoice"
              title="MR Tax Invoice"
              description="GST-ready professional tax invoices."
              href="/dashboard/invoices"
              logoUrl="/templates/mr-swimming-pools/logo.png"
            />
          </motion.div>

          {/* Recent Activity Section */}
          <motion.div
            variants={itemVariants}
            style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <LayoutGrid size={24} className="text-slate-400" />
                <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#0F172A", letterSpacing: "-0.01em" }}>Recent Activity</h2>
              </div>
              <button style={{
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: "600",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                background: "white",
                cursor: "pointer"
              }}>
                View All Activity
              </button>
            </div>

            <RecentActivity />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
