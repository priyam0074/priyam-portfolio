export const COUNT_UP_MS = 1200

export function easeOutCubic(k: number): number {
  return 1 - (1 - k) ** 3
}

/** Fraction (0..1) of the animation completed after `elapsedMs`. */
export function progressAt(elapsedMs: number, durationMs: number): number {
  return Math.min(1, Math.max(0, elapsedMs / durationMs))
}

/** Integer shown on screen for a target value at animation progress `k` (0..1). */
export function countValue(target: number, k: number): number {
  return Math.round(target * easeOutCubic(k))
}
