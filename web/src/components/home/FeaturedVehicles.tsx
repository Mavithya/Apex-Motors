import React from 'react'
import { ArrowRight } from 'lucide-react'
import { VEHICLES } from '@/data/vehicles'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/PageHeader'
import { VehicleCard } from '@/components/vehicles/VehicleCard'

export function FeaturedVehicles({ count }: { count: number }) {
  const featured = VEHICLES.filter((v) => v.featured).slice(0, count)
  return (
    <section className="border-t border-line bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          title="Handpicked for You"
          intro="A rotating selection from our current stock — each one inspected, photographed and priced by our team."
          action={
            <ButtonLink to="/vehicles" variant="outline">
              View all vehicles <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
