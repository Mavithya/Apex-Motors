"use client";
import { useSiteData } from "@deneb-ui/ui";
import { useDealerImages } from '@/lib/useDealer'
import React from 'react'

import { PageHero } from '@/components/ui/PageHeader'
import { ButtonAnchor } from '@/components/ui/Button'
import { FinanceExperience } from '@/components/finance/FinanceExperience'



const DEFAULT_STEPS = [
  { title: 'Choose your vehicle', body: 'Pick a car from our stock, or tell us your budget and we will suggest options that fit.' },
  { title: 'Share a few details', body: 'Income, employment and preferred term. We use this to approach suitable partner lenders on your behalf.' },
  { title: 'Compare offers', body: 'We lay out each lender’s rate, fees and instalment side by side so you can choose.' },
  { title: 'Sign and drive', body: 'Once approved, we handle the documentation with the lender and prepare your car for handover.' },
]

export default function Financing() {
  const siteData = useSiteData();
  const STEPS: typeof DEFAULT_STEPS = siteData?.content?.financing?.STEPS ?? DEFAULT_STEPS
  const IMAGES = useDealerImages()
  return (
    <>
      <PageHero
        data-preview-page-key="financing"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Financing' }]}
        title={siteData?.content?.financing?.hero?.financeFitsWayDrive ?? "Finance that fits the way you drive."}
        intro={siteData.content?.common?.sectionCopy?.["financing_page_0"] ?? "We help you compare leasing and loan options from partner lenders, explain every figure, and take care of the paperwork."} introPath="common.sectionCopy.financing_page_0"
        image={siteData.content?.financing?.hero?.image ?? IMAGES.interior} imagePath="financing.hero.image"
        data-preview-field-path="financing.hero.financeFitsWayDrive"
        previewPath="financing.hero">
        <ButtonAnchor
          href="#calculator"
          size="lg"
          data-preview-field-path="financing.hero.estimatePayment"
          data-preview-style-target="financing.hero.estimatePayment"
          data-preview-style-type="text">{siteData?.content?.financing?.hero?.estimatePayment ?? "Estimate a payment"}</ButtonAnchor>
        <ButtonAnchor
          href="#apply"
          size="lg"
          variant="outline-light"
          data-preview-field-path="financing.hero.speakFinanceAdvisor"
          data-preview-style-target="financing.hero.speakFinanceAdvisor"
          data-preview-style-type="text">{siteData?.content?.financing?.hero?.speakFinanceAdvisor ?? "Speak to a finance advisor"}</ButtonAnchor>
      </PageHero>

      {/* How it works */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2
              className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px] lg:col-span-5"
              data-preview-field-path="financing.heading"
              data-preview-style-target="financing.heading"
              data-preview-style-type="text">{siteData?.content?.financing?.heading ?? "How financing assistance works"}</h2>
            <p
              className="text-[16px] leading-relaxed text-muted lg:col-span-6 lg:col-start-7 lg:pt-2"
              data-preview-field-path="financing.description"
              data-preview-style-target="financing.description"
              data-preview-style-type="text">{siteData?.content?.financing?.description ?? "We are not a lender. Our role is to help you understand your options and to work with banks and leasing companies so you get a clear, comparable offer — at no extra charge from us."}</p>
          </div>
          <ol
            className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-4"
            data-preview-list-path="financing.STEPS"
            data-preview-style-target="financing.STEPS.grid"
            data-preview-style-type="grid">
            {STEPS.map((s, i: number) => (
              <li
                key={s.title}
                className="relative border-t-2 border-line pb-8 pr-8 pt-6"

                data-preview-style-target={`financing.STEPS[${i}].card`}
                data-preview-style-type="card" data-preview-item-path={`financing.STEPS[${i}]`}>
                <span className="absolute -top-[2px] left-0 h-[2px] w-12 bg-accent" aria-hidden data-preview-static="Interface label, control, or calculated value" />
                <span
                  className="text-[14px] font-bold text-accent"
                  data-preview-field-path="financing.stepLabel"
                  data-preview-style-target="financing.stepLabel"
                  data-preview-style-type="text">{siteData?.content?.financing?.stepLabel ?? "Step"}{i + 1}</span>
                <h3 className="mt-3 text-[19px] font-bold text-ink" data-preview-field-path={`financing.STEPS[${i}].title`}>{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted" data-preview-field-path={`financing.STEPS[${i}].body`}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinanceExperience />
    </>
  );
}
