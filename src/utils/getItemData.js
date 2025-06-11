import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";

export async function getItemData(collection, params) {
  const { slug, path, locale } = params;

  let setPath = path;
  if (path === "/") {
    setPath = "/home";
  }

  const payload = await getPayload({ config });

  const items = await payload.find({
    collection,
    where: {
      ...(slug && {
        slug: {
          equals: slug,
        },
      }),
      ...(setPath && {
        path: {
          equals: setPath,
        },
      }),
    },
    locale,
  });

  const item = items.docs[0];

  if (item?.slug !== "regulations") {
    // temporary
    notFound();
  }

  if (!item) {
    notFound();
  }

  return item;
}
