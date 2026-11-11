"use client";
import { useSiteData } from "@deneb-ui/ui";
import { useVehicleCatalog } from '@/lib/useVehicleCatalog'
/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES as DEFAULT_CATEGORIES } from '@/data/vehicles'
import Link from '@/components/ui/SiteLink'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/PageHeader'

/** Asymmetric tile mosaic: SUVs lead, as the largest share of stock. */
export function CategoryGrid() {
  const siteData = useSiteData();
  const VEHICLES = useVehicleCatalog()
  const CATEGORIES: typeof DEFAULT_CATEGORIES = siteData?.content?.home?.CATEGORIES ?? DEFAULT_CATEGORIES;
  return (
    <section className="mx-auto max-w-[1320px] px-5 pb-24 pt-20 sm:px-8 lg:py-28">
      <SectionHeading
        title={siteData?.content?.home?.exploreCategory ?? "Explore by category"}
        intro={siteData.content?.common?.sectionCopy?.["home_CategoryGrid_0"] ?? "Start with the shape of car that fits your life, then narrow it down."} introPath="common.sectionCopy.home_CategoryGrid_0"
        data-preview-field-path="home.exploreCategory"
        previewPath="home" />
      <div
        className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
        data-preview-list-path="home.CATEGORIES"
        data-preview-style-target="home.CATEGORIES.grid"
        data-preview-style-type="grid">
        {CATEGORIES.map((c, i: number) => {
          const count = VEHICLES.filter((v) => v.categories.includes(c.slug)).length
          const lead = i === 0
          const last = i === CATEGORIES.length - 1
          return (
            <Link
              key={c.slug}
              href={c.to ?? `/vehicles?category=${c.slug}`}
              data-preview-field-path={`home.CATEGORIES[${i}].to`}
              className={cn(
                'group relative isolate flex overflow-clip bg-ink',
                lead
                  ? 'col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto'
                  : last
                    ? 'col-span-2 aspect-[16/10] sm:aspect-[2/1] lg:col-span-1 lg:aspect-[4/3]'
                    : 'aspect-[4/5] sm:aspect-[4/3]'
              )}

              data-preview-style-target={`home.CATEGORIES[${i}].card`}
              data-preview-style-type="card" data-preview-item-path={`home.CATEGORIES[${i}]`}>
              <img
                src={(c.image && typeof c.image === 'string' && c.image.trim() !== '') ? c.image : undefined}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80 transition-[transform,opacity] duration-300 ease-out group-hover:scale-[1.03] group-hover:opacity-90"
                data-preview-field-path={`home.CATEGORIES[${i}].image`} />
              <div className="mt-auto w-full bg-ink/80 p-4 sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3
                      className={cn('font-bold text-white', lead ? 'text-[26px] sm:text-[30px]' : 'text-[17px] sm:text-[19px]')}
                      data-preview-field-path={`home.CATEGORIES[${i}].label`}>
                      {c.label}
                    </h3>
                    <p
                      className={cn('mt-0.5 text-white/70', lead ? 'text-[15px]' : 'hidden text-[13px] sm:block')}
                      data-preview-field-path={`home.CATEGORIES[${i}].blurb`}>{c.blurb}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-white">
                    {count} <span className="[display:none] sm:inline" data-preview-static="decorative-icon">in stock</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                      aria-hidden
                      data-preview-static="decorative-icon" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
