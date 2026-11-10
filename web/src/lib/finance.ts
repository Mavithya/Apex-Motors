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
  const loanAmount = Math.max(0, price - downPayment)
  if (loanAmount === 0 || months <= 0) {
    return { loanAmount, monthly: 0, totalInterest: 0, totalPayable: 0 }
  }
  const r = rate / 100 / 12
  const monthly = r === 0 ? loanAmount / months : (loanAmount * r) / (1 - Math.pow(1 + r, -months))
  const totalPayable = monthly * months
  return { loanAmount, monthly, totalInterest: totalPayable - loanAmount, totalPayable }
}

export const LOAN_TERMS = [12, 24, 36, 48, 60, 72]
export const DEFAULT_RATE = 14.5
