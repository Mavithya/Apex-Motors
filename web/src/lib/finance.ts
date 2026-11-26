export interface FinanceInput {
  price: number
  downPayment: number
  months: number
  /** Annual interest rate, in percent. */
  rate: number
}

export interface FinanceResult {
  loanAmount: number
  monthly: number
  totalInterest: number
  totalPayable: number
}

/** Standard amortised instalment. Illustrative only — not a lender's quote. */
export function calculateFinance({ price, downPayment, months, rate }: FinanceInput): FinanceResult {
  price = Number.isFinite(price) ? Math.max(0, price) : 0
  downPayment = Number.isFinite(downPayment) ? Math.max(0, downPayment) : 0
  rate = Number.isFinite(rate) ? Math.max(0, rate) : 0
  const loanAmount = Math.max(0, price - downPayment)
  if (loanAmount === 0 || !Number.isSafeInteger(months) || months <= 0) {
    return { loanAmount, monthly: 0, totalInterest: 0, totalPayable: 0 }
  }
  const r = rate / 100 / 12
  // log1p/expm1 avoid cancellation at very small positive interest rates.
  const monthly = r === 0 ? loanAmount / months : (loanAmount * r) / -Math.expm1(-months * Math.log1p(r))
  const totalPayable = monthly * months
  if (!Number.isFinite(totalPayable)) return { loanAmount, monthly: 0, totalInterest: 0, totalPayable: 0 }
  return { loanAmount, monthly, totalInterest: Math.max(0, totalPayable - loanAmount), totalPayable }
}

export const LOAN_TERMS = [12, 24, 36, 48, 60, 72]
export const DEFAULT_RATE = 14.5

export interface LoanTerm {
  months: number
  label: string
  valid: boolean
  /** Original collection position, including when invalid entries are skipped. */
  index: number
}

export function loanTermsFromContent(content: unknown): LoanTerm[] {
  const source = content === undefined ? LOAN_TERMS.map((months) => ({ months, label: `${months / 12} yr` })) : content
  if (!Array.isArray(source)) return []
  const seen = new Set<number>()
  return source.map((item: unknown, index) => {
    const { months, label } = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>
    const duration = typeof months === 'number' && Number.isSafeInteger(months) && months > 0 ? months : 0
    const valid = duration > 0 && !seen.has(duration)
    if (valid) seen.add(duration)
    // Keep real, unfinished editor rows mounted; only valid durations can calculate.
    return { months: duration, valid, index, label: typeof label === 'string' ? label : duration ? duration % 12 === 0 ? `${duration / 12} yr` : `${duration} months` : '' }
  })
}

export function resolveLoanTerm(terms: readonly LoanTerm[], requested: number): number {
  const valid = terms.filter((term) => term.valid)
  return valid.some((term) => term.months === requested) ? requested : valid.find((term) => term.months === 60)?.months ?? valid[0]?.months ?? 0
}
