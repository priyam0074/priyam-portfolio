export type Figure = {
  value: number
  prefix: string
  suffix: string
  label: string
}

export const FIGURES: readonly Figure[] = [
  { value: 10, prefix: '', suffix: '+ yrs', label: 'production React, Next.js & TypeScript' },
  { value: 0, prefix: '', suffix: ' forks', label: 'per new tenant brand' },
  { value: 35, prefix: '+', suffix: '%', label: 'organic SEO after SSR migration' },
  { value: 30, prefix: '~', suffix: '%', label: 'fewer frontend errors with APM + RUM' },
  { value: 18, prefix: '+', suffix: '%', label: 'feature conversion from funnel work' },
  { value: 15, prefix: '<', suffix: ' min', label: 'issue detection, down from hours' },
]
