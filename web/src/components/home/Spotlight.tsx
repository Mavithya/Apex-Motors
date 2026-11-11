"use client";
import { useSiteData, platformProductDetailHref } from "@deneb-ui/ui";
import { useVehicleCatalog } from '@/lib/useVehicleCatalog'
import { useDealerImages } from '@/lib/useDealer'
/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { formatLKR , interpolateCopy } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/Button'

const SPOTLIGHT_SLUG = 'land-rover-defender-110-2025'

/** Manufacturer-style campaign block for one hero vehicle. */
export function Spotlight() {
  const siteData = useSiteData();
  const IMAGES = useDealerImages()
  const VEHICLES = useVehicleCatalog()
  const getVehicle = (slug: string) => VEHICLES.find((vehicle) => vehicle.slug === slug)
  const v = getVehicle(SPOTLIGHT_SLUG)
  const specs: { label: string; value: string; unit: string }[] = siteData?.content?.home?.specs ?? []
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[60px] lg:col-span-7 lg:text-[76px]"
            data-preview-field-path="home.heading2"
            data-preview-style-target="home.heading2"
            data-preview-style-type="text">{siteData?.content?.home?.heading2 ?? "Meet your next adventure."}</h2>
          <p
            className="max-w-md text-[17px] leading-relaxed text-muted lg:col-span-5 lg:pb-3"
            data-preview-field-path="home.description"
            data-preview-style-target="home.description"
            data-preview-style-type="text">{siteData?.content?.home?.description ?? "The new Defender 110 goes wherever the road ends — up through the tea country, down to the coast — then drives home in near silence."}</p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1600px] sm:px-8">
        <img
          src={siteData?.content?.home?.spotlightImage ?? IMAGES.spotlight}
          alt="Land Rover Defender on a mountain road through tea plantations at dawn"
          className="aspect-[16/10] w-full object-cover sm:aspect-[21/9]"
          data-preview-field-path="home.spotlightImage" />
      </div>

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-10 border-b border-line py-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p
              className="text-[13px] font-semibold text-muted"
              data-preview-field-path="home.subtitle4"
              data-preview-style-target="home.subtitle4"
              data-preview-style-type="text">{interpolateCopy(siteData.content?.home?.subtitle4 ?? "", { year: v?.year, ref: v?.ref })}</p>
            <h3 className="mt-1 text-[28px] font-extrabold leading-tight text-ink" data-preview-static="chrome">
              {v ? `${v.make} ${v.model} 110` : 'Explore our collection'}
            </h3>
            <p className="mt-1 text-[17px] font-semibold text-graphite" data-preview-static="Interface label, control, or calculated value">{v ? formatLKR(v.price) : 'Contact us for vehicle availability'}</p>
          </div>
          <dl
            className="grid grid-cols-3 gap-4 lg:col-span-5"
            data-preview-list-path="home.specs"
            data-preview-style-target="home.specs.grid"
            data-preview-style-type="grid">
            {specs.map((s, index: number) => (<div
              key={s.label}
              className="border-l border-line pl-4"

              data-preview-style-target={`home.specs[${index}].card`}
              data-preview-style-type="card" data-preview-item-path={`home.specs[${index}]`}>
              <dt className="sr-only" data-preview-static="Interface label, control, or calculated value">{s.label}</dt>
              <dd>
                <span
                  className="text-[30px] font-extrabold tracking-[-0.02em] text-ink sm:text-[36px]"
                  data-preview-field-path={`home.specs[${index}].value`}>{s.value}</span>
                <span className="ml-1 text-[15px] font-semibold text-muted" data-preview-field-path={`home.specs[${index}].unit`}>{s.unit}</span>
                <p className="mt-1 text-[13px] leading-snug text-muted" data-preview-field-path={`home.specs[${index}].label`}>{s.label}</p>
              </dd>
            </div>))}
          </dl>
          <div className="lg:col-span-3 lg:text-right">
            <ButtonLink to={v ? platformProductDetailHref(v.id) : '/vehicles'} size="lg" variant="dark">
              <span
                data-preview-field-path="home.exploreVehicle2"
                data-preview-style-target="home.exploreVehicle2"
                data-preview-style-type="text">{siteData?.content?.home?.exploreVehicle2 ?? "Explore This Vehicle"}</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
