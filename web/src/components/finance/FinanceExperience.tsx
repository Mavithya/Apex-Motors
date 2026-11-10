'use client'

import React, { useState } from 'react'
import { cleanPhone, EMAIL_RE, PHONE_RE } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { TextField, SelectField, TextAreaField } from '@/components/ui/Field'
import { FormSuccess } from '@/components/ui/FormSuccess'
import { Info } from 'lucide-react'
import { VEHICLES } from '@/data/vehicles'
import { LOAN_TERMS } from '@/lib/finance'
import { formatLKR } from '@/lib/utils'
import { FinanceCalculator } from './FinanceCalculator'
type Errors = Partial<Record<'name' | 'phone' | 'email', string>>
export function FinanceExperience() {
  const startingPrice = 22900000
  const [estimate, setEstimate] = useState('')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', vehicle: '', employment: 'Salaried', term: '60', message: '' })
  const [errors, setErrors] = useState<Errors>({})

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!PHONE_RE.test(cleanPhone(form.phone))) next.phone = 'Enter a Sri Lankan number, e.g. 077 123 4567.'
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email so we can send the comparison.'
    setErrors(next)
    if (!Object.keys(next).length) setSent(true)
  }


  return (
    <>
      {/* Calculator */}
      <section id="calculator" className="bg-ink py-20 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <h2 className="text-[32px] font-extrabold tracking-[-0.02em] text-white sm:text-[42px]">Monthly instalment calculator</h2>
          <p className="mt-3 max-w-xl text-[16px] text-white/70">
            Enter a vehicle price, your down payment, a loan period and an interest rate to see an indicative monthly figure.
          </p>
          <div className="mt-10">
            <FinanceCalculator initialPrice={startingPrice} tone="dark" onEstimate={setEstimate} />
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="apply" className="bg-paper py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]">Talk to a finance advisor</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Share a few details and an advisor will call to understand your situation. There is no obligation and no impact on
              your credit record from this enquiry.
            </p>
            <div className="mt-10 flex gap-3 border-l-2 border-accent bg-white p-5 text-[14px] leading-relaxed text-graphite">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <p>
                <strong className="font-bold text-ink">Important.</strong> All calculations on this site are estimates for
                illustration. Final rates, fees, loan-to-value limits and approval are determined by the lender and current
                regulations. {` `}Apex Motors does not provide credit.
              </p>
            </div>
          </div>

          <div className="border border-line bg-white p-6 sm:p-8 lg:col-span-7">
            {sent ? (
              <FormSuccess
                title="Finance enquiry received"
                body={`Thank you${form.name ? `, ${form.name.split(' ')[0]}` : ''}. A finance advisor would call you to discuss options${
                  estimate ? ` around your estimate of ${estimate}` : ''
                }.`}
                onReset={() => setSent(false)}
              />
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                <TextField label="Full name" value={form.name} onChange={update('name')} error={errors.name} className="sm:col-span-2" />
                <TextField label="Phone number" type="tel" placeholder="077 123 4567" value={form.phone} onChange={update('phone')} error={errors.phone} />
                <TextField label="Email" type="email" value={form.email} onChange={update('email')} error={errors.email} />
                <SelectField
                  label="Vehicle of interest"
                  placeholder="Not decided yet"
                  value={form.vehicle}
                  onChange={update('vehicle')}
                  options={VEHICLES.map((v) => ({ value: v.ref, label: `${v.year} ${v.make} ${v.model} — ${formatLKR(v.price)}` }))}
                  className="sm:col-span-2"
                />
                <SelectField
                  label="Employment"
                  value={form.employment}
                  onChange={update('employment')}
                  options={['Salaried', 'Self-employed', 'Business owner', 'Professional', 'Other'].map((x) => ({ value: x, label: x }))}
                />
                <SelectField
                  label="Preferred loan period"
                  value={form.term}
                  onChange={update('term')}
                  options={LOAN_TERMS.map((m) => ({ value: String(m), label: `${m} months (${m / 12} yr)` }))}
                />
                <TextAreaField label="Anything else" optional value={form.message} onChange={update('message')} className="sm:col-span-2" />
                {estimate && (
                  <p className="text-[13px] text-muted sm:col-span-2">
                    Your current estimate will be attached: <span className="font-semibold text-graphite">{estimate}</span>
                  </p>
                )}
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Request a call back
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

    </>
  )
}
