import { cn } from "@/lib/utils";
import React from "react";

interface BackgroundYellowGlowProps {
  children?: React.ReactNode;
  className?: string;
}

export const BackgroundYellowGlow = ({ children, className }: BackgroundYellowGlowProps) => {
  return (
   <div className={cn("min-h-screen w-full relative bg-white", className)}>
  {/* Soft Yellow Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at center, #FFF991 0%, transparent 70%)
      `,
      opacity: 0.6,
      mixBlendMode: "multiply",
    }}
  />
     <div className="relative z-10">
       {children}
     </div>
</div>
  );
};

export default BackgroundYellowGlow;
