/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Vehicle } from '@/types/vehicle'
import Link from 'next/link'
import { cn, formatKm, formatLKR } from '@/lib/utils'
import { WishlistButton } from './WishlistButton'

/** Inventory card used on Home, All Vehicles and Similar Vehicles. */
export const VehicleCard: React.FC<{ vehicle: Vehicle; priority?: boolean }> = ({ vehicle: v, priority }) => {
  const to = `/vehicles/${v.slug}`
  return (
    <article className="group flex h-full flex-col border border-line bg-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone">
        <Link href={to} tabIndex={-1} aria-hidden>
          <img
            src={v.images[0].src}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone={v.condition === 'New' ? 'dark' : 'light'}>{v.condition === 'New' ? 'Brand New' : 'Pre-Owned'}</Badge>
          {v.featured && <Badge tone="accent">Featured</Badge>}
        </div>
        <WishlistButton id={v.id} label={`${v.make} ${v.model}`} className="absolute right-3 top-3" />
        {v.availability !== 'Available' && (
          <span className="absolute bottom-3 left-3 bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-white">{v.availability}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
          {v.make} · {v.year}
        </p>
        <h3 className="mt-1.5 text-[19px] font-bold leading-snug text-ink">
          <Link href={to} className="transition-colors duration-150 hover:text-accent">
            {v.model}
          </Link>
        </h3>
        <p className="mt-0.5 truncate text-[14px] text-muted">{v.variant}</p>

        <dl className="mt-5 grid grid-cols-3 border-y border-line py-3 text-[13px]">
          <Spec label="Mileage" value={formatKm(v.mileage)} />
          <Spec label="Fuel" value={v.fuel} className="border-x border-line px-3" />
          <Spec label="Gearbox" value={v.transmission === 'Automatic' ? 'Auto' : 'Manual'} className="pl-3" />
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[11px] font-medium text-muted">Price</p>
            <p className="text-[18px] font-extrabold tracking-[-0.01em] text-ink">{formatLKR(v.price)}</p>
          </div>
          <Link
            href={to}
            className="flex h-10 items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent text-[14px] font-semibold text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            View details
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}

function Spec({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn('min-w-0', className)}>
      <dt className="text-[11px] text-muted">{label}</dt>
      <dd className="mt-0.5 truncate font-semibold text-graphite">{value}</dd>
    </div>
  )
}

export function Badge({ tone, children }: { tone: 'dark' | 'light' | 'accent'; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em]',
        tone === 'dark' && 'bg-ink text-white',
        tone === 'light' && 'bg-white text-ink',
        tone === 'accent' && 'bg-accent text-white'
      )}
    >
      {children}
    </span>
  )
}
