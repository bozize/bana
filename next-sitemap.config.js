module.exports = {
    siteUrl: 'https://www.serenigo.com', // Replace with your actual website URL
    generateRobotsTxt: true, // (Optional) Generate a robots.txt file
    changefreq: 'weekly', // How often the pages change
    priority: 0.7, // Default priority for the pages
    exclude: ['/admin', '/login'], // (Optional) Exclude any specific paths you don't want in the sitemap
    transform: async (config, path) => {
      return {
        loc: path, // The URL of the page
        changefreq: 'weekly', // Customize this based on your page content
        priority: 0.7, // Adjust based on the importance of the page
        lastmod: new Date().toISOString(), // Add last modified date
      };
    },
  }
  