import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.ibb.co", "images.unsplash.com", "api.multiavatar.com"],
  },

  outputFileTracingExcludes: {
    "*": ["./generated/client/**/*"],
  },
};

export default nextConfig;
