/** Vite base (`/` locally, `/repo/` on a GitHub Pages project site). Always starts with `/`. */
export function siteBase(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, '') || '';
}

/** Path without the Pages prefix, so `/repo/en` is read as `/en`. */
export function appPath(pathname: string): string {
  const base = siteBase();
  let path = pathname.replace(/\/+$/, '') || '/';
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || '/';
  }
  return path;
}

export function localeHref(locale: string): string {
  return `${siteBase()}/${locale}`;
}

export function publicUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
