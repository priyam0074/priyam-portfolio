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
import { paperForRegion } from '@/lib/cvFiles'
import { getRegionCopy } from '@/lib/regionCopy'

type LandingProps = {
  /** Visitor's country variant; null renders the neutral page (unknown country, crawlers). */
  region: RegionCode | null
}

export function Landing({ region }: LandingProps) {
  const copy = getRegionCopy(region)
  const paper = paperForRegion(region)

  return (
    <>
      <Nav paper={paper} />
      <main>
        <Hero openToLine={copy.heroLine} paper={paper} />
        <Products />
        <Figures />
        <PlatformRouter />
        <Work />
        <AgentRep />
        <Experience />
      </main>
      <Contact heading={copy.footerHeading} lede={copy.footerLede} paper={paper} />
      <p className="copy">Designed and built by {PROFILE.name} · Next.js · TypeScript</p>
    </>
  )
}
