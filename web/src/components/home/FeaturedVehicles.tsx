"use client";
import { useSiteData } from "@deneb-ui/ui";
import { useVehicleCatalog, useCatalogPath } from '@/lib/useVehicleCatalog'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/PageHeader'
import { VehicleCard } from '@/components/vehicles/VehicleCard'

export function FeaturedVehicles({ count }: { count: number }) {
  const siteData = useSiteData();
  const catalogPath = useCatalogPath()
  const VEHICLES = useVehicleCatalog()
  const featured = VEHICLES.filter((v) => v.featured).slice(0, count)
  return (
    <section className="border-t border-line bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading
          title={siteData?.content?.home?.featuredProducts?.handpicked ?? "Handpicked for You"}
          intro={siteData.content?.common?.sectionCopy?.["home_FeaturedVehicles_0"] ?? "A rotating selection from our current stock — each one inspected, photographed and priced by our team."} introPath="common.sectionCopy.home_FeaturedVehicles_0"
          action={
            <ButtonLink to="/vehicles" variant="outline">
              <span
                data-preview-field-path="home.featuredProducts.viewAllVehicles"
                data-preview-style-target="home.featuredProducts.viewAllVehicles"
                data-preview-style-type="text">{siteData?.content?.home?.featuredProducts?.viewAllVehicles ?? "View all vehicles"}</span> <ArrowRight className="h-4 w-4" data-preview-static="decorative-icon" />
            </ButtonLink>
          }
          data-preview-field-path="home.featuredProducts.handpicked"
          previewPath="home.featuredProducts" />
        <div data-preview-list-path={catalogPath} className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((v, i: number) => (
            <VehicleCard key={v.id} vehicle={v} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
