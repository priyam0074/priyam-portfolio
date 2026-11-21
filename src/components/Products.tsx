'use client'

import Image from 'next/image'
import { useState, type MouseEvent } from 'react'
import { PRODUCTS } from '@/data/products'
import { usePauseOnInteraction } from '@/hooks/usePauseOnInteraction'
import type { CSSVars } from '@/lib/cssVars'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const AUTOPLAY_MS = 6000

export function Products() {
  const [active, setActive] = useState(0)
  const { paused, handlers: pauseHandlers } = usePauseOnInteraction()
  const product = PRODUCTS[active]

  // Advance when the active item's progress bar finishes. Pausing the bar (hover or keyboard focus)
  // pauses autoplay, and reduced motion (animation disabled) disables autoplay, with no separate
  // timer to keep in sync.
  const advance = () => setActive((i) => (i + 1) % PRODUCTS.length)

  const isInsideLink = (target: EventTarget) => target instanceof Element && target.closest('a') !== null

  const handleClick = (index: number) => (event: MouseEvent) => {
    if (!isInsideLink(event.target)) setActive(index)
  }

  const bandStyle: CSSVars = { '--pbg': product.background }
  const showStyle: CSSVars = { '--dur': `${AUTOPLAY_MS / 1000}s` }

  return (
    <section className="band prod-band" id="products" style={bandStyle}>
      <div className="wrap">
        <SectionHeader lead="Premium products" accent="I've shipped">
          Luxury credit cards, fine dining and wellness: four premium consumer brands, each with its own look and
          feel, all running on the one Next.js core I architected at Times Internet.
        </SectionHeader>
        <Reveal className={`show${paused ? ' paused' : ''}`} delay={1} style={showStyle} {...pauseHandlers}>
          <div className="plist">
            {PRODUCTS.map((p, i) => (
              // The whole row is clickable for mouse users; keyboard and assistive tech use the real
              // <button> header, and the "Visit" link sits outside it (no nested interactive content).
              <div
                key={p.key}
                className={`pitem${i === active ? ' on' : ''}`}
                onClick={handleClick(i)}
              >
                <span className="prog" onAnimationEnd={i === active ? advance : undefined} />
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
