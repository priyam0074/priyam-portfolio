import { useState, type FocusEvent, type PointerEvent } from 'react'

/**
 * Pause state for auto-advancing UI (WCAG 2.2.2). Pauses while a mouse hovers the region or
 * keyboard focus is inside it. Touch taps are ignored on purpose: there is no "leave" event on
 * touch, so pausing there would leave the region stuck.
 */
export function usePauseOnInteraction() {
  const [hovered, setHovered] = useState(false)
  const [keyboardFocused, setKeyboardFocused] = useState(false)

  const handlers = {
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === 'mouse') setHovered(true)
    },
    onPointerLeave: (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === 'mouse') setHovered(false)
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      if (event.target.matches(':focus-visible')) setKeyboardFocused(true)
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false)
    },
  }

  return { paused: hovered || keyboardFocused, handlers }
}
