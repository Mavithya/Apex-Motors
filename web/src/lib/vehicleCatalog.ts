import type { ProductItem } from '@deneb-ui/ui'
import type { Vehicle, VehicleImage } from '@/types/vehicle'

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' ? value as Record<string, unknown> : {}
}

export function vehicleFeatureGroups(product?: ProductItem): { name: string; items: string[] }[] {
  const raw = record(record(product?.customData).vehicle)
  if (!Array.isArray(raw.featureGroups)) return []
  return raw.featureGroups.map((value) => {
    const group = record(value)
    return { name: typeof group.name === 'string' ? group.name : '', items: Array.isArray(group.items) ? group.items.filter((item): item is string => typeof item === 'string') : [] }
  })
}

/** Keeps the automotive attributes while respecting the platform's live price and media. */
export function catalogVehicle(product: ProductItem, index = 0): Vehicle {
  const raw = record(record(product.customData).vehicle)
  const original = raw as unknown as Partial<Vehicle>
  const title = product.title ?? product.name ?? original.model ?? 'Vehicle'
  const originalTitle = `${original.year} ${original.make} ${original.model}`
  const gallery = Array.isArray(product.gallery) ? product.gallery : []
  const photos = Array.isArray(original.images) ? original.images : []
  const photoLabels = record(raw.photoLabels)
  const urls = [product.image ?? product.imageUrl, ...gallery].filter((url): url is string => typeof url === 'string' && !!url)
  const unique = Array.from(new Set(urls))
  const images: VehicleImage[] = unique.length ? unique.map((src, i) => {
    const metadata = record(photoLabels[`image${gallery.indexOf(src)}`])
    return { ...photos.find((image) => image.src === src), src, label: typeof metadata.label === 'string' ? metadata.label : photos.find((image) => image.src === src)?.label ?? `Vehicle photo ${i + 1}`, representative: metadata.representative === true }
  }) : photos
  const categoryFlags = record(raw.categoryFlags)
  return {
    id: String(product.id ?? original.id ?? `vehicle-${index}`),
    slug: original.slug ?? String(product.id ?? `vehicle-${index}`),
    ref: original.ref ?? '',
    make: product.brand ?? original.make ?? '',
    model: title === originalTitle ? original.model! : title,
    variant: original.variant ?? '', year: original.year ?? 0,
    condition: original.condition ?? '' as Vehicle['condition'],
    bodyType: (product.category ?? original.bodyType ?? '') as Vehicle['bodyType'],
    categories: original.categories ?? Object.keys(categoryFlags).filter((key) => categoryFlags[key] === true) as Vehicle['categories'],
    price: typeof product.price === 'number' ? product.price : Number(product.price ?? original.price ?? 0),
    mileage: original.mileage ?? 0,
    fuel: original.fuel ?? '' as Vehicle['fuel'],
    transmission: original.transmission ?? '' as Vehicle['transmission'],
    drive: original.drive ?? '' as Vehicle['drive'],
    engineCc: original.engineCc ?? 0,
    exteriorColor: original.exteriorColor ?? '', interiorColor: original.interiorColor ?? '',
    doors: original.doors ?? 0, seats: original.seats ?? 0, registration: original.registration ?? '',
    availability: product.isAvailable === true ? 'Available' : product.isAvailable === false ? original.availability === 'In transit' ? 'In transit' : 'Reserved' : original.availability ?? 'Available',
    featured: original.featured ?? false, newArrival: original.newArrival ?? false,
    addedOn: original.addedOn ?? '', tagline: original.tagline ?? '',
    description: typeof product.description === 'string' ? product.description.split(/\n\s*\n/).filter(Boolean) : original.description ?? [],
    features: raw.featureGroups ? Object.fromEntries(vehicleFeatureGroups(product).map((group) => [group.name, group.items])) : original.features ?? {}, images,
    model3DUrl: original.model3DUrl,
    model3DAttribution: original.model3DAttribution,
  }
}
