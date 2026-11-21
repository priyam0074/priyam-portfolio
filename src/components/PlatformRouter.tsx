'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TENANTS } from '@/data/tenants'
import { usePauseOnInteraction } from '@/hooks/usePauseOnInteraction'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const CYCLE_EVERY_MS = 3000

export function PlatformRouter() {
  const reduced = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const [pinned, setPinned] = useState(false)
  const { paused, handlers: pauseHandlers } = usePauseOnInteraction()

  useEffect(() => {
    if (reduced || pinned || paused) return
    const id = setInterval(() => setCurrent((i) => (i + 1) % TENANTS.length), CYCLE_EVERY_MS)
    return () => clearInterval(id)
  }, [reduced, pinned, paused])

  const tenant = TENANTS[current]
  const steps = [
    ['Tenant', tenant.name],
    ['Theme', tenant.color],
    ['Routes', tenant.route],
    ['Flags', tenant.flags.join(', ')],
    ['Rendering', 'SSR + ISR'],
    ['Components', 'shared library'],
  ] as const

  return (
    <section className="band" id="platform" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHeader lead="One deploy." accent="Many products.">
          Each request is resolved by host. The shared core picks the brand&apos;s theme, routes and feature flags,
          and renders that brand&apos;s product from one codebase. Click a host to pin it.
        </SectionHeader>
        <Reveal className="router" delay={1} {...pauseHandlers}>
          <div className="rgrid">
            <div>
              <div className="lab">1. Request from a host</div>
              <div className="hosts">
                {TENANTS.map((t, i) => (
                  <button
                    key={t.host}
                    className="host"
                    type="button"
                    aria-pressed={i === current}
                    onClick={() => {
                      setPinned(true)
                      setCurrent(i)
                    }}
                  >
                    <i style={{ background: t.color }} />
                    {t.host}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="lab">2. Core resolves the tenant</div>
              <div className="core">
                <h4>Shared Next.js core</h4>
                <div>
                  {steps.map(([label, value]) => (
                    <div className="step" key={label}>
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
                <small>A new brand is a config entry, not a new repo.</small>
              </div>
            </div>
            <div>
              <div className="lab">3. Branded product renders</div>
              <div className="prev">
                <div className="pbar">
                  <i />
                  <i />
                  <i />
                  <span>https://{tenant.host}</span>
                </div>
                <div className="pshots">
                  {TENANTS.map((t, i) => (
                    <Image
                      key={t.host}
                      className={i === current ? 'on' : undefined}
                      src={t.image}
                      alt={`${t.name} rendered from the shared core`}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1060px) 50vw, 480px"
                      quality={85}
                    />
                  ))}
                </div>
                <div className="pfoot">
                  {tenant.flags.map((flag) => (
                    <span className="chip" key={flag}>
                      {flag}
                    </span>
                  ))}
                  <span className="chip">shared design system</span>
                </div>
              </div>
            </div>
          </div>
          <p className="note">Screens are the live products. Route and flag values are simplified for illustration.</p>
        </Reveal>
      </div>
    </section>
  )
}
