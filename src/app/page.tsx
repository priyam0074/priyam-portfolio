import { Landing } from '@/components/Landing'

// Neutral variant (no country named): unknown countries, crawlers and link previews.
// Country variants live at /r/[region] and are served for `/` by src/proxy.ts.
export default function HomePage() {
  return <Landing region={null} />
}
