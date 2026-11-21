'use client'

import Image from 'next/image'
import { useScrolledPast } from '@/hooks/useScrolledPast'
import { PROFILE } from '@/data/profile'

const NAV_LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#platform', label: 'Platform' },
  { href: '#work', label: 'Work' },
  { href: '#agentrep', label: 'AgentRep' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const

const SCROLLED_AFTER_PX = 24

export function Nav() {
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
        <a className="btn pri" href={PROFILE.cvUrl} download={PROFILE.cvFileName}>
          Download CV
        </a>
      </div>
    </nav>
  )
}
