'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { TENANTS } from '@/data/tenants'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const CYCLE_EVERY_MS = 3000

// Every value each row can show. All of them are rendered stacked in one cell (only the current
// one visible), so the row is always as tall as its longest value and the diagram never changes
// size when the tenant rotates (it used to nudge the page up and down on phones).
const STEPS = [
  { label: 'Tenant', values: TENANTS.map((t) => t.name) },
  { label: 'Theme', values: TENANTS.map((t) => t.color) },
  { label: 'Routes', values: TENANTS.map((t) => t.route) },
  { label: 'Flags', values: TENANTS.map((t) => t.flags.join(', ')) },
  { label: 'Rendering', values: ['SSR + ISR'] },
  { label: 'Components', values: ['shared library'] },
] as const

const REDUCED_STATUS = 'Reduced motion: select a brand to preview'
const STATUS_OPTIONS = ['Brands rotate automatically', 'Rotation paused', ...TENANTS.map((t) => `Showing ${t.name}`)]
const STATUS_PINNED_OFFSET = 2
const LABEL_OPTIONS = ['Pause rotation', 'Resume rotation']

/**
 * Renders every option stacked in one grid cell with only `shown` visible, so the element is always
 * as wide and tall as its longest option. Swapping the text never re-wraps the row around it (the
 * header used to jump between one and two lines depending on the brand name).
 */
function Stacked({ options, shown }: { options: readonly string[]; shown: number }) {
  return (
    <span className="stack">
      {options.map((option, index) => (
        <span
          key={`${index}-${option}`}
          className={index === shown ? undefined : 'off'}
          aria-hidden={index === shown ? undefined : true}
        >
          {option}
        </span>
      ))}
    </span>
  )
}

export function PlatformRouter() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)
  const [current, setCurrent] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [playing, setPlaying] = useState(true)
  // Only rotate while the section is on screen.
  const autoRotating = !reduced && !pinned && playing && inView

  useEffect(() => {
    if (!autoRotating) return
    const id = window.setInterval(() => setCurrent((i) => (i + 1) % TENANTS.length), CYCLE_EVERY_MS)
    return () => window.clearInterval(id)
  }, [autoRotating])

  const tenant = TENANTS[current]

  const statusOptions = reduced ? [REDUCED_STATUS] : STATUS_OPTIONS
  const statusShown = reduced ? 0 : pinned ? STATUS_PINNED_OFFSET + current : playing ? 0 : 1
  const labelOptions = reduced ? ['Reduced motion'] : LABEL_OPTIONS
  const labelShown = reduced ? 0 : pinned || !playing ? 1 : 0

  return (
    <section ref={sectionRef} className="band" id="platform" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHeader lead="One deploy." accent="Many products.">
          Each request is resolved by host. The shared core picks the brand&apos;s theme, routes and feature flags,
          and renders that brand&apos;s product from one codebase. Click a host to pin it.
        </SectionHeader>
        <Reveal className="router" delay={1}>
          <div className="router-head">
            <span className="router-status">
              <Stacked options={statusOptions} shown={statusShown} />
            </span>
            <button
              type="button"
              className="play-control"
              disabled={reduced}
              onClick={() => {
                if (pinned) {
                  setPinned(false)
                  setPlaying(true)
                } else {
                  setPlaying((value) => !value)
                }
              }}
            >
              <Stacked options={labelOptions} shown={labelShown} />
            </button>
          </div>
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
                  {STEPS.map(({ label, values }) => {
                    const shown = values.length === 1 ? 0 : current
                    return (
                      <div className="step" key={label}>
                        <span>{label}</span>
                        <Stacked options={values} shown={shown} />
                      </div>
                    )
                  })}
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
                  {/* Every brand's chips share one cell so the footer keeps the height of the brand
                      with the most chips; otherwise it re-wraps on narrow phones and moves the page. */}
                  <div className="pchips">
                    {TENANTS.map((t, i) => (
                      <div
                        key={t.host}
                        className={i === current ? undefined : 'off'}
                        aria-hidden={i === current ? undefined : true}
                      >
                        {t.flags.map((flag) => (
                          <span className="chip" key={flag}>
                            {flag}
                          </span>
                        ))}
                        <span className="chip">shared design system</span>
                      </div>
                    ))}
                  </div>
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
