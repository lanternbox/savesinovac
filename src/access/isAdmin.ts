import type { Access } from "payload";

export const isAdmin: Access = ({ req: { user } }) => {
  // Return true if user exists and has role of admin
  return Boolean(user?.role === "admin");
};
