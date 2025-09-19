import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "i.pinimg.com",
      "noonnucc-production.sfo2.cdn.digitaloceanspaces.com",
      "jqbxkbcwlxhzdhximrsb.supabase.co",
    ],
  },
  compiler: {
    styledComponents: true,
  },
};
module.exports = nextConfig;

export default nextConfig;
