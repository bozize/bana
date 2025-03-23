import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://serenigo.com"; // Fix extra ".com"
  const pagesDir = path.join(process.cwd(), "app"); // Path to Next.js app directory

  function getPages(dir: string, basePath = ""): string[] {
    let pages: string[] = [];

    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      const isDirectory = fs.statSync(fullPath).isDirectory();

      if (isDirectory) {
        // Skip special Next.js folders like `(components)`, `(layouts)`, etc.
        if (!file.startsWith("(") && !file.startsWith("_")) {
          pages = [...pages, ...getPages(fullPath, `${basePath}/${file}`)];
        }
      } else if (file === "page.tsx" || file === "page.js") {
        pages.push(`${basePath}`); // Add route
      }
    });

    return pages;
  }

  // Get all pages dynamically
  const routes: MetadataRoute.Sitemap = getPages(pagesDir).map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const, // ✅ Fix: Use `as const`
    priority: 0.7,
  }));

  return routes;
}

