const baseUrl = import.meta.env.BASE_URL ?? "/";
const normalizedBase = baseUrl === "/" ? "" : baseUrl.replace(/\/+$/, "");
const externalPattern = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

export function withBase(path: string): string {
  if (!path || externalPattern.test(path) || path.startsWith("#")) {
    return path;
  }

  if (!path.startsWith("/")) {
    return path;
  }

  if (normalizedBase && path === normalizedBase) {
    return `${normalizedBase}/`;
  }

  if (normalizedBase && path.startsWith(`${normalizedBase}/`)) {
    return path;
  }

  return `${normalizedBase}${path}`;
}

export function withoutBase(path: string): string {
  if (!normalizedBase || !path.startsWith(normalizedBase)) {
    return path;
  }

  const stripped = path.slice(normalizedBase.length) || "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export function absoluteUrl(path: string, siteUrl: URL | string): string {
  return new URL(withBase(path), siteUrl).toString();
}

export const assetPath = withBase;
