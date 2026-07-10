export default function robots() {
  return {
    rules: {
      userAgent: `*`,
      allow: `/`,
    },
    sitemap: `https://www.qeemat.com/sitemap.xml`,
  };
}