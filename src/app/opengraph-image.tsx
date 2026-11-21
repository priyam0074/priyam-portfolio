import { ImageResponse } from 'next/og'
import { PROFILE } from '@/data/profile'

export const alt = `${PROFILE.name} — Lead Frontend Engineer & Frontend Architect`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#12223b',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, background: '#b7f3d8' }} />
          <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: 3, color: '#b7f3d8' }}>
            PORTFOLIO
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{PROFILE.name}</div>
          <div style={{ fontSize: 37, marginTop: 22, color: '#d1e0fa' }}>
            Lead Frontend Engineer &amp; Frontend Architect
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#bdd0e8' }}>
          React  ·  Next.js  ·  TypeScript  ·  Design Systems
        </div>
      </div>
    ),
    size,
  )
}
