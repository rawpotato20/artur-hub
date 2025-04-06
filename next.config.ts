import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "st3.depositphotos.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
