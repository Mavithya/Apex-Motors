"use client";
import { useDealer } from '@/lib/useDealer'
import React from 'react'
import Link from '@/components/ui/SiteLink'
import { cn } from '@/lib/utils'
import { EditableImage, useSiteData } from '@deneb-ui/ui'

/** Header branding exposes independent image and wordmark editing targets. */
export function Logo({ tone = 'dark', className, editable = false }: { tone?: 'dark' | 'light'; className?: string; editable?: boolean }) {
  const DEALER = useDealer()
  const siteData = useSiteData()
  const content = (
    <>
      {editable ? (
        <EditableImage
          src={siteData.content?.common?.logoUrl ?? ''}
          fallbackSrc="/brands/apex-mark.svg"
          alt={`${DEALER.name} logo`}
          data-preview-field-path="common.logoUrl"
          className="h-6 w-7 shrink-0"
          fit="contain"
        />
      ) : <svg viewBox="0 0 28 24" className="h-6 w-7 shrink-0" aria-hidden data-preview-static="decorative-icon">
        <path d="M14 0 28 24h-7.2L14 11.6 7.2 24H0L14 0Z" fill="var(--color-accent)" />
        <path d="M14 17.2 17.6 24h-7.2L14 17.2Z" fill={tone === 'dark' ? 'var(--color-ink)' : '#fff'} />
      </svg>}
      <span className={cn('flex items-baseline gap-1.5 whitespace-nowrap', tone === 'dark' ? 'text-ink' : 'text-white')}>
        <span data-preview-field-path="dealer.wordmark" className="text-[19px] font-extrabold tracking-[0.08em]">{DEALER.wordmark}</span>
        <span data-preview-field-path="dealer.wordmarkSuffix" className={cn('text-[11px] font-semibold tracking-[0.32em]', tone === 'dark' ? 'text-muted' : 'text-white/60')}>
          {DEALER.wordmarkSuffix}
        </span>
      </span>
    </>
  );
  if (editable) {
    return (
      <Link
        href={siteData.content?.common?.header?.homeUrl ?? '/'}
        data-preview-field-path="common.header.homeUrl"
        aria-label={`${DEALER.name} home`}
        className={cn('flex items-center gap-2.5', className)}
      >
        {content}
      </Link>
    )
  }
  return (
    <div className={cn('relative flex items-center gap-2.5', className)}>
      <Link href="/" aria-label={`${DEALER.name} home`} className="absolute inset-0" data-preview-static="Home navigation" />
      {content}
    </div>
  )
}
