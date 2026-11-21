import type { CSSProperties } from 'react'

/** Style object that also accepts CSS custom properties (`--foo`). */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>
