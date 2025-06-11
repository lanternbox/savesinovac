import { Config } from "payload";
import {
  BoldFeature,
  ItalicFeature,
  UploadFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  BlockquoteFeature,
  UnorderedListFeature,
  OrderedListFeature,
  HeadingFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
} from "@payloadcms/richtext-lexical";

export const defaultLexical: Config["editor"] = lexicalEditor({
  // features: ({ defaultFeatures, rootFeatures }) => {
  //   return [
  //     FixedToolbarFeature(),
  //     HeadingFeature({
  //       enabledHeadingSizes: ["h3", "h4", "h5", "h6"],
  //     }),
  //     ParagraphFeature(),
  //     BlockquoteFeature(),
  //     UnorderedListFeature(),
  //     OrderedListFeature(),
  //     BoldFeature(),
  //     ItalicFeature(),
  //     LinkFeature({
  //       // enabledCollections: ["pages"],
  //       fields: ({ defaultFields }) => {
  //         // const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
  //         //   if ("name" in field && field.name === "url") return false;
  //         //   return true;
  //         // });
  //         return [
  //           // ...defaultFieldsWithoutUrl,
  //           ...defaultFields,
  //           // {
  //           //   name: "url",
  //           //   type: "text",
  //           //   admin: {
  //           //     condition: ({ linkType }) => linkType !== "internal",
  //           //   },
  //           //   label: ({ t }) => t("fields:enterURL"),
  //           //   required: true,
  //           // },
  //         ];
  //       },
  //     }),
  //     UploadFeature(),
  //   ];
  // },
});
