'use client'
import Link from '@/components/ui/SiteLink'
import { useSiteData, useProducts } from '@deneb-ui/ui'
import { useVehicleCatalog, useCatalogPath } from '@/lib/useVehicleCatalog'
import { useDealer } from '@/lib/useDealer'
import { vehicleFeatureGroups } from '@/lib/vehicleCatalog'
import React from 'react'
import { MessageCircle, Phone } from 'lucide-react'

import {  similarVehicles } from '@/data/vehicles'
import { formatKm, formatLKR , interpolateCopy } from '@/lib/utils'
import { Breadcrumb } from '@/components/ui/PageHeader'
import { ButtonAnchor } from '@/components/ui/Button'
import { VehicleCard } from '@/components/vehicles/VehicleCard'
import { FinanceCalculator } from '@/components/finance/FinanceCalculator'
import { Gallery } from '@/components/vehicles/Gallery'
import { EnquiryPanel } from '@/components/forms/EnquiryPanel'
import type { Vehicle } from '@/types/vehicle'

export function VehicleDetailsContent({ vehicle }: { vehicle: Vehicle }) {
  const siteData = useSiteData()
  const catalogPath = useCatalogPath()
  const catalog = useVehicleCatalog()
  const v = catalog.find((item) => item.id === vehicle.id) ?? vehicle
  const products = useProducts()
  const productIndex = products.findIndex((product) => String(product.id) === v.id)
  const productPath = productIndex >= 0 ? `${catalogPath}[${productIndex}]` : undefined
  const gallery = products[productIndex]?.gallery ?? []
  const imagePaths = v.images.map((image) => {
    const index = gallery.indexOf(image.src)
    return productPath && index >= 0 ? `${productPath}.gallery[${index}]` : undefined
  })
  const DEALER = useDealer()
  const whatsappLink = (message?: string) => (DEALER.whatsappUrl ?? `https://wa.me/${DEALER.whatsappNumber}`) + (message ? '?text=' + encodeURIComponent(message) : '')
  const name = `${v.make} ${v.model}`
  const waMessage = `Hello ${DEALER.name}, I'm interested in the ${v.year} ${name} ${v.variant} (Ref ${v.ref}) listed at ${formatLKR(v.price)}. Is it still available?`

  const specs: { label: string; value: string }[] = [
    { label: 'Engine capacity', value: v.engineCc ? `${v.engineCc.toLocaleString()} cc` : 'Not provided' },
    { label: 'Fuel type', value: v.fuel || 'Not provided' },
    { label: 'Transmission', value: v.transmission || 'Not provided' },
    { label: 'Mileage', value: v.mileage ? formatKm(v.mileage) : 'Not provided' },
    { label: 'Drive type', value: v.drive || 'Not provided' },
    { label: 'Body type', value: v.bodyType || 'Not provided' },
    { label: 'Exterior colour', value: v.exteriorColor || 'Not provided' },
    { label: 'Doors / seats', value: v.doors && v.seats ? `${v.doors} doors · ${v.seats} seats` : 'Not provided' },
    { label: 'Registration', value: v.registration || 'Not provided' },
  ]
  const groups = productIndex >= 0 ? vehicleFeatureGroups(products[productIndex]) : Object.entries(v.features).map(([name, items]) => ({ name, items: items ?? [] }))

  return (
    <div data-preview-list-path={catalogPath}><div>
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

        <div data-preview-item-path={productPath} className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-14">
          {/* Left: gallery and detail */}
          <div className="min-w-0">
            <Gallery key={v.id} images={v.images} name={name} model3DUrl={v.model3DUrl} model3DAttribution={v.model3DAttribution} previewPath={productPath ? `${productPath}.gallery` : undefined} coverPath={productPath ? `${productPath}.image` : undefined} imagePaths={imagePaths} productIndex={productIndex} catalogPath={catalogPath} galleryIndexes={v.images.map((image) => gallery.indexOf(image.src))} />

            {/* Quick specifications */}
            <section aria-labelledby="specs" className="mt-16">
              <h2
                id="specs"
                className="text-[26px] font-extrabold tracking-[-0.03em] text-ink"
                data-preview-field-path="vehicles.heading"
                data-preview-style-target="vehicles.heading"
                data-preview-style-type="text">{siteData?.content?.vehicles?.heading ?? "Specifications"}</h2>
              <dl
                className="mt-6 grid grid-cols-2 gap-x-6 bg-white px-5 sm:gap-x-10 sm:px-7"
                data-preview-style-type="grid">
                {specs.map((s, index: number) => (<div
                  key={s.label}
                  className="border-b border-line py-5"
                  data-preview-style-type="card">
                  <dt className="text-[12px] font-medium text-muted" data-preview-field-path={'common.specLabels.spec' + index}>{siteData.content?.common?.specLabels?.[`spec${index}`] ?? s.label}</dt>
                  {index === 5 ? <dd className="mt-1.5 text-[15px] font-semibold text-ink" data-preview-field-path={`catalog.products[${productIndex}].category`}>{s.value}</dd> : <dd className="mt-1.5 text-[15px] font-semibold text-ink" data-preview-static="Specification calculated from vehicle data">{s.value}</dd>}
                </div>))}
              </dl>
            </section>

            {/* Description */}
            <section aria-labelledby="about-car" className="mt-16">
              <h2
                id="about-car"
                className="text-[26px] font-extrabold tracking-[-0.03em] text-ink"
                data-preview-field-path="vehicles.heading2"
                data-preview-style-target="vehicles.heading2"
                data-preview-style-type="text">{siteData?.content?.vehicles?.heading2 ?? "About this vehicle"}</h2>
              <p className="mt-5 text-[19px] font-semibold leading-snug text-ink" data-preview-static="Interface label, control, or calculated value">{v.tagline}</p>
              <div className="mt-4 max-w-[68ch] space-y-4 text-[16px] leading-[1.7] text-graphite">
                {v.description.map((p) => (
                  <p data-preview-field-path={`catalog.products[${productIndex}].description`} key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <p
                className="mt-5 text-[14px] text-muted"
                data-preview-field-path="vehicles.subtitle2"
                data-preview-style-target="vehicles.subtitle2"
                data-preview-style-type="text">{siteData?.content?.vehicles?.subtitle2 ?? "Interior colour:"}<span className="font-semibold text-graphite">{v.interiorColor}</span>
              </p>
            </section>

            {/* Key features */}
            {(<section aria-labelledby="features" className="mt-16">
              <h2
                id="features"
                className="text-[26px] font-extrabold tracking-[-0.03em] text-ink"
                data-preview-field-path="vehicles.heading3"
                data-preview-style-target="vehicles.heading3"
                data-preview-style-type="text">{siteData?.content?.vehicles?.heading3 ?? "Key features"}</h2>
              <div data-preview-list-path={`catalog.products[${productIndex}].customData.vehicle.featureGroups`} className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {groups.map((group, groupIndex: number) => (
                  <div data-preview-item-path={`catalog.products[${productIndex}].customData.vehicle.featureGroups[${groupIndex}]`} key={group.name ?? `feature-group-${groupIndex}`}  className="border-t border-ink py-5">
                    <h3 data-preview-field-path={`catalog.products[${productIndex}].customData.vehicle.featureGroups[${groupIndex}].name`} className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink">{group.name}</h3>
                    <ul data-preview-list-path={`catalog.products[${productIndex}].customData.vehicle.featureGroups[${groupIndex}].items`} className="mt-3 space-y-2">
                      {group.items.map((f, index: number) => (
                        <li key={f ?? `feature-${index}`} data-preview-item-path={`catalog.products[${productIndex}].customData.vehicle.featureGroups[${groupIndex}].items[${index}]`} className="flex gap-3 text-[15px] text-graphite">
                          <span className="mt-[9px] h-1 w-3 shrink-0 bg-accent" aria-hidden data-preview-static="Interface label, control, or calculated value" />
                          <span data-preview-field-path={`catalog.products[${productIndex}].customData.vehicle.featureGroups[${groupIndex}].items[${index}]`}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>)}

            {/* Finance calculator */}
            <section aria-labelledby="finance" className="mt-16">
              <h2
                id="finance"
                className="text-[26px] font-extrabold tracking-[-0.03em] text-ink"
                data-preview-field-path="vehicles.heading4"
                data-preview-style-target="vehicles.heading4"
                data-preview-style-type="text">{siteData?.content?.vehicles?.heading4 ?? "Estimate your monthly payment"}</h2>
              <p
                className="mt-2 text-[15px] text-muted"
                data-preview-field-path="vehicles.subtitle5"
                data-preview-style-target="vehicles.subtitle5"
                data-preview-style-type="text">{interpolateCopy(siteData.content?.vehicles?.subtitle5 ?? "", { model: v.model })}</p>
              <div className="mt-6 border border-line">
                <FinanceCalculator key={`${v.id}:${v.price}`} initialPrice={v.price} lockPrice />
              </div>
            </section>
          </div>

          {/* Right: info + enquiry */}
          <aside className="lg:sticky lg:top-[96px] lg:self-start">
            <EnquiryPanel key={v.id} vehicle={v} waMessage={waMessage} initialMode="info" previewPath={productPath} />
          </aside>
        </div>

        {/* Similar vehicles */}
        <section className="border-t border-line bg-white py-20">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
            <h2
              className="text-[30px] font-extrabold tracking-[-0.02em] text-ink sm:text-[36px]"
              data-preview-field-path="vehicles.heading5"
              data-preview-style-target="vehicles.heading5"
              data-preview-style-type="text">{siteData?.content?.vehicles?.heading5 ?? "You may also consider"}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similarVehicles(v, 3, catalog).map((s) => (
                <VehicleCard key={s.id} vehicle={s} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-ink pb-28 pt-20 lg:pb-20">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2
                className="text-[32px] font-extrabold tracking-[-0.02em] text-white sm:text-[42px]"
                data-preview-field-path="vehicles.heading6"
                data-preview-style-target="vehicles.heading6"
                data-preview-style-type="text">{siteData?.content?.vehicles?.heading6 ?? "Interested in this vehicle?"}</h2>
              <p
                className="mt-3 max-w-lg text-[16px] text-white/70"
                data-preview-field-path="vehicles.description"
                data-preview-style-target="vehicles.description"
                data-preview-style-type="text">{interpolateCopy(siteData.content?.vehicles?.description ?? "", { year: v.year, name, ref: v.ref })}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonAnchor href={DEALER.phoneHref} size="lg" variant="light">
                <Phone className="h-4 w-4"  data-preview-static="Decorative icon" /> <span data-preview-field-path="vehicles.call" data-preview-style-target="vehicles.call" data-preview-style-type="text">{siteData?.content?.vehicles?.call ?? "Call"}</span> <span data-preview-static="Computed interface value">{DEALER.phoneDisplay}</span>
              </ButtonAnchor>
              <ButtonAnchor href={whatsappLink(waMessage)} size="lg" newTab>
                <MessageCircle className="h-4 w-4"  data-preview-static="Decorative icon" /> <span
                  data-preview-field-path="vehicles.whatsappUs"
                  data-preview-style-target="vehicles.whatsappUs"
                  data-preview-style-type="text">{siteData?.content?.vehicles?.whatsappUs ?? "WhatsApp us"}</span>
              </ButtonAnchor>
            </div>
          </div>
        </section>

        {/* Mobile action bar: sticks to the bottom while scrolling, never covers the footer */}
        <div className="sticky bottom-0 z-30 border-t border-line bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] text-muted" data-preview-static="Interface label, control, or calculated value">{name}</p>
              <p className="truncate text-[15px] font-extrabold text-ink" data-preview-static="Interface label, control, or calculated value">{formatLKR(v.price)}</p>
            </div>
            <Link href={DEALER.phoneHref} aria-label="Call" className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-line text-ink">
              <Phone className="h-4 w-4" />
            </Link>
            <Link
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 items-center gap-2 rounded-[3px] bg-accent px-4 text-[14px] font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> <span
                data-preview-field-path="vehicles.whatsapp"
                data-preview-style-target="vehicles.whatsapp"
                data-preview-style-type="text">{siteData?.content?.vehicles?.whatsapp ?? "WhatsApp"}</span>
            </Link>
          </div>
        </div>
      </div></div>
  );
}
