import { MetadataRoute } from "next";
import { allArticles } from "@/data/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yourmoomu.com/";

  const articleUrls = allArticles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  const staticUrls = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/article`, lastModified: new Date() },
    { url: `${baseUrl}/feed`, lastModified: new Date() },
  ];

  return [...staticUrls, ...articleUrls];
}
