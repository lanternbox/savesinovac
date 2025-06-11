// for create / read / update / delete
export const isAdmin = ({
  req: { user },
}: {
  req: { user: { role: string } };
}) => user && ["admin"].includes(user.role);
export const isEditor = ({
  req: { user },
}: {
  req: { user: { role: string } };
}) => user && ["admin", "editor"].includes(user.role);

// for hidden
export const isNotAdmin = (user: { role: string }) =>
  !["admin"].includes(user.role);
export const isNotEditor = (user: { role: string }) =>
  !["admin", "editor"].includes(user.role);
