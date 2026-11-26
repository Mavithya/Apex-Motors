'use client'

import { useMemo } from 'react'
import { useSiteData } from '@deneb-ui/ui'
import { loanTermsFromContent } from './finance'

const DEFAULT_EMPLOYMENT = ['Salaried', 'Self-employed', 'Business owner', 'Professional', 'Other'].map((value) => ({ value, label: value }))

export function useFinanceOptions() {
  const siteData = useSiteData()
  const terms = siteData.content?.financing?.loanTerms
  const employment = siteData.content?.financing?.form?.employmentOptions
  const loanTerms = useMemo(() => loanTermsFromContent(terms), [terms])
  const employmentOptions = useMemo(() => {
    const source: unknown = employment === undefined ? DEFAULT_EMPLOYMENT : employment
    if (!Array.isArray(source)) return []
    const seen = new Set<string>()
    return source.map((item: unknown, index) => {
      const { value, label } = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>
      const valid = typeof value === 'string' && !!value.trim() && !seen.has(value)
      if (valid) seen.add(value as string)
      return { value: valid ? value as string : `invalid-employment-${index}`, label: typeof label === 'string' ? label : typeof value === 'string' ? value : '', disabled: !valid, previewPath: `financing.form.employmentOptions[${index}]` }
    })
  }, [employment])
  return { loanTerms, employmentOptions }
}
