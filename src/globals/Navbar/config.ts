import { GlobalConfig } from "payload";
import afterChangePostToWebhookGlobal from "@/hooks/afterChangePostToWebhookGlobal";

export const Navbar: GlobalConfig = {
  slug: "Navbar",
  access: {
    read: () => true,
    update: () => true,
  },
  hooks: {
    afterChange: [afterChangePostToWebhookGlobal],
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
  ],
};
