import { GlobalConfig } from "payload";
import afterChangePostToWebhookGlobal from "@/hooks/afterChangePostToWebhookGlobal";

export const NavbarSpacerG: GlobalConfig = {
  slug: "NavbarSpacerG",
  access: {
    read: () => true,
    update: () => true,
  },
  hooks: {
    afterChange: [afterChangePostToWebhookGlobal],
  },
  fields: [],
};
