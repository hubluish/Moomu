import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "i.pinimg.com",
      "noonnucc-production.sfo2.cdn.digitaloceanspaces.com",
    ],
  },
  compiler: {
    styledComponents: true,
  },
};
module.exports = nextConfig;


export default nextConfig;
