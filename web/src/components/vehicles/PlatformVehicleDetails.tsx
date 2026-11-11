'use client'

import { PlatformProductDetail, type ProductItem } from '@deneb-ui/ui'
import { useSearchParams } from 'next/navigation'
import { catalogVehicle } from '@/lib/vehicleCatalog'
import { VehicleDetailsContent } from './VehicleDetailsContent'

export function PlatformVehicleDetails() {
  const productId = useSearchParams().get('id')
  return <PlatformProductDetail key={productId ?? 'missing-vehicle'} productId={productId} backHref="/vehicles" backLabel="Back to vehicles" renderProduct={(product) => <VehicleDetailsContent vehicle={catalogVehicle(product as ProductItem)} />} />
}
