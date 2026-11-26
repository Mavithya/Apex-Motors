"use client";
import Link from '@/components/ui/SiteLink'
import { EditableIcon, EditableMap, useSiteData } from "@deneb-ui/ui";
import { useDealer } from '@/lib/useDealer'
import React from 'react'
import { Circle, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Breadcrumb } from '@/components/ui/PageHeader'
import { ContactForm } from '@/components/forms/ContactForm'

const CONTACT_ICONS: Record<string, LucideIcon | undefined> = {
  phone: Phone,
  'message-circle': MessageCircle,
  mail: Mail,
  'map-pin': MapPin,
  circle: Circle,
}

function ContactIconFallback() {
  return <Circle className="h-full w-full" strokeWidth={1.75} aria-hidden />
}

const AdditionalContactIcon = dynamic(async () => {
  const { DynamicIcon, iconNames } = await import('lucide-react/dynamic')
  return function AdditionalContactIcon({ name }: { name: string }) {
    const iconName = iconNames.find((icon) => icon === name) ?? 'circle'
    return <DynamicIcon name={iconName} className="h-full w-full" strokeWidth={1.75} aria-hidden fallback={ContactIconFallback} />
  }
}, { ssr: false, loading: ContactIconFallback })

function normalizeIcon(name: string) {
  return name.replace(/Icon$/i, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().trim() || 'circle'
}

function ContactGlyph({ name }: { name: string }) {
  const Icon = Object.hasOwn(CONTACT_ICONS, name) ? CONTACT_ICONS[name] : undefined
  return Icon ? <Icon className="h-full w-full" strokeWidth={1.75} aria-hidden /> : <AdditionalContactIcon key={name} name={name} />
}

export default function Contact() {
  const siteData = useSiteData();
  const DEALER = useDealer()
  const whatsappLink = (message?: string) => (DEALER.whatsappUrl ?? `https://wa.me/${DEALER.whatsappNumber}`) + (message ? '?text=' + encodeURIComponent(message) : '')
  const icons = siteData.content?.contact?.icons
  let mapLocation = DEALER.mapQuery
  // Earlier exports stored an encoded address. Google Maps needs it encoded once.
  if (!/^https?:\/\//i.test(mapLocation)) {
    try { mapLocation = decodeURIComponent(mapLocation) } catch { /* Keep a literal address containing an unmatched percent sign. */ }
  }
  const methods = [
    { icon: normalizeIcon(icons?.telephone ?? 'phone'), iconPath: 'contact.icons.telephone', label: 'Telephone', value: DEALER.phoneDisplay, href: DEALER.phoneHref },
    { icon: normalizeIcon(icons?.whatsapp ?? 'message-circle'), iconPath: 'contact.icons.whatsapp', label: 'WhatsApp', value: DEALER.whatsappDisplay, href: whatsappLink('Hello Apex Motors,'), newTab: true },
    { icon: normalizeIcon(icons?.email ?? 'mail'), iconPath: 'contact.icons.email', label: 'Email', value: DEALER.email, href: `mailto:${DEALER.email}` },
  ]
  const showroomIcon = normalizeIcon(icons?.showroom ?? 'map-pin')

  return (
    <>
      <section data-preview-page-key="contact" className="bg-white">
        <div className="mx-auto max-w-[1320px] px-5 pb-14 pt-8 sm:px-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <h1
            className="mt-10 max-w-3xl text-[42px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[64px]"
            data-preview-field-path="contact.title"
            data-preview-style-target="contact.title"
            data-preview-style-type="text">{siteData?.content?.contact?.title ?? "Visit, call or message us."}</h1>
          <p
            className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted"
            data-preview-field-path="contact.description"
            data-preview-style-target="contact.description"
            data-preview-style-type="text">{siteData?.content?.contact?.description ?? "WhatsApp is usually the quickest way to reach an advisor. For visits outside our opening hours, book an appointment."}</p>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          {/* Contact details */}
          <div className="lg:col-span-5">
            <ul className="border-t border-line" data-preview-style-target="contact.methods.grid" data-preview-style-type="grid">
              {methods.map(({ icon, iconPath, label, value, href, newTab }) => (
                <li
                  key={label}
                  className="border-b border-line"
                  data-preview-style-target="contact.methods[*].card"
                  data-preview-style-type="card">
                  <Link
                    href={href}
                    target={newTab ? '_blank' : undefined}
                    rel={newTab ? 'noreferrer' : undefined}
                    className="group flex items-center gap-4 py-5"
                    data-preview-field-path="contact.label"
                    data-preview-style-target="contact.label"
                    data-preview-style-type="button">
                    <EditableIcon
                      fieldPath={iconPath}
                      data-preview-field-path={iconPath}
                      name={icon}
                      size={20}
                      className="h-5 w-5 shrink-0 text-accent"
                      strokeWidth={1.75}
                      style={{ display: 'flex' }}
                      customIcon={<ContactGlyph name={icon} />} />
                    <span className="min-w-0">
                      <span className="block text-[13px] text-muted">{label}</span>
                      <span className="block truncate text-[19px] font-bold text-ink transition-colors duration-150 group-hover:text-accent">
                        {value}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <h2
                  className="flex items-center gap-2 text-[15px] font-bold text-ink"
                  data-preview-style-target="contact.heading"
                  data-preview-style-type="text">
                  <EditableIcon
                    fieldPath="contact.icons.showroom"
                    data-preview-field-path="contact.icons.showroom"
                    name={showroomIcon}
                    size={16}
                    className="h-4 w-4 text-accent"
                    strokeWidth={1.75}
                    style={{ display: 'flex' }}
                    customIcon={<ContactGlyph name={showroomIcon} />} />
                  <span data-preview-field-path="contact.heading">{siteData?.content?.contact?.heading ?? "Showroom"}</span>
                </h2>
                <address data-preview-list-path="dealer.addressLines" className="mt-3 not-italic text-[15px] leading-relaxed text-graphite">
                  {DEALER.addressLines.map((l, index) => (
                    <span key={index} data-preview-item-path={`dealer.addressLines[${index}]`} data-preview-field-path={`dealer.addressLines[${index}]`} className="block">
                      {l}
                    </span>
                  ))}
                </address>
              </div>
              <div>
                <h2
                  className="text-[15px] font-bold text-ink"
                  data-preview-field-path="contact.heading2"
                  data-preview-style-target="contact.heading2"
                  data-preview-style-type="text">{siteData?.content?.contact?.heading2 ?? "Business hours"}</h2>
                <dl data-preview-list-path="dealer.hours" className="mt-3 space-y-1.5 text-[15px]">
                  {DEALER.hours.map((h, index) => (
                    <div key={index} data-preview-item-path={`dealer.hours[${index}]`}>
                      <dt data-preview-field-path={`dealer.hours[${index}].days`} className="text-muted">{h.days}</dt>
                      <dd data-preview-field-path={`dealer.hours[${index}].time`} className="font-semibold text-graphite">{h.time}</dd>
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

        <section aria-labelledby="label-page-0" className="bg-white"><span id="label-page-0" className="sr-only" data-preview-static="Accessibility label">Map</span>
          <EditableMap
            data-preview-field-path="dealer.mapQuery"
            title={`Map showing ${DEALER.name}`}
            mapUrl={mapLocation}
            address={DEALER.addressLines.join(', ')}
            defaultLocation={DEALER.city}
            className="block h-[420px] w-full border-0 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
    </>
  );
}
