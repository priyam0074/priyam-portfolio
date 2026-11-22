import { describe, expect, test } from 'vitest'
import { reservedListHeight } from './reservedHeight'

describe('reservedListHeight', () => {
  test('adds the tallest detail panel to every collapsed row and the gaps between rows', () => {
    // Arrange: four rows of 60px when collapsed, details of different heights, 4px gaps.
    const collapsed = [60, 60, 60, 60]
    const details = [120, 180, 90, 150]

    // Act
    const height = reservedListHeight(collapsed, details, 4)

    // Assert: 4*60 + 3*4 + 180
    expect(height).toBe(432)
  })

  test('is the same whichever row is open, so the list never changes size', () => {
    const collapsed = [60, 70, 60, 65]
    const details = [100, 200, 150, 120]

    const reserved = reservedListHeight(collapsed, details, 4)

    // Every real state (one row open) fits inside the reserved height.
    details.forEach((detail) => {
      const actual = collapsed.reduce((sum, row) => sum + row, 0) + 3 * 4 + detail
      expect(actual).toBeLessThanOrEqual(reserved)
    })
  })

  test('rounds up so a fractional measurement never leaves the list one pixel short', () => {
    expect(reservedListHeight([10.2, 10.2], [20.4], 0)).toBe(41)
  })

  test('returns 0 for an empty list', () => {
    expect(reservedListHeight([], [], 4)).toBe(0)
  })
})
