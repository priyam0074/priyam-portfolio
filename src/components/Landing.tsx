import { AgentRep } from '@/components/AgentRep'
import { Contact } from '@/components/Contact'
import { Experience } from '@/components/Experience'
import { Figures } from '@/components/Figures'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { PlatformRouter } from '@/components/PlatformRouter'
import { Products } from '@/components/Products'
import { Work } from '@/components/Work'
import type { RegionCode } from '@/data/regions'
import { PROFILE } from '@/data/profile'
import { getRegionCopy } from '@/lib/regionCopy'

type LandingProps = {
  /** Visitor's country variant; null renders the neutral page (unknown country, crawlers). */
  region: RegionCode | null
}

export function Landing({ region }: LandingProps) {
  const copy = getRegionCopy(region)

  return (
    <>
      <Nav />
      <main>
        <Hero openToLine={copy.heroLine} />
        <Products />
        <Figures />
        <PlatformRouter />
        <Work />
        <AgentRep />
        <Experience />
      </main>
      <Contact heading={copy.footerHeading} lede={copy.footerLede} />
      <p className="copy">Designed and built by {PROFILE.name} · Next.js · TypeScript</p>
    </>
  )
}
