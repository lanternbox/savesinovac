import React from "react";

const ImageSrcSet = ({ className = "", image, alt = "" }) => {
  if (!image) return null;

  // Get the original image URL as fallback
  let prefix = `/media`;
  if (process.env.NEXT_PUBLIC_BLOB_URL) {
    prefix = process.env.NEXT_PUBLIC_BLOB_URL;
  }
  if (image.filename?.endsWith(".svg")) {
    prefix = "/media";
  }
  const src = `${prefix}/${image.filename}`;

  // Don't generate srcSet for SVG images
  const srcSet = image.filename?.endsWith(".svg")
    ? null
    : image.sizes
      ? Object.entries(image.sizes)
          .map(([_key, size]) => `${prefix}/${size.filename} ${size.width}w`)
          .join(", ")
      : "";

  // Default sizes attribute
  const sizes = "100vw";

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      //   alt={image.alt || ""}
      alt=""
      className={className}
      loading="lazy"
    />
  );
};

export default ImageSrcSet;
