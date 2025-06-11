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
