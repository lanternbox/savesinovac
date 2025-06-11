import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { isAdmin } from "@/access/isAdmin";

const Users: CollectionConfig = {
  slug: "users",
  access: {
    // admin: authenticated,
    create: isAdmin,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ["name", "email", "role", "updatedAt"],
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      required: true,
      defaultValue: "editor",
    },
  ],
  timestamps: true,
};

export default Users;
