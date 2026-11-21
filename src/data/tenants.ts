export type Tenant = {
  host: string
  name: string
  color: string
  image: string
  route: string
  flags: readonly string[]
}

export const TENANTS: readonly Tenant[] = [
  {
    host: 'timesprime.com',
    name: 'Times Prime',
    color: '#5b2d9e',
    image: '/img/prime.jpg',
    route: '/prime/*',
    flags: ['theme:mighty-purple', 'ab:trial-cta'],
  },
  {
    host: 'dinewithtimesprime.com',
    name: 'Dine',
    color: '#1e3b2f',
    image: '/img/dinehome.jpg',
    route: '/dine/*',
    flags: ['video-hero:on', 'offers:on'],
  },
  {
    host: 'moreplusloyalty.com',
    name: 'more+ diamond',
    color: '#6b3fd1',
    image: '/img/moreplus.jpg',
    route: '/moreplus/*',
    flags: ['partner:more', 'login:otp'],
  },
  {
    host: 'timesaeonic.com',
    name: 'Aeonic',
    color: '#a6d61a',
    image: '/img/aeonic.jpg',
    route: '/aeonic/*',
    flags: ['cms:plans', 'ab:cta-v2'],
  },
]
