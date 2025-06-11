import { Block } from "payload";

export const Footer: Block = {
  slug: "Footer",
  fields: [
    {
      name: "message",
      type: "text",
      localized: true,
      admin: {
        readOnly: true,
        description: "Edit this block in Globals.",
      },
    },
  ],
};
