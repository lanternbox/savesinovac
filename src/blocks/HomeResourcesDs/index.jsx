import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { Client } from "./client.jsx";

export async function HomeResourcesDs({ block, locale }) {
  const payload = await getPayload({ config });

  let items = await payload.find({
    collection: "resources",
    sort: "-date-of-item-s-release",
    limit: 100,
    locale: locale,
  });

  const iconResult = await payload.find({
    collection: "media",
    where: {
      filename: {
        equals: "68492060de718a00c917ab86.png",
      },
    },
    locale: locale,
  });
  const icon = iconResult.docs[0];

  return <Client block={block} items={items} locale={locale} icon={icon} />;
}
