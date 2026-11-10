/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
'use client'

import React, { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { VEHICLES } from '@/data/vehicles'
import Link from 'next/link'
import { formatLKR } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/PageHeader'

/** Dark, horizontally scrolling showcase — deliberately unlike the card grid above. */
export function NewArrivals() {
  const track = useRef<HTMLDivElement>(null)
  const arrivals = VEHICLES.filter((v) => v.newArrival).sort((a, b) => b.addedOn.localeCompare(a.addedOn))

  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="overflow-hidden bg-ink py-24 text-white">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          tone="light"
          title="Just arrived"
          intro="The latest additions to the showroom floor. New stock moves quickly — enquire early to arrange a viewing."
          action={
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous vehicles"
                className="flex h-12 w-12 items-center justify-center border border-white/25 transition-colors duration-150 hover:border-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next vehicles"
                className="flex h-12 w-12 items-center justify-center border border-white/25 transition-colors duration-150 hover:border-white"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          }
        />
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 sm:px-8 xl:px-[max(2rem,calc((100%-1320px)/2+2rem))]"
      >
        {arrivals.map((v) => (
          <article key={v.id} className="group w-[84%] shrink-0 snap-start sm:w-[58%] lg:w-[42%]">
            <Link href={`/vehicles/${v.slug}`} className="block aspect-[16/10] overflow-hidden bg-ink-soft" tabIndex={-1} aria-hidden>
              <img
                src={v.images[0].src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            </Link>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-white/15 pt-5">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white/50">
                  {v.year} · {v.condition === 'New' ? 'Brand new' : 'Pre-owned'}
                </p>
                <h3 className="mt-1 text-[24px] font-bold leading-tight">
                  {v.make} {v.model}
                </h3>
                <p className="mt-1 text-[16px] font-semibold text-white/80">{formatLKR(v.price)}</p>
              </div>
              <ButtonLink to={`/vehicles/${v.slug}`} variant="outline-light">
                Explore Vehicle
              </ButtonLink>
            </div>
          </article>
        ))}
        <div className="w-px shrink-0" aria-hidden />
      </div>
    </section>
  )
}
