/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://theleadng.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
  }
  export default config;