/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { Vehicle, VehicleImage } from '@/types/vehicle'
import { cn } from '@/lib/utils'

const Vehicle3DModal = dynamic(() => import('./Vehicle3DModal').then((module) => module.Vehicle3DModal), { ssr: false })

export function Gallery({ images, name, model3DUrl, model3DAttribution }: { images: VehicleImage[]; name: string; model3DUrl?: string; model3DAttribution?: Vehicle['model3DAttribution'] }) {
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

  return (
    <div>
      <div className="group relative aspect-[4/3] overflow-hidden bg-stone sm:aspect-[16/10]">
        {/* Image swaps are keyboard/click-frequent, so they cut rather than animate */}
        <img src={current.src} alt={`${name} — ${current.label}`} className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={() => setViewer(true)}
          className="absolute inset-0 cursor-zoom-in"
          aria-label="Open full-screen image viewer"
        />
        <NavButton side="left" onClick={() => go(-1)} />
        <NavButton side="right" onClick={() => go(1)} />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
          <span className="bg-ink/80 px-3 py-1.5 text-[12px] font-semibold text-white">
            {index + 1} / {images.length} · {current.label}
            {current.representative && <span className="font-normal text-white/60"> · representative image</span>}
          </span>
          <span className="pointer-events-auto relative z-10 flex items-center gap-2">
            {model3DUrl ? (
              <button type="button" onClick={() => setViewer3D(true)} className="flex h-10 items-center gap-2 bg-white/95 px-3.5 text-[12px] font-bold text-ink shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-accent sm:text-[13px]">
                <Box className="h-4 w-4 text-accent" aria-hidden /> View in 3D
              </button>
            ) : (
              <span className="flex h-10 items-center gap-2 bg-ink/80 px-3 text-[11px] font-semibold text-white/80" aria-label="3D view not available for this vehicle">
                <Box className="h-4 w-4" aria-hidden /> 3D unavailable
              </span>
            )}
            <span className="flex h-10 w-10 items-center justify-center bg-white/95 text-ink">
              <Expand className="h-4 w-4" aria-hidden />
            </span>
          </span>
        </div>
      </div>

      <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto" role="tablist" aria-label="Vehicle photos">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={img.label}
            onClick={() => setIndex(i)}
            className={cn(
              'relative aspect-[16/10] w-24 shrink-0 overflow-hidden bg-stone sm:w-28',
              'after:absolute after:inset-0 after:border-2 after:transition-colors after:duration-200',
              i === index ? 'after:border-accent' : 'opacity-70 after:border-transparent hover:opacity-100'
            )}
          >
            <img src={img.src} alt="" className="h-full w-full object-cover" />
          </button>
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
                {name} <span className="font-normal text-white/60">· {current.label} · {index + 1} of {images.length}</span>
              </p>
              <button type="button" onClick={() => setViewer(false)} aria-label="Close viewer" className="flex h-11 w-11 items-center justify-center">
                <X className="h-6 w-6" />
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
    </div>
  )
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
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}
