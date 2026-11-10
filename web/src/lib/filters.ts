import type { Vehicle, BodyType, CategorySlug, DriveType, FuelType, Transmission, Condition } from '@/types/vehicle'
import { parseQuery, buildQuery } from './utils'

export interface VehicleFilters {
  q: string
  condition: '' | Condition
  make: string
  model: string
  body: '' | BodyType
  category: '' | CategorySlug
  minPrice: string
  maxPrice: string
  minYear: string
  maxYear: string
  fuel: FuelType[]
  transmission: '' | Transmission
  mileage: '' | MileageBand
  drive: DriveType[]
  color: string
  arrivals: boolean
}

export type MileageBand = 'under-1k' | 'under-15k' | '15k-30k' | 'over-30k'
export const MILEAGE_BANDS: { value: MileageBand; label: string; test: (km: number) => boolean }[] = [
  { value: 'under-1k', label: 'Under 1,000 km (delivery miles)', test: (k) => k < 1000 },
  { value: 'under-15k', label: 'Under 15,000 km', test: (k) => k < 15000 },
  { value: '15k-30k', label: '15,000 – 30,000 km', test: (k) => k >= 15000 && k <= 30000 },
  { value: 'over-30k', label: 'Over 30,000 km', test: (k) => k > 30000 },
]

export type SortKey = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'year-desc'
export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'year-desc', label: 'Year: newest first' },
]

export const EMPTY_FILTERS: VehicleFilters = {
  q: '',
  condition: '',
  make: '',
  model: '',
  body: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  fuel: [],
  transmission: '',
  mileage: '',
  drive: [],
  color: '',
  arrivals: false,
}

export function filtersFromPath(path: string): VehicleFilters {
  const p = parseQuery(path)
  return {
    ...EMPTY_FILTERS,
    q: p.q ?? '',
    condition: (p.condition as Condition) ?? '',
    make: p.make ?? '',
    model: p.model ?? '',
    body: (p.body as BodyType) ?? '',
    category: (p.category as CategorySlug) ?? '',
    minPrice: p.minPrice ?? '',
    maxPrice: p.maxPrice ?? '',
    minYear: p.minYear ?? '',
    maxYear: p.maxYear ?? '',
    fuel: p.fuel ? (p.fuel.split(',') as FuelType[]) : [],
    transmission: (p.transmission as Transmission) ?? '',
    mileage: (p.mileage as MileageBand) ?? '',
    drive: p.drive ? (p.drive.split(',') as DriveType[]) : [],
    color: p.color ?? '',
    arrivals: p.view === 'new-arrivals',
  }
}

export function pathFromFilters(f: Partial<VehicleFilters>) {
  return (
    '/vehicles' +
    buildQuery({
      q: f.q,
      condition: f.condition,
      make: f.make,
      model: f.model,
      body: f.body,
      category: f.category,
      minPrice: f.minPrice,
      maxPrice: f.maxPrice,
      minYear: f.minYear,
      maxYear: f.maxYear,
      fuel: f.fuel?.join(','),
      transmission: f.transmission,
      mileage: f.mileage,
      drive: f.drive?.join(','),
      color: f.color,
      view: f.arrivals ? 'new-arrivals' : undefined,
    })
  )
}

export function applyFilters(list: Vehicle[], f: VehicleFilters) {
  const q = f.q.trim().toLowerCase()
  const band = MILEAGE_BANDS.find((b) => b.value === f.mileage)
  return list.filter((v) => {
    if (q && !`${v.make} ${v.model} ${v.variant} ${v.year}`.toLowerCase().includes(q)) return false
    if (f.condition && v.condition !== f.condition) return false
    if (f.make && v.make !== f.make) return false
    if (f.model && v.model !== f.model) return false
    if (f.body && v.bodyType !== f.body) return false
    if (f.category && !v.categories.includes(f.category)) return false
    if (f.minPrice && v.price < Number(f.minPrice)) return false
    if (f.maxPrice && v.price > Number(f.maxPrice)) return false
    if (f.minYear && v.year < Number(f.minYear)) return false
    if (f.maxYear && v.year > Number(f.maxYear)) return false
    if (f.fuel.length && !f.fuel.includes(v.fuel)) return false
    if (f.transmission && v.transmission !== f.transmission) return false
    if (band && !band.test(v.mileage)) return false
    if (f.drive.length && !f.drive.includes(v.drive)) return false
    if (f.color && v.exteriorColor !== f.color) return false
    if (f.arrivals && !v.newArrival) return false
    return true
  })
}

export function sortVehicles(list: Vehicle[], key: SortKey) {
  const out = [...list]
  switch (key) {
    case 'newest':
      return out.sort((a, b) => b.addedOn.localeCompare(a.addedOn))
    case 'oldest':
      return out.sort((a, b) => a.addedOn.localeCompare(b.addedOn))
    case 'price-asc':
      return out.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return out.sort((a, b) => b.price - a.price)
    case 'year-desc':
      return out.sort((a, b) => b.year - a.year || b.addedOn.localeCompare(a.addedOn))
  }
}

/** Budget presets used by the home search and the price filters. */
export const PRICE_STEPS = [5_000_000, 10_000_000, 15_000_000, 20_000_000, 25_000_000, 35_000_000, 50_000_000, 75_000_000, 100_000_000, 125_000_000]
