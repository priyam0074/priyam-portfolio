import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Manrope, Playfair_Display } from 'next/font/google'
import { HydrationFlag } from '@/components/HydrationFlag'
import { SITE_DESCRIPTION } from '@/data/profile'
import '@/styles/base.css'
import '@/styles/nav.css'
import '@/styles/hero.css'
import '@/styles/products.css'
import '@/styles/figures.css'
import '@/styles/platform.css'
import '@/styles/work.css'
import '@/styles/agentrep.css'
import '@/styles/experience.css'
import '@/styles/footer.css'

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-playfair', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  title: 'Priyam Vashishtha Portfolio',
  description: SITE_DESCRIPTION,
}

const HYDRATION_TIMEOUT_MS = 4000

// Static constant: marks the document as JS-enabled before first paint so the scroll-reveal
// styles (`.js .rv`) are ready, then removes the flag again if React has not hydrated within
// the timeout (see HydrationFlag), so a blocked script bundle never leaves content hidden.
const JS_FLAG_SCRIPT = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__hydrated)document.documentElement.classList.remove('js')},${HYDRATION_TIMEOUT_MS})`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVariables = [playfair, manrope, inter, jetbrains].map((font) => font.variable).join(' ')

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG_SCRIPT }} />
      </head>
      <body>
        <HydrationFlag />
        {children}
      </body>
    </html>
  )
}
