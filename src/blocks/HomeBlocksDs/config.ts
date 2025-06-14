import { Block } from "payload";

export const HomeBlocksDs: Block = {
  slug: "HomeBlocksDs",
  fields: [
    {
      name: "heading",
      type: "text",
      localized: true,
    },
    {
      name: "excerpt",
      type: "text",
      localized: true,
    },
    {
      name: "excerpt-2",
      type: "text",
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "excerpt-3",
      type: "text",
      localized: true,
    },
  ],
};
