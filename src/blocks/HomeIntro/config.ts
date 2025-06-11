import { Block } from "payload";

export const HomeIntro: Block = {
  slug: "HomeIntro",
  fields: [
    {
      name: "paragraph",
      type: "text",
      localized: true,
    },
    {
      name: "paragraph-2",
      type: "text",
      localized: true,
    },
  ],
};
