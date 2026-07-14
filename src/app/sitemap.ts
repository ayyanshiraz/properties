export default function sitemap() {
  const baseUrl = `https://www.Qemaat`;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/about`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/area-guides`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/area-guides/cavalry-ground-cantt`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/area-guides/ferozpur-road`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/area-guides/gulberg`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/area-guides/walton-road`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/blogs`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/buy`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/buy/commercial`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/buy/homes`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/co-working`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/contact`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/plot-finder`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/rent`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/services`,
      lastModified: new Date(),
    },
    {
      url: baseUrl + `/team`,
      lastModified: new Date(),
    },
  ];
}