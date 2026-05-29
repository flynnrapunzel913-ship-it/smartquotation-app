import type { NextConfig } from "next";

const chromiumBinIncludes = ["./node_modules/@sparticuz/chromium/bin/**"];

/** Shrink PDF serverless bundles — keep public/templates and templates/klean-tech for runtime assets. */
const pdfTraceExcludes = [
  "./generated-client/query_engine*.tmp*",
  "./generated-client/query_engine-windows.dll.node",
  "./README.md",
  "./FEATURES.md",
  "./ANSWER.txt",
  "./data/**",
  "./templates/*.doc",
  "./templates/*.pdf",
  "./lib/templates/*.pdf",
];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  outputFileTracingIncludes: {
    "/api/invoices/*/pdf": chromiumBinIncludes,
    "/api/quotations/*/pdf": chromiumBinIncludes,
  },
  outputFileTracingExcludes: {
    "/api/invoices/*/pdf": pdfTraceExcludes,
    "/api/quotations/*/pdf": pdfTraceExcludes,
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (Array.isArray(config.externals)) {
        config.externals.push("@sparticuz/chromium");
      } else if (typeof config.externals === "object") {
        config.externals["@sparticuz/chromium"] = "@sparticuz/chromium";
      } else {
        config.externals = ["@sparticuz/chromium"];
      }
    }
    return config;
  },
};

export default nextConfig;
