export function generateCommonMetadata(item, locale) {
  const strings = {
    zh: {
      siteTitle: "Save Sinovac",
    },
  };
  const defaultPageTitle = `${strings[locale]?.siteTitle} | ${item.name}`;
  const seoPageTitle = item.seo?.title;
  const seoDescription = item.seo?.description || null;

  return {
    title: seoPageTitle || defaultPageTitle,
    description: seoDescription,
  };
}
