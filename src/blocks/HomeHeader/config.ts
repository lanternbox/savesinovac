import { Block } from 'payload';

export const HomeHeader: Block = {
  slug: "HomeHeader",
  fields: [
  {
    "name": "heading",
    "type": "text",
    "localized": true
  },
  {
    "name": "image",
    "type": "upload",
    "relationTo": "media"
  },
  {
    "name": "paragraph",
    "type": "text",
    "localized": true
  }
]
};
