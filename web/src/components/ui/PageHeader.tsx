"use client";
/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from '@/components/ui/SiteLink'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const base = tone === 'dark' ? 'text-muted' : 'text-white/60'
  const current = tone === 'dark' ? 'text-ink' : 'text-white'
  return (
    <nav aria-labelledby="label-pageheader-0"><span id="label-pageheader-0" className="sr-only" data-preview-static="Accessibility label">Breadcrumb</span>
      <ol className={`flex flex-wrap items-center gap-1.5 text-[13px] ${base}`}>
        {items.map((c, i: number) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden data-preview-static="decorative-icon" />}
            {c.to ? (
              <Link href={c.to} className="transition-colors duration-150 hover:text-accent">
                <span data-preview-static="Computed interface value">{c.label}</span>
              </Link>
            ) : (
              <span aria-current="page" className={`font-medium ${current}`} data-preview-static="Interface label, control, or calculated value">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Image-led page hero used by the secondary pages. */
export function PageHero({
  crumbs,
  title,
  intro,
  introPath,
  image,
  imagePath,
  children,
  'data-preview-field-path': fieldPath,
  'data-preview-page-key': pageKey
}: {
  crumbs: Crumb[]
  title: string
  introPath?: string
  imagePath?: string
  intro: string
  image: string
  children?: React.ReactNode
  previewPath?: string; 'data-preview-field-path'?: string
  'data-preview-page-key'?: string
}) {
  return (
    <section data-preview-page-key={pageKey} className="relative isolate overflow-clip bg-ink">
      <img data-preview-field-path={imagePath} src={(image && typeof image === 'string' && image.trim() !== '') ? image : undefined} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-ink/40" aria-hidden />
      <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-10 sm:px-8 lg:pb-24 lg:pt-14">
        <Breadcrumb items={crumbs} tone="light" />
        <h1
          className="mt-14 max-w-3xl text-[40px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-[56px] lg:mt-24 lg:text-[68px]"
          data-preview-field-path={fieldPath} data-preview-static={fieldPath ? undefined : "Interface label"}>
          {title}
        </h1>
        <p data-preview-field-path={introPath} className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/80">{intro}</p>
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  intro,
  introPath,
  action,
  tone = 'dark',
  'data-preview-field-path': fieldPath
}: {
  title: string
  introPath?: string
  intro?: string
  action?: React.ReactNode
  tone?: 'dark' | 'light'
  previewPath?: string; 'data-preview-field-path'?: string
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2
          className={`text-[32px] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-[40px] ${
            tone === 'dark' ? 'text-ink' : 'text-white'
          }`}
          data-preview-field-path={fieldPath} data-preview-static={fieldPath ? undefined : "Interface label"}>
          {title}
        </h2>
        {intro !== undefined && (
          <p data-preview-field-path={introPath} className={`mt-4 text-[16px] leading-relaxed ${tone === 'dark' ? 'text-muted' : 'text-white/70'}`}>{intro}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
