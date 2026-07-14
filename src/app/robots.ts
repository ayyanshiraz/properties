export default function robots() {
  return {
    rules: {
      userAgent: `*`,
      allow: `/`,
    },
    sitemap: `https://www.qemaat.com/sitemap.xml`,
  };
}