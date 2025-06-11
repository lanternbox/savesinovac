import { Block } from "payload";

export const Navbar: Block = {
  slug: "Navbar",
  fields: [
    {
      name: "message",
      type: "text",
      localized: true,
      admin: {
        readOnly: true,
        description: "Edit this block in Globals.",
      },
    },
  ],
};
