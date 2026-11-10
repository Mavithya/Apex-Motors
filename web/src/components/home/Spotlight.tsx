/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { IMAGES } from '@/data/dealer'
import { getVehicle } from '@/data/vehicles'
import { formatLKR } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/Button'

const SPOTLIGHT_SLUG = 'land-rover-defender-110-2025'

/** Manufacturer-style campaign block for one hero vehicle. */
export function Spotlight() {
  const v = getVehicle(SPOTLIGHT_SLUG)
  if (!v) return null
  const specs = [
    { value: '300', unit: 'PS', label: '3.0L mild-hybrid straight-six' },
    { value: '900', unit: 'mm', label: 'Maximum wading depth' },
    { value: v.drive, unit: '', label: 'Terrain Response 2 & air suspension' },
  ]
  return (
    <section className="bg-paper py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[60px] lg:col-span-7 lg:text-[76px]">
            Meet your next adventure.
          </h2>
          <p className="max-w-md text-[17px] leading-relaxed text-muted lg:col-span-5 lg:pb-3">
            The new Defender 110 goes wherever the road ends — up through the tea country, down to the coast — then drives
            home in near silence.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1600px] sm:px-8">
        <img src={IMAGES.spotlight} alt="Land Rover Defender on a mountain road through tea plantations at dawn" className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]" />
      </div>

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-10 border-b border-line py-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p className="text-[13px] font-semibold text-muted">
              {v.year} · Brand new · Ref {v.ref}
            </p>
            <h3 className="mt-1 text-[28px] font-extrabold leading-tight text-ink">
              {v.make} {v.model} 110
            </h3>
            <p className="mt-1 text-[17px] font-semibold text-graphite">{formatLKR(v.price)}</p>
          </div>
          <dl className="grid grid-cols-3 gap-4 lg:col-span-5">
            {specs.map((s) => (
              <div key={s.label} className="border-l border-line pl-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="text-[30px] font-extrabold tracking-[-0.02em] text-ink sm:text-[36px]">{s.value}</span>
                  {s.unit && <span className="ml-1 text-[15px] font-semibold text-muted">{s.unit}</span>}
                  <p className="mt-1 text-[13px] leading-snug text-muted">{s.label}</p>
                </dd>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-3 lg:text-right">
            <ButtonLink to={`/vehicles/${v.slug}`} size="lg" variant="dark">
              Explore This Vehicle
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
