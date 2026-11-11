"use client";
import { useSiteData } from "@deneb-ui/ui";
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  const siteData = useSiteData();
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8">
      <p
        className="text-sm font-bold text-accent"
        data-preview-field-path="notFound.code"
        data-preview-style-target="notFound.code"
        data-preview-style-type="text">{siteData?.content?.notFound?.code ?? "404"}</p>
      <h1
        className="mt-4 text-4xl font-extrabold tracking-tight text-ink"
        data-preview-field-path="notFound.title"
        data-preview-style-target="notFound.title"
        data-preview-style-type="text">{siteData?.content?.notFound?.title ?? "This page could not be found."}</h1>
      <p
        className="mt-5 text-muted"
        data-preview-field-path="notFound.description"
        data-preview-style-target="notFound.description"
        data-preview-style-type="text">{siteData?.content?.notFound?.description ?? "The vehicle or page may no longer be available. Explore our current collection."}</p>
      <ButtonLink to="/vehicles" className="mt-8"><span
        data-preview-field-path="notFound.browseVehicles"
        data-preview-style-target="notFound.browseVehicles"
        data-preview-style-type="text">{siteData?.content?.notFound?.browseVehicles ?? "Browse all vehicles"}</span></ButtonLink>
    </section>
  );
}
