'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ROTATING_WORDS } from '@/data/brands'

const ROTATE_EVERY_MS = 2400

export function RotatingWord() {
  const reduced = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setTick((t) => t + 1), ROTATE_EVERY_MS)
    return () => clearInterval(id)
  }, [reduced])

  // `key` remounts the span so the swap animation replays on every change.
  return (
    <span key={tick} className={`grad rot${tick > 0 ? ' swap' : ''}`}>
      {ROTATING_WORDS[tick % ROTATING_WORDS.length]}
    </span>
  )
}
