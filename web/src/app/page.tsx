/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'

import { IMAGES } from '@/data/dealer'
import { ButtonLink } from '@/components/ui/Button'
import { HeroSearch } from '@/components/home/HeroSearch'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedVehicles } from '@/components/home/FeaturedVehicles'
import { NewArrivals } from '@/components/home/NewArrivals'
import { Spotlight } from '@/components/home/Spotlight'
import { Brands } from '@/components/home/Brands'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { FinanceTradeCta } from '@/components/home/FinanceTradeCta'
import { Testimonials } from '@/components/home/Testimonials'
import { FaqPreview } from '@/components/home/FaqPreview'


export default function Home() {
  const headline = 'Find the Car That Moves You.'
  const subhead = 'Explore carefully selected vehicles and discover your next journey.'
  const featuredCount = 6
  return (
    <>
      {/* A — Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <img
          src={IMAGES.hero}
          alt="Dark grey luxury SUV on a rain-wet city plaza at dusk"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-ink/55 lg:bg-ink/30" aria-hidden />
        <div className="mx-auto flex min-h-[600px] max-w-[1320px] flex-col justify-center px-5 pb-40 pt-20 sm:px-8 lg:min-h-[700px] lg:pb-48">
          <h1 className="max-w-[640px] text-[44px] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-[64px] lg:text-[80px]">
            {headline}
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/80 sm:text-[18px]">{subhead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to="/vehicles" size="lg">
              Explore Vehicles
            </ButtonLink>
            <ButtonLink to="/contact" size="lg" variant="outline-light">
              Contact Our Team
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* B — Search, overlapping the hero */}
      <HeroSearch />

      <CategoryGrid />
      <FeaturedVehicles count={featuredCount} />
      <NewArrivals />
      <Spotlight />
      <Brands />
      <WhyChooseUs />
      <FinanceTradeCta />
      <Testimonials />
      <FaqPreview />
    </>
  )
}
