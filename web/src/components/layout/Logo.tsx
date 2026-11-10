import React from 'react'
import { DEALER } from '@/data/dealer'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/** Replaceable wordmark. Swap for an <img> of the dealer's own logo. */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <Link href="/" aria-label={`${DEALER.name} home`} className={cn('flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 28 24" className="h-6 w-7 shrink-0" aria-hidden>
        <path d="M14 0 28 24h-7.2L14 11.6 7.2 24H0L14 0Z" fill="var(--color-accent)" />
        <path d="M14 17.2 17.6 24h-7.2L14 17.2Z" fill={tone === 'dark' ? 'var(--color-ink)' : '#fff'} />
      </svg>
      <span className={cn('flex items-baseline gap-1.5 whitespace-nowrap', tone === 'dark' ? 'text-ink' : 'text-white')}>
        <span className="text-[19px] font-extrabold tracking-[0.08em]">{DEALER.wordmark}</span>
        <span className={cn('text-[11px] font-semibold tracking-[0.32em]', tone === 'dark' ? 'text-muted' : 'text-white/60')}>
          {DEALER.wordmarkSuffix}
        </span>
      </span>
    </Link>
  )
}
