// Plain string helper (no server-only imports), so Client Components can use it
export function serviceHref(slug: string): string {
  return `/services/${slug}`;
}
