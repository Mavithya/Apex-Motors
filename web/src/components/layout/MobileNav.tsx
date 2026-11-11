'use client';
import { useSiteData } from "@deneb-ui/ui";
import { useDealer } from '@/lib/useDealer'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MessageCircle, Phone, X } from 'lucide-react'
import { type NavKey } from '@/data/navigation'
import { useNavigation } from '@/lib/useNavigation'
import Link from '@/components/ui/SiteLink'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'

export function MobileNav({ open, onClose, active }: { open: boolean; onClose: () => void; active?: NavKey }) {
  const siteData = useSiteData();
  const navigation = useNavigation()
  const DEALER = useDealer()
  const whatsappLink = (message?: string) => (DEALER.whatsappUrl ?? `https://wa.me/${DEALER.whatsappNumber}`) + (message ? '?text=' + encodeURIComponent(message) : '')
  const [expanded, setExpanded] = useState(false)
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-labelledby="label-mobilenav-0"><span id="label-mobilenav-0" className="sr-only" data-preview-static="Accessibility label">Menu</span>
          <motion.div
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col bg-white"
          >
            <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
              <Logo />
              <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center" data-preview-static="Interface label, control, or calculated value">
                <X className="h-6 w-6" data-preview-static="decorative-icon" />
              </button>
            </div>
            <nav aria-labelledby="label-mobilenav-1" className="flex-1 overflow-y-auto px-5 py-3"><span id="label-mobilenav-1" className="sr-only" data-preview-static="Accessibility label">Mobile</span>
              {navigation.map((item) => (
                <div key={item.key} className="border-b border-line">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.to}
                      onClick={onClose}
                      className={cn(
                        'flex-1 py-4 text-[17px] font-semibold',
                        active === item.key ? 'text-accent' : 'text-ink'
                      )}
                    >
                      <span data-preview-static="Computed interface value">{item.label}</span>
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                        aria-label="Show vehicle categories"
                        className="flex h-11 w-11 items-center justify-center text-muted" data-preview-static="Interface label, control, or calculated value"
                      >
                        <ChevronDown
                          className={cn('h-5 w-5 transition-transform duration-200', expanded && 'rotate-180')}
                          data-preview-static="decorative-icon" />
                      </button>
                    )}
                  </div>
                  {item.children && expanded && (
                    <div className="grid grid-cols-2 gap-x-4 pb-4">
                      {item.children.map((c) => (
                        <Link key={c.to} href={c.to} onClick={onClose} className="py-2 text-[15px] text-graphite">
                          <span data-preview-static="Computed interface value">{c.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/vehicles?view=saved" onClick={onClose} className="block border-b border-line py-4 text-[17px] font-semibold text-ink">
                <span
                  data-preview-field-path="common.header.savedVehicles"
                  data-preview-style-target="common.header.savedVehicles"
                  data-preview-style-type="text">{siteData?.content?.common?.header?.savedVehicles ?? "Saved vehicles"}</span>
              </Link>
            </nav>
            <div className="space-y-3 border-t border-line p-5">
              <Link
                href="/vehicles"
                onClick={onClose}
                className="flex h-12 items-center justify-center rounded-[3px] bg-accent text-sm font-semibold text-white"
              >
                <span
                  data-preview-field-path="common.header.findCar"
                  data-preview-style-target="common.header.findCar"
                  data-preview-style-type="text">{siteData?.content?.common?.header?.findCar ?? "Find Your Car"}</span>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link href={DEALER.phoneHref} className="flex h-12 items-center justify-center gap-2 rounded-[3px] border border-line text-sm font-semibold text-ink">
                  <Phone className="h-4 w-4" /> <span
                    data-preview-field-path="common.header.call"
                    data-preview-style-target="common.header.call"
                    data-preview-style-type="text">{siteData?.content?.common?.header?.call ?? "Call"}</span>
                </Link>
                <Link
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-[3px] border border-line text-sm font-semibold text-ink"
                >
                  <MessageCircle className="h-4 w-4" /> <span
                    data-preview-field-path="common.header.whatsapp"
                    data-preview-style-target="common.header.whatsapp"
                    data-preview-style-type="text">{siteData?.content?.common?.header?.whatsapp ?? "WhatsApp"}</span>
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
