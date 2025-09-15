import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.pinimg.com",
      "noonnucc-production.sfo2.cdn.digitaloceanspaces.com",
      "images.pexels.com",
    ],
  },
  compiler: {
    styledComponents: true,
  },
};
module.exports = nextConfig;

export default nextConfig;
