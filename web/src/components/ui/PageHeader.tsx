/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const base = tone === 'dark' ? 'text-muted' : 'text-white/60'
  const current = tone === 'dark' ? 'text-ink' : 'text-white'
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-[13px] ${base}`}>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />}
            {c.to ? (
              <Link href={c.to} className="transition-colors duration-150 hover:text-accent">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={`font-medium ${current}`}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Image-led page hero used by the secondary pages. */
export function PageHero({
  crumbs,
  title,
  intro,
  image,
  children,
}: {
  crumbs: Crumb[]
  title: string
  intro: string
  image: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img src={image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-ink/40" aria-hidden />
      <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-10 sm:px-8 lg:pb-24 lg:pt-14">
        <Breadcrumb items={crumbs} tone="light" />
        <h1 className="mt-14 max-w-3xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-[56px] lg:mt-24 lg:text-[68px]">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/80">{intro}</p>
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}

export function SectionHeading({
  title,
  intro,
  action,
  tone = 'dark',
}: {
  title: string
  intro?: string
  action?: React.ReactNode
  tone?: 'dark' | 'light'
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2
          className={`text-[32px] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-[40px] ${
            tone === 'dark' ? 'text-ink' : 'text-white'
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`mt-4 text-[16px] leading-relaxed ${tone === 'dark' ? 'text-muted' : 'text-white/70'}`}>{intro}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
