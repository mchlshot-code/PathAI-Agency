import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{
      source: "/",
      has: [{ type: "query", key: "concept", value: "(?<concept>kitchen-concept|path-kitchen|owan-kitchen|salon-concept|fashion-concept)" }],
      destination: "/contact?concept=:concept",
      permanent: false
    }];
  },
};

export default nextConfig;
