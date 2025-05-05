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
      {
        protocol: "https",
        hostname: "gratisography.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "arturhub-photos.s3.eu-central-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "arturhub-profile-images.s3.eu-central-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "arturhub-videos.s3.eu-central-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
