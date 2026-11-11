import initialSiteData from './site-data.json'
import type { Dealer, DealerImages } from '@/types/site'

export const DEALER: Dealer = initialSiteData.content.dealer
const seedAssets = (initialSiteData as unknown as { assets?: DealerImages }).assets
export const IMAGES: DealerImages = seedAssets ?? { hero: '', spotlight: '', showroom: '', handover: '', detail: '', interior: '', dashboard: '', rear: '' }

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${DEALER.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
