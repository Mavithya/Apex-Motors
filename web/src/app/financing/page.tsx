import React from 'react'

import { IMAGES } from '@/data/dealer'
import { PageHero } from '@/components/ui/PageHeader'
import { ButtonAnchor } from '@/components/ui/Button'
import { FinanceExperience } from '@/components/finance/FinanceExperience'

export const metadata = { title: 'Financing' }


const STEPS = [
  { title: 'Choose your vehicle', body: 'Pick a car from our stock, or tell us your budget and we will suggest options that fit.' },
  { title: 'Share a few details', body: 'Income, employment and preferred term. We use this to approach suitable partner lenders on your behalf.' },
  { title: 'Compare offers', body: 'We lay out each lender’s rate, fees and instalment side by side so you can choose.' },
  { title: 'Sign and drive', body: 'Once approved, we handle the documentation with the lender and prepare your car for handover.' },
]

export default function Financing() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Financing' }]}
        title="Finance that fits the way you drive."
        intro="We help you compare leasing and loan options from partner lenders, explain every figure, and take care of the paperwork."
        image={IMAGES.interior}
      >
        <ButtonAnchor href="#calculator" size="lg">
          Estimate a payment
        </ButtonAnchor>
        <ButtonAnchor href="#apply" size="lg" variant="outline-light">
          Speak to a finance advisor
        </ButtonAnchor>
      </PageHero>

      {/* How it works */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px] lg:col-span-5">
              How financing assistance works
            </h2>
            <p className="text-[16px] leading-relaxed text-muted lg:col-span-6 lg:col-start-7 lg:pt-2">
              We are not a lender. Our role is to help you understand your options and to work with banks and leasing companies so
              you get a clear, comparable offer — at no extra charge from us.
            </p>
          </div>
          <ol className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative border-t-2 border-line pb-8 pr-8 pt-6">
                <span className="absolute -top-[2px] left-0 h-[2px] w-12 bg-accent" aria-hidden />
                <span className="text-[14px] font-bold text-accent">Step {i + 1}</span>
                <h3 className="mt-3 text-[19px] font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinanceExperience />
    </>
  )
}
