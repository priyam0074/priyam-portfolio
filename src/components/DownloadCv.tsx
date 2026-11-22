'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { cvDownloads, type PaperSize } from '@/lib/cvFiles'

type DownloadCvProps = {
  /** Which paper size's files to offer (A4, or Letter for US and Canada). */
  paper: PaperSize
  /** Button style, e.g. `btn pri`. */
  className: string
  /** Open the menu above the button when there is no room below it. */
  openUp?: boolean
}

export function DownloadCv({ paper, className, openUp = false }: DownloadCvProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const downloads = cvDownloads(paper)

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <div className="dl" ref={rootRef}>
      <button
        type="button"
        className={className}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        Download CV
        <svg className="dl-caret" viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" focusable="false">
          <path d="M3.5 6l4.5 4.5L12.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul id={menuId} className={openUp ? 'dl-menu up' : 'dl-menu'} hidden={!open}>
        {downloads.map(({ label, url, fileName }) => (
          <li key={url}>
            <a href={url} download={fileName} onClick={() => setOpen(false)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
