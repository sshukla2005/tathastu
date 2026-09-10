import type { NextConfig } from "next";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const strapiHostname = new URL(STRAPI_URL).hostname;

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    dangerouslyAllowSVG: true,
    // Strapi runs on localhost in local dev, which Next.js's image optimizer
    // otherwise refuses to fetch from (SSRF protection blocks any host that
    // resolves to a private/loopback IP). remotePatterns below already
    // restricts fetches to just the configured Strapi host's /uploads/**
    // path, so this is safe to enable.
    dangerouslyAllowLocalIP: true,
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
