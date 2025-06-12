import { GlobalConfig } from "payload";
import afterChangePostToWebhookGlobal from "@/hooks/afterChangePostToWebhookGlobal";

export const Footer: GlobalConfig = {
  slug: "Footer",
  access: {
    read: () => true,
    update: () => true,
  },
  hooks: {
    afterChange: [afterChangePostToWebhookGlobal],
  },
  fields: [
    {
      name: "heading",
      type: "text",
      localized: true,
    },
    {
      name: "subheading",
      type: "text",
      localized: true,
    },
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "email",
      type: "text",
      localized: true,
    },
    {
      name: "subheading-2",
      type: "text",
      localized: true,
    },
    {
      name: "excerpt",
      type: "text",
      localized: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "links",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
        },
        {
          name: "href",
          type: "text",
        },
      ],
    },
  ],
};
