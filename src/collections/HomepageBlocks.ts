
import type { CollectionConfig } from 'payload';
import afterChangePostToWebhook from "@/hooks/afterChangePostToWebhook";
import afterDeletePostToWebhook from "@/hooks/afterDeletePostToWebhook";

export const HomepageBlocks: CollectionConfig = {
  slug: 'homepage-blocks',
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
    name: "show-checkbox-or-red-x",
    type: "select",
    options: [
      {
        label: "Red X",
        value: "Red X"
      },
      {
        label: "Green Checkbox",
        value: "Green Checkbox"
      }
    ]
  },
  {
    name: "icon-logo",
    type: "upload",
    relationTo: "media"
  },
  {
    name: "invert-icon",
    type: "text",
    localized: true
  },
  {
    name: "block-copy",
    type: "richText",
    localized: true
  },
  {
    name: "link",
    type: "text",
    localized: true
  },
  {
    name: "background-color",
    type: "text",
    localized: true
  },
  {
    name: "text-color",
    type: "text",
    localized: true
  },
  {
    name: "border-color",
    type: "text",
    localized: true
  },
  {
    name: "background-image",
    type: "upload",
    relationTo: "media"
  }
],
};
