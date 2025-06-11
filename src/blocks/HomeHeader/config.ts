import { Block } from "payload";

export const HomeHeader: Block = {
  slug: "HomeHeader",
  fields: [
    {
      name: "heading",
      type: "text",
      localized: true,
    },
    {
      name: "divider",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "links",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
          localized: true,
        },
        {
          name: "href",
          type: "text",
          localized: true,
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
