import type { CollectionConfig } from "payload";
import afterChangePostToWebhook from "@/hooks/afterChangePostToWebhook";
import afterDeletePostToWebhook from "@/hooks/afterDeletePostToWebhook";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Array of standard image widths
const imageWidths = [360, 480, 768, 1024, 1440, 1920] as const;

// Function to generate image sizes configuration
const getImageSizes = () =>
  imageWidths.map((width) => ({
    name: `webp${width}`,
    width,
    formatOptions: {
      format: "webp" as const,
    },
  }));

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    defaultColumns: ["filename", "url", "updatedAt"],
  },
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
      name: "alt",
      type: "text",
      // required: true,
      hidden: true,
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      hidden: true,
    },
  ],
  // upload: true,
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, "../../public/media"),
    imageSizes: getImageSizes(),
  },
};
