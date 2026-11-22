'use client'

import Image from 'next/image'
import { useScrolledPast } from '@/hooks/useScrolledPast'
import { PROFILE } from '@/data/profile'
import type { PaperSize } from '@/lib/cvFiles'
import { DownloadCv } from './DownloadCv'

const NAV_LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#platform', label: 'Platform' },
  { href: '#work', label: 'Work' },
  { href: '#agentrep', label: 'AgentRep' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const

const SCROLLED_AFTER_PX = 24

type NavProps = {
  paper: PaperSize
}

export function Nav({ paper }: NavProps) {
  const scrolled = useScrolledPast(SCROLLED_AFTER_PX)

  return (
    <nav className={scrolled ? 'scrolled' : undefined} aria-label="Main navigation">
      <div className="wrap">
        <a className="logo" href="#top">
          <Image src={PROFILE.avatar} alt="" width={76} height={76} />
          {PROFILE.name}
        </a>
        <div className="links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <DownloadCv paper={paper} className="btn pri" />
      </div>
    </nav>
  )
}
