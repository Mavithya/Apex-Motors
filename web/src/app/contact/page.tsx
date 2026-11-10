import React from 'react'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { DEALER, whatsappLink } from '@/data/dealer'
import { Breadcrumb } from '@/components/ui/PageHeader'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata = { title: 'Contact' }

export default function Contact() {
  const showMap = true
  const methods = [
    { icon: Phone, label: 'Telephone', value: DEALER.phoneDisplay, href: DEALER.phoneHref },
    { icon: MessageCircle, label: 'WhatsApp', value: DEALER.whatsappDisplay, href: whatsappLink('Hello Apex Motors,'), newTab: true },
    { icon: Mail, label: 'Email', value: DEALER.email, href: `mailto:${DEALER.email}` },
  ]

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-5 pb-14 pt-8 sm:px-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <h1 className="mt-10 max-w-3xl text-[42px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[64px]">
            Visit, call or message us.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            WhatsApp is usually the quickest way to reach an advisor. For visits outside our opening hours, book an appointment.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          {/* Contact details */}
          <div className="lg:col-span-5">
            <ul className="border-t border-line">
              {methods.map(({ icon: Icon, label, value, href, newTab }) => (
                <li key={label} className="border-b border-line">
                  <a
                    href={href}
                    target={newTab ? '_blank' : undefined}
                    rel={newTab ? 'noreferrer' : undefined}
                    className="group flex items-center gap-4 py-5"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                    <span className="min-w-0">
                      <span className="block text-[13px] text-muted">{label}</span>
                      <span className="block truncate text-[19px] font-bold text-ink transition-colors duration-150 group-hover:text-accent">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <h2 className="flex items-center gap-2 text-[15px] font-bold text-ink">
                  <MapPin className="h-4 w-4 text-accent" aria-hidden /> Showroom
                </h2>
                <address className="mt-3 not-italic text-[15px] leading-relaxed text-graphite">
                  {DEALER.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-ink">Business hours</h2>
                <dl className="mt-3 space-y-1.5 text-[15px]">
                  {DEALER.hours.map((h) => (
                    <div key={h.days}>
                      <dt className="text-muted">{h.days}</dt>
                      <dd className="font-semibold text-graphite">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>

      {showMap && (
        <section aria-label="Map" className="bg-white">
          <iframe
            title={`Map showing ${DEALER.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(DEALER.mapQuery)}&output=embed`}
            className="block h-[420px] w-full border-0 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      )}
    </>
  )
}
