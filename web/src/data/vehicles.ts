import initialSiteData from './site-data.json'
import type { ProductItem } from '@deneb-ui/ui'
import type { Vehicle, BodyType, CategorySlug } from '@/types/vehicle'
import { catalogVehicle } from '@/lib/vehicleCatalog'

export const VEHICLES: Vehicle[] = (initialSiteData.content.catalog.products as ProductItem[]).map(catalogVehicle)
export const CATEGORIES = initialSiteData.content.home.CATEGORIES as { slug: CategorySlug; label: string; blurb: string; image: string; to?: string }[]

export const BODY_TYPES: BodyType[] = ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Coupe']

export const MAKES = Array.from(new Set(VEHICLES.map((v) => v.make))).sort()

export function modelsFor(make: string) {
  return Array.from(new Set(VEHICLES.filter((v) => !make || v.make === make).map((v) => v.model))).sort()
}

export const COLORS = Array.from(new Set(VEHICLES.map((v) => v.exteriorColor))).sort()

export function getVehicle(slug: string) {
  return VEHICLES.find((v) => v.slug === slug)
}

export function similarVehicles(v: Vehicle, count = 3, vehicles = VEHICLES) {
  return vehicles.filter((o) => o.id !== v.id)
    .map((o) => ({
      o,
      score:
        (o.bodyType === v.bodyType ? 3 : 0) +
        (o.make === v.make ? 2 : 0) +
        (Math.abs(o.price - v.price) < v.price * 0.35 ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.o)
}

/** Brands shown in "Popular Brands"; text treatments, not official logos. */
export const BRANDS = ['Toyota', 'Honda', 'Nissan', 'Suzuki', 'BMW', 'Mercedes-Benz', 'Audi', 'Kia', 'Hyundai', 'Land Rover']
