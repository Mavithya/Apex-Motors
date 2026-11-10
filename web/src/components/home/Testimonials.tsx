import React from 'react'
import { TESTIMONIALS } from '@/data/testimonials'

/** Sample reviews — the label below stays until real customer reviews replace them. */
export function Testimonials() {
  const [lead, ...rest] = TESTIMONIALS
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-[32px] font-extrabold tracking-[-0.02em] text-ink sm:text-[42px]">In our customers’ words</h2>
          <span className="border border-line bg-white px-3 py-1 text-[12px] font-semibold text-muted">
            Sample testimonials — replace with real reviews
          </span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <blockquote className="text-[24px] font-semibold leading-[1.35] tracking-[-0.01em] text-ink sm:text-[30px]">
              “{lead.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" aria-hidden />
              <span className="text-[15px]">
                <span className="font-bold text-ink">{lead.name}</span>
                <span className="text-muted">
                  {' '}
                  · {lead.location} · {lead.vehicle}
                </span>
              </span>
            </figcaption>
          </figure>

          <div className="space-y-10 border-t border-line pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {rest.map((t) => (
              <figure key={t.id}>
                <blockquote className="text-[16px] leading-relaxed text-graphite">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-[14px]">
                  <span className="font-bold text-ink">{t.name}</span>
                  <span className="text-muted">
                    {' '}
                    · {t.location} · {t.vehicle}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
