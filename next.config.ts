import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.pinimg.com",
      'noonnucc-production.sfo2.cdn.digitaloceanspaces.com'
      // 필요하다면 다른 외부 이미지 도메인도 추가
    ],
  },
  compiler: {
    styledComponents: true,
  },
};
module.exports = nextConfig;


export default nextConfig;
