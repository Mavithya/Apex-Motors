"use client";
import { useSiteData } from "@deneb-ui/ui";
import { useDealerImages } from '@/lib/useDealer'
/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from '@/components/ui/SiteLink'

export function FinanceTradeCta() {
  const siteData = useSiteData();
  const IMAGES = useDealerImages()
  const options: { to: string; title: string; body: string }[] = siteData?.content?.home?.options ?? [
    { to: '/financing', title: 'Explore Financing', body: 'Estimate your monthly instalment and let us compare lenders for you.' },
    { to: '/sell-your-car', title: 'Trade In Your Vehicle', body: 'Get a clear valuation on your current car and put it towards the next.' },
  ]
  return (
    <section className="grid bg-ink lg:grid-cols-2">
      <img
        src={siteData?.content?.home?.handoverImage ?? IMAGES.handover}
        alt="An Apex Motors advisor handing car keys to a customer"
        className="aspect-[16/11] h-full w-full object-cover lg:aspect-auto"
        data-preview-field-path="home.handoverImage" />
      <div className="flex flex-col justify-center px-5 py-16 sm:px-12 lg:px-16 lg:py-24">
        <h2
          className="max-w-md text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[46px]"
          data-preview-field-path="home.heading"
          data-preview-style-target="home.heading"
          data-preview-style-type="text">{siteData?.content?.home?.heading ?? "Your next car is closer than you think."}</h2>
        <div
          className="mt-10 border-t border-white/15"
          data-preview-list-path="home.options"
          data-preview-style-target="home.options.grid"
          data-preview-style-type="grid">
          {options.map((o, index: number) => (<Link
            key={o.to}
            href={o.to}
            data-preview-field-path={`home.options[${index}].to`}
            className="group flex items-center justify-between gap-6 border-b border-white/15 py-6"

            data-preview-style-target={`home.options[${index}].card`}
            data-preview-style-type="card" data-preview-item-path={`home.options[${index}]`}>
            <div>
              <h3
                className="text-[20px] font-bold text-white transition-colors duration-150 group-hover:text-white/80"
                data-preview-field-path={`home.options[${index}].title`}>{o.title}</h3>
              <p className="mt-1 text-[15px] text-white/60" data-preview-field-path={`home.options[${index}].body`}>{o.body}</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent text-white transition-colors duration-150 group-hover:bg-accent-dark">
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                aria-hidden
                data-preview-static="decorative-icon" />
            </span>
          </Link>))}
        </div>
      </div>
    </section>
  );
}
