// storage-adapter-import-placeholder
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

// import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import {
  FixedToolbarFeature,
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  HeadingFeature,
  IndentFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  UnorderedListFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
import sharp from "sharp"; // editor-import
import { UnderlineFeature } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import Users from "./collections/Users";
import { Pages } from "./collections/Pages";

import { Media } from "./collections/Media";

// added collection imports
// end added collection imports

// added global imports
// end added global imports

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  localization: {
    defaultLocale: "zh",
    locales: ["zh"],
  },
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    // features: () => {
    //   return [UnderlineFeature(), BoldFeature(), ItalicFeature()];
    // },
  }),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "",
      authToken: process.env.DATABASE_TOKEN || "",
    },
  }),
  collections: [
    Pages,
    // added collections
// end added collections
    Media,
    Users,
  ],
  globals: [
    // added globals
// end added globals
  ],
  // cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  // csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  plugins: [
    nestedDocsPlugin({
      collections: ["pages"],
      generateLabel: (_, doc) => doc.name as string,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),

    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              [Media.slug]: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
    // formBuilderPlugin({
    // fields: {
    //   payment: false,
    // },
    // formOverrides: {
    //   fields: ({ defaultFields }) => {
    //     return defaultFields.map((field) => {
    //       if ("name" in field && field.name === "confirmationMessage") {
    //         return {
    //           ...field,
    //           editor: lexicalEditor({
    //             features: ({ rootFeatures }) => {
    //               return [
    //                 ...rootFeatures,
    //                 FixedToolbarFeature(),
    //                 HeadingFeature({
    //                   enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
    //                 }),
    //               ];
    //             },
    //           }),
    //         };
    //       }
    //       return field;
    //     });
    //   },
    // },
    // }),
  ],
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  email: nodemailerAdapter({
    defaultFromName: "River Delta",
    defaultFromAddress: process.env.SMTP_FROM_EMAIL || "admin@lantern.digital",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  }),
});
