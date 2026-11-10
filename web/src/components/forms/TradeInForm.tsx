'use client'

import React, { useState } from 'react'
import { cleanPhone, EMAIL_RE, PHONE_RE } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { TextField, SelectField, TextAreaField } from '@/components/ui/Field'
import { FormSuccess } from '@/components/ui/FormSuccess'

const YEARS = Array.from({ length: 21 }, (_, i) => String(2025 - i))
type Field = 'make' | 'model' | 'year' | 'mileage' | 'condition' | 'name' | 'phone' | 'email'
export function TradeInForm() {
  const [mode, setMode] = useState('trade-in')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ make: '', model: '', year: '', mileage: '', condition: '', name: '', phone: '', email: '', details: '' })
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Partial<Record<Field, string>> = {}
    if (!form.make.trim()) next.make = 'Enter the make.'
    if (!form.model.trim()) next.model = 'Enter the model.'
    if (!form.year) next.year = 'Select the year.'
    if (!form.mileage || Number(form.mileage) < 0) next.mileage = 'Enter the current mileage.'
    if (!form.condition) next.condition = 'Select the overall condition.'
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!PHONE_RE.test(cleanPhone(form.phone))) next.phone = 'Enter a Sri Lankan number, e.g. 077 123 4567.'
    if (form.email && !EMAIL_RE.test(form.email)) next.email = 'This email address looks incomplete.'
    setErrors(next)
    if (!Object.keys(next).length) setSent(true)
  }


  return (
    <div className="border border-line bg-white p-6 sm:p-8 lg:col-span-8">
      {sent ? (
        <FormSuccess
          title="Valuation request received"
          body={`Thanks${form.name ? `, ${form.name.split(' ')[0]}` : ''}. We would review your ${form.year} ${form.make} ${form.model} and call you to arrange an inspection.`}
          onReset={() => setSent(false)}
        />
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[22px] font-bold text-ink">Your vehicle</h2>
            <div role="radiogroup" aria-label="I want to" className="grid grid-cols-2 border border-line p-1">
              {(['trade-in', 'sell'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => setMode(m)}
                  className={`h-9 whitespace-nowrap px-4 text-[13px] font-semibold transition-colors duration-150 ${
                    mode === m ? 'bg-ink text-white' : 'text-graphite hover:text-ink'
                  }`}
                >
                  {m === 'trade-in' ? 'Trade in' : 'Sell outright'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <TextField label="Vehicle make" placeholder="e.g. Toyota" value={form.make} onChange={update('make')} error={errors.make} />
            <TextField label="Model" placeholder="e.g. Axio" value={form.model} onChange={update('model')} error={errors.model} />
            <SelectField label="Year" placeholder="Select year" value={form.year} onChange={update('year')} error={errors.year} options={YEARS.map((y) => ({ value: y, label: y }))} />
            <TextField label="Mileage (km)" type="number" inputMode="numeric" min={0} placeholder="e.g. 68000" value={form.mileage} onChange={update('mileage')} error={errors.mileage} />
            <SelectField
              label="Condition"
              placeholder="Select condition"
              value={form.condition}
              onChange={update('condition')}
              error={errors.condition}
              className="sm:col-span-2"
              options={[
                { value: 'Excellent', label: 'Excellent — no visible wear, full service history' },
                { value: 'Good', label: 'Good — minor marks, serviced regularly' },
                { value: 'Fair', label: 'Fair — some cosmetic or mechanical work needed' },
                { value: 'Needs work', label: 'Needs work — significant repairs required' },
              ]}
            />
          </div>

          <h2 className="mt-10 border-t border-line pt-8 text-[22px] font-bold text-ink">Your details</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <TextField label="Contact name" value={form.name} onChange={update('name')} error={errors.name} className="sm:col-span-2" autoComplete="name" />
            <TextField label="Phone number" type="tel" placeholder="077 123 4567" value={form.phone} onChange={update('phone')} error={errors.phone} autoComplete="tel" />
            <TextField label="Email" type="email" optional value={form.email} onChange={update('email')} error={errors.email} autoComplete="email" />
            <TextAreaField
              label="Additional details"
              optional
              placeholder="Service history, modifications, outstanding lease, the car you’d like next…"
              value={form.details}
              onChange={update('details')}
              className="sm:col-span-2"
            />
          </div>
          <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto">
            {mode === 'trade-in' ? 'Request trade-in valuation' : 'Request a selling offer'}
          </Button>
        </form>
      )}
    </div>

  )
}
