"use client";

import React, { useEffect, useState } from "react";
import { resolveProductImageSrc } from "@/lib/product-image";

type ProductImageThumbnailProps = {
  imagePath?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
};

const PLACEHOLDER_STYLE: React.CSSProperties = {
  fontSize: "10px",
  color: "#94a3b8",
  fontWeight: 500,
  textAlign: "center",
  lineHeight: 1.2,
  padding: "4px",
};

const CONTAINER_BASE: React.CSSProperties = {
  background: "#f8fafc",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  flexShrink: 0,
};

export default function ProductImageThumbnail({
  imagePath,
  alt = "",
  width = 60,
  height = 60,
  className,
  style,
}: ProductImageThumbnailProps) {
  const src = resolveProductImageSrc(imagePath);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [imagePath]);

  const containerStyle: React.CSSProperties = {
    ...CONTAINER_BASE,
    width,
    height,
    ...style,
  };

  if (!src || failed) {
    return (
      <div className={className} style={containerStyle} aria-hidden={!alt}>
        <span style={PLACEHOLDER_STYLE}>No Image</span>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}
