'use client'

import { useEffect } from 'react'

type HydrationWindow = Window & { __hydrated?: boolean }

/**
 * Tells the safety timer in layout.tsx that React has taken over. If this never runs
 * (blocked chunk, hydration error) the timer drops the `js` class so scroll-reveal
 * styles stop hiding server-rendered content.
 */
export function HydrationFlag() {
  useEffect(() => {
    ;(window as HydrationWindow).__hydrated = true
  }, [])

  return null
}
