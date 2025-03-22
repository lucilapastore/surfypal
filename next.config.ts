import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
