import { fetchStrapi } from "@/lib/api";
import { Industry, Career, BlogPost } from "@tathastu/types";

export default async function sitemap() {
  const baseUrl = "https://tathastu.global"; // Primary production domain

  const staticRoutes = [
    "",
    "/industries",
    "/studio",
    "/academy",
    "/about",
    "/contact",
    "/careers",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic slugs in parallel
  let industryRoutes: any[] = [];
  let careerRoutes: any[] = [];
  let blogRoutes: any[] = [];

  try {
    const [indRes, careersRes, postsRes] = await Promise.all([
      fetchStrapi<{ data: Industry[] }>("/industries"),
      fetchStrapi<{ data: Career[] }>("/careers?filters[isOpen][$eq]=true"),
      fetchStrapi<{ data: BlogPost[] }>("/blog-posts"),
    ]);

    if (indRes?.data) {
      industryRoutes = indRes.data.map((ind) => ({
        url: `${baseUrl}/industries/${ind.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
    }

    if (careersRes?.data) {
      careerRoutes = careersRes.data.map((job) => ({
        url: `${baseUrl}/careers/${job.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }));
    }

    if (postsRes?.data) {
      blogRoutes = postsRes.data.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedDate),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch (err) {
    console.error("Error generating dynamic sitemap routes:", err);
  }

  return [...staticRoutes, ...industryRoutes, ...careerRoutes, ...blogRoutes];
}
