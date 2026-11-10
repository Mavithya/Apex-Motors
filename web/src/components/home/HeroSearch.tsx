'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { BODY_TYPES, MAKES, VEHICLES, modelsFor } from '@/data/vehicles'
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
  const router = useRouter()
  const [condition, setCondition] = useState<'' | Condition>('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [body, setBody] = useState<'' | BodyType>('')
  const [maxPrice, setMaxPrice] = useState('')

  const filters = { ...EMPTY_FILTERS, condition, make, model, body, maxPrice }
  const matches = applyFilters(VEHICLES, filters).length

  return (
    <section aria-label="Search vehicles" className="relative z-10 mx-auto -mt-28 max-w-[1320px] px-5 sm:px-8">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(pathFromFilters(filters))
        }}
        className="bg-white shadow-[0_30px_60px_-30px_rgba(23,26,29,0.45)]"
      >
        <div role="tablist" aria-label="Vehicle condition" className="flex border-b border-line">
          {CONDITIONS.map((c) => (
            <button
              key={c.label}
              type="button"
              role="tab"
              aria-selected={condition === c.value}
              onClick={() => setCondition(c.value)}
              className={cn(
                'relative h-14 flex-1 whitespace-nowrap px-3 text-[14px] font-semibold transition-colors duration-150 sm:flex-none sm:px-8',
                condition === c.value ? 'text-ink' : 'text-muted hover:text-ink'
              )}
            >
              {c.label}
              {condition === c.value && <span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-accent" />}
            </button>
          ))}
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
          <SelectField
            label="Make"
            placeholder="Any make"
            value={make}
            onChange={(e) => {
              setMake(e.target.value)
              setModel('')
            }}
            options={MAKES.map((m) => ({ value: m, label: m }))}
          />
          <SelectField
            label="Model"
            placeholder="Any model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            options={modelsFor(make).map((m) => ({ value: m, label: m }))}
          />
          <SelectField
            label="Body type"
            placeholder="Any body type"
            value={body}
            onChange={(e) => setBody(e.target.value as BodyType | '')}
            options={BODY_TYPES.map((b) => ({ value: b, label: b }))}
          />
          <SelectField
            label="Maximum budget"
            placeholder="No limit"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            options={PRICE_STEPS.map((p) => ({ value: String(p), label: `Up to ${formatLKRShort(p)}` }))}
          />
          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[3px] bg-accent px-7 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-accent-dark sm:col-span-2 lg:col-span-1"
          >
            <Search className="h-4 w-4" aria-hidden />
            Search {matches} {matches === 1 ? 'vehicle' : 'vehicles'}
          </button>
        </div>
      </form>
    </section>
  )
}
