'use client'
import { useSiteData } from '@deneb-ui/ui'
import { AdditionalPagesLinks } from './AdditionalPagesLinks'
import { useDealer } from '@/lib/useDealer'
import React from 'react'
import { FOOTER_LINKS as DEFAULT_FOOTER_LINKS } from '@/data/navigation'
import { CATEGORIES as DEFAULT_CATEGORIES } from '@/data/vehicles'
import Link from '@/components/ui/SiteLink'
import { Logo } from './Logo'

export function Footer() {
  const siteData = useSiteData()
  const DEALER = useDealer()
  const whatsappLink = (message?: string) => (DEALER.whatsappUrl ?? `https://wa.me/${DEALER.whatsappNumber}`) + (message ? '?text=' + encodeURIComponent(message) : '')
  const CATEGORIES: typeof DEFAULT_CATEGORIES = siteData?.content?.common?.CATEGORIES ?? DEFAULT_CATEGORIES;
  const FOOTER_LINKS: typeof DEFAULT_FOOTER_LINKS = siteData?.content?.common?.FOOTER_LINKS ?? DEFAULT_FOOTER_LINKS;
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p data-preview-field-path="dealer.description" className="mt-6 text-[15px] leading-relaxed">{DEALER.description}</p>
            <div data-preview-list-path="dealer.socials" className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {DEALER.socials.map((s, index: number) => (
                <Link
                  key={s.href ?? `social-${index}`}
                  data-preview-item-path={`dealer.socials[${index}]`} href={s.href}

                  data-preview-field-path={`dealer.socials[${index}].href`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-white transition-colors duration-150 hover:text-white/60"
                >
                  <span data-preview-field-path={`dealer.socials[${index}].label`}>{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <FooterCol
            title={siteData?.content?.common?.footer?.explore2 ?? "Explore"} data-preview-field-path="common.footer.explore2"
            data-preview-list-path="common.FOOTER_LINKS"
            data-preview-style-target="common.FOOTER_LINKS.grid"
            data-preview-style-type="grid"
            previewPath="common.footer">
            {FOOTER_LINKS.map((l, index: number) => (<Link
              key={l.to}
              href={l.to}
              className="block py-1.5 text-[15px] transition-colors duration-150 hover:text-white"

              data-preview-style-target={`common.FOOTER_LINKS[${index}].card`}
              data-preview-style-type="card"
              data-preview-field-path={`common.FOOTER_LINKS[${index}].to`} data-preview-item-path={`common.FOOTER_LINKS[${index}]`}>
              <span data-preview-field-path={`common.FOOTER_LINKS[${index}].label`}>{l.label}</span>
            </Link>))}
          </FooterCol>

          <FooterCol
            title={siteData?.content?.common?.footer?.vehicles2 ?? "Vehicles"} data-preview-field-path="common.footer.vehicles2"
            data-preview-list-path="common.CATEGORIES"
            data-preview-style-target="common.CATEGORIES.grid"
            data-preview-style-type="grid"
            previewPath="common.footer">
            {CATEGORIES.map((c, index: number) => (<Link
              key={c.slug}
              href={`/vehicles?category=${c.slug}`}
              className="block py-1.5 text-[15px] transition-colors duration-150 hover:text-white"

              data-preview-style-target={`common.CATEGORIES[${index}].card`}
              data-preview-style-type="card"
              data-preview-field-path={`common.CATEGORIES[${index}].label`} data-preview-item-path={`common.CATEGORIES[${index}]`}>
              {c.label}
            </Link>))}
            <Link
              href={siteData?.content?.common?.footer?.brandNewUrl ?? "/vehicles?condition=New"}
              className="block py-1.5 text-[15px] transition-colors duration-150 hover:text-white"
              data-preview-field-path={"common.footer.brandNewUrl"}
              data-preview-style-target="common.footer.brandNewLabel"
              data-preview-style-type="text">
              <span
                data-preview-field-path="common.footer.brandNewLabel"
                data-preview-style-target="common.footer.brandNewLabel"
                data-preview-style-type="text">{siteData?.content?.common?.footer?.brandNewLabel ?? "Brand new"}</span>
            </Link>
            <Link
              href={siteData?.content?.common?.footer?.preOwnedUrl ?? "/vehicles?condition=Used"}
              className="block py-1.5 text-[15px] transition-colors duration-150 hover:text-white"
              data-preview-field-path={"common.footer.preOwnedUrl"}
              data-preview-style-target="common.footer.preOwnedLabel"
              data-preview-style-type="text">
              <span
                data-preview-field-path="common.footer.preOwnedLabel"
                data-preview-style-target="common.footer.preOwnedLabel"
                data-preview-style-type="text">{siteData?.content?.common?.footer?.preOwnedLabel ?? "Pre-owned"}</span>
            </Link>
          </FooterCol>

          <FooterCol
            title={siteData?.content?.common?.footer?.visitShowroom ?? "Visit the showroom"}
            data-preview-field-path="common.footer.visitShowroom"
            previewPath="common.footer">
            <address data-preview-list-path="dealer.addressLines" className="not-italic text-[15px] leading-relaxed">
              {DEALER.addressLines.map((l, index: number) => (
                <span key={l ?? `address-${index}`} data-preview-item-path={`dealer.addressLines[${index}]`} data-preview-field-path={`dealer.addressLines[${index}]`} className="block">
                  {l}
                </span>
              ))}
            </address>
            <dl data-preview-list-path="dealer.hours" className="mt-5 space-y-1.5 text-[15px]">
              {DEALER.hours.map((h, index: number) => (
                <div data-preview-item-path={`dealer.hours[${index}]`} key={h.days ?? `hours-${index}`}  className="flex justify-between gap-4">
                  <dt><span data-preview-field-path={`dealer.hours[${index}].days`}>{h.days}</span></dt>
                  <dd className="text-white"><span data-preview-field-path={`dealer.hours[${index}].time`}>{h.time}</span></dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 space-y-1.5 text-[15px]">
              <Link href={DEALER.phoneHref} className="block text-white transition-colors duration-150 hover:text-white/70">
                <span
                  data-preview-field-path="common.footer.tel"
                  data-preview-style-target="common.footer.tel"
                  data-preview-style-type="text">{siteData?.content?.common?.footer?.tel ?? "Tel"}</span> {DEALER.phoneDisplay}
              </Link>
              <Link data-preview-field-path="dealer.whatsappUrl" href={whatsappLink()} target="_blank" rel="noreferrer" className="block text-white transition-colors duration-150 hover:text-white/70">
                <span
                  data-preview-field-path="common.footer.whatsapp"
                  data-preview-style-target="common.footer.whatsapp"
                  data-preview-style-type="text">{siteData?.content?.common?.footer?.whatsapp ?? "WhatsApp"}</span> <span data-preview-field-path="dealer.whatsappDisplay">{DEALER.whatsappDisplay}</span>
              </Link>
              <Link data-preview-field-path="dealer.email" href={`mailto:${DEALER.email}`} className="block text-white transition-colors duration-150 hover:text-white/70">
                {DEALER.email}
              </Link>
            </div>
          </FooterCol>
        </div>

        <nav aria-labelledby="label-footer-0"><span id="label-footer-0" className="sr-only" data-preview-static="Accessibility label">Policies and information</span><AdditionalPagesLinks /></nav>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p data-preview-field-path="common.copyright">{siteData.content?.common?.copyright ?? "? Apex Motors. All rights reserved."}</p>
          <p
            className="max-w-xl md:text-right"
            data-preview-field-path="common.footer.description"
            data-preview-style-target="common.footer.description"
            data-preview-style-type="text">{siteData?.content?.common?.footer?.description ?? "Vehicle prices, specifications and availability shown are illustrative sample data for this template and are not verified listings."}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
    'data-preview-field-path': fieldPath,
  'data-preview-list-path': listPath
}: { title: string; children: React.ReactNode; previewPath?: string; 'data-preview-field-path'?: string; 'data-preview-list-path'?: string }) {
  return (
    <div data-preview-list-path={listPath}>
      <h3
        className="mb-4 text-sm font-bold text-white"
        data-preview-field-path={fieldPath} data-preview-static={fieldPath ? undefined : "Interface label"}>{title}</h3>
      {children}
    </div>
  );
}
