import { MARQUEE_ITEMS } from '@/data/brands'

export function Marquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div className="marq" role="group" aria-label="Technologies">
      <div className="track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}
