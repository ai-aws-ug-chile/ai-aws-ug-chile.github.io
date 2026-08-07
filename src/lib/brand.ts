/**
 * Looked up from disk rather than imported, so the site still builds when the
 * artwork is absent: drop `badge.*` into `src/assets/brand/` and it appears.
 * `<Logo />` is a separate always-present SVG reduction for header and favicon.
 */
const badgeModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/brand/badge.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,svg,SVG}',
  { eager: true },
);

const badgeLightModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/brand/badge-light.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,svg,SVG}',
  { eager: true },
);

export const getBadge = (): ImageMetadata | undefined =>
  Object.values(badgeModules)[0]?.default;

export const getBadgeLight = (): ImageMetadata | undefined =>
  Object.values(badgeLightModules)[0]?.default;
