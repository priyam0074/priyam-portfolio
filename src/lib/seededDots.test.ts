import { describe, expect, test } from 'vitest'
import { seededDots } from './seededDots'

describe('seededDots', () => {
  test('returns the requested number of dots', () => {
    expect(seededDots(30)).toHaveLength(30)
  })

  test('is deterministic for the same seed', () => {
    expect(seededDots(10, 7)).toEqual(seededDots(10, 7))
  })

  test('differs for a different seed', () => {
    expect(seededDots(10, 7)).not.toEqual(seededDots(10, 8))
  })

  test('keeps every dot inside the artwork bounds', () => {
    for (const dot of seededDots(200)) {
      expect(dot.cx).toBeGreaterThanOrEqual(30)
      expect(dot.cx).toBeLessThanOrEqual(570)
      expect(dot.cy).toBeGreaterThanOrEqual(30)
      expect(dot.cy).toBeLessThanOrEqual(360)
      expect(dot.r).toBeGreaterThanOrEqual(1)
      expect(dot.r).toBeLessThanOrEqual(3.5)
      expect(dot.opacity).toBeGreaterThanOrEqual(0.25)
      expect(dot.opacity).toBeLessThanOrEqual(0.75)
    }
  })

  test('matches the first dot produced by the original inline script', () => {
    // Original: s=7, s=s*16807%2147483647 → cx=30+rnd*540 … rounded as in toFixed(0)
    const [first] = seededDots(1, 7)
    const s1 = (7 * 16807) % 2147483647
    expect(first.cx).toBe(Number((30 + (s1 / 2147483647) * 540).toFixed(0)))
  })
})
