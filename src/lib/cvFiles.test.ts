import { describe, expect, test } from 'vitest'
import { cvDownloads, paperForRegion } from './cvFiles'

describe('paperForRegion', () => {
  test.each(['US', 'CA'] as const)('uses Letter for %s', (region) => {
    expect(paperForRegion(region)).toBe('Letter')
  })

  test.each(['GB', 'CH', 'IE', 'NL', 'FR', 'DE', 'PT', 'ES', 'LU', 'BE', 'SG', 'ID', 'VN'] as const)(
    'uses A4 for %s',
    (region) => {
      expect(paperForRegion(region)).toBe('A4')
    },
  )

  test('uses A4 for the neutral page (unknown country, crawlers)', () => {
    expect(paperForRegion(null)).toBe('A4')
  })
})

describe('cvDownloads', () => {
  test('offers a PDF and a DOC', () => {
    expect(cvDownloads('A4').map((d) => d.label)).toEqual(['PDF', 'DOC'])
  })

  test('serves the A4 files but saves them under the plain CV name', () => {
    expect(cvDownloads('A4')).toEqual([
      { label: 'PDF', url: '/Priyam_Vashishtha_CV_A4.pdf', fileName: 'Priyam_Vashishtha_CV.pdf' },
      { label: 'DOC', url: '/Priyam_Vashishtha_CV_A4.docx', fileName: 'Priyam_Vashishtha_CV.docx' },
    ])
  })

  test('serves the Letter files but saves them under the plain CV name', () => {
    expect(cvDownloads('Letter')).toEqual([
      { label: 'PDF', url: '/Priyam_Vashishtha_CV_Letter.pdf', fileName: 'Priyam_Vashishtha_CV.pdf' },
      { label: 'DOC', url: '/Priyam_Vashishtha_CV_Letter.docx', fileName: 'Priyam_Vashishtha_CV.docx' },
    ])
  })
})
