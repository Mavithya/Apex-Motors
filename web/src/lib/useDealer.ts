'use client'

import { useSiteData } from '@deneb-ui/ui'
import { DEALER as initialDealer, IMAGES as initialImages } from '@/data/dealer'

export function useDealer() {
  const siteData = useSiteData()
  const dealer: typeof initialDealer = { ...initialDealer, ...siteData.content?.dealer }
  const shop = siteData.shop
  const phone = shop?.phone ?? dealer.phoneDisplay
  const whatsapp = String(shop?.whatsapp ?? dealer.whatsappNumber).replace(/\D/g, '')
  return {
    ...dealer,
    name: shop?.name ?? dealer.name,
    email: shop?.email ?? dealer.email,
    phoneDisplay: phone,
    phoneHref: !shop?.phone && dealer.phoneHref !== initialDealer.phoneHref ? dealer.phoneHref : `tel:${String(phone).replace(/[^\d+]/g, '')}`,
    whatsappUrl: !shop?.whatsapp && dealer.whatsappUrl !== initialDealer.whatsappUrl ? dealer.whatsappUrl : `https://wa.me/${whatsapp}`,
    whatsappNumber: whatsapp,
    whatsappDisplay: shop?.whatsapp ?? dealer.whatsappDisplay,
  } as typeof initialDealer
}

export function useDealerImages(): typeof initialImages {
  const siteData = useSiteData()
  return { ...initialImages, ...(siteData.assets as Partial<typeof initialImages> ?? {}) }
}
