import {
  readPoolBox,
  poolVolumeCubicFeet,
  cubicFeetToLiters,
  poolTilingSqFt,
  poolPerimeterRft,
} from "@/lib/pool-calculator";

export function formatCurrencyINR(amount: number | string): string {
  const num = Number(amount);
  if (isNaN(num)) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(num);
}

// Keep a simple concatenator for cn in case any leftover components use it
export function cn(...inputs: unknown[]) {
  return inputs.filter(Boolean).join(" ");
}

export function convertToWordsINR(num: number): string {
  if (num === 0) return "Zero Rupees Only";
  const a = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  
  const inWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : " ");
    if (n < 1000) return a[Math.floor(n / 100)] + "Hundred " + (n % 100 !== 0 ? "and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + "Thousand " + (n % 1000 !== 0 ? inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + "Lakh " + (n % 100000 !== 0 ? inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + "Crore " + (n % 10000000 !== 0 ? inWords(n % 10000000) : "");
  };

  return inWords(Math.floor(num)).trim() + " Rupees Only";
}

export interface PoolMetrics {
  volumeCubicFeet: number;
  volumeLiters: number;
  tilingArea: number;
  copingArea: number;
  waterproofingArea: number;
  floorArea: number;
  wallArea: number;
}

export function calculatePoolMetrics(l: number, w: number, d: number, shape: string = "Rectangle Pool"): PoolMetrics {
  void shape;
  const box = readPoolBox(String(l), String(w), String(d));
  if (!box) {
    return {
      volumeCubicFeet: 0,
      volumeLiters: 0,
      floorArea: 0,
      wallArea: 0,
      tilingArea: 0,
      copingArea: 0,
      waterproofingArea: 0,
    };
  }

  const floorArea = box.lengthFt * box.widthFt;
  const wallArea = 2 * box.lengthFt * box.depthFt + 2 * box.widthFt * box.depthFt;
  const volumeCubicFeet = poolVolumeCubicFeet(box);
  const volumeLiters = cubicFeetToLiters(volumeCubicFeet);
  const tilingArea = poolTilingSqFt(box);
  const copingArea = poolPerimeterRft(box.lengthFt, box.widthFt);

  return {
    volumeCubicFeet,
    volumeLiters,
    floorArea: Math.round(floorArea),
    wallArea: Math.round(wallArea),
    tilingArea,
    copingArea,
    waterproofingArea: tilingArea,
  };
}

export function renderTemplate(template: string, variables: Record<string, string>): string {
  if (!template) return "";
  return template.replace(/{{(\w+)}}/g, (_, key) => {
    return variables[key] !== undefined ? variables[key] : `{{${key}}}`;
  });
}

export function extractTemplateVariables(template: string): string[] {
  const matches = template.matchAll(/{{(\w+)}}/g);
  return Array.from(new Set(Array.from(matches).map(m => m[1])));
}
