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
  fields: [],
};
