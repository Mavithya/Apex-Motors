/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { VEHICLES } from '@/data/vehicles'
import Link from '@/components/ui/SiteLink'
import { formatLKR } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/PageHeader'

/** Dark, horizontally scrolling showcase — deliberately unlike the card grid above. */
export function NewArrivals() {
  const siteData = useSiteData();
  const track = useRef<HTMLDivElement>(null)
  const arrivals = VEHICLES.filter((v) => v.newArrival).sort((a, b) => b.addedOn.localeCompare(a.addedOn))

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="overflow-clip bg-ink py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          tone="light"
          title={siteData?.content?.home?.justArrived ?? "Just arrived"}
          intro={siteData.content?.common?.sectionCopy?.["home_NewArrivals_0"] ?? "The latest additions to the showroom floor. New stock moves quickly — enquire early to arrange a viewing."} introPath="common.sectionCopy.home_NewArrivals_0"
          action={
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous vehicles"
                className="flex h-12 w-12 items-center justify-center border border-white/25 transition-colors duration-150 hover:border-white" data-preview-static="Interface label, control, or calculated value"
              >
                <ArrowLeft className="h-5 w-5" data-preview-static="decorative-icon" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next vehicles"
                className="flex h-12 w-12 items-center justify-center border border-white/25 transition-colors duration-150 hover:border-white" data-preview-static="Interface label, control, or calculated value"
              >
                <ArrowRight className="h-5 w-5" data-preview-static="decorative-icon" />
              </button>
            </div>
          }
          previewPath="home" />
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 sm:px-8 xl:px-[max(2rem,calc((100%-1320px)/2+2rem))]"
      >
        {arrivals.map((v) => (
          <article key={v.id} className="group w-[84%] shrink-0 snap-start sm:w-[58%] lg:w-[42%]">
            <Link href={`/vehicles/${v.slug}`} className="block aspect-[16/10] overflow-hidden bg-ink-soft" tabIndex={-1} aria-hidden>
              <img
                src={siteData?.content?.home?.form?.srcImage || v.images[0].src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                data-preview-field-path="home.form.srcImage" />
            </Link>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-white/15 pt-5">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white/50" data-preview-static="chrome">
                  {v.year} · {v.condition === 'New' ? 'Brand new' : 'Pre-owned'}
                </p>
                <h3 className="mt-1 text-[24px] font-bold leading-tight" data-preview-static="Interface label, control, or calculated value">
                  {v.make} {v.model}
                </h3>
                <p className="mt-1 text-[16px] font-semibold text-white/80" data-preview-static="Interface label, control, or calculated value">{formatLKR(v.price)}</p>
              </div>
              <ButtonLink to={`/vehicles/${v.slug}`} variant="outline-light">
                <span
                  data-preview-style-target="home.exploreVehicle"
                  data-preview-style-type="text" data-preview-static="Interface label, control, or calculated value">{siteData?.content?.home?.exploreVehicle ?? "Explore Vehicle"}</span>
              </ButtonLink>
            </div>
          </article>
        ))}
        <div className="w-px shrink-0" aria-hidden />
      </div>
    </section>
  );
}
