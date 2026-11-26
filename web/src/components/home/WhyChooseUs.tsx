"use client";
import { EditableIcon, useSiteData } from "@deneb-ui/ui";
import { useDealerImages } from '@/lib/useDealer'
/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { BadgeCheck, Circle, FileText, Handshake, Landmark, type LucideIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

const BENEFIT_ICONS: Record<string, LucideIcon | undefined> = {
  'badge-check': BadgeCheck,
  'file-text': FileText,
  landmark: Landmark,
  handshake: Handshake,
  circle: Circle,
}

function BenefitIconFallback() {
  return <Circle className="h-6 w-6" strokeWidth={1.75} aria-hidden />
}

// Preserve the existing glyphs during SSR; load other picker choices on demand.
const AdditionalBenefitIcon = dynamic(async () => {
  const { DynamicIcon, iconNames } = await import('lucide-react/dynamic')
  return function AdditionalBenefitIcon({ name }: { name: string }) {
    const iconName = iconNames.find((icon) => icon === name) ?? 'circle'
    return <DynamicIcon name={iconName} size={24} strokeWidth={1.75} className="h-6 w-6" aria-hidden fallback={BenefitIconFallback} />
  }
}, { ssr: false, loading: BenefitIconFallback })

export function WhyChooseUs() {
  const siteData = useSiteData();
  const benefits: { title: string; body: string; icon?: string }[] = siteData.content?.["home"]?.benefits ?? []
  const IMAGES = useDealerImages()
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2
            className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]"
            data-preview-field-path="home.heading3"
            data-preview-style-target="home.heading3"
            data-preview-style-type="text">{siteData?.content?.home?.heading3 ?? "Why buyers come back to Apex."}</h2>
          <img
            src={siteData?.content?.home?.showroomImage ?? IMAGES.showroom}
            alt="The Apex Motors showroom"
            className="mt-10 aspect-[16/11] w-full object-cover lg:aspect-[4/3]"
            data-preview-field-path="home.showroomImage" />
        </div>
        <ul
          className="grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:pt-3"
          data-preview-list-path="home.benefits"
          data-preview-style-type="grid">
          {benefits.map(({ title, body, icon }, index) => {
            const name = (icon || 'circle').replace(/Icon$/i, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().trim() || 'circle'
            const Icon = Object.hasOwn(BENEFIT_ICONS, name) ? BENEFIT_ICONS[name] : undefined
            return (
            <li
              key={index}

              className="border-t border-line py-8"
              data-preview-item-path={`home.benefits[${index}]`}
              data-preview-style-type="card">
              <EditableIcon
                fieldPath={`home.benefits[${index}].icon`}
                data-preview-field-path={`home.benefits[${index}].icon`}
                name={name}
                className="h-6 w-6 text-accent"
                size={24}
                strokeWidth={1.75}
                style={{ display: 'flex' }}
                customIcon={Icon
                  ? <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  : <AdditionalBenefitIcon key={name} name={name} />}
              />
              <h3 className="mt-5 text-[19px] font-bold text-ink" data-preview-field-path={`home.benefits[${index}].title`}>{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted" data-preview-field-path={`home.benefits[${index}].body`}>{body}</p>
            </li>
           )})}
        </ul>
      </div>
    </section>
  );
}
