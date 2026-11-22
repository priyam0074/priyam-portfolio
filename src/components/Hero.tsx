import Image from 'next/image'
import { PROFILE } from '@/data/profile'
import type { PaperSize } from '@/lib/cvFiles'
import { DownloadCv } from './DownloadCv'
import { HeroArt } from './HeroArt'
import { Marquee } from './Marquee'
import { Reveal } from './Reveal'
import { RotatingWord } from './RotatingWord'

const BLOBS = [
  { width: 520, height: 520, background: '#9fb0ff', left: -160, top: -120 },
  { width: 420, height: 420, background: '#ffb4a8', right: -120, top: 40 },
  { width: 360, height: 360, background: '#ffe08a', left: '30%', bottom: -160 },
] as const

type HeroProps = {
  /** e.g. "open to roles in Switzerland" or "open to new opportunities" */
  openToLine: string
  paper: PaperSize
}

export function Hero({ openToLine, paper }: HeroProps) {
  return (
    <section className="band hero" id="top">
      {BLOBS.map((blob) => (
        <div key={blob.background} className="blob" style={blob} />
      ))}
      <div className="wrap">
        <div>
          <Reveal className="me">
            <div className="ava">
              <Image src={PROFILE.avatar} alt={PROFILE.name} width={176} height={176} priority />
              <i title="Open to work" />
            </div>
            <div>
              <b>Hi, I&apos;m {PROFILE.name}</b>
              <span>
                {PROFILE.role} · <em>{openToLine}</em>
              </span>
            </div>
          </Reveal>
          <Reveal as="h1" delay={1}>
            I build the platform behind <RotatingWord />
          </Reveal>
          <Reveal as="p" className="lede mute" delay={2}>
            Lead Frontend Engineer with 10+ years of React, Next.js and TypeScript. One shared core, many branded
            products, zero forked codebases, plus the design system and observability they run on.
          </Reveal>
          <Reveal className="cta" delay={3}>
            <DownloadCv paper={paper} className="btn pri" />
            <a className="btn" href="#products">
              See products I built
            </a>
            <a className="btn" href={PROFILE.linkedinUrl}>
              LinkedIn
            </a>
          </Reveal>
        </div>
        <Reveal className="stage" delay={2}>
          <div className="bg" />
          <HeroArt />
          <div className="glass g1 bob">
            <i style={{ background: 'var(--coral)' }}>0</i>
            <div>
              <b>0 forks</b>
              <span>per new brand</span>
            </div>
          </div>
          <div className="glass g2 bob b2">
            <i style={{ background: 'var(--mint)' }}>↑</i>
            <div>
              <b>+35%</b>
              <span>organic SEO</span>
            </div>
          </div>
          <div className="glass g3 bob b3">
            <i style={{ background: 'var(--cob)' }}>⚡</i>
            <div>
              <b>&lt;15 min</b>
              <span>issue detection</span>
            </div>
          </div>
        </Reveal>
      </div>
      <Marquee />
    </section>
  )
}
