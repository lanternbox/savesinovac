/**
 * concatenate breadcrumbs labels from an array of objects
 * @param breadcrumbs
 */
export const generatePath = (
  breadcrumbs: { url: string }[],
): string | undefined => {
  if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
    return breadcrumbs.at(-1)?.url;
  }

  return undefined;
};
