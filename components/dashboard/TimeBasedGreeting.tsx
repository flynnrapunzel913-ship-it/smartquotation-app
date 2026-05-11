"use client";

import React, { useState, useEffect } from "react";
import { Sunrise, Sun, Sunset, MoonStar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export default function TimeBasedGreeting() {
  const [mounted, setMounted] = useState(false);
  const [timeInfo, setTimeInfo] = useState({
    greeting: "Good evening, Admin",
    icon: <MoonStar size={40} style={{ color: "#4f46e5" }} />
  });

  useEffect(() => {
    setMounted(true);
    
    const updateGreeting = () => {
      const hourStr = new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        hour12: false,
        timeZone: "Asia/Kolkata",
      }).format(new Date());
      
      const hour = parseInt(hourStr, 10);
      
      let greeting = "Good evening, Admin";
      let icon = <MoonStar size={40} style={{ color: "#4f46e5" }} />;
      
      if (hour >= 5 && hour < 12) {
        greeting = "Good morning, Admin";
        icon = <Sunrise size={40} style={{ color: "#f59e0b" }} />;
      } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon, Admin";
        icon = <Sun size={40} style={{ color: "#ef4444" }} />;
      } else if (hour >= 17 && hour < 21) {
        greeting = "Good evening, Admin";
        icon = <Sunset size={40} style={{ color: "#ec4899" }} />;
      } else {
        greeting = "Good evening, Admin";
        icon = <MoonStar size={40} style={{ color: "#4f46e5" }} />;
      }
      
      setTimeInfo({ greeting, icon });
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%" }}>
      {/* Premium Icon Card Centered */}
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        position: "relative",
        overflow: "hidden"
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={timeInfo.greeting}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {timeInfo.icon}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={timeInfo.greeting}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedText
              text={timeInfo.greeting}
              textClassName="text-6xl font-black tracking-tighter bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#14B8A6] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer"
              underlineClassName="text-blue-500/40"
              underlineDuration={1.8}
              style={{ textAlign: "center" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
