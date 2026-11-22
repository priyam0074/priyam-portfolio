import { describe, expect, test } from 'vitest'
import { REGION_CODES } from '../data/regions'
import { getRegionCopy, regionLabel, resolveRegion } from './regionCopy'

describe('resolveRegion', () => {
  test('accepts every supported country code, case-insensitively', () => {
    for (const code of REGION_CODES) {
      expect(resolveRegion(code)).toBe(code)
      expect(resolveRegion(code.toLowerCase())).toBe(code)
    }
  })

  test('trims whitespace', () => {
    expect(resolveRegion(' nl ')).toBe('NL')
  })

  test('treats UK as an alias for GB', () => {
    expect(resolveRegion('uk')).toBe('GB')
  })

  test('returns null for unsupported, empty or missing values', () => {
    expect(resolveRegion('IN')).toBeNull()
    expect(resolveRegion('XX')).toBeNull()
    expect(resolveRegion('')).toBeNull()
    expect(resolveRegion(null)).toBeNull()
    expect(resolveRegion(undefined)).toBeNull()
  })
})

describe('Southern and Western European markets', () => {
  test('resolves Portugal, Spain, Luxembourg and Belgium', () => {
    expect(resolveRegion('pt')).toBe('PT')
    expect(resolveRegion('ES')).toBe('ES')
    expect(resolveRegion(' lu ')).toBe('LU')
    expect(resolveRegion('Be')).toBe('BE')
  })

  test('names each country in the hero and footer wording', () => {
    expect(getRegionCopy('PT').heroLine).toBe('open to roles in Portugal')
    expect(getRegionCopy('ES').heroLine).toBe('open to roles in Spain')
    expect(getRegionCopy('LU').footerHeading).toBe('Hiring for a senior frontend role in Luxembourg?')
    expect(getRegionCopy('BE').footerHeading).toBe('Hiring for a senior frontend role in Belgium?')
  })
})

describe('regionLabel', () => {
  test('reads naturally in a sentence', () => {
    expect(regionLabel('GB')).toBe('the UK')
    expect(regionLabel('US')).toBe('the USA')
    expect(regionLabel('NL')).toBe('the Netherlands')
    expect(regionLabel('VN')).toBe('Vietnam')
    expect(regionLabel('CH')).toBe('Switzerland')
  })
})

describe('getRegionCopy', () => {
  test('uses neutral wording when there is no region', () => {
    const copy = getRegionCopy(null)
    expect(copy.heroLine).toBe('open to new opportunities')
    expect(copy.footerHeading).toBe('Hiring for a senior frontend role?')
    expect(copy.footerLede).not.toMatch(/relocate/i)
  })

  test('names the country for a supported region', () => {
    const copy = getRegionCopy('CH')
    expect(copy.heroLine).toBe('open to roles in Switzerland')
    expect(copy.footerHeading).toBe('Hiring for a senior frontend role in Switzerland?')
    expect(copy.footerLede).toMatch(/ready to relocate/)
  })

  test('uses "the" for countries that need it', () => {
    expect(getRegionCopy('GB').heroLine).toBe('open to roles in the UK')
    expect(getRegionCopy('NL').footerHeading).toBe('Hiring for a senior frontend role in the Netherlands?')
  })

  test('never mentions another country or restricts the seniority level', () => {
    for (const region of [null, ...REGION_CODES]) {
      const text = Object.values(getRegionCopy(region)).join(' ')
      expect(text).not.toMatch(/Netherlands & UK|Netherlands or UK/)
      expect(text).not.toMatch(/Lead or Staff/)
    }
  })
})
