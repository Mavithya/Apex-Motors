"use client";
import { useSiteData } from "@deneb-ui/ui";
import { BrandCarousel } from './BrandCarousel'
import { VEHICLES } from '@/data/vehicles'

const brands = [
  { name: 'Audi', logo: '/brands/audi-logo.svg' },
  { name: 'Land Rover', logo: '/brands/land-rover-logo.svg' },
  { name: 'BMW', logo: '/brands/bmw-logo.svg' },
  { name: 'Honda', logo: '/brands/honda-logo.png' },
  { name: 'Toyota', logo: '/brands/toyota-logo.svg' },
  { name: 'Nissan', logo: '/brands/nissan-logo.svg' },
  { name: 'Suzuki', logo: '/brands/suzuki-logo.svg' },
  { name: 'Mercedes-Benz', logo: '/brands/mercedes-benz-logo.svg' },
  { name: 'Kia', logo: '/brands/kia-logo.svg' },
  { name: 'Hyundai', logo: '/brands/hyundai-logo.svg' },
].map((brand) => ({
  ...brand,
  href: VEHICLES.some((vehicle) => vehicle.make === brand.name)
    ? `/vehicles?make=${encodeURIComponent(brand.name)}`
    : '/contact',
}))

export function Brands() {
  const siteData = useSiteData();
  return (
    <section className="bg-white pb-24 pt-16" aria-labelledby="popular-brands-heading">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <h2
          id="popular-brands-heading"
          className="text-[22px] font-bold text-ink"
          data-preview-field-path="home.about.heading"
          data-preview-style-target="home.about.heading"
          data-preview-style-type="text">{siteData?.content?.home?.about?.heading ?? "Popular brands"}</h2>
        <BrandCarousel brands={brands} />
      </div>
    </section>
  );
}
