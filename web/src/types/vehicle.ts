export type Condition = 'New' | 'Used'
export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'MPV' | 'Coupe'
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'
export type Transmission = 'Automatic' | 'Manual'
export type DriveType = 'FWD' | 'RWD' | 'AWD' | '4WD'
export type Availability = 'Available' | 'Reserved' | 'In transit'
export type FeatureGroup = 'Safety' | 'Comfort' | 'Interior' | 'Exterior' | 'Technology'

/** Category slugs used by the home tiles and the inventory filter. */
export type CategorySlug = 'suv' | 'sedan' | 'hatchback' | 'mpv' | 'luxury' | 'sports'

export interface VehicleImage {
  src: string
  label: string
  /** True when the photo illustrates the model rather than this exact car. */
  representative?: boolean
}

export interface Vehicle {
  id: string
  slug: string
  /** Stock reference shown to customers. */
  ref: string
  make: string
  model: string
  variant: string
  year: number
  condition: Condition
  bodyType: BodyType
  categories: CategorySlug[]
  /** Illustrative price in LKR. */
  price: number
  mileage: number
  fuel: FuelType
  transmission: Transmission
  drive: DriveType
  engineCc: number
  exteriorColor: string
  interiorColor: string
  doors: number
  seats: number
  registration: string
  availability: Availability
  featured: boolean
  newArrival: boolean
  /** ISO date the car was added to stock, used for "Newest first". */
  addedOn: string
  tagline: string
  description: string[]
  features: Partial<Record<FeatureGroup, string[]>>
  images: VehicleImage[]
}

export interface Testimonial {
  id: string
  name: string
  location: string
  vehicle: string
  quote: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface FaqCategory {
  id: string
  title: string
  items: FaqItem[]
}
