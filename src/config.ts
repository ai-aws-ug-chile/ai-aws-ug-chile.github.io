export const SITE = {
  name: 'AI AWS UG Chile',
  shortName: 'AI AWS UG Chile',
  tagline: 'La comunidad de inteligencia artificial sobre AWS en Chile',
  description:
    'Somos una comunidad de builders, developers, estudiantes y profesionales ' +
    'interesados en aprender, construir y compartir experiencias sobre ' +
    'inteligencia artificial en AWS.',
  locale: 'es-CL',
  country: 'Chile',
} as const;

/** Emptying any URL here removes that link from the whole site. */
export const CONTACT = {
  email: 'ai.aws.ug.chile@gmail.com',
  meetup: 'https://www.meetup.com/ai-aws-ug-chile/',
  linkedin: 'https://www.linkedin.com/company/ai-aws-ug-chile/',
  github: 'https://github.com/ai-aws-ug-chile',
  youtube: '',
  instagram: '',
  /** Call for speakers, not general contact — that goes to `email`. */
  speakerFormEmbedUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSeNG5Ikiyb4aL8qdYGv3OUvm3wcRM6RFFnxO7be6_m8KrEIhQ/viewform?embedded=true',
  speakerFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSeNG5Ikiyb4aL8qdYGv3OUvm3wcRM6RFFnxO7be6_m8KrEIhQ/viewform',
  /** Copy from the `height` of Google's embed snippet, or the form scrolls inside itself. */
  speakerFormHeight: 2013,
} as const;

export const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/call-for-speakers', label: 'Presenta' },
] as const;

/** Prefixes a path with Astro's `base`, so links survive the site moving. */
export const url = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean === '/' ? base || '/' : `${base}${clean}`;
};

export const isExternal = (href: string): boolean => !href.startsWith('/');

/** Content links point either off-site or at a file we host, which needs `base`. */
export const link = (href: string): string => (isExternal(href) ? href : url(href));
