export type Product = {
  key: string
  name: string
  url: string
  domain: string
  kind: string
  background: string
  accent: string
  image: string
  description: string
  tags: readonly string[]
}

export const PRODUCTS: readonly Product[] = [
  {
    key: 'black',
    name: 'Times Black',
    url: 'https://www.timesblack.com',
    domain: 'timesblack.com',
    kind: 'Metal credit card · ICICI Bank',
    background: '#f4ecdc',
    accent: 'linear-gradient(135deg,#e6c88a,#9c7434)',
    image: '/img/black.jpg',
    description:
      "A cinematic, video-led luxury experience for one of India's most premium metal credit cards, with partner brands, lifestyle benefits and the app journey.",
    tags: ['Next.js', 'SSR + SEO', 'Core Web Vitals'],
  },
  {
    key: 'reserve',
    name: 'The 1838 Reserve',
    url: 'https://www.1838reserve.com',
    domain: '1838reserve.com',
    kind: 'Invitation-only credit card',
    background: '#f1e5d3',
    accent: 'linear-gradient(135deg,#d9b779,#7a1f12)',
    image: '/img/reserve.jpg',
    description:
      'An art-led, invitation-only brand experience: a gallery of commissioned paintings and a card that is itself a work of art.',
    tags: ['Next.js', 'Scroll storytelling', 'GSAP'],
  },
  {
    key: 'aeonic',
    name: 'Aeonic',
    url: 'https://www.timesaeonic.com',
    domain: 'timesaeonic.com',
    kind: 'Wellness membership by Times Prime',
    background: '#eef5dc',
    accent: 'linear-gradient(135deg,#c8f560,#2f3a12)',
    image: '/img/aeonic.jpg',
    description:
      'One membership bundling fitness, diagnostics, nutrition and mental wellness from premium partner brands, with savings and plan pickers.',
    tags: ['React + Node SSR', 'Tenant theming', 'Conversion funnels'],
  },
  {
    key: 'dinehome',
    name: 'Dine with Times Prime',
    url: 'https://www.dinewithtimesprime.com',
    domain: 'dinewithtimesprime.com',
    kind: 'Premium restaurant reservations',
    background: '#f6efe2',
    accent: 'linear-gradient(135deg,#f0d9b0,#1e3b2f)',
    image: '/img/dinehome.jpg',
    description:
      'A cinematic, food-first homepage carousel leading into city-led discovery and table booking at top restaurants.',
    tags: ['Next.js', 'Observability', 'SSR + SEO'],
  },
]
