import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import { Client } from "./client.jsx";

export async function Navbar({ locale }) {
  const payload = await getPayload({ config });

  let global;
  try {
    global = await payload.findGlobal({
      slug: "Navbar",
      locale: locale,
    });
  } catch (error) {
    // db not created yet
    return <></>;
  }

  const block = global;

  return <Client block={block} locale={locale} />;
}
