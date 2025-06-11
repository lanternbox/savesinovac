import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { Client } from "./client.jsx";

export async function HomeBlocksDs({ block, locale }) {
  const payload = await getPayload({ config });

  let items = await payload.find({
    collection: "homepage-blocks",
    sort: "order",
    limit: 100,
    locale: locale,
  });

  return <Client block={block} items={items} locale={locale} />;
}
