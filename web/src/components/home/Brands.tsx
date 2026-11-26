"use client";
import { useSiteData } from "@deneb-ui/ui";
import { BrandCarousel, type Brand } from './BrandCarousel'

export function Brands() {
  const siteData = useSiteData();
  const brands: Brand[] = siteData.content?.home?.brands ?? []
  return (
    <section className="bg-white pb-24 pt-16" aria-labelledby="popular-brands-heading">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <h2
          id="popular-brands-heading"
          className="text-[22px] font-bold text-ink"
          data-preview-field-path="home.about.heading"
          data-preview-style-target="home.about.heading"
          data-preview-style-type="text">{siteData?.content?.home?.about?.heading ?? "Popular brands"}</h2>
        <BrandCarousel key={brands.length} brands={brands} />
      </div>
    </section>
  );
}
