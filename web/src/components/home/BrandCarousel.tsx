'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Brand = { name: string; logo: string; href: string }

export function BrandCarousel({ brands }: { brands: Brand[] }) {
  const count = brands.length
  const [activeIndex, setActiveIndex] = useState(count + 2)
  const [animate, setAnimate] = useState(true)
  const touchStart = useRef<number | null>(null)
  const repeated = [...brands, ...brands, ...brands]

  function move(direction: number) {
    setActiveIndex((index) => index + direction)
  }

  function finishMove() {
    if (activeIndex < count || activeIndex >= count * 2) {
      setAnimate(false)
      setActiveIndex((index) => index < count ? index + count : index - count)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    }
  }

  return (
    <div className="mt-7 flex items-center gap-2 sm:gap-6" aria-label="Car brands carousel">
      <button
        type="button"
        onClick={() => move(-1)}
        aria-label="Previous brand"
        className="z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:size-14"
      >
        <ChevronLeft size={22} strokeWidth={2} />
      </button>

      <div
        className="relative h-40 min-w-0 flex-1 overflow-hidden [--brand-slot:clamp(136px,22vw,264px)] sm:h-52 lg:h-60"
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
          {repeated.map((brand, index) => {
            const distance = Math.abs(index - activeIndex)
            return (
              <Link
                key={`${brand.name}-${index}`}
                href={brand.href}
                aria-label={`View ${brand.name} vehicles`}
                aria-hidden={distance > 2}
                tabIndex={distance <= 2 ? 0 : -1}
                className={`flex h-full w-[var(--brand-slot)] shrink-0 items-center justify-center px-4 transition-[opacity,filter,transform] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent ${distance === 0 ? 'z-10 scale-100 opacity-100' : 'scale-75 opacity-55 grayscale hover:opacity-80'} ${distance > 2 ? 'pointer-events-none' : ''}`}
              >
                <Image src={brand.logo} alt={brand.name} width={240} height={180} className="h-[85%] w-full object-contain" />
              </Link>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => move(1)}
        aria-label="Next brand"
        className="z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:size-14"
      >
        <ChevronRight size={22} strokeWidth={2} />
      </button>
    </div>
  )
}
