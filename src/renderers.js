"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ImageSrcSet from "./components/ImageSrcSet";

export const LinkRenderer = ({
  href,
  className,
  children,
  forcerefresh,
  ...props
}) => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  let finalHref = href;

  // Check if the link should be localized
  const shouldLocalize =
    href && href.startsWith("/") && !(props.bypasslocalization === "true");

  if (shouldLocalize) {
    finalHref = locale ? `/${locale}${href}` : href;
  }

  const TagName = forcerefresh === "true" ? "a" : Link;

  return (
    <TagName
      href={finalHref || ""}
      className={className}
      {...(forcerefresh === "true" ? {} : { legacyBehavior: false })}
      {...props}
    >
      {children}
    </TagName>
  );
};

export const ImageRenderer = ({ className, image, ...props }) => {
  return <ImageSrcSet image={image} className={className} {...props} />;
};
