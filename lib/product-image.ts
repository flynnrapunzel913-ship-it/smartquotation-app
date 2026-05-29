/**
 * Resolves a product imagePath from the database into a browser-loadable src URL.
 * Handles public paths, uploads, data URLs, and klean-tech filename casing on Linux.
 */
export function resolveProductImageSrc(imagePath?: string | null): string | null {
  if (imagePath == null) return null;

  const trimmed = String(imagePath).trim();
  if (!trimmed) return null;

  if (
    trimmed.startsWith("data:") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  let normalized = trimmed.replace(/\\/g, "/");

  if (normalized.startsWith("public/")) {
    normalized = normalized.slice("public/".length);
  }

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  // Product images live under public/templates/klean-tech/products (case-sensitive on Vercel).
  const kleanTechMatch = normalized.match(/^\/templates\/klean-tech\/products\/([^/]+)$/i);
  if (kleanTechMatch) {
    normalized = `/templates/klean-tech/products/${kleanTechMatch[1].toLowerCase()}`;
  }

  return normalized;
}

export function hasProductImage(imagePath?: string | null): boolean {
  return resolveProductImageSrc(imagePath) !== null;
}
