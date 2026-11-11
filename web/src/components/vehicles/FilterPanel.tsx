'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react'
import { useVehicleCatalog } from '@/lib/useVehicleCatalog'
import { BODY_TYPES } from '@/data/vehicles'
import { MILEAGE_BANDS, PRICE_STEPS, type VehicleFilters, type MileageBand } from '@/lib/filters'
import { cn, formatLKRShort } from '@/lib/utils'
import { SelectField } from '@/components/ui/Field'
import type { BodyType, DriveType, FuelType, Transmission, Condition } from '@/types/vehicle'

const FUELS: FuelType[] = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
const DRIVES: DriveType[] = ['FWD', 'RWD', 'AWD', '4WD']

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
  const siteData = useSiteData();
  const VEHICLES = useVehicleCatalog()
  const MAKES = Array.from(new Set(VEHICLES.map(v => v.make))).filter(Boolean).sort()
  const COLORS = Array.from(new Set(VEHICLES.map(v => v.exteriorColor))).filter(Boolean).sort()
  const YEARS = Array.from(new Set(VEHICLES.map(v => v.year))).filter(year => year > 0).sort((a, b) => b - a)
  const modelsFor = (make: string) => Array.from(new Set(VEHICLES.filter(v => !make || v.make === make).map(v => v.model))).filter(Boolean).sort()
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
      {!bare && ((<div className="flex items-center justify-between border-b border-line px-5 py-5">
        <h2
          className="text-[16px] font-bold tracking-[-0.02em] text-ink"
          data-preview-field-path="vehicles.heading7"
          data-preview-style-target="vehicles.heading7"
          data-preview-style-type="text">{siteData?.content?.vehicles?.heading7 ?? "Filter vehicles"}</h2>
        <button
          type="button"
          onClick={onClear}
          className="text-[13px] font-semibold text-accent underline-offset-4 hover:underline"
          data-preview-style-target="vehicles.contact.formSubmitLabel"
          data-preview-style-type="button">
          <span
            data-preview-field-path="vehicles.contact.formSubmitLabel"
            data-preview-style-target="vehicles.contact.formSubmitLabel"
            data-preview-style-type="text">{siteData?.content?.vehicles?.contact?.formSubmitLabel ?? "Clear all"}</span>
        </button>
      </div>))}

      <div className="divide-y divide-line px-5">
        <Group
          title={siteData?.content?.vehicles?.condition ?? "Condition"}
          data-preview-field-path="vehicles.condition"
          previewPath="vehicles">
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
               data-preview-static="Filter option">
                {c === '' ? 'Any' : c === 'New' ? 'New' : 'Used'}
              </button>
            ))}
          </div>
        </Group>

        <Group
          title={siteData?.content?.vehicles?.makeModel ?? "Make & model"}
          data-preview-field-path="vehicles.makeModel"
          previewPath="vehicles">
          <div className="space-y-3">
            <SelectField
              label={siteData?.content?.vehicles?.make2 ?? "Make"}
              placeholder={siteData?.content?.vehicles?.anyMakePlaceholder ?? "Any make"}
              value={draft.make}
              onChange={(e) => onChange({ ...draft, make: e.target.value, model: '' })}
              options={MAKES.map((m) => ({ value: m, label: m }))}
              data-preview-field-path="vehicles.make2"
              previewPath="vehicles" placeholderPath="vehicles.anyMakePlaceholder" />
            <SelectField
              label={siteData?.content?.vehicles?.model2 ?? "Model"}
              placeholder={siteData?.content?.vehicles?.anyModelPlaceholder ?? "Any model"}
              value={draft.model}
              onChange={(e) => set('model', e.target.value)}
              options={modelsFor(draft.make).map((m) => ({ value: m, label: m }))}
              data-preview-field-path="vehicles.model2"
              previewPath="vehicles" placeholderPath="vehicles.anyModelPlaceholder" />
            <SelectField
              label={siteData?.content?.vehicles?.bodyType2 ?? "Body type"}
              placeholder={siteData?.content?.vehicles?.anyBodyTypePlaceholder ?? "Any body type"}
              value={draft.body}
              onChange={(e) => set('body', e.target.value as BodyType | '')}
              options={BODY_TYPES.map((b) => ({ value: b, label: b }))}
              data-preview-field-path="vehicles.bodyType2"
              previewPath="vehicles" placeholderPath="vehicles.anyBodyTypePlaceholder" />
          </div>
        </Group>

        <Group
          title={siteData?.content?.vehicles?.priceLkr ?? "Price (LKR)"}
          data-preview-field-path="vehicles.priceLkr"
          previewPath="vehicles">
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label={siteData?.content?.vehicles?.minimum2 ?? "Minimum"}
              placeholder={siteData?.content?.vehicles?.noMinPlaceholder ?? "No min"}
              value={draft.minPrice}
              onChange={(e) => set('minPrice', e.target.value)}
              options={PRICE_STEPS.map((p) => ({ value: String(p), label: formatLKRShort(p).replace('LKR ', '') }))}
              data-preview-field-path="vehicles.minimum2"
              previewPath="vehicles" placeholderPath="vehicles.noMinPlaceholder" />
            <SelectField
              label={siteData?.content?.vehicles?.maximum2 ?? "Maximum"}
              placeholder={siteData?.content?.vehicles?.noMaxPlaceholder ?? "No max"}
              value={draft.maxPrice}
              onChange={(e) => set('maxPrice', e.target.value)}
              options={PRICE_STEPS.map((p) => ({ value: String(p), label: formatLKRShort(p).replace('LKR ', '') }))}
              data-preview-field-path="vehicles.maximum2"
              previewPath="vehicles" placeholderPath="vehicles.noMaxPlaceholder" />
          </div>
        </Group>

        <Group title={siteData?.content?.vehicles?.year ?? "Year"} data-preview-field-path="vehicles.year" previewPath="vehicles">
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label={siteData?.content?.vehicles?.from2 ?? "From"}
              placeholder={siteData?.content?.vehicles?.anyPlaceholder ?? "Any"}
              value={draft.minYear}
              onChange={(e) => set('minYear', e.target.value)}
              options={YEARS.map((y) => ({ value: String(y), label: String(y) }))}
              data-preview-field-path="vehicles.from2"
              previewPath="vehicles" placeholderPath="vehicles.anyPlaceholder" />
            <SelectField
              label={siteData?.content?.vehicles?.to2 ?? "To"}
              placeholder={siteData?.content?.vehicles?.anyPlaceholder2 ?? "Any"}
              value={draft.maxYear}
              onChange={(e) => set('maxYear', e.target.value)}
              options={YEARS.map((y) => ({ value: String(y), label: String(y) }))}
              data-preview-field-path="vehicles.to2"
              previewPath="vehicles" placeholderPath="vehicles.anyPlaceholder2" />
          </div>
        </Group>

        <Group
          title={siteData?.content?.vehicles?.fuelType ?? "Fuel type"}
          data-preview-field-path="vehicles.fuelType"
          previewPath="vehicles">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {FUELS.map((f) => (
              <Check key={f} label={f} checked={draft.fuel.includes(f)} onChange={() => set('fuel', toggle(draft.fuel, f))} />
            ))}
          </div>
        </Group>

        <Group
          title={siteData?.content?.vehicles?.transmission ?? "Transmission"}
          data-preview-field-path="vehicles.transmission"
          previewPath="vehicles">
          <div className="grid grid-cols-3 gap-1.5">
            {(['', 'Automatic', 'Manual'] as ('' | Transmission)[]).map((t) => (
              <button
                key={t || 'any'}
                type="button"
                aria-pressed={draft.transmission === t} data-preview-static="Transmission filter option"
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

        <Group
          title={siteData?.content?.vehicles?.mileage ?? "Mileage"}
          data-preview-field-path="vehicles.mileage"
          previewPath="vehicles">
          <SelectField
            label={siteData?.content?.vehicles?.mileageRange2 ?? "Mileage range"}
            placeholder={siteData?.content?.vehicles?.anyMileagePlaceholder ?? "Any mileage"}
            value={draft.mileage}
            onChange={(e) => set('mileage', e.target.value as MileageBand | '')}
            options={MILEAGE_BANDS.map((b) => ({ value: b.value, label: b.label }))}
            data-preview-field-path="vehicles.mileageRange2"
            previewPath="vehicles" placeholderPath="vehicles.anyMileagePlaceholder" />
        </Group>

        <Group
          title={siteData?.content?.vehicles?.driveType ?? "Drive type"}
          data-preview-field-path="vehicles.driveType"
          previewPath="vehicles">
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
               data-preview-static="Filter option">
                {d}
              </button>
            ))}
          </div>
        </Group>

        <Group
          title={siteData?.content?.vehicles?.exteriorColour ?? "Exterior colour"}
          data-preview-field-path="vehicles.exteriorColour"
          previewPath="vehicles">
          <SelectField
            label={siteData?.content?.vehicles?.colour2 ?? "Colour"}
            placeholder={siteData?.content?.vehicles?.anyColourPlaceholder ?? "Any colour"}
            value={draft.color}
            onChange={(e) => set('color', e.target.value)}
            options={COLORS.map((c) => ({ value: c, label: c }))}
            data-preview-field-path="vehicles.colour2"
            previewPath="vehicles" placeholderPath="vehicles.anyColourPlaceholder" />
        </Group>
      </div>

      <div className={cn('flex gap-3 border-t border-line p-5', bare && 'sticky bottom-0 bg-white')}>
        {bare && ((<button
          type="button"
          onClick={onClear}
          className="h-12 px-3 text-[14px] font-semibold text-ink"
          data-preview-style-target="vehicles.contact.formSubmitLabel2"
          data-preview-style-type="button">
          <span
            data-preview-field-path="vehicles.contact.formSubmitLabel2"
            data-preview-style-target="vehicles.contact.formSubmitLabel2"
            data-preview-style-type="text">{siteData?.content?.vehicles?.contact?.formSubmitLabel2 ?? "Clear all"}</span>
        </button>))}
        <button
          type="submit"
          className="flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-[3px] bg-accent px-4 text-[14px] font-semibold text-white transition-colors duration-150 hover:bg-accent-dark"
          data-preview-field-path="vehicles.applyFiltersLabel"
          data-preview-style-target="vehicles.applyFiltersLabel"
          data-preview-style-type="button">{siteData?.content?.vehicles?.applyFiltersLabel ?? "Apply filters ·"}{count}
        </button>
      </div>
    </form>
  );
}

function Group({
  title,
  children,
    'data-preview-field-path': fieldPath
}: { title: string; children: React.ReactNode; previewPath?: string; 'data-preview-field-path'?: string }) {
  return (
    <fieldset className="py-6">
      <legend
        className="mb-3 float-left w-full text-[13px] font-bold uppercase tracking-[0.08em] text-ink"
        data-preview-field-path={fieldPath} data-preview-static={fieldPath ? undefined : "Interface label"}>{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

const Check: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <label className="flex h-10 cursor-pointer items-center gap-2.5 text-[14px] text-graphite" data-preview-static="Interface label, control, or calculated value">
    <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[var(--color-accent)]" data-preview-static="Interface label, control, or calculated value" />
    {label}
  </label>
)
