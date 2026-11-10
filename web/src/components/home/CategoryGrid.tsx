/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES, VEHICLES } from '@/data/vehicles'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/PageHeader'

/** Asymmetric tile mosaic: SUVs lead, as the largest share of stock. */
export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 pb-24 pt-20 sm:px-8 lg:py-28">
      <SectionHeading title="Explore by category" intro="Start with the shape of car that fits your life, then narrow it down." />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const count = VEHICLES.filter((v) => v.categories.includes(c.slug)).length
          const lead = i === 0
          const last = i === CATEGORIES.length - 1
          return (
            <Link
              key={c.slug}
              href={`/vehicles?category=${c.slug}`}
              className={cn(
                'group relative isolate flex overflow-hidden bg-ink',
                lead
                  ? 'col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto'
                  : last
                    ? 'col-span-2 aspect-[16/10] sm:aspect-[2/1] lg:col-span-1 lg:aspect-[4/3]'
                    : 'aspect-[4/5] sm:aspect-[4/3]'
              )}
            >
              <img
                src={c.image}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80 transition-[transform,opacity] duration-300 ease-out group-hover:scale-[1.03] group-hover:opacity-90"
              />
              <div className="mt-auto w-full bg-ink/80 p-4 sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={cn('font-bold text-white', lead ? 'text-[26px] sm:text-[30px]' : 'text-[17px] sm:text-[19px]')}>
                      {c.label}
                    </h3>
                    <p className={cn('mt-0.5 text-white/70', lead ? 'text-[15px]' : 'hidden text-[13px] sm:block')}>{c.blurb}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] font-semibold text-white">
                    {count} <span className="hidden sm:inline">in stock</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
