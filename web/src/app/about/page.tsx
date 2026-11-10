/* eslint-disable @next/next/no-img-element -- Preserve the original CDN photography URLs and image sizing. */
import React from 'react'
import { ArrowRight } from 'lucide-react'

import { DEALER, IMAGES } from '@/data/dealer'
import { getVehicle } from '@/data/vehicles'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/PageHeader'
import { ButtonLink, ButtonAnchor } from '@/components/ui/Button'

export const metadata = { title: 'About Us' }


/** All copy on this page is editable placeholder content for the template. */
const PRINCIPLES = [
  {
    title: 'We list what we would buy ourselves',
    body: 'Every pre-owned vehicle is inspected before it reaches the floor. Cars that do not meet the standard are turned away, however good the margin.',
  },
  {
    title: 'The full picture, before you visit',
    body: 'Mileage, ownership, service history and inspection notes are shared up front, so the conversation starts from facts.',
  },
  {
    title: 'One advisor, start to finish',
    body: 'The person who answers your first message is the person who hands you the keys — and the one you call afterwards.',
  },
]

const SERVICES = [
  { title: 'Brand-new & pre-owned sales', body: 'Selected stock across leading marques.', to: '/vehicles' },
  { title: 'Financing assistance', body: 'Compare partner lenders with our help.', to: '/financing' },
  { title: 'Trade-in & purchase', body: 'Clear, itemised valuations.', to: '/sell-your-car' },
  { title: 'Vehicle sourcing', body: 'Tell us what you want; we find it.', to: '/contact' },
]

export default function About() {
  const headline = 'A dealership built on straight answers.'
  const established = DEALER.established
  const civic = getVehicle('honda-civic-2023')
  return (
    <>
      {/* Intro */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-8 sm:px-8 lg:pb-16">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
          <h1 className="mt-10 max-w-4xl text-[42px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[64px] lg:text-[80px]">
            {headline}
          </h1>
        </div>
        <img src={IMAGES.showroom} alt="Inside the Apex Motors showroom in Colombo" className="aspect-[16/9] w-full object-cover lg:aspect-[21/9]" />
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <p className="text-[14px] font-semibold text-muted lg:col-span-3">Since {established} · {DEALER.city}</p>
          <div className="lg:col-span-8">
            <p className="text-[24px] font-semibold leading-[1.4] tracking-[-0.01em] text-ink sm:text-[30px]">
              {DEALER.name} began as a small pre-owned lot on Baseline Road. Today we offer brand-new and carefully selected
              pre-owned vehicles, financing assistance and trade-ins — still from the same corner of Colombo.
            </p>
            <div className="mt-10 grid gap-8 text-[16px] leading-[1.7] text-graphite sm:grid-cols-2">
              <p>
                We have stayed deliberately small. Our stock is chosen rather than accumulated, and every car is one we are
                prepared to put our name to. That means fewer vehicles on the floor, and more time with each customer.
              </p>
              <p>
                Most of our buyers come through recommendation. We think that is because we answer questions plainly, price
                fairly, and stay in touch long after the paperwork is signed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-ink py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 md:grid-cols-2">
          <div className="border-t border-white/20 pt-6">
            <h2 className="text-[14px] font-bold text-white/60">Our mission</h2>
            <p className="mt-4 text-[24px] font-semibold leading-[1.35] sm:text-[28px]">
              To make buying a car in Sri Lanka transparent, unhurried and fair — for first-time buyers and enthusiasts alike.
            </p>
          </div>
          <div className="border-t border-white/20 pt-6">
            <h2 className="text-[14px] font-bold text-white/60">Our vision</h2>
            <p className="mt-4 text-[24px] font-semibold leading-[1.35] sm:text-[28px]">
              To be the dealership people recommend without being asked, because the experience was simply better.
            </p>
          </div>
        </div>
      </section>

      {/* Why customers choose us */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <h2 className="max-w-xl text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]">
            Why customers choose us
          </h2>
          <div className="mt-12 border-t border-ink">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="grid gap-3 border-b border-line py-8 md:grid-cols-12">
                <h3 className="text-[20px] font-bold text-ink md:col-span-5">{p.title}</h3>
                <p className="text-[16px] leading-relaxed text-muted md:col-span-6 md:col-start-7">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography + services */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            <figure className="col-span-2">
              <img src={IMAGES.handover} alt="An advisor handing over keys to a customer" className="aspect-[16/10] w-full object-cover" />
              <figcaption className="mt-2 text-[13px] text-muted">Handover day at the showroom.</figcaption>
            </figure>
            <img src={IMAGES.detail} alt="Close-up of a vehicle's alloy wheel and headlight" className="aspect-square w-full object-cover" />
            <img src={civic?.images[0].src ?? IMAGES.rear} alt="A sedan in the photography studio" className="aspect-square w-full object-cover" />
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[36px]">What we do</h2>
            <ul className="mt-8 border-t border-line">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <Link href={s.to} className="group flex items-center justify-between gap-4 border-b border-line py-5">
                    <span>
                      <span className="block text-[17px] font-bold text-ink transition-colors duration-150 group-hover:text-accent">{s.title}</span>
                      <span className="mt-0.5 block text-[14px] text-muted">{s.body}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-[transform,color] duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[32px] font-extrabold tracking-[-0.02em] text-ink sm:text-[42px]">Come and see us.</h2>
            <p className="mt-3 text-[16px] text-muted">
              {DEALER.addressLines.join(', ')} · {DEALER.hoursShort}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/contact" size="lg">
              Contact our team
            </ButtonLink>
            <ButtonAnchor href={DEALER.phoneHref} size="lg" variant="outline">
              Call {DEALER.phoneDisplay}
            </ButtonAnchor>
          </div>
        </div>
      </section>
    </>
  )
}
