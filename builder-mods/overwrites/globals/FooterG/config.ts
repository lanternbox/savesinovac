import { GlobalConfig } from "payload";
import afterChangePostToWebhookGlobal from "@/hooks/afterChangePostToWebhookGlobal";

export const FooterG: GlobalConfig = {
  slug: "FooterG",
  access: {
    read: () => true,
    update: () => true,
  },
  hooks: {
    afterChange: [afterChangePostToWebhookGlobal],
  },
  fields: [],
};
