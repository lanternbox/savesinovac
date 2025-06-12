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

  const imageAcceptResult = await payload.find({
    collection: "media",
    where: {
      filename: {
        equals: "68492060de718a00c917ab30.png",
      },
    },
    locale: locale,
  });
  const imageAccept = imageAcceptResult.docs[0];

  const imageRedXResult = await payload.find({
    collection: "media",
    where: {
      filename: {
        equals: "68492060de718a00c917abba.png",
      },
    },
    locale: locale,
  });
  const imageRedX = imageRedXResult.docs[0];

  return (
    <Client
      block={block}
      items={items}
      locale={locale}
      imageAccept={imageAccept}
      imageRedX={imageRedX}
    />
  );
}
