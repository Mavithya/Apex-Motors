'use client';
import { useSiteData } from "@deneb-ui/ui";
import { useVehicleCatalog } from '@/lib/useVehicleCatalog'

import React, { useState } from 'react'
import { cleanPhone, EMAIL_RE, PHONE_RE } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { TextField, SelectField, TextAreaField } from '@/components/ui/Field'
import { FormSuccess } from '@/components/ui/FormSuccess'
import { Info } from 'lucide-react'
import { resolveLoanTerm } from '@/lib/finance'
import { useFinanceOptions } from '@/lib/useFinanceOptions'
import { formatLKR } from '@/lib/utils'
import { FinanceCalculator } from './FinanceCalculator'
type Errors = Partial<Record<'name' | 'phone' | 'email' | 'employment' | 'term', string>>
export function FinanceExperience() {
  const siteData = useSiteData();
  const VEHICLES = useVehicleCatalog()
  const startingPrice = 22900000
  const [estimate, setEstimate] = useState('')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', vehicle: '', employment: 'Salaried', term: '60', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const { loanTerms, employmentOptions } = useFinanceOptions()
  const months = resolveLoanTerm(loanTerms, Number(form.term))
  const employment = employmentOptions.some((option) => !option.disabled && option.value === form.employment) ? form.employment : employmentOptions.find((option) => !option.disabled)?.value ?? ''

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!PHONE_RE.test(cleanPhone(form.phone))) next.phone = 'Enter a Sri Lankan number, e.g. 077 123 4567.'
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email so we can send the comparison.'
    if (!months) next.term = 'Choose a loan period.'
    if (!employment) next.employment = 'Choose your employment.'
    setErrors(next)
    if (!Object.keys(next).length) setSent(true)
  }


  return (
    <>
      {/* Calculator */}
      <section id="calculator" className="bg-ink py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <h2
            className="text-[32px] font-extrabold tracking-[-0.02em] text-white sm:text-[42px]"
            data-preview-field-path="financing.heading2"
            data-preview-style-target="financing.heading2"
            data-preview-style-type="text">{siteData?.content?.financing?.heading2 ?? "Monthly instalment calculator"}</h2>
          <p
            className="mt-3 max-w-xl text-[16px] text-white/70"
            data-preview-field-path="financing.description3"
            data-preview-style-target="financing.description3"
            data-preview-style-type="text">{siteData?.content?.financing?.description3 ?? "Enter a vehicle price, your down payment, a loan period and an interest rate to see an indicative monthly figure."}</p>
          <div className="mt-10">
            <FinanceCalculator initialPrice={startingPrice} tone="dark" onEstimate={setEstimate} selectedMonths={months} onMonthsChange={(value) => setForm((current) => ({ ...current, term: String(value) }))} />
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="apply" className="bg-paper py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2
              className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]"
              data-preview-field-path="financing.heading3"
              data-preview-style-target="financing.heading3"
              data-preview-style-type="text">{siteData?.content?.financing?.heading3 ?? "Talk to a finance advisor"}</h2>
            <p
              className="mt-4 text-[16px] leading-relaxed text-muted"
              data-preview-field-path="financing.description4"
              data-preview-style-target="financing.description4"
              data-preview-style-type="text">{siteData?.content?.financing?.description4 ?? "Share a few details and an advisor will call to understand your situation. There is no obligation and no impact on your credit record from this enquiry."}</p>
            <div className="mt-10 flex gap-3 border-l-2 border-accent bg-white p-5 text-[14px] leading-relaxed text-graphite">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                aria-hidden

                data-preview-static="Decorative icon" />
              <p
                data-preview-field-path="financing.description5"
                data-preview-style-target="financing.description5"
                data-preview-style-type="text">
                <strong
                  className="font-bold text-ink"
                  data-preview-field-path="financing.important"
                  data-preview-style-target="financing.important"
                  data-preview-style-type="text">{siteData?.content?.financing?.important ?? "Important."}</strong> <span
                  data-preview-field-path="financing.description5"
                  data-preview-style-target="financing.description5"
                  data-preview-style-type="text">{siteData?.content?.financing?.description5 ?? "All calculations on this site are estimates for illustration. Final rates, fees, loan-to-value limits and approval are determined by the lender and current regulations. Apex Motors does not provide credit."}</span> {` `}</p>
            </div>
          </div>

          <div className="border border-line bg-white p-6 sm:p-8 lg:col-span-7">
            {sent ? (
              <FormSuccess
                title={siteData?.content?.financing?.form?.financeEnquiryReceived2 ?? "Finance enquiry received"}
                body={`Thank you${form.name ? `, ${form.name.split(' ')[0]}` : ''}. A finance advisor would call you to discuss options${
                  estimate ? ` around your estimate of ${estimate}` : ''
                }.`}
                onReset={() => setSent(false)}
                data-preview-field-path="financing.form.financeEnquiryReceived2"
                previewPath="financing.form" />
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label={siteData?.content?.financing?.form?.fullName2 ?? "Full name"}
                  value={form.name}
                  onChange={update('name')}
                  error={errors.name}
                  className="sm:col-span-2"
                  data-preview-field-path="financing.form.fullName2"
                  previewPath="financing.form" />
                <TextField
                  label={siteData?.content?.financing?.form?.phoneNumber2 ?? "Phone number"}
                  type="tel"
                  placeholder={siteData?.content?.financing?.form?.item0771234567Placeholder ?? "077 123 4567"}
                  value={form.phone}
                  onChange={update('phone')}
                  error={errors.phone}
                  data-preview-field-path="financing.form.phoneNumber2"
                  previewPath="financing.form" placeholderPath="financing.form.item0771234567Placeholder" />
                <TextField
                  label={siteData?.content?.financing?.form?.email2 ?? "Email"}
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  error={errors.email}
                  data-preview-field-path="financing.form.email2"
                  previewPath="financing.form" />
                <SelectField
                  label={siteData?.content?.financing?.form?.vehicleInterest2 ?? "Vehicle of interest"}
                  placeholder={siteData?.content?.financing?.form?.notDecidedYetPlaceholder ?? "Not decided yet"}
                  value={form.vehicle}
                  onChange={update('vehicle')}
                  options={VEHICLES.map((v) => ({ value: v.ref, label: `${v.year} ${v.make} ${v.model} — ${formatLKR(v.price)}` }))}
                  className="sm:col-span-2"
                  data-preview-field-path="financing.form.vehicleInterest2"
                  previewPath="financing.form" placeholderPath="financing.form.notDecidedYetPlaceholder" />
                <SelectField
                  label={siteData?.content?.financing?.form?.employment2 ?? "Employment"}
                  value={employment}
                  onChange={update('employment')}
                  options={employmentOptions}
                  renderOption={(option, index) => (
                    <option key={index} value={option.value} disabled={option.disabled}
                      data-preview-item-path={`financing.form.employmentOptions[${index}]`}
                      data-preview-field-path={`financing.form.employmentOptions[${index}].label`}>
                      {option.label}
                    </option>
                  )}
                  optionsPath="financing.form.employmentOptions"
                  error={errors.employment}
                  disabled={!employment}
                  data-preview-field-path="financing.form.employment2"
                  previewPath="financing.form" />
                <SelectField
                  label={siteData?.content?.financing?.form?.preferredLoanPeriod2 ?? "Preferred loan period"}
                  value={months ? String(months) : ''}
                  onChange={update('term')}
                  options={loanTerms.map((term) => ({ value: term.valid ? String(term.months) : `invalid-term-${term.index}`, label: term.valid ? `${term.months} months (${term.label})` : term.label, disabled: !term.valid, previewPath: `financing.loanTerms[${term.index}]` }))}
                  optionsPath="financing.loanTerms"
                  placeholder={months ? undefined : siteData.content?.financing?.noLoanPeriodsLabel ?? 'No loan periods available'}
                  disabled={!months}
                  error={errors.term}
                  data-preview-field-path="financing.form.preferredLoanPeriod2"
                  previewPath="financing.form" />
                <TextAreaField
                  label={siteData?.content?.financing?.form?.anythingElse2 ?? "Anything else"}
                  optional
                  value={form.message}
                  onChange={update('message')}
                  className="sm:col-span-2"
                  data-preview-field-path="financing.form.anythingElse2"
                  previewPath="financing.form" />
                {estimate && ((<p
                  className="text-[13px] text-muted sm:col-span-2"
                  data-preview-field-path="financing.form.subtitle"
                  data-preview-style-target="financing.form.subtitle"
                  data-preview-style-type="text">{siteData?.content?.financing?.form?.subtitle ?? "Your current estimate will be attached:"}<span className="font-semibold text-graphite">{estimate}</span>
                </p>))}
                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto"
                    data-preview-style-target="financing.contact.formSubmitLabel"
                    data-preview-style-type="button">
                    <span
                      data-preview-field-path="financing.contact.formSubmitLabel"
                      data-preview-style-target="financing.contact.formSubmitLabel"
                      data-preview-style-type="text">{siteData?.content?.financing?.contact?.formSubmitLabel ?? "Request a call back"}</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

    </>
  );
}
