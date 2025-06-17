import type { CollectionConfig } from "payload";
import afterChangePostToWebhook from "@/hooks/afterChangePostToWebhook";
import afterDeletePostToWebhook from "@/hooks/afterDeletePostToWebhook";

export const HomepageBlocks: CollectionConfig = {
  slug: "homepage-blocks",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "show-checkbox-or-red-x", "order", "updatedAt"],
  },
  defaultSort: "order",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [afterChangePostToWebhook],
    afterDelete: [afterDeletePostToWebhook],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "order",
      type: "number",
    },
    {
      label: "Category",
      name: "show-checkbox-or-red-x",
      type: "select",
      options: [
        {
          label: "Red X",
          value: "Red X",
        },
        {
          label: "Green Checkbox",
          value: "Green Checkbox",
        },
      ],
    },
    {
      name: "block-copy",
      type: "richText",
      localized: true,
    },
  ],
};
