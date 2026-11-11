export interface Dealer {
  name: string
  wordmark: string
  wordmarkSuffix: string
  tagline: string
  description: string
  phoneDisplay: string
  phoneHref: string
  whatsappUrl?: string
  whatsappNumber: string
  whatsappDisplay: string
  email: string
  addressLines: string[]
  city: string
  hoursShort: string
  hours: { days: string; time: string }[]
  mapQuery: string
  socials: { label: string; href: string }[]
  established: number
}

export type DealerImages = Record<'hero' | 'spotlight' | 'showroom' | 'handover' | 'detail' | 'interior' | 'dashboard' | 'rear', string>
