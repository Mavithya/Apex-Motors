"use client";
import { useSiteData } from "@deneb-ui/ui";
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from '@/components/ui/SiteLink'
import { Accordion } from '@/components/ui/Accordion'

export function FaqPreview() {
  const siteData = useSiteData();
  const categories = siteData.content?.faqs ?? []
  const selection = [[0, 0], [1, 0], [2, 2], [3, 0]].flatMap(([category, item]) => categories[category]?.items?.[item] ? [{ item: categories[category].items[item], path: `faqs[${category}].items[${item}]` }] : [])
  const faqs = selection.map(({ item }) => item)
  return (
    <section className="border-t border-line bg-white py-24">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2
            className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]"
            data-preview-field-path="home.testimonials.heading"
            data-preview-style-target="home.testimonials.heading"
            data-preview-style-type="text">{siteData?.content?.home?.testimonials?.heading ?? "Questions, answered."}</h2>
          <p
            className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted"
            data-preview-field-path="home.testimonials.description"
            data-preview-style-target="home.testimonials.description"
            data-preview-style-type="text">{siteData?.content?.home?.testimonials?.description ?? "The things buyers ask us most often. Anything else, our team is a call or message away."}</p>
          <Link
            href={siteData?.content?.home?.testimonials?.readAllFaqsUrl ?? "/faq"}
            className="mt-8 inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-[15px] font-semibold text-ink transition-colors duration-150 hover:text-accent"
            data-preview-field-path={"home.testimonials.readAllFaqsUrl"}
            data-preview-style-target="home.testimonials.readAllFaqsLabel"
            data-preview-style-type="text">
            <span
              data-preview-field-path="home.testimonials.readAllFaqsLabel"
              data-preview-style-target="home.testimonials.readAllFaqsLabel"
              data-preview-style-type="text">{siteData?.content?.home?.testimonials?.readAllFaqsLabel ?? "Read all FAQs"}</span> <ArrowRight className="h-4 w-4" aria-hidden data-preview-static="decorative-icon" />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqs} itemPaths={selection.map(({ path }) => path)} />
        </div>
      </div>
    </section>
  );
}
