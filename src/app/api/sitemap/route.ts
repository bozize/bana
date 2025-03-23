import { NextResponse } from "next/server";
import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export async function GET(): Promise<NextResponse> {
  const baseUrl = "https://serenigo.com"; // Your actual domain
  const pagesDir = path.join(process.cwd(), "app");

  // Recursively get all pages
  function getPages(dir: string, basePath = ""): string[] {
    let pages: string[] = [];

    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      const isDirectory = fs.statSync(fullPath).isDirectory();

      if (isDirectory) {
        // Skip special folders (like _app, _document)
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
  const routes = getPages(pagesDir).map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const, // Ensure this is a valid type
    priority: 0.7,
  }));

  // Return sitemap as XML (you can adjust the response format as needed)
  return NextResponse.json(routes); // Or you could format it as XML here
}

