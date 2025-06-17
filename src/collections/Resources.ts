import type { CollectionConfig } from "payload";
import afterChangePostToWebhook from "@/hooks/afterChangePostToWebhook";
import afterDeletePostToWebhook from "@/hooks/afterDeletePostToWebhook";

export const Resources: CollectionConfig = {
  slug: "resources",
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "source-name",
      "date-of-item-s-release",
      "updatedAt",
    ],
  },
  defaultSort: "-date-of-item-s-release",
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
      label: "Release Date",
      name: "date-of-item-s-release",
      type: "date",
    },
    {
      label: "Source",
      name: "source-name",
      type: "text",
      localized: true,
    },
    {
      label: "Link",
      name: "news-or-material-link",
      type: "text",
      localized: true,
    },
    {
      label: "Download",
      name: "downloadable-material-file",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "If set, will override link.",
      },
    },
  ],
};
