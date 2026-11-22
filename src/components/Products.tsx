'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { PRODUCTS } from '@/data/products'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { CSSVars } from '@/lib/cssVars'
import { reservedListHeight } from '@/lib/reservedHeight'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const AUTOPLAY_MS = 6000

export function Products() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [playbackVersion, setPlaybackVersion] = useState(0)
  const [listMinHeight, setListMinHeight] = useState<number | null>(null)
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef)
  const product = PRODUCTS[active]

  // Autoplay only runs while the section is on screen (and the visitor has not paused it), so it
  // stops resizing the page above content they are actually reading further down.
  const running = !paused && !reduced && inView

  // A real timer drives autoplay. CSS animation events can be skipped when a tab is backgrounded
  // or animations are suppressed, so the visual progress bar is only an indicator.
  useEffect(() => {
    if (!running) return

    const timeout = window.setTimeout(() => {
      setActive((i) => (i + 1) % PRODUCTS.length)
    }, AUTOPLAY_MS)

    return () => window.clearTimeout(timeout)
  }, [active, running, playbackVersion])

  // Each product's details are a different height, so the list used to grow and shrink on every
  // rotation and push everything below it up and down. Measure the tallest state and reserve it
  // (applied on narrow screens only, where the list sits above the rest of the page).
  useEffect(() => {
    const list = listRef.current
    if (!list) return

    let cancelled = false
    const measure = () => {
      if (cancelled) return
      const rows = Array.from(list.children).filter((row): row is HTMLElement => row instanceof HTMLElement)
      const panels = rows.map((row) => row.querySelector<HTMLElement>('.pmore'))
      const inners = rows.map((row) => row.querySelector<HTMLElement>('.pmore > div'))
      if (panels.some((panel) => !panel) || inners.some((inner) => !inner)) return

      const collapsed = rows.map((row, i) => row.offsetHeight - (panels[i]?.offsetHeight ?? 0))
      const details = inners.map((inner) => inner?.scrollHeight ?? 0)
      const gap = parseFloat(getComputedStyle(list).rowGap) || 0
      setListMinHeight(reservedListHeight(collapsed, details, gap))
    }

    const observer = new ResizeObserver(measure)
    observer.observe(list)
    list.querySelectorAll('.pmore > div').forEach((inner) => observer.observe(inner))
    // Web fonts change text wrapping after first paint.
    void document.fonts?.ready.then(measure)

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  const selectProduct = (index: number) => {
    setActive(index)
    setPlaybackVersion((version) => version + 1)
  }

  const isInsideLink = (target: EventTarget) => target instanceof Element && target.closest('a') !== null

  const handleClick = (index: number) => (event: MouseEvent) => {
    if (!isInsideLink(event.target)) selectProduct(index)
  }

  const bandStyle: CSSVars = { '--pbg': product.background }
  const showStyle: CSSVars = { '--dur': `${AUTOPLAY_MS / 1000}s` }
  const listStyle: CSSVars | undefined = listMinHeight === null ? undefined : { '--plist-min': `${listMinHeight}px` }

  return (
    <section ref={sectionRef} className="band prod-band" id="products" style={bandStyle}>
      <div className="wrap">
        <SectionHeader lead="Premium products" accent="I've shipped">
          Luxury credit cards, fine dining and wellness: four premium consumer brands, each with its own look and
          feel, all running on the one Next.js core I architected at Times Internet.
        </SectionHeader>
        <Reveal className={`show${running ? '' : ' paused'}`} delay={1} style={showStyle}>
          <div className="plist" ref={listRef} style={listStyle}>
            {PRODUCTS.map((p, i) => (
              // The whole row is clickable for mouse users; keyboard and assistive tech use the real
              // <button> header, and the "Visit" link sits outside it (no nested interactive content).
              <div
                key={p.key}
                className={`pitem${i === active ? ' on' : ''}`}
                onClick={handleClick(i)}
              >
                <span key={i === active ? `${p.key}-${playbackVersion}-${inView}` : p.key} className="prog" />
                <button
                  type="button"
                  className="phead"
                  aria-expanded={i === active}
                  aria-controls={`product-details-${p.key}`}
                >
                  <span className="pn">
                    {p.name}
                    <small>{p.kind.split(' · ')[0]}</small>
                  </span>
                </button>
                <div className="pmore" id={`product-details-${p.key}`} inert={i !== active}>
                  <div>
                    <p>{p.description}</p>
                    <div className="ptags">
                      {p.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <a className="visit" href={p.url}>
                      Visit live site ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="stage2">
            <div className="frame2">
              <div className="fbar2">
                <i />
                <i />
                <i />
                <span>https://{product.domain}</span>
                <button
                  type="button"
                  className="play-control"
                  disabled={reduced}
                  onClick={() => {
                    setPaused((value) => !value)
                    setPlaybackVersion((version) => version + 1)
                  }}
                >
                  {reduced ? 'Reduced motion' : paused ? 'Resume slideshow' : 'Pause slideshow'}
                </button>
              </div>
              <div className="screens">
                {PRODUCTS.map((p, i) => (
                  <Image
                    key={p.key}
                    className={i === active ? 'on' : undefined}
                    src={p.image}
                    alt={`${p.name} homepage, first screen`}
                    fill
                    sizes="(max-width: 860px) 100vw, 800px"
                    quality={85}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
            </div>
            <div className="cap">
              <i style={{ background: product.accent }} />
              <div>
                <b>{product.name}</b>
                <span>{product.kind}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
