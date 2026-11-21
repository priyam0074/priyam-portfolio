/** Countries that get their own "open to roles in …" wording. Keys are ISO 3166-1 alpha-2 codes. */
export const REGION_LABELS = {
  CH: 'Switzerland',
  IE: 'Ireland',
  GB: 'the UK',
  NL: 'the Netherlands',
  FR: 'France',
  DE: 'Germany',
  SG: 'Singapore',
  ID: 'Indonesia',
  VN: 'Vietnam',
  CA: 'Canada',
  US: 'the USA',
} as const

export type RegionCode = keyof typeof REGION_LABELS

export const REGION_CODES = Object.keys(REGION_LABELS) as RegionCode[]
