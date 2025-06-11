
import type { CollectionConfig } from 'payload';
import afterChangePostToWebhook from "@/hooks/afterChangePostToWebhook";
import afterDeletePostToWebhook from "@/hooks/afterDeletePostToWebhook";

export const Resources: CollectionConfig = {
  slug: 'resources',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ["name","slug","order"],
  },
  defaultSort: 'order',
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
    name: "webflowId",
    type: "text",
    admin: {
      description: "The original Webflow ID for this item"
    }
  },
  {
    name: "name",
    type: "text",
    required: true,
    localized: true
  },
  {
    name: "slug",
    type: "text",
    required: true
  },
  {
    name: "order",
    type: "number"
  },
  {
    name: "date-of-item-s-release",
    type: "date"
  },
  {
    name: "type-of-item",
    type: "select",
    options: [
      {
        label: "Press Releases",
        value: "Press Releases"
      },
      {
        label: "Media Coverage",
        value: "Media Coverage"
      },
      {
        label: "Important Filings",
        value: "Important Filings"
      },
      {
        label: "Important Materials",
        value: "Important Materials"
      },
      {
        label: "Presentations",
        value: "Presentations"
      }
    ]
  },
  {
    name: "news-or-material-link",
    type: "text",
    localized: true
  },
  {
    name: "downloadable-material-file",
    type: "upload",
    relationTo: "media"
  },
  {
    name: "source-name",
    type: "text",
    localized: true
  }
],
};
