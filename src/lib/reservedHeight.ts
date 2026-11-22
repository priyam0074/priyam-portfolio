/**
 * Height that fits every state of an accordion-style list where exactly one row is open.
 *
 * Reserving this on the list keeps it the same size while the open row changes, so anything below
 * it does not jump up and down (a jumping page also makes tap targets move under a finger).
 *
 * @param collapsed height of each row with its details closed
 * @param details natural height of each row's details panel
 * @param gap space between rows
 */
export function reservedListHeight(collapsed: readonly number[], details: readonly number[], gap: number): number {
  if (collapsed.length === 0) return 0

  const rows = collapsed.reduce((sum, height) => sum + height, 0)
  const gaps = gap * (collapsed.length - 1)
  const tallestDetail = details.reduce((tallest, height) => Math.max(tallest, height), 0)

  return Math.ceil(rows + gaps + tallestDetail)
}
