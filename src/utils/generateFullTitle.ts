/**
 * concatenate breadcrumbs labels from an array of objects
 * @param breadcrumbs
 */
export const generateFullTitle = (
  breadcrumbs: { label: string }[],
): string | undefined => {
  if (Array.isArray(breadcrumbs)) {
    return breadcrumbs.reduce((name, breadcrumb, i) => {
      if (i === 0) return `${breadcrumb.label}`;
      return `${name} > ${breadcrumb.label}`;
    }, "");
  }

  return undefined;
};
