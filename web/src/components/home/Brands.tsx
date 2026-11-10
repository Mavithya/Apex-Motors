import React from 'react'
import { BRANDS, VEHICLES } from '@/data/vehicles'
import Link from 'next/link'

/** Text treatments rather than invented logos. Swap in licensed logo files when available. */
export function Brands() {
  return (
    <section className="bg-paper pb-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-[22px] font-bold text-ink">Popular brands</h2>
          <p className="text-[14px] text-muted">Not in stock? We can source most makes on request.</p>
        </div>
        <ul className="mt-8 grid grid-cols-2 border-l border-t border-line sm:grid-cols-5">
          {BRANDS.map((b) => {
            const count = VEHICLES.filter((v) => v.make === b).length
            return (
              <li key={b} className="border-b border-r border-line">
                <Link
                  href={count ? `/vehicles?make=${encodeURIComponent(b)}` : '/contact'}
                  className="group flex h-28 flex-col items-center justify-center gap-1 px-3 transition-colors duration-150 hover:bg-white"
                >
                  <span className="text-center text-[17px] font-extrabold uppercase tracking-[0.06em] text-ink sm:text-[18px]">
                    {b}
                  </span>
                  <span className="text-[12px] text-muted transition-colors duration-150 group-hover:text-accent">
                    {count ? `${count} in stock` : 'On request'}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
