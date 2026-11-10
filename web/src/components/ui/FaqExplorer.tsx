'use client'

import React, { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import { FAQ_CATEGORIES } from '@/data/faqs'
import { cn } from '@/lib/utils'
import { Breadcrumb } from '@/components/ui/PageHeader'
import { Accordion } from '@/components/ui/Accordion'


export function FaqExplorer() {
  const [active, setActive] = useState('all')
  const [q, setQ] = useState('')

  const sections = useMemo(() => {
    const term = q.trim().toLowerCase()
    return FAQ_CATEGORIES.filter((c) => active === 'all' || c.id === active)
      .map((c) => ({
        ...c,
        items: term ? c.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(term)) : c.items,
      }))
      .filter((c) => c.items.length)
  }, [active, q])

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-8 sm:px-8">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-[42px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[64px]">
                Frequently asked questions
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-muted">
                Straight answers about buying, inspection, financing, trade-ins and warranty.
              </p>
            </div>
            <div className="relative w-full lg:w-[380px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search questions"
                aria-label="Search questions"
                className="h-12 w-full rounded-[3px] border border-line bg-white pl-10 pr-4 text-[15px] focus:border-ink focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-14 lg:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="FAQ categories" className="min-w-0 lg:sticky lg:top-[96px] lg:self-start">
            <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:px-0">
              {[{ id: 'all', title: 'All topics' }, ...FAQ_CATEGORIES].map((c) => (
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
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-14">
            {sections.length ? (
              sections.map((c) => (
                <section key={c.id} aria-labelledby={`faq-${c.id}`}>
                  <h2 id={`faq-${c.id}`} className="mb-4 text-[24px] font-extrabold tracking-[-0.01em] text-ink">
                    {c.title}
                  </h2>
                  <Accordion items={c.items} />
                </section>
              ))
            ) : (
              <div className="border border-dashed border-ink/20 bg-white px-6 py-16 text-center">
                <h2 className="text-[20px] font-bold text-ink">No questions match “{q}”</h2>
                <p className="mt-2 text-[15px] text-muted">Try another word, or ask our team directly.</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </>
  )
}
