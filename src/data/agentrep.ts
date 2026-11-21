export type ProviderKind = 'Venue' | 'Food' | 'Cake'

export type Provider = {
  name: string
  kind: ProviderKind
  tool: string
}

export const PROVIDERS: readonly Provider[] = [
  { name: 'PartyHub', kind: 'Venue', tool: 'search_venues' },
  { name: 'FoodHub', kind: 'Food', tool: 'place_order' },
  { name: 'CakeHub', kind: 'Cake', tool: 'order_cake' },
]

export const FLOW_STEPS = ['Discover', 'Gather', 'Check', 'Approve', 'Execute'] as const

export const DISCOVERY_STEP_MS = 750
