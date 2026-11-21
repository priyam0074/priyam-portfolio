import { REGION_CODES, REGION_LABELS, type RegionCode } from '../data/regions'

export type RegionCopy = {
  heroLine: string
  footerHeading: string
  footerLede: string
}

const ALIASES: Readonly<Record<string, RegionCode>> = { UK: 'GB' }

function isRegionCode(value: string): value is RegionCode {
  return (REGION_CODES as readonly string[]).includes(value)
}

/** Normalises a country code (header value, query param) to a supported region, or null. */
export function resolveRegion(value: string | null | undefined): RegionCode | null {
  const code = value?.trim().toUpperCase()
  if (!code) return null

  const resolved = ALIASES[code] ?? code
  return isRegionCode(resolved) ? resolved : null
}

export function regionLabel(region: RegionCode): string {
  return REGION_LABELS[region]
}

/** Page wording for a region. `null` (unknown country, crawlers) gets neutral wording with no country. */
export function getRegionCopy(region: RegionCode | null): RegionCopy {
  if (!region) {
    return {
      heroLine: 'open to new opportunities',
      footerHeading: 'Hiring for a senior frontend role?',
      footerLede: "I'm based in Gurugram, India. Email is the quickest way to reach me.",
    }
  }

  const label = regionLabel(region)
  return {
    heroLine: `open to roles in ${label}`,
    footerHeading: `Hiring for a senior frontend role in ${label}?`,
    footerLede: "I'm based in Gurugram, India, and ready to relocate. Email is the quickest way to reach me.",
  }
}
