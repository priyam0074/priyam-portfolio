import { notFound } from 'next/navigation'
import { Landing } from '@/components/Landing'
import { REGION_CODES } from '@/data/regions'
import { resolveRegion } from '@/lib/regionCopy'

// One statically prerendered page per supported country. `src/proxy.ts` rewrites `/` to the
// matching variant, so visitors never see this path in the address bar.
export const dynamicParams = false

export function generateStaticParams() {
  return REGION_CODES.map((region) => ({ region }))
}

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params
  const resolved = resolveRegion(region)
  if (!resolved) notFound()

  return <Landing region={resolved} />
}
