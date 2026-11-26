"use client";
import { EditableIcon, useSiteData } from "@deneb-ui/ui";
import { useDealerImages } from '@/lib/useDealer'
import React from 'react'
import { Banknote, Circle, Clock3, FileCheck2, Repeat, type LucideIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

import { PageHero } from '@/components/ui/PageHeader'
import { ButtonAnchor } from '@/components/ui/Button'
import { TradeInForm } from '@/components/forms/TradeInForm'



const DEFAULT_STEPS = [
  { title: 'Tell us about your car', body: 'Submit the form below with the basics. Photos can follow on WhatsApp.' },
  { title: 'Inspection', body: 'Bring the car to our showroom, or we can arrange to inspect it in the Colombo area.' },
  { title: 'Clear valuation', body: 'You receive an itemised offer explaining how we reached the figure.' },
  { title: 'Settle or trade', body: 'Take payment, or put the value straight towards your next vehicle.' },
]

const BENEFIT_ICONS: Record<string, LucideIcon | undefined> = {
  'clock-3': Clock3,
  repeat: Repeat,
  'file-check-corner': FileCheck2,
  banknote: Banknote,
  circle: Circle,
}

function BenefitIconFallback() {
  return <Circle className="h-5 w-5" strokeWidth={1.75} aria-hidden />
}

const AdditionalBenefitIcon = dynamic(async () => {
  const { DynamicIcon, iconNames } = await import('lucide-react/dynamic')
  return function AdditionalBenefitIcon({ name }: { name: string }) {
    const iconName = iconNames.find((icon) => icon === name) ?? 'circle'
    return <DynamicIcon name={iconName} size={20} strokeWidth={1.75} className="h-5 w-5" aria-hidden fallback={BenefitIconFallback} />
  }
}, { ssr: false, loading: BenefitIconFallback })

export default function SellYourCar() {
  const siteData = useSiteData();
  const benefits: { title: string; body: string; icon?: string }[] = siteData.content?.["sell-your-car"]?.benefits ?? []
  const STEPS: typeof DEFAULT_STEPS = siteData?.content?.["sell-your-car"]?.STEPS ?? DEFAULT_STEPS
  const IMAGES = useDealerImages()
  return (
    <>
      <PageHero
        editableImage
        data-preview-page-key="sell-your-car"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Sell or Trade In' }]}
        title={siteData?.content?.["sell-your-car"]?.hero?.yourCurrentCarWorthMore ?? "Your current car is worth more than you think."}
        intro={siteData.content?.common?.sectionCopy?.["sell-your-car_page_0"] ?? "Sell it to us outright or trade it in against your next vehicle. A clear valuation, no obligation, and no strangers on your doorstep."} introPath="common.sectionCopy.sell-your-car_page_0"
        image={siteData.content?.["sell-your-car"]?.hero?.image ?? IMAGES.rear} imagePath="sell-your-car.hero.image"
        data-preview-field-path="sell-your-car.hero.yourCurrentCarWorthMore"
        previewPath="sell-your-car.hero">
        <ButtonAnchor
          href="#valuation"
          size="lg"
          data-preview-field-path="sell-your-car.hero.getValuation"
          data-preview-style-target="sell-your-car.hero.getValuation"
          data-preview-style-type="text">{siteData?.content?.["sell-your-car"]?.hero?.getValuation ?? "Get a valuation"}</ButtonAnchor>
      </PageHero>

      {/* Process */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <h2
            className="text-[32px] font-extrabold tracking-[-0.02em] text-ink sm:text-[42px]"
            data-preview-field-path="sell-your-car.heading"
            data-preview-style-target="sell-your-car.heading"
            data-preview-style-type="text">{siteData?.content?.["sell-your-car"]?.heading ?? "How it works"}</h2>
          <ol
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4"
            data-preview-list-path="sell-your-car.STEPS"
            data-preview-style-target="sell-your-car.STEPS.grid"
            data-preview-style-type="grid">
            {STEPS.map((s, i: number) => (
              <li
                key={s.title}
                className="relative border-t-2 border-line pb-8 pr-8 pt-6"

                data-preview-style-target={`sell-your-car.STEPS[${i}].card`}
                data-preview-style-type="card" data-preview-item-path={`sell-your-car.STEPS[${i}]`}>
                <span className="absolute -top-[2px] left-0 h-[2px] w-12 bg-accent" aria-hidden data-preview-static="Interface label, control, or calculated value" />
                <span
                  className="text-[14px] font-bold text-accent"
                  data-preview-field-path="sell-your-car.stepLabel"
                  data-preview-style-target="sell-your-car.stepLabel"
                  data-preview-style-type="text">{siteData?.content?.["sell-your-car"]?.stepLabel ?? "Step"}{i + 1}</span>
                <h3 className="mt-3 text-[19px] font-bold text-ink" data-preview-field-path={`sell-your-car.STEPS[${i}].title`}>{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted" data-preview-field-path={`sell-your-car.STEPS[${i}].body`}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Form + benefits */}
      <section id="valuation" className="bg-paper py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2
              className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[36px]"
              data-preview-field-path="sell-your-car.heading2"
              data-preview-style-target="sell-your-car.heading2"
              data-preview-style-type="text">{siteData?.content?.["sell-your-car"]?.heading2 ?? "Why trade in with us"}</h2>
            <ul className="mt-8" data-preview-list-path="sell-your-car.benefits" data-preview-style-type="grid">
              {benefits.map(({ title, body, icon }, index) => {
            const name = (icon || 'circle').replace(/Icon$/i, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().trim() || 'circle'
            const Icon = Object.hasOwn(BENEFIT_ICONS, name) ? BENEFIT_ICONS[name] : undefined
            return (
                <li
                  key={index}

                  className="flex gap-4 border-t border-line py-5"
                  data-preview-item-path={`sell-your-car.benefits[${index}]`}
                  data-preview-style-type="card">
                  <EditableIcon
                    fieldPath={`sell-your-car.benefits[${index}].icon`}
                    data-preview-field-path={`sell-your-car.benefits[${index}].icon`}
                    name={name}
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    size={20}
                    strokeWidth={1.75}
                    style={{ display: 'flex' }}
                    customIcon={Icon
                      ? <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      : <AdditionalBenefitIcon key={name} name={name} />}
                  />
                  <div>
                    <h3 className="text-[16px] font-bold text-ink" data-preview-field-path={`sell-your-car.benefits[${index}].title`}>{title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted" data-preview-field-path={`sell-your-car.benefits[${index}].body`}>{body}</p>
                  </div>
                </li>
               )})}
        </ul>
          </div>

          <TradeInForm />
        </div>
      </section>
    </>
  );
}
