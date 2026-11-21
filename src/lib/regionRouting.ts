import type { RegionCode } from '../data/regions'
import { resolveRegion } from './regionCopy'

// Search engines and link-preview fetchers crawl from a handful of countries (mostly the US).
// They get the neutral page so the wrong country is never indexed or shown in a preview.
const CRAWLER_PATTERN = /bot|crawler|spider|slurp|facebookexternalhit|embedly|whatsapp|telegram|discord|pinterest|preview/i

export function isCrawler(userAgent: string | null | undefined): boolean {
  return Boolean(userAgent) && CRAWLER_PATTERN.test(userAgent as string)
}

export type RegionRequest = {
  /** Explicit `?country=` override (shared links, testing). Always wins when valid. */
  override?: string | null
  /** Visitor country from the hosting platform (`x-vercel-ip-country`). */
  header?: string | null
  userAgent?: string | null
}

/** Which region variant of the page a request should see, or null for the neutral page. */
export function pickRegion({ override, header, userAgent }: RegionRequest): RegionCode | null {
  const forced = resolveRegion(override)
  if (forced) return forced

  if (isCrawler(userAgent)) return null
  return resolveRegion(header)
}
