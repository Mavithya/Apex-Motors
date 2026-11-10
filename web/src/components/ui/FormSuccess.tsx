'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

/** Shown after a form validates. Clearly states nothing was really sent. */
export function FormSuccess({
  title,
  body,
  onReset,
  resetLabel = 'Send another',
}: {
  title: string
  body: string
  onReset?: () => void
  resetLabel?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      role="status"
      className="py-4"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success text-white">
        <Check className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
      <p className="mt-5 border-l-2 border-accent bg-paper px-4 py-3 text-[13px] leading-relaxed text-graphite">
        Template demo: this form validates in the browser only. No enquiry has been sent — connect it to your CRM or email
        service before going live.
      </p>
      {onReset && (
        <button type="button" onClick={onReset} className="mt-5 text-sm font-semibold text-accent underline-offset-4 hover:underline">
          {resetLabel}
        </button>
      )}
    </motion.div>
  )
}
