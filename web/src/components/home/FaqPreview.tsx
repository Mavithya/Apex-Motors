import React from 'react'
import { ArrowRight } from 'lucide-react'
import { HOME_FAQS } from '@/data/faqs'
import Link from 'next/link'
import { Accordion } from '@/components/ui/Accordion'

export function FaqPreview() {
  return (
    <section className="border-t border-line bg-white py-24">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]">Questions, answered.</h2>
          <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted">
            The things buyers ask us most often. Anything else, our team is a call or message away.
          </p>
          <Link
            href="/faq"
            className="mt-8 inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-[15px] font-semibold text-ink transition-colors duration-150 hover:text-accent"
          >
            Read all FAQs <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={HOME_FAQS} />
        </div>
      </div>
    </section>
  )
}
