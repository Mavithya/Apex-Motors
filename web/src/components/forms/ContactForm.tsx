'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useState } from 'react'
import { cleanPhone, EMAIL_RE, PHONE_RE } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { TextField, SelectField, TextAreaField } from '@/components/ui/Field'
import { FormSuccess } from '@/components/ui/FormSuccess'

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>
const TOPICS = ['Buying a vehicle', 'Booking a test drive', 'Financing', 'Selling or trading in', 'Vehicle sourcing', 'Something else']
export function ContactForm() {
  const siteData = useSiteData();
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', topic: TOPICS[0], message: '' })
  const [errors, setErrors] = useState<Errors>({})

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!PHONE_RE.test(cleanPhone(form.phone))) next.phone = 'Enter a Sri Lankan number, e.g. 077 123 4567.'
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.message.trim().length < 10) next.message = 'Tell us a little more — at least a sentence.'
    setErrors(next)
    if (!Object.keys(next).length) setSent(true)
  }


  return (
    <div className="border border-line bg-white p-6 sm:p-8 lg:col-span-7">
      {sent ? (
        <FormSuccess
          title={siteData?.content?.contact?.form?.messageReceived2 ?? "Message received"}
          body={`Thank you${form.name ? `, ${form.name.split(' ')[0]}` : ''}. Our team would reply by phone or email within one working day.`}
          onReset={() => {
            setSent(false)
            setForm((f) => ({ ...f, message: '' }))
          }}
          data-preview-field-path="contact.form.messageReceived2"
          previewPath="contact.form" />
      ) : (
        <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
          <h2
            className="text-[22px] font-bold text-ink sm:col-span-2"
            data-preview-field-path="contact.form.heading"
            data-preview-style-target="contact.form.heading"
            data-preview-style-type="text">{siteData?.content?.contact?.form?.heading ?? "Send us a message"}</h2>
          <TextField
            label={siteData?.content?.contact?.form?.fullName2 ?? "Full name"}
            value={form.name}
            onChange={update('name')}
            error={errors.name}
            autoComplete="name"
            className="sm:col-span-2"
            data-preview-field-path="contact.form.fullName2"
            previewPath="contact.form" />
          <TextField
            label={siteData?.content?.contact?.form?.phoneNumber2 ?? "Phone number"}
            type="tel"
            placeholder={siteData?.content?.contact?.form?.item0771234567Placeholder ?? "077 123 4567"}
            value={form.phone}
            onChange={update('phone')}
            error={errors.phone}
            autoComplete="tel"
            data-preview-field-path="contact.form.phoneNumber2"
            previewPath="contact.form" placeholderPath="contact.form.item0771234567Placeholder" />
          <TextField
            label={siteData?.content?.contact?.form?.email2 ?? "Email"}
            type="email"
            value={form.email}
            onChange={update('email')}
            error={errors.email}
            autoComplete="email"
            data-preview-field-path="contact.form.email2"
            previewPath="contact.form" />
          <SelectField
            label={siteData?.content?.contact?.form?.whatItAbout2 ?? "What is it about?"}
            value={form.topic}
            onChange={update('topic')}
            options={TOPICS.map((t) => ({ value: t, label: t }))}
            className="sm:col-span-2"
            data-preview-field-path="contact.form.whatItAbout2"
            previewPath="contact.form" />
          <TextAreaField
            label={siteData?.content?.contact?.form?.message2 ?? "Message"}
            rows={5}
            value={form.message}
            onChange={update('message')}
            error={errors.message}
            className="sm:col-span-2"
            data-preview-field-path="contact.form.message2"
            previewPath="contact.form" />
          <div className="sm:col-span-2">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              data-preview-style-target="contact.form.formSubmitLabel"
              data-preview-style-type="button">
              <span
                data-preview-field-path="contact.form.formSubmitLabel"
                data-preview-style-target="contact.form.formSubmitLabel"
                data-preview-style-type="text">{siteData?.content?.contact?.form?.formSubmitLabel ?? "Send message"}</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
