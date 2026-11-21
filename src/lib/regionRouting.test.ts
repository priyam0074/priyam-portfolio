import { describe, expect, test } from 'vitest'
import { isCrawler, pickRegion } from './regionRouting'

const BROWSER = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'

describe('isCrawler', () => {
  test.each([
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)',
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Twitterbot/1.0',
    'Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)',
    'WhatsApp/2.23.20.0',
  ])('detects %s', (userAgent) => {
    expect(isCrawler(userAgent)).toBe(true)
  })

  test('does not flag a normal browser or a missing user agent', () => {
    expect(isCrawler(BROWSER)).toBe(false)
    expect(isCrawler(null)).toBe(false)
    expect(isCrawler('')).toBe(false)
  })
})

describe('pickRegion', () => {
  test('uses the visitor country header', () => {
    expect(pickRegion({ header: 'NL', userAgent: BROWSER })).toBe('NL')
  })

  test('lets an explicit ?country override win over the header', () => {
    expect(pickRegion({ override: 'ch', header: 'NL', userAgent: BROWSER })).toBe('CH')
  })

  test('ignores an invalid override and falls back to the header', () => {
    expect(pickRegion({ override: 'zz', header: 'DE', userAgent: BROWSER })).toBe('DE')
  })

  test('returns null for unsupported or missing countries', () => {
    expect(pickRegion({ header: 'IN', userAgent: BROWSER })).toBeNull()
    expect(pickRegion({ userAgent: BROWSER })).toBeNull()
  })

  test('serves crawlers and link-preview bots the neutral page', () => {
    expect(pickRegion({ header: 'US', userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1)' })).toBeNull()
  })

  test('still honours an explicit override for a crawler', () => {
    expect(pickRegion({ override: 'ie', header: 'US', userAgent: 'Twitterbot/1.0' })).toBe('IE')
  })
})
