import { Suspense } from 'react'
import { Inventory } from '@/components/vehicles/Inventory'
export const metadata = { title: 'Vehicles' }
export default function Vehicles() {
  return <Suspense fallback={<div className="mx-auto min-h-screen max-w-[1320px] px-5 py-16" role="status">Loading vehicles…</div>}><Inventory /></Suspense>
}
