'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useState } from 'react'
import { cleanPhone, EMAIL_RE, PHONE_RE } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { TextField, SelectField, TextAreaField } from '@/components/ui/Field'
import { FormSuccess } from '@/components/ui/FormSuccess'

const YEARS = Array.from({ length: 21 }, (_, i) => String(2025 - i))
type Field = 'make' | 'model' | 'year' | 'mileage' | 'condition' | 'name' | 'phone' | 'email'
export function TradeInForm() {
  const siteData = useSiteData();
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
          title={siteData?.content?.["sell-your-car"]?.form?.valuationRequestReceived2 ?? "Valuation request received"}
          body={`Thanks${form.name ? `, ${form.name.split(' ')[0]}` : ''}. We would review your ${form.year} ${form.make} ${form.model} and call you to arrange an inspection.`}
          onReset={() => setSent(false)}
          data-preview-field-path="sell-your-car.form.valuationRequestReceived2"
          previewPath="sell-your-car.form" />
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2
              className="text-[22px] font-bold text-ink"
              data-preview-field-path="sell-your-car.form.heading"
              data-preview-style-target="sell-your-car.form.heading"
              data-preview-style-type="text">{siteData?.content?.["sell-your-car"]?.form?.heading ?? "Your vehicle"}</h2>
            <div role="radiogroup" aria-labelledby="label-tradeinform-0" className="grid grid-cols-2 border border-line p-1"><span id="label-tradeinform-0" className="sr-only" data-preview-static="Accessibility label">I want to</span>
              {(['trade-in', 'sell'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => setMode(m)}
                  className={`h-9 whitespace-nowrap px-4 text-[13px] font-semibold transition-colors duration-150 ${
                    mode === m ? 'bg-ink text-white' : 'text-graphite hover:text-ink'
                  }`} data-preview-static="Interface label, control, or calculated value"
                >
                  {m === 'trade-in' ? 'Trade in' : 'Sell outright'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <TextField
              label={siteData?.content?.["sell-your-car"]?.form?.vehicleMake2 ?? "Vehicle make"}
              placeholder={siteData?.content?.["sell-your-car"]?.form?.eGToyotaPlaceholder ?? "e.g. Toyota"}
              value={form.make}
              onChange={update('make')}
              error={errors.make}
              data-preview-field-path="sell-your-car.form.vehicleMake2"
              previewPath="sell-your-car.form" placeholderPath="sell-your-car.form.eGToyotaPlaceholder" />
            <TextField
              label={siteData?.content?.["sell-your-car"]?.form?.model2 ?? "Model"}
              placeholder={siteData?.content?.["sell-your-car"]?.form?.eGAxioPlaceholder ?? "e.g. Axio"}
              value={form.model}
              onChange={update('model')}
              error={errors.model}
              data-preview-field-path="sell-your-car.form.model2"
              previewPath="sell-your-car.form" placeholderPath="sell-your-car.form.eGAxioPlaceholder" />
            <SelectField
              label={siteData?.content?.["sell-your-car"]?.form?.year2 ?? "Year"}
              placeholder={siteData?.content?.["sell-your-car"]?.form?.selectYearPlaceholder ?? "Select year"}
              value={form.year}
              onChange={update('year')}
              error={errors.year}
              options={YEARS.map((y) => ({ value: y, label: y }))}
              data-preview-field-path="sell-your-car.form.year2"
              previewPath="sell-your-car.form" placeholderPath="sell-your-car.form.selectYearPlaceholder" />
            <TextField
              label={siteData?.content?.["sell-your-car"]?.form?.mileageKm2 ?? "Mileage (km)"}
              type="number"
              inputMode="numeric"
              min={0}
              placeholder={siteData?.content?.["sell-your-car"]?.form?.eG68000Placeholder ?? "e.g. 68000"}
              value={form.mileage}
              onChange={update('mileage')}
              error={errors.mileage}
              data-preview-field-path="sell-your-car.form.mileageKm2"
              previewPath="sell-your-car.form" placeholderPath="sell-your-car.form.eG68000Placeholder" />
            <SelectField
              label={siteData?.content?.["sell-your-car"]?.form?.condition2 ?? "Condition"}
              placeholder={siteData?.content?.["sell-your-car"]?.form?.selectConditionPlaceholder ?? "Select condition"}
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
              data-preview-field-path="sell-your-car.form.condition2"
              previewPath="sell-your-car.form" placeholderPath="sell-your-car.form.selectConditionPlaceholder" />
          </div>

          <h2
            className="mt-10 border-t border-line pt-8 text-[22px] font-bold text-ink"
            data-preview-field-path="sell-your-car.form.heading2"
            data-preview-style-target="sell-your-car.form.heading2"
            data-preview-style-type="text">{siteData?.content?.["sell-your-car"]?.form?.heading2 ?? "Your details"}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <TextField
              label={siteData?.content?.["sell-your-car"]?.form?.contactName2 ?? "Contact name"}
              value={form.name}
              onChange={update('name')}
              error={errors.name}
              className="sm:col-span-2"
              autoComplete="name"
              data-preview-field-path="sell-your-car.form.contactName2"
              previewPath="sell-your-car.form" />
            <TextField
              label={siteData?.content?.["sell-your-car"]?.form?.phoneNumber2 ?? "Phone number"}
              type="tel"
              placeholder={siteData?.content?.["sell-your-car"]?.form?.item0771234567Placeholder ?? "077 123 4567"}
              value={form.phone}
              onChange={update('phone')}
              error={errors.phone}
              autoComplete="tel"
              data-preview-field-path="sell-your-car.form.phoneNumber2"
              previewPath="sell-your-car.form" placeholderPath="sell-your-car.form.item0771234567Placeholder" />
            <TextField
              label={siteData?.content?.["sell-your-car"]?.form?.email2 ?? "Email"}
              type="email"
              optional
              value={form.email}
              onChange={update('email')}
              error={errors.email}
              autoComplete="email"
              data-preview-field-path="sell-your-car.form.email2"
              previewPath="sell-your-car.form" />
            <TextAreaField
              label={siteData?.content?.["sell-your-car"]?.form?.additionalDetails2 ?? "Additional details"}
              optional
              placeholder={siteData?.content?.["sell-your-car"]?.form?.serviceHistoryModificationsOutstandingLease ?? "Service history, modifications, outstanding lease, the car you’d like next…"}
              value={form.details}
              onChange={update('details')}
              className="sm:col-span-2"
              data-preview-field-path="sell-your-car.form.additionalDetails2"
              previewPath="sell-your-car.form" placeholderPath="sell-your-car.form.serviceHistoryModificationsOutstandingLease" />
          </div>
          <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" data-preview-static="Interface label, control, or calculated value">
            {mode === 'trade-in' ? 'Request trade-in valuation' : 'Request a selling offer'}
          </Button>
        </form>
      )}
    </div>
  );
}
