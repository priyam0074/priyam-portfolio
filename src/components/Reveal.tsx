'use client'

import { useState, type ElementType, type HTMLAttributes } from 'react'
import { useOnceInView } from '@/hooks/useOnceInView'

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  delay?: 1 | 2 | 3
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ as: Tag = 'div', delay, className, children, ...rest }: RevealProps) {
  const [shown, setShown] = useState(false)
  const ref = useOnceInView<HTMLElement>(() => setShown(true), {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
    enterIfUnsupported: true,
  })

  const classes = ['rv', delay && `d${delay}`, className, shown && 'in'].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  )
}
