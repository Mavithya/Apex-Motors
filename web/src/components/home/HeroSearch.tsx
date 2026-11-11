'use client';
import { useSiteData } from "@deneb-ui/ui";
import { useVehicleCatalog } from '@/lib/useVehicleCatalog'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { BODY_TYPES } from '@/data/vehicles'
import { applyFilters, EMPTY_FILTERS, pathFromFilters, PRICE_STEPS } from '@/lib/filters'
import { useRouter } from 'next/navigation'
import { cn, formatLKRShort } from '@/lib/utils'
import { SelectField } from '@/components/ui/Field'
import type { BodyType, Condition } from '@/types/vehicle'

const CONDITIONS: { value: '' | Condition; label: string }[] = [
  { value: '', label: 'All vehicles' },
  { value: 'New', label: 'Brand New' },
  { value: 'Used', label: 'Pre-Owned' },
]

export function HeroSearch() {
  const siteData = useSiteData();
  const VEHICLES = useVehicleCatalog()
  const MAKES = Array.from(new Set(VEHICLES.map((vehicle) => vehicle.make))).filter(Boolean).sort()
  const modelsFor = (make: string) => Array.from(new Set(VEHICLES.filter((vehicle) => !make || vehicle.make === make).map((vehicle) => vehicle.model))).sort()
  const router = useRouter()
  const [condition, setCondition] = useState<'' | Condition>('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [body, setBody] = useState<'' | BodyType>('')
  const [maxPrice, setMaxPrice] = useState('')

  const filters = { ...EMPTY_FILTERS, condition, make, model, body, maxPrice }
  const matches = applyFilters(VEHICLES, filters).length

  return (
    <section aria-labelledby="label-herosearch-0" className="relative z-10 mx-auto -mt-28 max-w-[1320px] px-5 sm:px-8"><span id="label-herosearch-0" className="sr-only" data-preview-static="Accessibility label">Search vehicles</span>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(pathFromFilters(filters))
        }}
        className="bg-white shadow-[0_30px_60px_-30px_rgba(23,26,29,0.45)]"
      >
        <div role="tablist" aria-labelledby="label-herosearch-1" className="flex border-b border-line"><span id="label-herosearch-1" className="sr-only" data-preview-static="Accessibility label">Vehicle condition</span>
          {CONDITIONS.map((c) => (
            <button
              key={c.label}
              type="button"
              role="tab"
              aria-selected={condition === c.value}
              onClick={() => setCondition(c.value)}
              className={cn(
                'relative h-14 min-w-0 flex-1 whitespace-nowrap px-3 text-[14px] font-semibold transition-colors duration-150 max-[360px]:px-2 max-[360px]:text-[12px] sm:flex-none sm:px-8',
                condition === c.value ? 'text-ink' : 'text-muted hover:text-ink'
              )} data-preview-static="Interface label, control, or calculated value"
            >
              {c.label}
              {condition === c.value && <span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-accent" data-preview-static="Interface label, control, or calculated value" />}
            </button>
          ))}
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
          <SelectField
            label={siteData?.content?.home?.hero?.make2 ?? "Make"}
            placeholder={siteData?.content?.home?.hero?.anyMakePlaceholder ?? "Any make"}
            value={make}
            onChange={(e) => {
              setMake(e.target.value)
              setModel('')
            }}
            options={MAKES.map((m) => ({ value: m, label: m }))}
            data-preview-field-path="home.hero.make2"
            previewPath="home.hero" placeholderPath="home.hero.anyMakePlaceholder" />
          <SelectField
            label={siteData?.content?.home?.hero?.model2 ?? "Model"}
            placeholder={siteData?.content?.home?.hero?.anyModelPlaceholder ?? "Any model"}
            value={model}
            onChange={(e) => setModel(e.target.value)}
            options={modelsFor(make).map((m) => ({ value: m, label: m }))}
            data-preview-field-path="home.hero.model2"
            previewPath="home.hero" placeholderPath="home.hero.anyModelPlaceholder" />
          <SelectField
            label={siteData?.content?.home?.hero?.bodyType2 ?? "Body type"}
            placeholder={siteData?.content?.home?.hero?.anyBodyTypePlaceholder ?? "Any body type"}
            value={body}
            onChange={(e) => setBody(e.target.value as BodyType | '')}
            options={BODY_TYPES.map((b) => ({ value: b, label: b }))}
            data-preview-field-path="home.hero.bodyType2"
            previewPath="home.hero" placeholderPath="home.hero.anyBodyTypePlaceholder" />
          <SelectField
            label={siteData?.content?.home?.hero?.maximumBudget2 ?? "Maximum budget"}
            placeholder={siteData?.content?.home?.hero?.noLimitPlaceholder ?? "No limit"}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            options={PRICE_STEPS.map((p) => ({ value: String(p), label: `Up to ${formatLKRShort(p)}` }))}
            data-preview-field-path="home.hero.maximumBudget2"
            previewPath="home.hero" placeholderPath="home.hero.noLimitPlaceholder" />
          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[3px] bg-accent px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-accent-dark sm:col-span-2 lg:col-span-1"
            data-preview-field-path="home.hero.searchLabel"
            data-preview-style-target="home.hero.searchLabel"
            data-preview-style-type="button">
            <Search className="h-4 w-4" aria-hidden  data-preview-static="Decorative icon" />{siteData?.content?.home?.hero?.searchLabel ?? "Search"}{' '}{matches} {matches === 1 ? 'vehicle' : 'vehicles'}
          </button>
        </div>
      </form>
    </section>
  );
}
