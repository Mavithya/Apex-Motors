'use client'

import React from 'react'
import { BODY_TYPES, COLORS, MAKES, modelsFor, VEHICLES } from '@/data/vehicles'
import { MILEAGE_BANDS, PRICE_STEPS, type VehicleFilters, type MileageBand } from '@/lib/filters'
import { cn, formatLKRShort } from '@/lib/utils'
import { SelectField } from '@/components/ui/Field'
import type { BodyType, DriveType, FuelType, Transmission, Condition } from '@/types/vehicle'

const FUELS: FuelType[] = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
const DRIVES: DriveType[] = ['FWD', 'RWD', 'AWD', '4WD']
const YEARS = Array.from(new Set(VEHICLES.map((v) => v.year))).sort((a, b) => b - a)

export function FilterPanel({
  draft,
  onChange,
  onApply,
  onClear,
  count,
  bare,
}: {
  draft: VehicleFilters
  onChange: (f: VehicleFilters) => void
  onApply: () => void
  onClear: () => void
  count: number
  bare?: boolean
}) {
  const set = <K extends keyof VehicleFilters>(k: K, v: VehicleFilters[K]) => onChange({ ...draft, [k]: v })
  const toggle = <T extends string>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onApply()
      }}
      className={cn('flex flex-col', !bare && 'border border-line bg-white')}
    >
      {!bare && (
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-[16px] font-bold text-ink">Filter vehicles</h2>
          <button type="button" onClick={onClear} className="text-[13px] font-semibold text-accent underline-offset-4 hover:underline">
            Clear all
          </button>
        </div>
      )}

      <div className="divide-y divide-line px-5">
        <Group title="Condition">
          <div className="grid grid-cols-3 gap-1.5">
            {(['', 'New', 'Used'] as ('' | Condition)[]).map((c) => (
              <button
                key={c || 'any'}
                type="button"
                aria-pressed={draft.condition === c}
                onClick={() => set('condition', c)}
                className={cn(
                  'h-10 whitespace-nowrap rounded-[3px] border text-[13px] font-semibold transition-colors duration-150',
                  draft.condition === c ? 'border-ink bg-ink text-white' : 'border-line bg-white text-graphite hover:border-ink'
                )}
              >
                {c === '' ? 'Any' : c === 'New' ? 'New' : 'Used'}
              </button>
            ))}
          </div>
        </Group>

        <Group title="Make & model">
          <div className="space-y-3">
            <SelectField
              label="Make"
              placeholder="Any make"
              value={draft.make}
              onChange={(e) => onChange({ ...draft, make: e.target.value, model: '' })}
              options={MAKES.map((m) => ({ value: m, label: m }))}
            />
            <SelectField
              label="Model"
              placeholder="Any model"
              value={draft.model}
              onChange={(e) => set('model', e.target.value)}
              options={modelsFor(draft.make).map((m) => ({ value: m, label: m }))}
            />
            <SelectField
              label="Body type"
              placeholder="Any body type"
              value={draft.body}
              onChange={(e) => set('body', e.target.value as BodyType | '')}
              options={BODY_TYPES.map((b) => ({ value: b, label: b }))}
            />
          </div>
        </Group>

        <Group title="Price (LKR)">
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Minimum"
              placeholder="No min"
              value={draft.minPrice}
              onChange={(e) => set('minPrice', e.target.value)}
              options={PRICE_STEPS.map((p) => ({ value: String(p), label: formatLKRShort(p).replace('LKR ', '') }))}
            />
            <SelectField
              label="Maximum"
              placeholder="No max"
              value={draft.maxPrice}
              onChange={(e) => set('maxPrice', e.target.value)}
              options={PRICE_STEPS.map((p) => ({ value: String(p), label: formatLKRShort(p).replace('LKR ', '') }))}
            />
          </div>
        </Group>

        <Group title="Year">
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="From"
              placeholder="Any"
              value={draft.minYear}
              onChange={(e) => set('minYear', e.target.value)}
              options={YEARS.map((y) => ({ value: String(y), label: String(y) }))}
            />
            <SelectField
              label="To"
              placeholder="Any"
              value={draft.maxYear}
              onChange={(e) => set('maxYear', e.target.value)}
              options={YEARS.map((y) => ({ value: String(y), label: String(y) }))}
            />
          </div>
        </Group>

        <Group title="Fuel type">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {FUELS.map((f) => (
              <Check key={f} label={f} checked={draft.fuel.includes(f)} onChange={() => set('fuel', toggle(draft.fuel, f))} />
            ))}
          </div>
        </Group>

        <Group title="Transmission">
          <div className="grid grid-cols-3 gap-1.5">
            {(['', 'Automatic', 'Manual'] as ('' | Transmission)[]).map((t) => (
              <button
                key={t || 'any'}
                type="button"
                aria-pressed={draft.transmission === t}
                onClick={() => set('transmission', t)}
                className={cn(
                  'h-10 whitespace-nowrap rounded-[3px] border text-[13px] font-semibold transition-colors duration-150',
                  draft.transmission === t ? 'border-ink bg-ink text-white' : 'border-line bg-white text-graphite hover:border-ink'
                )}
              >
                {t === '' ? 'Any' : t === 'Automatic' ? 'Auto' : 'Manual'}
              </button>
            ))}
          </div>
        </Group>

        <Group title="Mileage">
          <SelectField
            label="Mileage range"
            placeholder="Any mileage"
            value={draft.mileage}
            onChange={(e) => set('mileage', e.target.value as MileageBand | '')}
            options={MILEAGE_BANDS.map((b) => ({ value: b.value, label: b.label }))}
          />
        </Group>

        <Group title="Drive type">
          <div className="grid grid-cols-4 gap-1.5">
            {DRIVES.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={draft.drive.includes(d)}
                onClick={() => set('drive', toggle(draft.drive, d))}
                className={cn(
                  'h-10 rounded-[3px] border text-[13px] font-semibold transition-colors duration-150',
                  draft.drive.includes(d) ? 'border-ink bg-ink text-white' : 'border-line bg-white text-graphite hover:border-ink'
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </Group>

        <Group title="Exterior colour">
          <SelectField
            label="Colour"
            placeholder="Any colour"
            value={draft.color}
            onChange={(e) => set('color', e.target.value)}
            options={COLORS.map((c) => ({ value: c, label: c }))}
          />
        </Group>
      </div>

      <div className={cn('flex gap-3 border-t border-line p-5', bare && 'sticky bottom-0 bg-white')}>
        {bare && (
          <button type="button" onClick={onClear} className="h-12 px-3 text-[14px] font-semibold text-ink">
            Clear all
          </button>
        )}
        <button
          type="submit"
          className="flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-[3px] bg-accent px-4 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-accent-dark"
        >
          Apply filters · {count}
        </button>
      </div>
    </form>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="py-5">
      <legend className="mb-3 float-left w-full text-[13px] font-bold uppercase tracking-[0.08em] text-ink">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  )
}

const Check: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <label className="flex h-10 cursor-pointer items-center gap-2.5 text-[14px] text-graphite">
    <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[var(--color-accent)]" />
    {label}
  </label>
)
