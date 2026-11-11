"use client";
import { Suspense } from 'react'
import { Inventory, InventoryContent } from '@/components/vehicles/Inventory'
export default function Vehicles() {
  return (<Suspense data-preview-page-key="vehicles" fallback={<InventoryContent />}><Inventory /></Suspense>);
}
