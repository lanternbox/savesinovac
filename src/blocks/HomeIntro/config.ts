import { Block } from "payload";

export const HomeIntro: Block = {
  slug: "HomeIntro",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "body",
      type: "richText",
      localized: true,
    },
    {
      name: "body-2",
      type: "richText",
      localized: true,
    },
  ],
};
