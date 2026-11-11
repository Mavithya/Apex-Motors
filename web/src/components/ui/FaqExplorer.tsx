'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import { FAQ_CATEGORIES } from '@/data/faqs'
import { cn } from '@/lib/utils'
import { Breadcrumb } from '@/components/ui/PageHeader'
import { Accordion } from '@/components/ui/Accordion'


export function FaqExplorer() {
  const siteData = useSiteData();
  const categories: typeof FAQ_CATEGORIES = siteData?.content?.faqs ?? FAQ_CATEGORIES
  const [active, setActive] = useState('all')
  const [q, setQ] = useState('')

  const sections = useMemo(() => {
    const term = q.trim().toLowerCase()
    return categories.filter((c) => active === 'all' || c.id === active)
      .map((c) => ({
        ...c,
        items: term ? c.items.filter((i: { q: string; a: string }) => `${i.q} ${i.a}`.toLowerCase().includes(term)) : c.items,
      }))
      .filter((c) => c.items.length)
  }, [active, q, categories])

  return (
    <div data-preview-page-key="faq" data-preview-list-path="faqs">
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-8 sm:px-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1
                className="text-[42px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[64px]"
                data-preview-field-path="faq.title"
                data-preview-style-target="faq.title"
                data-preview-style-type="text">{siteData?.content?.faq?.title ?? "Frequently asked questions"}</h1>
              <p
                className="mt-5 text-[17px] leading-relaxed text-muted"
                data-preview-field-path="faq.subtitle"
                data-preview-style-target="faq.subtitle"
                data-preview-style-type="text">{siteData?.content?.faq?.subtitle ?? "Straight answers about buying, inspection, financing, trade-ins and warranty."}</p>
            </div>
            <div className="relative w-full lg:w-[380px]">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                aria-hidden

                data-preview-static="Decorative icon" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={siteData?.content?.faq?.searchQuestionsPlaceholder ?? "Search questions"}
                aria-label="Search questions"
                className="h-12 w-full rounded-[3px] border border-line bg-white pl-10 pr-4 text-[15px] focus:border-ink focus:outline-none"
                data-preview-field-path="faq.searchQuestionsPlaceholder" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-labelledby="label-faqexplorer-0" className="min-w-0 lg:sticky lg:top-[96px] lg:self-start"><span id="label-faqexplorer-0" className="sr-only" data-preview-static="Accessibility label">FAQ categories</span>
            <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:px-0">
              {[{ id: 'all', title: 'All topics' }, ...categories].map((c, categoryIndex) => (
                <li key={c.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(c.id)}
                    aria-pressed={active === c.id}
                    className={cn(
                      'h-10 whitespace-nowrap rounded-[3px] px-4 text-left text-[14px] font-semibold transition-colors duration-150 lg:w-full lg:border-l-2 lg:px-4',
                      active === c.id
                        ? 'bg-ink text-white lg:border-accent lg:bg-transparent lg:text-ink'
                        : 'border border-line bg-white text-graphite hover:text-ink lg:border-0 lg:border-l-2 lg:border-transparent lg:bg-transparent'
                    )}
                  >
                    <span data-preview-field-path={categoryIndex > 0 ? `faqs[${categoryIndex - 1}].title` : undefined} data-preview-static={categoryIndex === 0 ? "FAQ category selector" : undefined}>{c.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-14">
            {sections.length ? (
              sections.map((c) => (
                <section data-preview-item-path={`faqs[${categories.findIndex((category) => category.id === c.id)}]`} key={c.id ?? c.title}  aria-labelledby={`faq-${c.id}`}>
                  <h2 data-preview-field-path={`faqs[${categories.findIndex((category) => category.id === c.id)}].title`} id={`faq-${c.id}`} className="mb-4 text-[24px] font-extrabold tracking-[-0.01em] text-ink">
                    {c.title}
                  </h2>
                  <Accordion items={c.items} categoryIndex={categories.findIndex((category) => category.id === c.id)} sourceIndexes={c.items.map((item) => categories.find((category) => category.id === c.id)?.items.findIndex((original) => original.q === item.q) ?? 0)} previewPath={`faqs[${categories.findIndex((category) => category.id === c.id)}].items`} itemPaths={c.items.map((item) => `faqs[${categories.findIndex((category) => category.id === c.id)}].items[${categories.find((category) => category.id === c.id)?.items.findIndex((original) => original.q === item.q)}]`)} />
                </section>
              ))
            ) : (
              <div className="border border-dashed border-ink/20 bg-white px-6 py-16 text-center">
                <h2
                  className="text-[20px] font-bold text-ink"
                  data-preview-field-path="faq.heading2"
                  data-preview-style-target="faq.heading2"
                  data-preview-style-type="text">{siteData?.content?.faq?.heading2 ?? "No questions match “”"}{q}”</h2>
                <p
                  className="mt-2 text-[15px] text-muted"
                  data-preview-field-path="faq.subtitle2"
                  data-preview-style-target="faq.subtitle2"
                  data-preview-style-type="text">{siteData?.content?.faq?.subtitle2 ?? "Try another word, or ask our team directly."}</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
