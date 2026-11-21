'use client'

import { useEffect, useRef, useState } from 'react'
import { FIGURES } from '@/data/figures'
import { COUNT_UP_MS, countValue, progressAt } from '@/lib/countUp'
import { useOnceInView } from '@/hooks/useOnceInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Reveal } from './Reveal'

const FINAL = 1

export function Figures() {
  const reduced = useReducedMotion()
  // Starts at the final values so the page is correct without JS, then counts up on first view.
  const [progress, setProgress] = useState(FINAL)
  const frame = useRef(0)

  const startCountUp = () => {
    const startedAt = performance.now()
    const tick = (now: number) => {
      const k = progressAt(now - startedAt, COUNT_UP_MS)
      setProgress(k)
      if (k < FINAL) frame.current = requestAnimationFrame(tick)
    }
    setProgress(0)
    frame.current = requestAnimationFrame(tick)
  }

  const ref = useOnceInView<HTMLDivElement>(startCountUp, { threshold: 0.4, disabled: reduced })

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return (
    <section className="band" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="figs" ref={ref}>
          {FIGURES.map((figure, index) => (
            <Reveal key={figure.label} className="fig" delay={index % 3 ? ((index % 3) as 1 | 2) : undefined}>
              <b>
                {figure.prefix}
                {countValue(figure.value, progress)}
                {figure.suffix}
              </b>
              <span>{figure.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
