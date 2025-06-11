import { Block } from 'payload';

export const HomeBlocksDs: Block = {
  slug: "HomeBlocksDs",
  fields: [
  {
    "name": "heading",
    "type": "text",
    "localized": true
  },
  {
    "name": "heading-2",
    "type": "text",
    "localized": true
  },
  {
    "name": "heading-3",
    "type": "text",
    "localized": true
  },
  {
    "name": "image",
    "type": "upload",
    "relationTo": "media"
  },
  {
    "name": "heading-4",
    "type": "text",
    "localized": true
  },
  {
    "name": "body",
    "type": "richText",
    "localized": true
  },
  {
    "name": "link",
    "type": "group",
    "fields": [
      {
        "name": "href",
        "type": "text",
        "localized": true
      },
      {
        "name": "text",
        "type": "text",
        "localized": true
      }
    ]
  },
  {
    "name": "image-2",
    "type": "upload",
    "relationTo": "media"
  },
  {
    "name": "image-3",
    "type": "upload",
    "relationTo": "media"
  },
  {
    "name": "heading-5",
    "type": "text",
    "localized": true
  },
  {
    "name": "link-2",
    "type": "group",
    "fields": [
      {
        "name": "href",
        "type": "text",
        "localized": true
      },
      {
        "name": "text",
        "type": "text",
        "localized": true
      }
    ]
  },
  {
    "name": "image-4",
    "type": "upload",
    "relationTo": "media"
  }
]
};
