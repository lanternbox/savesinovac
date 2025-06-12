import { CollectionConfig } from "payload";
import populateFullTitle from "./hooks/populateFullTitle";
import populatePath from "./hooks/populatePath";
import afterChangePostToWebhook from "@/hooks/afterChangePostToWebhook";
import afterDeletePostToWebhook from "@/hooks/afterDeletePostToWebhook";
import { isAdmin } from "@/access/isAdmin";

// added block imports
import { HomeBlocksDs } from "@/blocks/HomeBlocksDs/config";
import { HomeHeader } from "@/blocks/HomeHeader/config";
import { HomeIntro } from "@/blocks/HomeIntro/config";
import { HomeResourcesDs } from "@/blocks/HomeResourcesDs/config";
import { InnerBanner } from "@/blocks/InnerBanner/config";
import { InnerPost } from "@/blocks/InnerPost/config";
// import { Navbar } from "@/blocks/Navbar/config";
// import { Footer } from "@/blocks/Footer/config";
// end added block imports

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    defaultColumns: ["fullTitle", "path", "order", "updatedAt"],
    // defaultColumns: ["name", "order", "breadcrumbs"],
    useAsTitle: "fullTitle",
    // useAsTitle: "name",
    // group: "Page-level",
    // hidden: ({ user }) => {
    //   return isNotEditor(user);
    // },
  },
  defaultSort: "order",
  access: {
    read: () => true,
    // create: isAdmin,
    create: () => true,
    update: () => true,
    // delete: isAdmin,
    delete: () => true,
  },
  hooks: {
    afterChange: [afterChangePostToWebhook],
    afterDelete: [afterDeletePostToWebhook],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "webflowId",
              type: "text",
              admin: { description: "The original Webflow ID for this item" },
              // hidden: true,
            },
            {
              name: "order",
              type: "number",
            },
            {
              name: "slug",
              type: "text",
              required: true,
            },
            {
              label: "Title",
              name: "name",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "redirectTo",
              type: "relationship",
              relationTo: ["pages"],
              admin: {
                description:
                  "If selected, Layout and SEO tabs will be ignored. ",
              },
            },
            {
              name: "path",
              type: "text",
              hooks: {
                beforeChange: [populatePath],
              },
              admin: {
                // readOnly: true,
                hidden: true,
              },
            },
            {
              name: "fullTitle",
              type: "text",
              localized: true,
              hooks: {
                beforeChange: [
                  // custom hook function to save the title using breadcrumbs field data
                  populateFullTitle,
                ],
              },
              admin: {
                // readOnly: true,
                hidden: true,
              },
            },
          ],
        },
        {
          label: "Layout",
          fields: [
            {
              name: "content",
              type: "blocks",
              blocks: [
                // added blocks
                HomeBlocksDs,
                HomeHeader,
                HomeIntro,
                HomeResourcesDs,
                InnerBanner,
                InnerPost,
                // Navbar
                // Footer,
                // end added blocks
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              fields: [
                {
                  name: "title",
                  type: "text",
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
