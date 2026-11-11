"use client";
import { useSiteData } from "@deneb-ui/ui";
import { useCatalogPath } from '@/lib/useVehicleCatalog'
/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Vehicle } from '@/types/vehicle'
import { platformProductDetailHref, withBasePath, useProducts } from '@deneb-ui/ui'
import Link from '@/components/ui/SiteLink'
import { cn, formatKm, formatLKR } from '@/lib/utils'
import { WishlistButton } from './WishlistButton'

/** Inventory card used on Home, All Vehicles and Similar Vehicles. */
export const VehicleCard: React.FC<{ vehicle: Vehicle; priority?: boolean }> = ({ vehicle: v, priority }) => {
  const siteData = useSiteData();
  const catalogPath = useCatalogPath()
  const to = platformProductDetailHref(v.id)
  const productIndex = useProducts().findIndex((product) => String(product.id) === v.id)
  const itemPath = productIndex >= 0 ? `${catalogPath}[${productIndex}]` : undefined
  return (
    <article data-preview-item-path={`catalog.products[${productIndex}]`} className="group flex h-full flex-col border border-line bg-white transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_18px_36px_-25px_rgba(23,26,29,0.35)]">
      <div className="relative aspect-[16/11] overflow-clip bg-stone">
        <Link href={to} tabIndex={-1} aria-hidden className="block h-full w-full">
          <img
            src={v.images[0]?.src ? withBasePath(v.images[0].src) : undefined}
            alt=""
            data-preview-image-path={itemPath ? `${itemPath}.image` : undefined}
            data-preview-field-path={`catalog.products[${productIndex}].image`}
            loading={priority ? 'eager' : 'lazy'}
            className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {v.condition && <Badge tone={v.condition === 'New' ? 'dark' : 'light'} data-preview-static="Interface label, control, or calculated value">{v.condition === 'New' ? 'Brand New' : 'Pre-Owned'}</Badge>}
          {v.featured && (<Badge
            tone="accent"
            data-preview-field-path="common.featuredBadge"
            data-preview-style-target="common.featuredBadge"
            data-preview-style-type="text">{siteData?.content?.common?.featuredBadge ?? "Featured"}</Badge>)}
        </div>
        <WishlistButton id={v.id} label={`${v.make} ${v.model}`} className="absolute right-3 top-3" />
        {v.availability !== 'Available' && (
          <span className="absolute bottom-3 left-3 bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-white" data-preview-static="Interface label, control, or calculated value">{v.availability}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
          <span data-preview-field-path={`catalog.products[${productIndex}].brand`}>{v.make}</span><span data-preview-static="Computed interface value">{v.year ? ` · ${v.year}` : ''}</span>
        </p>
        <h3 className="mt-1.5 line-clamp-2 min-h-[3.2rem] text-[20px] font-bold leading-tight tracking-[-0.02em] text-ink">
          <Link href={to} data-preview-field-path={`catalog.products[${productIndex}].title`} className="transition-colors duration-150 hover:text-accent">
            {v.model}
          </Link>
        </h3>
        <p className="mt-0.5 min-h-5 truncate text-[14px] text-muted" data-preview-static="Interface label, control, or calculated value">{v.variant}</p>

        <dl className="mt-5 grid grid-cols-3 border-y border-line py-3.5 text-[13px]">
          <Spec
            label={siteData?.content?.common?.mileage ?? "Mileage"}
            value={v.mileage ? formatKm(v.mileage) : 'Not provided'}
            data-preview-field-path="common.mileage"
            previewPath="common" />
          <Spec
            label={siteData?.content?.common?.fuel ?? "Fuel"}
            value={v.fuel || 'Not provided'}
            className="border-x border-line px-3"
            data-preview-field-path="common.fuel"
            previewPath="common" />
          <Spec
            label={siteData?.content?.common?.gearbox ?? "Gearbox"}
            value={v.transmission ? v.transmission === 'Automatic' ? 'Auto' : 'Manual' : 'Not provided'}
            className="pl-3"
            data-preview-field-path="common.gearbox"
            previewPath="common" />
        </dl>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-3 gap-y-1.5 pt-5">
          <div>
            <p
              className="text-[11px] font-medium text-muted"
              data-preview-field-path="common.subtitle"
              data-preview-style-target="common.subtitle"
              data-preview-style-type="text">{siteData?.content?.common?.subtitle ?? "Price"}</p>
            <p data-preview-field-path={`catalog.products[${productIndex}].price`} className="text-[18px] font-extrabold tracking-[-0.03em] text-ink">{formatLKR(v.price)}</p>
          </div>
          <Link
            href={to}
            className="flex h-10 items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent text-[14px] font-semibold text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            <span
              data-preview-field-path="common.viewDetails"
              data-preview-style-target="common.viewDetails"
              data-preview-style-type="text">{siteData?.content?.common?.viewDetails ?? "View details"}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden data-preview-static="decorative-icon" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Spec({
  label,
  value,
  className,
    'data-preview-field-path': fieldPath
}: { label: string; value: string; className?: string; previewPath?: string; 'data-preview-field-path'?: string }) {
  return (
    <div className={cn('min-w-0', className)}>
      <dt className="text-[11px] text-muted" data-preview-field-path={fieldPath} data-preview-static={fieldPath ? undefined : "Interface label"}>{label}</dt>
      <dd className="mt-0.5 truncate font-semibold text-graphite" data-preview-static="Interface label, control, or calculated value">{value}</dd>
    </div>
  );
}

export function Badge({ tone, children, ...attributes }: { tone: 'dark' | 'light' | 'accent'; children: React.ReactNode } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...attributes}
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
