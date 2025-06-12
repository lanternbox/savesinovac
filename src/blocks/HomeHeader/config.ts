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
    //
    {
      name: "link",
      type: "group",
      fields: [
        {
          name: "text",
          type: "text",
          localized: true,
        },
        {
          name: "file",
          type: "upload",
          relationTo: "media",
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
