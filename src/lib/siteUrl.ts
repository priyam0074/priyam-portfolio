/**
 * A stable production origin for canonical links, the sitemap and social previews.
 * NEXT_PUBLIC_SITE_URL can be set to a custom domain when one is added.
 * Vercel supplies VERCEL_PROJECT_PRODUCTION_URL automatically on deployments.
 */
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'priyam-portfolio.vercel.app'

export const SITE_URL = new URL(
  /^https?:\/\//i.test(configuredSiteUrl) ? configuredSiteUrl : `https://${configuredSiteUrl}`,
)
