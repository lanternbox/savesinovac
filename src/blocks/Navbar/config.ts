import { Block } from 'payload';

export const Navbar: Block = {
  slug: "Navbar",
  fields: [
  {
    "name": "image",
    "type": "upload",
    "relationTo": "media"
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
    "name": "navbarLink",
    "type": "text",
    "localized": true
  },
  {
    "name": "navbarLink-2",
    "type": "text",
    "localized": true
  },
  {
    "name": "navbarLink-3",
    "type": "text",
    "localized": true
  },
  {
    "name": "navbarLink-4",
    "type": "text",
    "localized": true
  },
  {
    "name": "navbarLink-5",
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
    "name": "image-2",
    "type": "upload",
    "relationTo": "media"
  }
]
};
