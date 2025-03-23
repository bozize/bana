/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://serenigo.com", // Replace with your actual domain
    generateRobotsTxt: true, // Generates robots.txt file
    sitemapSize: 5000, // Limit for sitemap splitting
    exclude: ["/admin", "/dashboard"], // Exclude private routes if needed
    changefreq: "weekly", // Default change frequency
    priority: 0.7, // Default priority
  };
  