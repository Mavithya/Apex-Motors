import React from 'react'
import { DEALER, whatsappLink } from '@/data/dealer'
import { FOOTER_LINKS } from '@/data/navigation'
import { CATEGORIES } from '@/data/vehicles'
import Link from 'next/link'
import { Logo } from './Logo'

export async function Footer() {
  'use cache'
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-6 text-[15px] leading-relaxed">{DEALER.description}</p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {DEALER.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-white transition-colors duration-150 hover:text-white/60"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Explore">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.to} href={l.to} className="block py-1.5 text-[15px] transition-colors duration-150 hover:text-white">
                {l.label}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Vehicles">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/vehicles?category=${c.slug}`}
                className="block py-1.5 text-[15px] transition-colors duration-150 hover:text-white"
              >
                {c.label}
              </Link>
            ))}
            <Link href="/vehicles?condition=New" className="block py-1.5 text-[15px] transition-colors duration-150 hover:text-white">
              Brand new
            </Link>
            <Link href="/vehicles?condition=Used" className="block py-1.5 text-[15px] transition-colors duration-150 hover:text-white">
              Pre-owned
            </Link>
          </FooterCol>

          <FooterCol title="Visit the showroom">
            <address className="not-italic text-[15px] leading-relaxed">
              {DEALER.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <dl className="mt-5 space-y-1.5 text-[15px]">
              {DEALER.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt>{h.days}</dt>
                  <dd className="text-white">{h.time}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 space-y-1.5 text-[15px]">
              <a href={DEALER.phoneHref} className="block text-white transition-colors duration-150 hover:text-white/70">
                Tel {DEALER.phoneDisplay}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="block text-white transition-colors duration-150 hover:text-white/70">
                WhatsApp {DEALER.whatsappDisplay}
              </a>
              <a href={`mailto:${DEALER.email}`} className="block text-white transition-colors duration-150 hover:text-white/70">
                {DEALER.email}
              </a>
            </div>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {DEALER.name}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-right">
            Vehicle prices, specifications and availability shown are illustrative sample data for this template and are not
            verified listings.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold text-white">{title}</h3>
      {children}
    </div>
  )
}
