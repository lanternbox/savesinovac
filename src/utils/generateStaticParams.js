import { getPayload } from "payload";
import config from "@payload-config";

export async function generateStaticParams(collection) {
  const payload = await getPayload({ config });

  let items;
  try {
    items = await payload.find({
      collection,
      limit: 1000,
    });
  } catch (error) {
    // db not created yet
    return [];
  }

  const locales = ["zh"];

  return locales.flatMap((locale) =>
    items.docs.map((item) => ({
      locale,
      slug: item.slug,
    })),
  );
}
