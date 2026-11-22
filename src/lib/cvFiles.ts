import type { RegionCode } from '../data/regions'

export type PaperSize = 'A4' | 'Letter'

/** Regions that print on US Letter. Every other region, and the neutral page, gets A4. */
const LETTER_REGIONS: readonly RegionCode[] = ['US', 'CA']

const CV_BASE_NAME = 'Priyam_Vashishtha_CV'

const CV_FORMATS = [
  { label: 'PDF', ext: 'pdf' },
  { label: 'DOC', ext: 'docx' },
] as const

export type CvDownload = {
  label: (typeof CV_FORMATS)[number]['label']
  /** Paper-specific file served from `public/`. */
  url: string
  /** Name the visitor's browser saves it as: the same for A4 and Letter. */
  fileName: string
}

export function paperForRegion(region: RegionCode | null): PaperSize {
  return region && LETTER_REGIONS.includes(region) ? 'Letter' : 'A4'
}

export function cvDownloads(paper: PaperSize): CvDownload[] {
  return CV_FORMATS.map(({ label, ext }) => ({
    label,
    url: `/${CV_BASE_NAME}_${paper}.${ext}`,
    fileName: `${CV_BASE_NAME}.${ext}`,
  }))
}
