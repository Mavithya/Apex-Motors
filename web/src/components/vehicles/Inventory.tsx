'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'

import { VEHICLES, CATEGORIES } from '@/data/vehicles'
import {
  applyFilters,
  EMPTY_FILTERS,
  filtersFromPath,
  pathFromFilters,
  MILEAGE_BANDS,
  SORT_OPTIONS,
  sortVehicles,
  type SortKey,
  type VehicleFilters,
} from '@/lib/filters'
import { formatLKRShort } from '@/lib/utils'
import { useWishlist } from '@/lib/useWishlist'
import { Breadcrumb } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { VehicleCard } from '@/components/vehicles/VehicleCard'
import { FilterPanel } from './FilterPanel'


export function Inventory() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.toString()
  const pageSize = 9
  const filters = useMemo(() => filtersFromPath('/vehicles?' + query), [query])
  const savedView = searchParams.get('view') === 'saved'
  const sortValue = searchParams.get('sort')
  const sort: SortKey = SORT_OPTIONS.find((option) => option.value === sortValue)?.value ?? 'newest'
  const [draft, setDraft] = useState<VehicleFilters>(filters)
  const [visible, setVisible] = useState(pageSize)
  const [drawer, setDrawer] = useState(false)
  const [previousQuery, setPreviousQuery] = useState(query)
  if (previousQuery !== query) {
    setPreviousQuery(query)
    setDraft(filters)
    setVisible(pageSize)
  }
  const { ids } = useWishlist()
  const base = useMemo(() => savedView ? VEHICLES.filter((v) => ids.includes(v.id)) : VEHICLES, [savedView, ids])
  const results = useMemo(() => sortVehicles(applyFilters(base, filters), sort), [base, filters, sort])
  const draftCount = useMemo(() => applyFilters(base, draft).length, [base, draft])
  const chips = activeChips(filters)

  const updateUrl = (next: VehicleFilters, nextSort = sort, replace = false) => {
    const url = new URL(pathFromFilters(next), window.location.origin)
    if (savedView) url.searchParams.set('view', 'saved')
    if (nextSort !== 'newest') url.searchParams.set('sort', nextSort)
    const href = url.pathname + url.search
    // Native history integrates with Next's useSearchParams without a network request.
    if (replace) window.history.replaceState(null, '', href)
    else if (href !== window.location.pathname + window.location.search) window.history.pushState(null, '', href)
  }
  const apply = (next: VehicleFilters) => {
    setDraft(next)
    setVisible(pageSize)
    updateUrl(next)
  }

  const title = savedView ? 'Your saved vehicles' : filters.arrivals ? 'New Arrivals' : 'Explore Our Collection'

  return (
    <>
      {/* Page header */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-8 sm:px-8 lg:pb-16">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: savedView ? 'Saved' : filters.arrivals ? 'New Arrivals' : 'Vehicles' }]} />
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[56px]">{title}</h1>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">
                {savedView
                  ? 'Vehicles you have saved on this device. Saved cars are stored in your browser only.'
                  : 'Brand-new and inspected pre-owned vehicles, available for viewing at our Colombo showroom. Filter by what matters to you.'}
              </p>
            </div>
            <p className="text-[15px] text-muted">
              <span className="text-[28px] font-extrabold text-ink">{base.length}</span> vehicles {savedView ? 'saved' : 'in stock'}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-5 pb-24 pt-10 sm:px-8 lg:pt-12">
        <div className="lg:grid lg:grid-cols-[272px_minmax(0,1fr)] lg:gap-9 xl:gap-12">
          {/* Desktop sidebar */}
          <aside aria-label="Filters" className="hidden lg:block">
            <div>
              <FilterPanel
                draft={draft}
                onChange={setDraft}
                count={draftCount}
                onApply={() => apply(draft)}
                onClear={() => apply({ ...EMPTY_FILTERS, q: filters.q, arrivals: filters.arrivals })}
              />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-center">
              <form
                role="search"
                className="relative flex-1"
                onSubmit={(e) => {
                  e.preventDefault()
                  apply({ ...draft, q: filters.q })
                }}
              >
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
                <input
                  type="search"
                  value={filters.q}
                  onChange={(e) => {
                    const q = e.target.value
                    updateUrl({ ...filters, q }, sort, true)
                  }}
                  placeholder="Search by make, model or year"
                  aria-label="Search by vehicle name"
                  className="h-12 w-full rounded-[3px] border border-line bg-white pl-10 pr-4 text-[15px] focus:border-ink focus:outline-none"
                />
              </form>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDrawer(true)}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[3px] border border-line bg-white px-4 text-[14px] font-semibold text-ink lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden />
                  Filters{chips.length ? ` (${chips.length})` : ''}
                </button>
                <label className="sr-only" htmlFor="sort">
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => updateUrl(filters, e.target.value as SortKey)}
                  className="h-12 flex-1 rounded-[3px] border border-line bg-white px-3.5 text-[14px] font-semibold text-ink focus:border-ink focus:outline-none sm:w-56 sm:flex-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Result count + chips */}
            <div className="mt-5 flex min-h-8 flex-wrap items-center gap-2">
              <p className="mr-2 text-[14px] text-muted" aria-live="polite">
                Showing <span className="font-bold text-ink">{results.length}</span> {results.length === 1 ? 'vehicle' : 'vehicles'}
              </p>
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => apply(c.remove(filters))}
                  className="flex h-8 items-center gap-1.5 rounded-[3px] bg-ink px-3 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-accent"
                  aria-label={`Remove filter ${c.label}`}
                >
                  {c.label}
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              ))}
              {chips.length > 1 && (
                <button
                  type="button"
                  onClick={() => apply(EMPTY_FILTERS)}
                  className="h-8 px-2 text-[13px] font-semibold text-accent underline-offset-4 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Results */}
            {results.length ? (
              <>
                <div className="mt-7 grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                  {results.slice(0, visible).map((v, i) => (
                    <VehicleCard key={v.id} vehicle={v} priority={i < 3} />
                  ))}
                </div>
                <div className="mt-12 flex flex-col items-center gap-4">
                  <p className="text-[14px] text-muted">
                    Viewing {Math.min(visible, results.length)} of {results.length}
                  </p>
                  <div className="h-[2px] w-48 bg-line">
                    <div className="h-full bg-ink" style={{ width: `${(Math.min(visible, results.length) / results.length) * 100}%` }} />
                  </div>
                  {visible < results.length && (
                    <Button variant="outline" size="lg" onClick={() => setVisible((n) => n + pageSize)}>
                      Load more vehicles
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="mt-6 border border-dashed border-ink/20 bg-white px-6 py-20 text-center">
                <h2 className="text-[24px] font-bold text-ink">
                  {savedView && !ids.length ? 'No saved vehicles yet' : 'No vehicles match these filters'}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                  {savedView && !ids.length
                    ? 'Tap the heart on any vehicle to keep it here for later.'
                    : 'Try widening your budget or removing a filter. We can also source a specific vehicle for you.'}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {chips.length > 0 && <Button onClick={() => apply(EMPTY_FILTERS)}>Clear all filters</Button>}
                  <Button variant="outline" onClick={() => router.push(savedView ? '/vehicles' : '/contact')}>
                    {savedView ? 'Browse all vehicles' : 'Ask us to source one'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawer && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div
              className="absolute inset-0 bg-ink/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawer(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="absolute left-0 top-0 flex h-full w-full max-w-[380px] flex-col bg-paper"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-white px-5">
                <h2 className="text-[17px] font-bold text-ink">Filters</h2>
                <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="flex h-11 w-11 items-center justify-center">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <FilterPanel
                  draft={draft}
                  onChange={setDraft}
                  count={draftCount}
                  bare
                  onApply={() => {
                    apply(draft)
                    setDrawer(false)
                  }}
                  onClear={() => apply({ ...EMPTY_FILTERS, q: filters.q, arrivals: filters.arrivals })}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

interface Chip {
  key: string
  label: string
  remove: (f: VehicleFilters) => VehicleFilters
}

function activeChips(f: VehicleFilters): Chip[] {
  const chips: Chip[] = []
  const add = (key: string, label: string, remove: (f: VehicleFilters) => VehicleFilters) => chips.push({ key, label, remove })
  if (f.arrivals) add('arrivals', 'New arrivals', (x) => ({ ...x, arrivals: false }))
  if (f.condition) add('condition', f.condition === 'New' ? 'Brand new' : 'Pre-owned', (x) => ({ ...x, condition: '' }))
  if (f.category) add('category', CATEGORIES.find((c) => c.slug === f.category)?.label ?? f.category, (x) => ({ ...x, category: '' }))
  if (f.make) add('make', f.make, (x) => ({ ...x, make: '', model: '' }))
  if (f.model) add('model', f.model, (x) => ({ ...x, model: '' }))
  if (f.body) add('body', f.body, (x) => ({ ...x, body: '' }))
  if (f.minPrice) add('minPrice', `From ${formatLKRShort(Number(f.minPrice))}`, (x) => ({ ...x, minPrice: '' }))
  if (f.maxPrice) add('maxPrice', `Up to ${formatLKRShort(Number(f.maxPrice))}`, (x) => ({ ...x, maxPrice: '' }))
  if (f.minYear) add('minYear', `From ${f.minYear}`, (x) => ({ ...x, minYear: '' }))
  if (f.maxYear) add('maxYear', `Up to ${f.maxYear}`, (x) => ({ ...x, maxYear: '' }))
  f.fuel.forEach((fu) => add(`fuel-${fu}`, fu, (x) => ({ ...x, fuel: x.fuel.filter((y) => y !== fu) })))
  if (f.transmission) add('transmission', f.transmission, (x) => ({ ...x, transmission: '' }))
  if (f.mileage) add('mileage', MILEAGE_BANDS.find((b) => b.value === f.mileage)?.label ?? '', (x) => ({ ...x, mileage: '' }))
  f.drive.forEach((d) => add(`drive-${d}`, d, (x) => ({ ...x, drive: x.drive.filter((y) => y !== d) })))
  if (f.color) add('color', f.color, (x) => ({ ...x, color: '' }))
  return chips
}
