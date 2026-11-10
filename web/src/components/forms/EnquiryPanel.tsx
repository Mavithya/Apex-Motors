'use client'

import React, { useState } from 'react'
import { CalendarCheck, Info, MessageCircle, Phone } from 'lucide-react'
import { DEALER, whatsappLink } from '@/data/dealer'
import type { Vehicle } from '@/types/vehicle'
import { cleanPhone, cn, EMAIL_RE, formatLKR, PHONE_RE } from '@/lib/utils'
import { ButtonAnchor, Button } from '@/components/ui/Button'
import { TextField, TextAreaField, SelectField } from '@/components/ui/Field'
import { FormSuccess } from '@/components/ui/FormSuccess'
import { WishlistButton } from '@/components/vehicles/WishlistButton'
import { Badge } from '@/components/vehicles/VehicleCard'

type Mode = 'info' | 'test-drive'
type Errors = Partial<Record<'name' | 'phone' | 'email' | 'date', string>>

export function EnquiryPanel({ vehicle: v, waMessage, initialMode }: { vehicle: Vehicle; waMessage: string; initialMode: Mode }) {
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
      <div className="border-b border-line p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={v.condition === 'New' ? 'dark' : 'light'}>{v.condition === 'New' ? 'Brand New' : 'Pre-Owned'}</Badge>
          <span className="flex items-center gap-1.5 text-[13px] font-semibold text-graphite">
            <span className={cn('h-2 w-2 rounded-full', availabilityTone)} aria-hidden />
            {v.availability}
          </span>
        </div>
        <p className="mt-4 text-[13px] font-semibold text-muted">
          {v.make} · {v.year}
        </p>
        <h1 className="mt-1 text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">{v.model}</h1>
        <p className="mt-1 text-[15px] text-muted">{v.variant}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] text-muted">Price</p>
            <p className="text-[28px] font-extrabold tracking-[-0.02em] text-ink">{formatLKR(v.price)}</p>
          </div>
          <WishlistButton id={v.id} label={`${v.make} ${v.model}`} variant="text" />
        </div>
        <p className="mt-3 text-[12px] text-muted">Stock ref {v.ref} · illustrative sample listing</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-2 border-b border-line p-6">
        <ButtonAnchor href={DEALER.phoneHref} variant="dark">
          <Phone className="h-4 w-4" /> Call now
        </ButtonAnchor>
        <ButtonAnchor href={whatsappLink(waMessage)} newTab>
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </ButtonAnchor>
      </div>

      {/* Enquiry form */}
      <div className="p-6">
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
            <div role="tablist" aria-label="Enquiry type" className="grid grid-cols-2 border border-line p-1">
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
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </button>
              ))}
            </div>

            <div className="bg-paper px-3.5 py-2.5 text-[13px] text-graphite">
              <span className="text-muted">Vehicle: </span>
              <span className="font-semibold">{vehicleLine}</span>
            </div>

            <TextField label="Full name" value={form.name} onChange={update('name')} error={errors.name} autoComplete="name" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <TextField label="Phone number" type="tel" value={form.phone} onChange={update('phone')} error={errors.phone} autoComplete="tel" placeholder="077 123 4567" />
              <TextField label="Email" type="email" optional value={form.email} onChange={update('email')} error={errors.email} autoComplete="email" />
            </div>
            {mode === 'test-drive' && (
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Preferred date" type="date" value={form.date} onChange={update('date')} error={errors.date} />
                <SelectField
                  label="Time"
                  value={form.time}
                  onChange={update('time')}
                  options={['Morning (9–12)', 'Afternoon (12–3)', 'Late (3–6)'].map((t) => ({ value: t, label: t }))}
                />
              </div>
            )}
            <TextAreaField
              label="Message"
              optional
              rows={3}
              value={form.message}
              onChange={update('message')}
              placeholder={mode === 'test-drive' ? 'Anything we should prepare for your drive?' : 'Ask about history, trade-in or finance…'}
            />
            <Button type="submit" size="lg" className="w-full">
              {mode === 'test-drive' ? 'Request a test drive' : 'Request more information'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
