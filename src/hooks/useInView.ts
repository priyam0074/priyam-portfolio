import { useEffect, useState, type RefObject } from 'react'

/**
 * True while any part of the referenced element is on screen, and false once it scrolls away.
 * Unlike `useOnceInView` it keeps observing, so auto-advancing UI can pause when off screen and
 * resume when it comes back. Starts as `true` (and stays so without IntersectionObserver) so the
 * server render and unsupported browsers behave as before.
 */
export function useInView<T extends Element>(ref: RefObject<T | null>): boolean {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  return inView
}
