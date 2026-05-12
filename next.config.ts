import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
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
