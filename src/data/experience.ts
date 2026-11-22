export type Role = {
  period: string
  title: string
  summary: string
}

export const EXPERIENCE: readonly Role[] = [
  {
    period: '2021 – now',
    title: 'Lead Frontend Engineer / Frontend Architect · Times Internet',
    summary:
      'Multi-tenant platform, design system, observability and AI tooling across TimesPrime, TimesBlack, TimesAeonic and partner brands. Mentored 6+ engineers; ran architecture reviews and hiring interviews.',
  },
  {
    period: '2020 – 2021',
    title: 'Senior Software Engineer · Optum (DocASAP)',
    summary: 'Angular micro-frontends for a white-label healthcare scheduling platform. Release cycles 20% shorter, WCAG 2.1 AA.',
  },
  {
    period: '2018 – 2020',
    title: 'Senior Software Design Engineer · Newgen Software',
    summary: 'React rich-text editor standardising HTML report authoring, with HTML-to-PDF generation.',
  },
  {
    period: '2017 – 2018',
    title: 'Senior UI Engineer · ThingTrax',
    summary: 'Real-time IoT manufacturing dashboard: live telemetry, OEE metrics, predictive downtime alerts.',
  },
  {
    period: '2015 – 2017',
    title: 'Software Engineer · Publicis Sapient',
    summary: 'Banking risk-assessment interfaces for global financial services clients.',
  },
]

export type SkillGroup = {
  title: string
  skills: readonly string[]
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      'TypeScript',
      'JavaScript',
      'Next.js',
      'React',
      'Redux',
      'Zustand',
      'TanStack Query',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Angular',
      'Storybook',
      'Micro-frontends',
      'Design systems',
      'Responsive design',
      'SSR / ISR',
    ],
  },
  { title: 'AI engineering', skills: ['Claude Code Skills', 'MCP', 'WebMCP', 'Playwright MCP', 'Figma MCP'] },
  { title: 'Platform', skills: ['Node.js', 'REST APIs', 'Docker', 'Kubernetes', 'GCP', 'GitHub Actions', 'Akamai', 'Git'] },
  {
    title: 'Quality',
    skills: ['Core Web Vitals', 'Lighthouse', 'Elastic APM & RUM', 'Sentry', 'Jest', 'Playwright', 'WCAG 2.1 AA'],
  },
]
