/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { IMAGES } from '@/data/dealer'
import Link from 'next/link'

export function FinanceTradeCta() {
  const options = [
    { to: '/financing', title: 'Explore Financing', body: 'Estimate your monthly instalment and let us compare lenders for you.' },
    { to: '/sell-your-car', title: 'Trade In Your Vehicle', body: 'Get a clear valuation on your current car and put it towards the next.' },
  ]
  return (
    <section className="grid bg-ink lg:grid-cols-2">
      <img src={IMAGES.handover} alt="An Apex Motors advisor handing car keys to a customer" className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto" />
      <div className="flex flex-col justify-center px-5 py-16 sm:px-12 lg:px-16 lg:py-24">
        <h2 className="max-w-md text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[46px]">
          Your next car is closer than you think.
        </h2>
        <div className="mt-10 border-t border-white/15">
          {options.map((o) => (
            <Link key={o.to} href={o.to} className="group flex items-center justify-between gap-6 border-b border-white/15 py-6">
              <div>
                <h3 className="text-[20px] font-bold text-white transition-colors duration-150 group-hover:text-white/80">{o.title}</h3>
                <p className="mt-1 text-[15px] text-white/60">{o.body}</p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent text-white transition-colors duration-150 group-hover:bg-accent-dark">
                <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
