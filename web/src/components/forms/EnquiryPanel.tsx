'use client';
import { useSiteData } from "@deneb-ui/ui";
import { useDealer } from '@/lib/useDealer'

import React, { useState } from 'react'
import { CalendarCheck, Info, MessageCircle, Phone } from 'lucide-react'
import type { Vehicle } from '@/types/vehicle'
import { cleanPhone, cn, EMAIL_RE, formatLKR, PHONE_RE , interpolateCopy } from '@/lib/utils'
import { ButtonAnchor, Button } from '@/components/ui/Button'
import { TextField, TextAreaField, SelectField } from '@/components/ui/Field'
import { FormSuccess } from '@/components/ui/FormSuccess'
import { WishlistButton } from '@/components/vehicles/WishlistButton'
import { Badge } from '@/components/vehicles/VehicleCard'

type Mode = 'info' | 'test-drive'
type Errors = Partial<Record<'name' | 'phone' | 'email' | 'date', string>>

export function EnquiryPanel({ vehicle: v, waMessage, initialMode, previewPath }: { vehicle: Vehicle; waMessage: string; initialMode: Mode; previewPath?: string }) {
  const siteData = useSiteData();
  const DEALER = useDealer()
  const whatsappLink = (message?: string) => (DEALER.whatsappUrl ?? `https://wa.me/${DEALER.whatsappNumber}`) + (message ? '?text=' + encodeURIComponent(message) : '')
  const [mode, setMode] = useState<Mode>(initialMode)
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: 'Morning (9–12)', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const vehicleLine = `${v.year} ${v.make} ${v.model} ${v.variant} · Ref ${v.ref}`

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!PHONE_RE.test(cleanPhone(form.phone))) next.phone = 'Enter a Sri Lankan number, e.g. 077 123 4567.'
    if (form.email && !EMAIL_RE.test(form.email)) next.email = 'This email address looks incomplete.'
    if (mode === 'test-drive' && !form.date) next.date = 'Choose a preferred date.'
    setErrors(next)
    if (!Object.keys(next).length) setSent(true)
  }

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const availabilityTone =
    v.availability === 'Available' ? 'bg-success' : v.availability === 'Reserved' ? 'bg-accent' : 'bg-muted'

  return (
    <div className="border border-line bg-white">
      {/* Vehicle information */}
      <div className="border-b border-line p-6 lg:p-7">
        <div className="flex flex-wrap items-center gap-2">
          {v.condition && <Badge tone={v.condition === 'New' ? 'dark' : 'light'} data-preview-static="Interface label, control, or calculated value">{v.condition === 'New' ? 'Brand New' : 'Pre-Owned'}</Badge>}
          <span className="flex items-center gap-1.5 text-[13px] font-semibold text-graphite" data-preview-static="Interface label, control, or calculated value">
            <span className={cn('h-2 w-2 rounded-full', availabilityTone)} aria-hidden data-preview-static="Interface label, control, or calculated value" />
            {v.availability}
          </span>
        </div>
        <p className="mt-4 text-[13px] font-semibold text-muted">
          <span data-preview-field-path={previewPath ? `${previewPath}.brand` : undefined}>{v.make}</span><span data-preview-static="Computed interface value">{v.year ? ` · ${v.year}` : ''}</span>
        </p>
        <h1 data-preview-field-path={previewPath ? `${previewPath}.title` : undefined} className="mt-1 text-[32px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink">{v.model}</h1>
        <p className="mt-1 text-[15px] text-muted" data-preview-static="Interface label, control, or calculated value">{v.variant}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p
              className="text-[12px] text-muted"
              data-preview-field-path="home.form.subtitle"
              data-preview-style-target="home.form.subtitle"
              data-preview-style-type="text">{siteData?.content?.home?.form?.subtitle ?? "Price"}</p>
            <p data-preview-field-path={previewPath ? `${previewPath}.price` : undefined} className="text-[27px] font-extrabold tracking-[-0.035em] text-ink">{formatLKR(v.price)}</p>
          </div>
          <WishlistButton id={v.id} label={`${v.make} ${v.model}`} variant="text" />
        </div>
        <p
          className="mt-3 text-[12px] text-muted"
          data-preview-field-path="home.form.subtitle2"
          data-preview-style-target="home.form.subtitle2"
          data-preview-style-type="text">{interpolateCopy(siteData.content?.home?.form?.subtitle2 ?? "Stock ref {ref}", { ref: v.ref })}</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-2 border-b border-line p-6 lg:px-7">
        <ButtonAnchor href={DEALER.phoneHref} variant="dark">
          <Phone className="h-4 w-4"  data-preview-static="Decorative icon" /> <span
            data-preview-field-path="home.form.callNow"
            data-preview-style-target="home.form.callNow"
            data-preview-style-type="text">{siteData?.content?.home?.form?.callNow ?? "Call now"}</span>
        </ButtonAnchor>
        <ButtonAnchor href={whatsappLink(waMessage)} newTab>
          <MessageCircle className="h-4 w-4"  /> <span
            data-preview-field-path="home.form.whatsapp"
            data-preview-style-target="home.form.whatsapp"
            data-preview-style-type="text">{siteData?.content?.home?.form?.whatsapp ?? "WhatsApp"}</span>
        </ButtonAnchor>
      </div>

      {/* Enquiry form */}
      <div className="p-6 lg:p-7">
        {sent ? (
          <FormSuccess
            title={mode === 'test-drive' ? 'Test drive requested' : 'Enquiry received'}
            body={`Thank you, ${form.name.split(' ')[0]}. An advisor would contact you on ${form.phone} about the ${v.year} ${v.make} ${v.model}.`}
            onReset={() => {
              setSent(false)
              setForm((f) => ({ ...f, message: '' }))
            }}
            resetLabel="Make another request"
          />
        ) : (
          <form onSubmit={submit} noValidate className="space-y-4">
            <div role="tablist" aria-labelledby="label-enquirypanel-0" className="grid grid-cols-2 border border-line p-1"><span id="label-enquirypanel-0" className="sr-only" data-preview-static="Accessibility label">Enquiry type</span>
              {(
                [
                  { m: 'info', label: 'More information', Icon: Info },
                  { m: 'test-drive', label: 'Test drive', Icon: CalendarCheck },
                ] as const
              ).map(({ m, label, Icon }) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={cn(
                    'flex h-10 items-center justify-center gap-1.5 whitespace-nowrap text-[13px] font-semibold transition-colors duration-150',
                    mode === m ? 'bg-ink text-white' : 'text-graphite hover:text-ink'
                  )} data-preview-static="Interface label, control, or calculated value"
                >
                  <Icon
                    className="h-3.5 w-3.5"
                    aria-hidden

                    data-preview-static="Decorative icon" />
                  {label}
                </button>
              ))}
            </div>

            <div className="bg-paper px-3.5 py-2.5 text-[13px] text-graphite">
              <span
                className="text-muted"
                data-preview-field-path="home.form.vehicleLabel"
                data-preview-style-target="home.form.vehicleLabel"
                data-preview-style-type="text">{siteData?.content?.home?.form?.vehicleLabel ?? "Vehicle:"}</span>
              <span className="font-semibold" data-preview-static="Interface label, control, or calculated value">{vehicleLine}</span>
            </div>

            <TextField
              label={siteData?.content?.home?.form?.fullName2 ?? "Full name"}
              value={form.name}
              onChange={update('name')}
              error={errors.name}
              autoComplete="name"
              data-preview-field-path="home.form.fullName2"
              previewPath="home.form" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <TextField
                label={siteData?.content?.home?.form?.phoneNumber2 ?? "Phone number"}
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                error={errors.phone}
                autoComplete="tel"
                placeholder={siteData?.content?.home?.form?.item0771234567Placeholder ?? "077 123 4567"}
                data-preview-field-path="home.form.phoneNumber2"
                previewPath="home.form" placeholderPath="home.form.item0771234567Placeholder" />
              <TextField
                label={siteData?.content?.home?.form?.email2 ?? "Email"}
                type="email"
                optional
                value={form.email}
                onChange={update('email')}
                error={errors.email}
                autoComplete="email"
                data-preview-field-path="home.form.email2"
                previewPath="home.form" />
            </div>
            {mode === 'test-drive' && ((<div className="grid grid-cols-2 gap-4">
              <TextField
                label={siteData?.content?.home?.form?.preferredDate2 ?? "Preferred date"}
                type="date"
                value={form.date}
                onChange={update('date')}
                error={errors.date}
                data-preview-field-path="home.form.preferredDate2"
                previewPath="home.form" />
              <SelectField
                label={siteData?.content?.home?.form?.time2 ?? "Time"}
                value={form.time}
                onChange={update('time')}
                options={['Morning (9–12)', 'Afternoon (12–3)', 'Late (3–6)'].map((t) => ({ value: t, label: t }))}
                data-preview-field-path="home.form.time2"
                previewPath="home.form" />
            </div>))}
            <TextAreaField
              label={siteData?.content?.home?.form?.message2 ?? "Message"}
              optional
              rows={3}
              value={form.message}
              onChange={update('message')}
              placeholder={mode === 'test-drive' ? 'Anything we should prepare for your drive?' : 'Ask about history, trade-in or finance…'}
              data-preview-field-path="home.form.message2"
              previewPath="home.form" />
            <Button type="submit" size="lg" className="w-full" data-preview-static="Interface label, control, or calculated value">
              {mode === 'test-drive' ? 'Request a test drive' : 'Request more information'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
