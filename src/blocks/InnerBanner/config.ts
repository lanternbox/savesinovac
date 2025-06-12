import { Block } from "payload";

export const InnerBanner: Block = {
  slug: "InnerBanner",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "heading",
      type: "text",
      localized: true,
    },
  ],
};
