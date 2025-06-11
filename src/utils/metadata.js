export function generateCommonMetadata(item, locale) {
  const strings = {
    zh: {
      siteTitle: "劳氏船级社",
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
