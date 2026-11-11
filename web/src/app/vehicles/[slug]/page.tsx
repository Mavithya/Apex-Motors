import { notFound } from 'next/navigation'
import { getVehicle, VEHICLES } from '@/data/vehicles'
import { VehicleDetailsContent } from '@/components/vehicles/VehicleDetailsContent'

export const dynamicParams = false

export function generateStaticParams() {
  return VEHICLES.length ? VEHICLES.map(({ slug }) => ({ slug })) : [{ slug: 'unavailable' }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const vehicle = getVehicle((await params).slug)
  return { title: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Vehicle not found' }
}

export default async function VehicleDetails({ params }: { params: Promise<{ slug: string }> }) {
  const vehicle = getVehicle((await params).slug)
  if (!vehicle) notFound()
  return <VehicleDetailsContent vehicle={vehicle} />
}
