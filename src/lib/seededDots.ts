export type Dot = {
  cx: number
  cy: number
  r: number
  opacity: number
}

const LCG_MULTIPLIER = 16807
const LCG_MODULUS = 2147483647

/** Deterministic star-field for the hero artwork (same output on server and client). */
export function seededDots(count: number, seed = 7): readonly Dot[] {
  let state = seed
  const next = () => {
    state = (state * LCG_MULTIPLIER) % LCG_MODULUS
    return state / LCG_MODULUS
  }

  return Array.from({ length: count }, () => ({
    cx: Number((30 + next() * 540).toFixed(0)),
    cy: Number((30 + next() * 330).toFixed(0)),
    r: Number((1 + next() * 2.5).toFixed(1)),
    opacity: Number((0.25 + next() * 0.5).toFixed(2)),
  }))
}
