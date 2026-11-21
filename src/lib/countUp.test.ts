import { describe, expect, test } from 'vitest'
import { countValue, easeOutCubic, progressAt } from './countUp'

describe('easeOutCubic', () => {
  test('starts at 0 and ends at 1', () => {
    expect(easeOutCubic(0)).toBe(0)
    expect(easeOutCubic(1)).toBe(1)
  })

  test('is front-loaded (past halfway at k = 0.5)', () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5)
  })
})

describe('progressAt', () => {
  test('clamps elapsed time into 0..1', () => {
    expect(progressAt(-50, 1200)).toBe(0)
    expect(progressAt(600, 1200)).toBe(0.5)
    expect(progressAt(5000, 1200)).toBe(1)
  })
})

describe('countValue', () => {
  test('reaches the target at full progress', () => {
    expect(countValue(35, 1)).toBe(35)
  })

  test('is 0 at zero progress', () => {
    expect(countValue(35, 0)).toBe(0)
  })

  test('stays 0 for a zero target', () => {
    expect(countValue(0, 0.7)).toBe(0)
  })
})
