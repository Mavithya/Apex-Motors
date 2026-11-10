import { notFound } from 'next/navigation'
import React from 'react'
import { MessageCircle, Phone } from 'lucide-react'

import { DEALER, whatsappLink } from '@/data/dealer'
import { getVehicle, similarVehicles, VEHICLES } from '@/data/vehicles'
import { formatKm, formatLKR } from '@/lib/utils'
import { Breadcrumb } from '@/components/ui/PageHeader'
import { ButtonAnchor } from '@/components/ui/Button'
import { VehicleCard } from '@/components/vehicles/VehicleCard'
import { FinanceCalculator } from '@/components/finance/FinanceCalculator'
import { Gallery } from '@/components/vehicles/Gallery'
import { EnquiryPanel } from '@/components/forms/EnquiryPanel'
import type { FeatureGroup } from '@/types/vehicle'

const FEATURE_ORDER: FeatureGroup[] = ['Safety', 'Comfort', 'Interior', 'Exterior', 'Technology']

export function generateStaticParams() {
  return VEHICLES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const v = getVehicle((await params).slug)
  return { title: v ? `${v.year} ${v.make} ${v.model}` : 'Vehicle not found' }
}

export default async function VehicleDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const v = getVehicle(slug)
  if (!v) notFound()
  const name = `${v.make} ${v.model}`
  const waMessage = `Hello ${DEALER.name}, I'm interested in the ${v.year} ${name} ${v.variant} (Ref ${v.ref}) listed at ${formatLKR(v.price)}. Is it still available?`

  const specs = [
    { label: 'Engine capacity', value: `${v.engineCc.toLocaleString()} cc` },
    { label: 'Fuel type', value: v.fuel },
    { label: 'Transmission', value: v.transmission },
    { label: 'Mileage', value: formatKm(v.mileage) },
    { label: 'Drive type', value: v.drive },
    { label: 'Body type', value: v.bodyType },
    { label: 'Exterior colour', value: v.exteriorColor },
    { label: 'Doors / seats', value: `${v.doors} doors · ${v.seats} seats` },
    { label: 'Registration', value: v.registration },
  ]
  const groups = FEATURE_ORDER.filter((g) => v.features[g]?.length)

  return (
    <>
      <div className="mx-auto max-w-[1320px] px-5 pt-6 sm:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Vehicles', to: '/vehicles' },
            { label: v.make, to: `/vehicles?make=${encodeURIComponent(v.make)}` },
            { label: name },
          ]}
        />
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-14">
        {/* Left: gallery and detail */}
        <div className="min-w-0">
          <Gallery key={v.id} images={v.images} name={name} />

          {/* Quick specifications */}
          <section aria-labelledby="specs" className="mt-14">
            <h2 id="specs" className="text-[24px] font-extrabold tracking-[-0.01em] text-ink">
              Specifications
            </h2>
            <dl className="mt-6 grid grid-cols-2 border-l border-t border-line bg-white sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="border-b border-r border-line px-4 py-4 sm:px-5">
                  <dt className="text-[12px] font-medium text-muted">{s.label}</dt>
                  <dd className="mt-1 text-[15px] font-bold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Description */}
          <section aria-labelledby="about-car" className="mt-14">
            <h2 id="about-car" className="text-[24px] font-extrabold tracking-[-0.01em] text-ink">
              About this vehicle
            </h2>
            <p className="mt-5 text-[19px] font-semibold leading-snug text-ink">{v.tagline}</p>
            <div className="mt-4 max-w-[68ch] space-y-4 text-[16px] leading-[1.7] text-graphite">
              {v.description.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-5 text-[14px] text-muted">
              Interior colour: <span className="font-semibold text-graphite">{v.interiorColor}</span>
            </p>
          </section>

          {/* Key features */}
          {groups.length > 0 && (
            <section aria-labelledby="features" className="mt-14">
              <h2 id="features" className="text-[24px] font-extrabold tracking-[-0.01em] text-ink">
                Key features
              </h2>
              <div className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {groups.map((g) => (
                  <div key={g} className="border-t border-ink py-5">
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink">{g}</h3>
                    <ul className="mt-3 space-y-2">
                      {v.features[g]!.map((f) => (
                        <li key={f} className="flex gap-3 text-[15px] text-graphite">
                          <span className="mt-[9px] h-1 w-3 shrink-0 bg-accent" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Finance calculator */}
          <section aria-labelledby="finance" className="mt-14">
            <h2 id="finance" className="text-[24px] font-extrabold tracking-[-0.01em] text-ink">
              Estimate your monthly payment
            </h2>
            <p className="mt-2 text-[15px] text-muted">Adjust the deposit and term to see how this {v.model} could fit your budget.</p>
            <div className="mt-6 border border-line">
              <FinanceCalculator key={v.id} initialPrice={v.price} lockPrice />
            </div>
          </section>
        </div>

        {/* Right: info + enquiry */}
        <aside className="lg:sticky lg:top-[88px] lg:self-start">
          <EnquiryPanel key={v.id} vehicle={v} waMessage={waMessage} initialMode="info" />
        </aside>
      </div>

      {/* Similar vehicles */}
      <section className="border-t border-line bg-white py-20">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <h2 className="text-[30px] font-extrabold tracking-[-0.02em] text-ink sm:text-[36px]">You may also consider</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similarVehicles(v, 3).map((s) => (
              <VehicleCard key={s.id} vehicle={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink pb-28 pt-20 lg:pb-20">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[32px] font-extrabold tracking-[-0.02em] text-white sm:text-[42px]">Interested in this vehicle?</h2>
            <p className="mt-3 max-w-lg text-[16px] text-white/70">
              Speak to an advisor about the {v.year} {name}, ref {v.ref}. We usually reply within the hour during opening times.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonAnchor href={DEALER.phoneHref} size="lg" variant="light">
              <Phone className="h-4 w-4" /> Call {DEALER.phoneDisplay}
            </ButtonAnchor>
            <ButtonAnchor href={whatsappLink(waMessage)} size="lg" newTab>
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </ButtonAnchor>
          </div>
        </div>
      </section>

      {/* Mobile action bar: sticks to the bottom while scrolling, never covers the footer */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] text-muted">{name}</p>
            <p className="truncate text-[15px] font-extrabold text-ink">{formatLKR(v.price)}</p>
          </div>
          <a href={DEALER.phoneHref} aria-label="Call" className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-line text-ink">
            <Phone className="h-4 w-4" />
          </a>
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 items-center gap-2 rounded-[3px] bg-accent px-4 text-[14px] font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
