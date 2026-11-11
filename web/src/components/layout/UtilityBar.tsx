"use client";
import Link from '@/components/ui/SiteLink'
import { useSiteData } from "@deneb-ui/ui";
import { useDealer } from '@/lib/useDealer'
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'

export function UtilityBar() {
  const siteData = useSiteData();
  const DEALER = useDealer()
  return (
    <div className="bg-ink text-[12.5px] text-white/70">
      <div className="mx-auto flex h-10 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <MapPin
              className="h-3.5 w-3.5 text-white/40"
              aria-hidden
               />
            <span data-preview-field-path="dealer.city">{DEALER.city}</span>
          </span>
          <span className="hidden items-center gap-2 whitespace-nowrap md:flex">
            <Clock className="h-3.5 w-3.5 text-white/40" aria-hidden />
            <span data-preview-field-path="dealer.hoursShort">{DEALER.hoursShort}</span>
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link href={DEALER.phoneHref} className="hidden items-center gap-2 whitespace-nowrap transition-colors duration-150 hover:text-white sm:flex">
            <Phone className="h-3.5 w-3.5 text-white/40" aria-hidden />
            <span data-preview-field-path="dealer.phoneDisplay">{DEALER.phoneDisplay}</span>
          </Link>
          <Link
            href={siteData?.content?.common?.contact?.whatsappUrl ?? "https://wa.me/1234567890"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 whitespace-nowrap transition-colors duration-150 hover:text-white"
            data-preview-field-path={"common.contact.whatsappUrl"}
            data-preview-style-target="common.contact.whatsappLabel"
            data-preview-style-type="text">
            <MessageCircle
              className="h-3.5 w-3.5 text-white/40"
              aria-hidden
               />
            <span
              data-preview-field-path="common.contact.whatsappLabel"
              data-preview-style-target="common.contact.whatsappLabel"
              data-preview-style-type="text">{siteData?.content?.common?.contact?.whatsappLabel ?? "WhatsApp"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

