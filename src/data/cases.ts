export type CaseKind = 'platform' | 'ds' | 'obs' | 'ai'

export type CaseStudy = {
  kind: CaseKind
  span: 'w7' | 'w5'
  title: string
  when: string
  problem: string
  built: string
  outcomes: readonly { value: string; label: string }[]
}

export const CASES: readonly CaseStudy[] = [
  {
    kind: 'platform',
    span: 'w7',
    title: 'Multi-tenant platform, zero-fork onboarding',
    when: 'Times Internet · 2021 to now',
    problem: 'White-label brands kept turning into forked codebases, duplicating routing, design and bugs.',
    built:
      'A shared Next.js core resolves branding, routing and feature flags per tenant at request time, with content modelled once in the headless CMS. I also led the SSR pipeline migration on Node.js.',
    outcomes: [
      { value: '0', label: 'forks per tenant' },
      { value: '4+', label: 'brands, one codebase' },
      { value: '+35%', label: 'organic SEO' },
    ],
  },
  {
    kind: 'ds',
    span: 'w5',
    title: 'Design system adopted org-wide',
    when: 'Times Internet · 2021 to now',
    problem: 'Tenant apps were drifting visually and teams kept re-solving the same UI problems.',
    built:
      'A Storybook library with strict TypeScript APIs, layered as tokens, primitives, patterns and tenant apps, plus funnel instrumentation with analytics.',
    outcomes: [
      { value: 'Org-wide', label: 'adoption' },
      { value: '+18%', label: 'feature conversion' },
    ],
  },
  {
    kind: 'obs',
    span: 'w5',
    title: 'Frontend observability',
    when: 'Times Internet',
    problem: 'Issues were found through user complaints rather than telemetry.',
    built:
      'Set up Elastic APM and RUM across the Times financial products, so engineers see regressions before users report them.',
    outcomes: [
      { value: '~30%', label: 'fewer errors' },
      { value: '~25%', label: 'lower p95' },
      { value: '<15 min', label: 'detection' },
    ],
  },
  {
    kind: 'ai',
    span: 'w7',
    title: 'AI-augmented engineering',
    when: 'Times Internet · 2024 to now',
    problem: 'Writing and reviewing QA test cases by hand was slowing releases.',
    built:
      'Custom Claude Code Skills plus Figma and Playwright MCP generate code, review notes and TestRail/Zephyr test cases. Nothing reaches Jira until a person approves it.',
    outcomes: [
      { value: 'Multiple', label: 'teams adopted' },
      { value: '100%', label: 'human-gated pushes' },
    ],
  },
]
