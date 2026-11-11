'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

/** Shown after a form validates. Clearly states nothing was really sent. */
export function FormSuccess({
  title,
  body,
  onReset,
  resetLabel = 'Send another',
    'data-preview-field-path': fieldPath
}: {
  title: string
  body: string
  onReset?: () => void
  resetLabel?: string
  previewPath?: string; 'data-preview-field-path'?: string
}) {
  const siteData = useSiteData();
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      role="status"
      className="py-4"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success text-white" data-preview-static="Interface label, control, or calculated value">
        <Check className="h-5 w-5" aria-hidden  data-preview-static="Decorative icon" />
      </span>
      <h3 className="mt-5 text-xl font-bold text-ink" data-preview-field-path={fieldPath} data-preview-static={fieldPath ? undefined : "Interface label"}>{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted" data-preview-static="Interface label, control, or calculated value">{body}</p>
      <p
        className="mt-5 border-l-2 border-accent bg-paper px-4 py-3 text-[13px] leading-relaxed text-graphite"
        data-preview-field-path="common.form.description"
        data-preview-style-target="common.form.description"
        data-preview-style-type="text">{siteData?.content?.common?.form?.description ?? "Template demo: this form validates in the browser only. No enquiry has been sent — connect it to your CRM or email service before going live."}</p>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-5 text-sm font-semibold text-accent underline-offset-4 hover:underline" data-preview-static="Interface label, control, or calculated value">
          {resetLabel}
        </button>
      )}
    </motion.div>
  );
}
