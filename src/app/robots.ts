import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://yourmoomu.com/";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/mypage/",
        "/settings/",
        "/generate/",
        "/result/",
        "/survey/",
        "/admin/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
