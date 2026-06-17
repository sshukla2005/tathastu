import type { NextConfig } from "next";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const strapiHostname = new URL(STRAPI_URL).hostname;

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      {
        protocol: "http",
        hostname: strapiHostname,
        port: new URL(STRAPI_URL).port || "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: strapiHostname,
        pathname: "/uploads/**",
      },
    ],
  },

  // Allow fetching from Strapi during build / ISR
  experimental: {
    // staleTimes for partial prerendering (Next 15)
  },
};

export default nextConfig;
