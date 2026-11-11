"use client";
import { useSiteData } from "@deneb-ui/ui";
import { useDealerImages } from '@/lib/useDealer'
/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { BadgeCheck, FileText, Handshake, Landmark } from 'lucide-react'

/** Benefit copy is a template — edit to reflect what your dealership actually offers. */
const DEFAULT_BENEFITS = [
  {
    icon: BadgeCheck,
    title: 'Carefully selected vehicles',
    body: 'Every pre-owned car is inspected before it is listed. If it does not meet our standard, it does not go on the floor.',
  },
  {
    icon: FileText,
    title: 'Transparent vehicle information',
    body: 'Mileage, ownership history and inspection notes are shared up front, so you can compare with confidence.',
  },
  {
    icon: Landmark,
    title: 'Financing assistance',
    body: 'We help you compare leasing and loan options from partner lenders and handle the paperwork with you.',
  },
  {
    icon: Handshake,
    title: 'Professional customer support',
    body: 'One advisor from first enquiry to handover — and still a phone call away after you drive out.',
  },
]

export function WhyChooseUs() {
  const siteData = useSiteData();
  const benefits: { title: string; body: string }[] = siteData.content?.["home"]?.benefits ?? []
  const IMAGES = useDealerImages()
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2
            className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]"
            data-preview-field-path="home.heading3"
            data-preview-style-target="home.heading3"
            data-preview-style-type="text">{siteData?.content?.home?.heading3 ?? "Why buyers come back to Apex."}</h2>
          <img
            src={siteData?.content?.home?.showroomImage ?? IMAGES.showroom}
            alt="The Apex Motors showroom"
            className="mt-10 aspect-[16/11] w-full object-cover lg:aspect-[4/3]"
            data-preview-field-path="home.showroomImage" />
        </div>
        <ul
          className="grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:pt-3"
          data-preview-list-path="home.benefits"
          data-preview-style-type="grid">
          {benefits.map(({ title, body }, index) => {
            const Icon = DEFAULT_BENEFITS[index % DEFAULT_BENEFITS.length].icon
            return (
            <li
              key={title}

              className="border-t border-line py-8"
              data-preview-item-path={`home.benefits[${index}]`}
              data-preview-style-type="card">
              <Icon
                className="h-6 w-6 text-accent"
                strokeWidth={1.75}
                aria-hidden

                data-preview-static="Decorative icon" />
              <h3 className="mt-5 text-[19px] font-bold text-ink" data-preview-field-path={`home.benefits[${index}].title`}>{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted" data-preview-field-path={`home.benefits[${index}].body`}>{body}</p>
            </li>
           )})}
        </ul>
      </div>
    </section>
  );
}
