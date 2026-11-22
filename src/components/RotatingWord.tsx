'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ROTATING_WORDS } from '@/data/brands'

const ROTATE_EVERY_MS = 2400

/**
 * Every word is stacked in the same grid cell, so the wrapper is always as wide and tall as the
 * longest word. Swapping the visible one therefore never reflows the heading (which used to make
 * the hero jump up and down on mobile). Only the active word is exposed to assistive tech.
 */
export function RotatingWord() {
  const reduced = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setTick((t) => t + 1), ROTATE_EVERY_MS)
    return () => clearInterval(id)
  }, [reduced])

  const active = tick % ROTATING_WORDS.length

  return (
    <span className="rot">
      {ROTATING_WORDS.map((word, index) => {
        const isActive = index === active
        // The active word is re-keyed on every tick so its swap animation replays.
        return (
          <span
            key={isActive ? `${word}-${tick}` : word}
            className={`grad${isActive ? (tick > 0 ? ' rot-on swap' : ' rot-on') : ' rot-off'}`}
            aria-hidden={isActive ? undefined : true}
          >
            {word}
          </span>
        )
      })}
    </span>
  )
}
