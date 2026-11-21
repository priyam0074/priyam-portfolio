import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeaderProps = {
  lead: string
  accent: string
  children: ReactNode
}

export function SectionHeader({ lead, accent, children }: SectionHeaderProps) {
  return (
    <Reveal className="sec-h">
      <h2>
        {lead} <span className="grad">{accent}</span>
      </h2>
      <p className="mute">{children}</p>
    </Reveal>
  )
}
