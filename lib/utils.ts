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
  let floorArea = 0;
  let wallArea = 0;
  let volumeCubicFeet = 0;
  let perimeter = 0;

  const s = shape.toLowerCase();

  if (s.includes("circular")) {
    const r = l / 2; // Assuming length is diameter
    floorArea = Math.PI * r * r;
    wallArea = 2 * Math.PI * r * d;
    perimeter = 2 * Math.PI * r;
  } else if (s.includes("oval")) {
    const a = l / 2;
    const b = w / 2;
    floorArea = Math.PI * a * b;
    // Ramanujan approximation for perimeter
    const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
    perimeter = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
    wallArea = perimeter * d;
  } else {
    // Default to Rectangle/Square
    floorArea = l * w;
    wallArea = 2 * (l * d) + 2 * (w * d);
    perimeter = 2 * (l + w);
  }

  volumeCubicFeet = floorArea * d;
  const volumeLiters = Math.round(volumeCubicFeet * 28.3168);

  return {
    volumeCubicFeet,
    volumeLiters,
    floorArea: Math.round(floorArea),
    wallArea: Math.round(wallArea),
    tilingArea: Math.round(floorArea + wallArea),
    copingArea: Math.round(perimeter),
    waterproofingArea: Math.round(floorArea + wallArea),
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
