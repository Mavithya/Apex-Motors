'use client'

import { useRef, useState } from 'react'
import { EditableImage } from '@deneb-ui/ui'
import Link from '@/components/ui/SiteLink'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type Brand = { name: string; logo: string; href: string }

export function BrandCarousel({ brands }: { brands: Brand[] }) {
  const count = brands.length
  const [activeIndex, setActiveIndex] = useState(count > 1 ? count + Math.min(2, count - 1) : 0)
  const [animate, setAnimate] = useState(true)
  const touchStart = useRef<number | null>(null)
  const repeated = count > 1 ? [...brands, ...brands, ...brands] : brands

  function move(direction: number) {
    if (count < 2) return
    setActiveIndex((index) => index + direction)
  }

  function finishMove() {
    if (count < 2) return
    if (activeIndex < count || activeIndex >= count * 2) {
      setAnimate(false)
      setActiveIndex((index) => index < count ? index + count : index - count)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    }
  }

  return (
    <div className="mt-7 flex items-center gap-2 sm:gap-6" aria-labelledby="label-brandcarousel-0"><span id="label-brandcarousel-0" className="sr-only" data-preview-static="Accessibility label">Car brands carousel</span>
      <button
        type="button"
        disabled={count < 2}
        onClick={() => move(-1)}
        aria-label="Previous brand"
        className="z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:size-14" data-preview-static="Interface label, control, or calculated value"
      >
        <ChevronLeft size={22} strokeWidth={2} data-preview-static="decorative-icon" />
      </button>

      <div
        data-preview-list-path="home.brands"
        className="relative h-40 min-w-0 flex-1 overflow-clip [--brand-slot:clamp(136px,22vw,264px)] sm:h-52 lg:h-60"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return
          const delta = event.changedTouches[0].clientX - touchStart.current
          if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1)
          touchStart.current = null
        }}
      >
        <div
          className={`absolute left-1/2 top-0 flex h-full ${animate ? 'transition-transform duration-500 ease-out' : ''}`}
          style={{ transform: `translateX(calc(-${activeIndex + 0.5} * var(--brand-slot)))` }}
          onTransitionEnd={finishMove}
        >
          {repeated.map((brand, index: number) => {
            const distance = Math.abs(index - activeIndex)
            const visible = distance <= 2
            return (
              <Link
                key={index}
                href={brand.href || '#'}
                data-preview-item-path={visible ? `home.brands[${index % count}]` : undefined}
                data-preview-field-path={visible ? `home.brands[${index % count}].href` : undefined}
                aria-label={`View ${brand.name} vehicles`}
                aria-hidden={distance > 2}
                tabIndex={distance <= 2 ? 0 : -1}
                className={`flex h-full w-[var(--brand-slot)] shrink-0 items-center justify-center px-4 transition-[opacity,filter,transform] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent ${distance === 0 ? 'z-10 scale-100 opacity-100' : 'scale-75 opacity-55 grayscale hover:opacity-80'} ${distance > 2 ? 'pointer-events-none' : ''}`}
              >
                <EditableImage
                  src={brand.logo}
                  alt={brand.name}
                  width={240}
                  height={180}
                  fit="contain"
                  className="h-[85%] w-full object-contain"
                  data-preview-field-path={visible ? `home.brands[${index % count}].logo` : undefined}
                  data-preview-static={visible ? undefined : 'Offscreen carousel copy'}
                />
              </Link>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        disabled={count < 2}
        onClick={() => move(1)}
        aria-label="Next brand"
        className="z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:size-14" data-preview-static="Interface label, control, or calculated value"
      >
        <ChevronRight size={22} strokeWidth={2} data-preview-static="decorative-icon" />
      </button>
    </div>
  );
}
