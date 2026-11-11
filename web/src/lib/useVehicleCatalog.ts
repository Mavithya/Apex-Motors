'use client'

import { useProducts } from '@deneb-ui/ui'
import { catalogVehicle } from './vehicleCatalog'

export function useVehicleCatalog() {
  return useProducts().map(catalogVehicle)
}

/** DENEB supports both its live root catalog and a template's shared catalog. */
export function useCatalogPath() {
  return 'catalog.products'
}
