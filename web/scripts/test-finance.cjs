/* eslint-disable @typescript-eslint/no-require-imports -- Run focused finance checks with Node's built-in test runner. */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')

const filename = path.join(__dirname, '../src/lib/finance.ts')
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText
const finance = { exports: {} }
vm.runInNewContext(compiled, { module: finance, exports: finance.exports }, { filename })
const { calculateFinance, loanTermsFromContent, resolveLoanTerm } = finance.exports

test('standard amortised payment matches a fixed reference', () => {
  const result = calculateFinance({ price: 125000, downPayment: 25000, months: 12, rate: 12 })
  assert.ok(Math.abs(result.monthly - 8884.878867834) < 0.000001)
  assert.ok(Math.abs(result.totalPayable - 106618.546414008) < 0.00001)
  assert.ok(Math.abs(result.totalInterest - 6618.546414008) < 0.00001)
  assert.equal(result.loanAmount, 100000)
})

test('zero interest and full down payment', () => {
  const zeroRate = calculateFinance({ price: 15000, downPayment: 3000, months: 12, rate: 0 })
  assert.equal(zeroRate.monthly, 1000)
  assert.equal(zeroRate.totalInterest, 0)
  const paid = calculateFinance({ price: 15000, downPayment: 20000, months: 12, rate: 12 })
  assert.equal(paid.monthly, 0)
  assert.equal(paid.loanAmount, 0)
})

test('tiny rates do not suffer cancellation or produce infinity', () => {
  const result = calculateFinance({ price: 10000, downPayment: 0, months: 12, rate: 1e-14 })
  assert.ok(Number.isFinite(result.monthly))
  assert.ok(Math.abs(result.monthly - 10000 / 12) < 0.000001)
})

test('invalid inputs never produce negative or non-finite results', () => {
  for (const input of [
    { price: NaN, downPayment: 0, months: 60, rate: 14.5 },
    { price: Infinity, downPayment: 0, months: 60, rate: 14.5 },
    { price: 10000, downPayment: -500, months: 60, rate: -10 },
    { price: 10000, downPayment: NaN, months: 0, rate: Infinity },
    { price: 10000, downPayment: 0, months: 1.5, rate: 12 },
  ]) {
    const result = calculateFinance(input)
    for (const value of Object.values(result)) assert.ok(Number.isFinite(value) && value >= 0)
    if (!Number.isInteger(input.months) || input.months <= 0) assert.equal(result.monthly, 0)
  }
})

test('editable periods retain every real row while invalid or duplicate durations cannot be selected', () => {
  const terms = loanTermsFromContent([
    { months: 84, label: '7 yr' },
    { months: 0, label: 'Invalid' },
    { months: 18, label: '18 months' },
    { months: 84, label: 'Duplicate' },
    { months: 1.5, label: 'Invalid fraction' },
    { months: Infinity, label: 'Invalid infinity' },
  ])
  assert.equal(terms.length, 6)
  assert.equal(terms.filter(term => term.valid).length, 2)
  assert.equal(terms[0].months, 84)
  assert.equal(terms[2].index, 2)
  assert.equal(resolveLoanTerm(terms, 60), 84)
  assert.equal(resolveLoanTerm(terms, 18), 18)
  assert.equal(loanTermsFromContent([]).length, 0)
  assert.equal(resolveLoanTerm([], 60), 0)
  assert.equal(loanTermsFromContent(undefined).length, 6)
  const empty = loanTermsFromContent([{ months: 0, label: '' }])
  assert.equal(empty.length, 1)
  assert.equal(empty[0].label, '')
  assert.equal(empty[0].valid, false)
  assert.equal(resolveLoanTerm(empty, 0), 0)
})

test('every configured duration pays off the loan in an independent monthly balance simulation', () => {
  for (const months of [12, 18, 24, 36, 48, 60, 72, 84, 120]) {
    const result = calculateFinance({ price: 22900000, downPayment: 6870000, months, rate: 14.5 })
    let balance = result.loanAmount
    for (let month = 0; month < months; month++) balance = balance * (1 + 14.5 / 1200) - result.monthly
    assert.ok(Math.abs(balance) < 0.01, `${months} months leaves an unpaid balance`)
    assert.ok(Math.abs(result.totalPayable - result.loanAmount - result.totalInterest) < 0.000001)
  }
})
