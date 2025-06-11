import { Block } from 'payload';

export const Footer: Block = {
  slug: "Footer",
  fields: [
  {
    "name": "heading",
    "type": "text",
    "localized": true
  },
  {
    "name": "paragraph",
    "type": "text",
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
    "name": "paragraph-2",
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
    "name": "paragraph-3",
    "type": "text",
    "localized": true
  },
  {
    "name": "link-3",
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
    "name": "image",
    "type": "upload",
    "relationTo": "media"
  },
  {
    "name": "link-4",
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
    "name": "link-5",
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
    "name": "link-6",
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
    "name": "link-7",
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
    "name": "link-8",
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
  }
]
};
