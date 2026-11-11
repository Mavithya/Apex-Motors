"use client";
import { useSiteData } from "@deneb-ui/ui";
import React from 'react'
import { TESTIMONIALS } from '@/data/testimonials'

/** Sample reviews — the label below stays until real customer reviews replace them. */
export function Testimonials() {
  const siteData = useSiteData();
  const testimonials: typeof TESTIMONIALS = siteData?.content?.testimonials ?? TESTIMONIALS
  const list = Array.isArray(testimonials) ? testimonials : []
  const lead = list[0]
  const rest = list.slice(1)

  return (
    <section data-preview-list-path="testimonials" className="bg-paper py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            className="text-[32px] font-extrabold tracking-[-0.02em] text-ink sm:text-[42px]"
            data-preview-field-path="home.testimonials.heading2"
            data-preview-style-target="home.testimonials.heading2"
            data-preview-style-type="text">{siteData?.content?.home?.testimonials?.heading2 ?? "In our customers' words"}</h2>
          <span
            className="border border-line bg-white px-3 py-1 text-[12px] font-semibold text-muted"
            data-preview-field-path="home.testimonials.sampleTestimonialsReplaceRealReviews"
            data-preview-style-target="home.testimonials.sampleTestimonialsReplaceRealReviews"
            data-preview-style-type="text">{siteData?.content?.home?.testimonials?.sampleTestimonialsReplaceRealReviews ?? "Sample testimonials — replace with real reviews"}</span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {lead && <figure data-preview-item-path="testimonials[0]" className="lg:col-span-7">
            <blockquote
              className="text-[24px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink sm:text-[30px]"
              data-preview-field-path="testimonials[0].quote">
              {lead.quote ? `“${lead.quote}”` : ''}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden data-preview-static="Interface label, control, or calculated value" />
              <span className="text-[15px]">
                <span data-preview-field-path="testimonials[0].name" className="font-bold text-ink">{lead.name}</span>
                <span
                  className="text-muted"
                  data-preview-style-target="home.testimonials.label"
                  data-preview-style-type="text">
                  <span data-preview-static="Computed interface value">{" ? "}</span><span data-preview-field-path="testimonials[0].location">{lead.location}</span><span data-preview-static="Computed interface value">{" ? "}</span><span data-preview-field-path="testimonials[0].vehicle">{lead.vehicle}</span>
                </span>
              </span>
            </figcaption>
          </figure>}

          {rest.length > 0 && (
            <div className="space-y-10 border-t border-line pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              {rest.map((t, index: number) => (
                <figure data-preview-item-path={`testimonials[${index + 1}]`} key={t.id ?? `testimonial-${index}`} >
                  <blockquote className="text-[16px] leading-relaxed text-graphite" data-preview-field-path={`testimonials[${index + 1}].quote`}>“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-[14px]">
                    <span data-preview-field-path={`testimonials[${index + 1}].name`} className="font-bold text-ink">{t.name}</span>
                    <span className="text-muted">
                      <span data-preview-static="Computed interface value">{' · '}</span><span data-preview-field-path={`testimonials[${index + 1}].location`}>{t.location}</span><span data-preview-static="Computed interface value">{' · '}</span><span data-preview-field-path={`testimonials[${index + 1}].vehicle`}>{t.vehicle}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
