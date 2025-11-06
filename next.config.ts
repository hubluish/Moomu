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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;

export default nextConfig;
