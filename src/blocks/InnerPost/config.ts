import { Block } from "payload";

export const InnerPost: Block = {
  slug: "InnerPost",
  fields: [
    {
      name: "body",
      type: "richText",
      localized: true,
    },
  ],
};
