import { useEffect, useRef, type RefObject } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
  /** Skip observing entirely (e.g. reduced motion). */
  disabled?: boolean
  /** Fire the callback right away when IntersectionObserver is unavailable. */
  enterIfUnsupported?: boolean
}

/**
 * Calls `onEnter` once, the first time the returned ref's element scrolls into view.
 */
export function useOnceInView<T extends Element>(
  onEnter: () => void,
  { threshold = 0.12, rootMargin = '0px', disabled = false, enterIfUnsupported = false }: Options = {},
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const callback = useRef(onEnter)

  useEffect(() => {
    callback.current = onEnter
  })

  useEffect(() => {
    const element = ref.current
    if (!element || disabled) return

    if (typeof IntersectionObserver === 'undefined') {
      if (enterIfUnsupported) callback.current()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        callback.current()
      },
      { threshold, rootMargin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, disabled, enterIfUnsupported])

  return ref
}
