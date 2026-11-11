/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { Vehicle, VehicleImage } from '@/types/vehicle'
import { cn } from '@/lib/utils'

const Vehicle3DModal = dynamic(() => import('./Vehicle3DModal').then((module) => module.Vehicle3DModal), { ssr: false })

export function Gallery({ images, name, model3DUrl, model3DAttribution, previewPath, imagePaths, coverPath, productIndex, galleryIndexes }: { images: VehicleImage[]; name: string; model3DUrl?: string; model3DAttribution?: Vehicle['model3DAttribution']; previewPath?: string; imagePaths?: (string | undefined)[]; coverPath?: string; productIndex?: number; catalogPath?: string; galleryIndexes?: number[] }) {
  const siteData = useSiteData();
  const [index, setIndex] = useState(0)
  const [viewer, setViewer] = useState(false)
  const [viewer3D, setViewer3D] = useState(false)
  const close3D = useCallback(() => setViewer3D(false), [])
  const current = images[index]

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length), [images.length])

  useEffect(() => {
    if (!viewer) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewer(false)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [viewer, go])

  if (!current) return (
    <div data-preview-list-path={previewPath} className="flex aspect-[4/3] items-center justify-center bg-stone text-sm text-muted"><span data-preview-static="Vehicle viewer interface"
      data-preview-style-target="products_detail.gallery.vehiclePhotographsHaveNotBeen"
      data-preview-style-type="text">{siteData?.content?.vehicles?.gallery?.emptyMessage ?? "Vehicle photographs have not been added yet."}</span></div>
  );

  return (
    <GalleryFrame productIndex={productIndex} previewPath={previewPath}>
      <div className="group relative aspect-[4/3] overflow-clip bg-stone sm:aspect-[16/10]">
        {/* Image swaps are keyboard/click-frequent, so they cut rather than animate */}
        <img
          src={(current.src && typeof current.src === 'string' && current.src.trim() !== '') ? current.src : undefined}
          data-preview-field-path={index === 0 ? coverPath ?? imagePaths?.[index] : imagePaths?.[index]}
          alt={`${name} — ${current.label}`}
          className="h-full w-full object-cover"
          />
        <button
          type="button"
          onClick={() => setViewer(true)}
          className="absolute inset-0 cursor-zoom-in"
          aria-label="Open full-screen image viewer" data-preview-static="Interface label, control, or calculated value"
        />
        <NavButton side="left" onClick={() => go(-1)} />
        <NavButton side="right" onClick={() => go(1)} />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
          <span className="bg-ink/80 px-3 py-1.5 text-[12px] font-semibold text-white">
            <span data-preview-static="Computed interface value">{index + 1}</span> <span data-preview-static="Interface label">/ </span><span data-preview-static="Computed interface value">{images.length}</span> <span data-preview-static="Interface label">· </span><span data-preview-static="Computed interface value">{current.label}</span>
            {current.representative && (<span
              className="font-normal text-white/60"
              data-preview-field-path="vehicles.gallery.representativeImageLabel"
              data-preview-style-target="vehicles.gallery.representativeImageLabel"
              data-preview-style-type="text">{siteData?.content?.vehicles?.gallery?.representativeImageLabel ?? "· representative image"}</span>)}
          </span>
          <span className="pointer-events-auto relative z-10 flex items-center gap-2">
            {model3DUrl ? (
              <button
                type="button"
                onClick={() => setViewer3D(true)}
                className="flex h-10 items-center gap-2 bg-white/95 px-3.5 text-[12px] font-bold text-ink shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-accent sm:text-[13px]"
                data-preview-field-path="vehicles.gallery.view3dLabel"
                data-preview-style-target="vehicles.gallery.view3dLabel"
                data-preview-style-type="button">
                <Box
                  className="h-4 w-4 text-accent"
                  aria-hidden

                  data-preview-static="Decorative icon" />{siteData?.content?.vehicles?.gallery?.view3dLabel ?? "View in 3D"}</button>
            ) : (
              <span
                className="flex h-10 items-center gap-2 bg-ink/80 px-3 text-[11px] font-semibold text-white/80"
                aria-label="3D view not available for this vehicle"
                data-preview-field-path="vehicles.gallery.item3dUnavailableLabel"
                data-preview-style-target="vehicles.gallery.item3dUnavailableLabel"
                data-preview-style-type="text">
                <Box
                  className="h-4 w-4"
                  aria-hidden

                  data-preview-static="Decorative icon" />{siteData?.content?.vehicles?.gallery?.item3dUnavailableLabel ?? "3D unavailable"}</span>
            )}
            <button type="button" aria-label="Open full-screen image viewer" onClick={() => setViewer(true)} className="flex h-10 w-10 items-center justify-center bg-white/95 text-ink" data-preview-static="Interface label, control, or calculated value">
              <Expand
                className="h-4 w-4"
                aria-hidden

                data-preview-static="Decorative icon" />
            </button>
          </span>
        </div>
      </div>

      <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto" role="tablist" aria-labelledby="label-gallery-0"><span id="label-gallery-0" className="sr-only" data-preview-static="Accessibility label">Vehicle photos</span>
        {images.map((img, i: number) => (
          <GalleryThumbnail
            key={img.src + i}
            image={img}
            productIndex={productIndex}
            galleryIndex={galleryIndexes?.[i] ?? i}
            selected={i === index}
            onSelect={() => setIndex(i)}
            className={cn(
              'relative aspect-[16/10] w-24 shrink-0 overflow-clip bg-stone sm:w-28',
              'after:absolute after:inset-0 after:border-2 after:transition-colors after:duration-200',
              i === index ? 'after:border-accent' : 'opacity-70 after:border-transparent hover:opacity-100'
            )}
          />
        ))}
      </div>

      <AnimatePresence>
        {viewer && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${name} photo viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95"
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-5 text-white">
              <p className="text-[14px] font-semibold">
                <span data-preview-static="Computed interface value">{name}</span> <span
                className="font-normal text-white/60"
                data-preview-field-path="vehicles.gallery.ofLabel"
                data-preview-style-target="vehicles.gallery.ofLabel"
                data-preview-style-type="text">{siteData?.content?.vehicles?.gallery?.ofLabel ?? "· · of"}{current.label} · {index + 1} of {images.length}</span>
              </p>
              <button type="button" onClick={() => setViewer(false)} aria-label="Close viewer" className="flex h-11 w-11 items-center justify-center" data-preview-static="Interface label, control, or calculated value">
                <X className="h-6 w-6" data-preview-static="decorative-icon" />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
              <motion.img
                key={current.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                src={current.src}
                alt={`${name} — ${current.label}`}
                className="max-h-full max-w-full object-contain"
              />
              <NavButton side="left" onClick={() => go(-1)} always />
              <NavButton side="right" onClick={() => go(1)} always />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {viewer3D && <Vehicle3DModal name={name} model3DUrl={model3DUrl} attribution={model3DAttribution} onClose={close3D} />}
    </GalleryFrame>
  );
}

function GalleryFrame({ productIndex, previewPath, children }: { productIndex?: number; previewPath?: string; children: React.ReactNode }) {
  if (productIndex !== undefined && productIndex >= 0) return <div data-preview-list-path={`catalog.products[${productIndex}].gallery`}>{children}</div>
  return <div data-preview-list-path={previewPath}>{children}</div>
}

function GalleryThumbnail({ image, productIndex, galleryIndex, selected, onSelect, className }: { image: VehicleImage; productIndex?: number; galleryIndex: number; selected: boolean; onSelect: () => void; className: string }) {
  const props = { type: 'button' as const, role: 'tab', 'aria-selected': selected, 'aria-label': image.label, onClick: onSelect, className }
  if (productIndex !== undefined && productIndex >= 0 && galleryIndex >= 0) return (
    <button {...props} data-preview-field-path={`catalog.products[${productIndex}].gallery[${galleryIndex}]`} data-preview-item-path={`catalog.products[${productIndex}].gallery[${galleryIndex}]`}>
      <img src={(image.src && typeof image.src === 'string' && image.src.trim() !== '') ? image.src : undefined} data-preview-field-path={`catalog.products[${productIndex}].gallery[${galleryIndex}]`} alt="" className="h-full w-full object-cover" />
    </button>
  )
  return (
    <button {...props} data-preview-static="Interface label, control, or calculated value"><img
      src={image.src}
      alt=""
      className="h-full w-full object-cover" data-preview-static="Vehicle viewer interface" /></button>
  );
}

function NavButton({ side, onClick, always }: { side: 'left' | 'right'; onClick: () => void; always?: boolean }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous image' : 'Next image'}
      className={cn(
        'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm transition-[opacity,background-color] duration-200 hover:bg-white',
        side === 'left' ? 'left-3' : 'right-3',
        !always && 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100'
      )} data-preview-static="Interface label, control, or calculated value"
    >
      <Icon className="h-5 w-5"  data-preview-static="Decorative icon" />
    </button>
  );
}
