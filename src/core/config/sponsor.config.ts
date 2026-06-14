import type { ISponsor } from '../types/sponsor'

export const SPONSORS: ISponsor[] = [
  {
    imageUrl: import.meta.env.VITE_S_OLAVARRIA_SERVICIOS_URL_IMAGE ?? '',
    logoUrl: import.meta.env.VITE_S_OLAVARRIA_SERVICIOS_URL_LOGO ?? '',
    linkUrl: import.meta.env.VITE_S_OLAVARRIA_SERVICIOS ?? '',
    alt: 'Olavarría Servicios',
  },
]
