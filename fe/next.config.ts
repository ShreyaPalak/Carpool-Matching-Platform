import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "imgd.aeplcdn.com" },
      { protocol: "https", hostname: "www.financialexpress.com" },
      { protocol: "https", hostname: "europeanlifemedia.com" },
      { protocol: "https", hostname: "hips.hearstapps.com" },
      { protocol: "https", hostname: "di-uploads-pod9.dealerinspire.com" },
    ],
  },
};

export default nextConfig;
