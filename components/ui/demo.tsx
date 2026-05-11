import { cn } from "@/lib/utils";
import React from "react";

interface BackgroundBlueGlowProps {
  children?: React.ReactNode;
  className?: string;
}

export const BackgroundBlueGlow = ({ children, className }: BackgroundBlueGlowProps) => {
  return (
    <div className={cn("min-h-screen w-full bg-white relative overflow-hidden", className)}> 
 {/* Light Sky Blue Glow */}
 <div 
   className="absolute inset-0 z-0 pointer-events-none" 
   style={{
     backgroundImage: `
       radial-gradient(circle at center, #93c5fd, transparent)
     `,
   }} 
 />
     <div className="relative z-10">
       {children}
     </div>
</div>
  );
};

export default BackgroundBlueGlow;
