'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useEffect, useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { calculateFinance, DEFAULT_RATE, LOAN_TERMS } from '@/lib/finance'
import { cn, formatLKR , interpolateCopy } from '@/lib/utils'

/**
 * Illustrative instalment calculator. Used on the vehicle page (price fixed
 * to the car) and on the Financing page (price editable).
 */
export function FinanceCalculator({
  initialPrice,
  lockPrice,
  tone = 'light',
  onEstimate,
}: {
  initialPrice: number
  lockPrice?: boolean
  tone?: 'light' | 'dark'
  onEstimate?: (summary: string) => void
}) {
  const siteData = useSiteData();
  const [price, setPrice] = useState(initialPrice)
  const [downPct, setDownPct] = useState(30)
  const [months, setMonths] = useState(60)
  const [rate, setRate] = useState(DEFAULT_RATE)

  const down = Math.round((price * downPct) / 100)
  const result = useMemo(() => calculateFinance({ price, downPayment: down, months, rate }), [price, down, months, rate])

  useEffect(() => {
    onEstimate?.(`${formatLKR(result.monthly)} / month over ${months} months, ${downPct}% down, ${rate}% p.a.`)
  }, [result.monthly, months, downPct, rate, onEstimate])

  const dark = tone === 'dark'
  const labelCls = cn('text-[13px] font-semibold', dark ? 'text-white/80' : 'text-graphite')
  const inputCls = cn(
    'h-12 w-full rounded-[3px] border px-3.5 text-[15px] font-semibold focus:outline-none',
    dark ? 'border-white/20 bg-white/5 text-white focus:border-white' : 'border-line bg-white text-ink focus:border-ink'
  )

  return (
    <div className="grid gap-0 lg:grid-cols-[1.25fr_1fr]">
      <div className={cn('space-y-7 p-6 sm:p-8', dark ? 'bg-ink-soft' : 'bg-white')}>
        <div>
          <label
            htmlFor="fc-price"
            className={labelCls}
            data-preview-field-path="financing.vehiclePriceLkrLabel"
            data-preview-style-target="financing.vehiclePriceLkrLabel"
            data-preview-style-type="text">{siteData?.content?.financing?.vehiclePriceLkrLabel ?? "Vehicle price (LKR)"}</label>
          <input
            id="fc-price"
            type="number"
            inputMode="numeric"
            min={0}
            step={50000}
            value={price}
            readOnly={lockPrice}
            onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
            className={cn(inputCls, 'mt-2', lockPrice && 'cursor-default opacity-80')} data-preview-static="Interface label, control, or calculated value"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label
              htmlFor="fc-down"
              className={labelCls}
              data-preview-field-path="financing.downPaymentLabel"
              data-preview-style-target="financing.downPaymentLabel"
              data-preview-style-type="text">{siteData?.content?.financing?.downPaymentLabel ?? "Down payment"}</label>
            <span className={cn('text-[15px] font-bold', dark ? 'text-white' : 'text-ink')} data-preview-static="Interface label, control, or calculated value">
              {formatLKR(down)} <span className={cn('font-medium', dark ? 'text-white/50' : 'text-muted')} data-preview-static="decorative-copy">· {downPct}%</span>
            </span>
          </div>
          <input
            id="fc-down"
            type="range"
            min={10}
            max={80}
            step={5}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="mt-3 w-full accent-[var(--color-accent)]" data-preview-static="Interface label, control, or calculated value"
          />
          <div className={cn('mt-1 flex justify-between text-[12px]', dark ? 'text-white/40' : 'text-muted')}>
            <span
              data-preview-field-path="financing.item10Label"
              data-preview-style-target="financing.item10Label"
              data-preview-style-type="text">{siteData?.content?.financing?.item10Label ?? "10%"}</span>
            <span
              data-preview-field-path="financing.item80Label"
              data-preview-style-target="financing.item80Label"
              data-preview-style-type="text">{siteData?.content?.financing?.item80Label ?? "80%"}</span>
          </div>
        </div>

        <fieldset>
          <legend
            className={labelCls}
            data-preview-field-path="financing.loanPeriod"
            data-preview-style-target="financing.loanPeriod"
            data-preview-style-type="text">{siteData?.content?.financing?.loanPeriod ?? "Loan period"}</legend>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {LOAN_TERMS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                aria-pressed={months === m}
                className={cn(
                  'h-11 rounded-[3px] border text-[14px] font-semibold transition-colors duration-150',
                  months === m
                    ? 'border-accent bg-accent text-white'
                    : dark
                      ? 'border-white/20 text-white/80 hover:border-white'
                      : 'border-line text-graphite hover:border-ink'
                )}
                data-preview-static="collection-chrome">
                {m / 12} yr
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="fc-rate"
            className={labelCls}
            data-preview-field-path="financing.interestRatePerYearLabel"
            data-preview-style-target="financing.interestRatePerYearLabel"
            data-preview-style-type="text">{siteData?.content?.financing?.interestRatePerYearLabel ?? "Interest rate (% per year)"}</label>
          <input
            id="fc-rate"
            type="number"
            min={0}
            max={40}
            step={0.25}
            value={rate}
            onChange={(e) => setRate(Math.min(40, Math.max(0, Number(e.target.value))))}
            className={cn(inputCls, 'mt-2')} data-preview-static="Interface label, control, or calculated value"
          />
        </div>
      </div>

      <div className={cn('flex flex-col p-6 sm:p-8', dark ? 'bg-accent text-white' : 'bg-ink text-white')}>
        <p
          className="text-[13px] font-semibold text-white/70"
          data-preview-field-path="financing.subtitle"
          data-preview-style-target="financing.subtitle"
          data-preview-style-type="text">{siteData?.content?.financing?.subtitle ?? "Estimated monthly instalment"}</p>
        <p className="mt-2 text-[40px] font-extrabold leading-none tracking-[-0.02em] sm:text-[44px]" data-preview-static="Interface label, control, or calculated value">
          {formatLKR(result.monthly)}
        </p>
        <p
          className="mt-2 text-[14px] text-white/70"
          data-preview-field-path="financing.subtitle2"
          data-preview-style-target="financing.subtitle2"
          data-preview-style-type="text">{interpolateCopy(siteData?.content?.financing?.subtitle2 ?? "for {months} months", { months })}</p>

        <dl className="mt-8 space-y-3 border-t border-white/15 pt-6 text-[14px]">
          <Row
            label={siteData?.content?.financing?.amountFinanced ?? "Amount financed"}
            value={formatLKR(result.loanAmount)}
            data-preview-field-path="financing.amountFinanced"
            previewPath="financing" />
          <Row
            label={siteData?.content?.financing?.totalInterest ?? "Total interest"}
            value={formatLKR(result.totalInterest)}
            data-preview-field-path="financing.totalInterest"
            previewPath="financing" />
          <Row
            label={siteData?.content?.financing?.totalPayable ?? "Total payable"}
            value={formatLKR(result.totalPayable + down)}
            data-preview-field-path="financing.totalPayable"
            previewPath="financing" />
        </dl>

        <p
          className="mt-auto flex gap-2 pt-8 text-[12.5px] leading-relaxed text-white/70"
          data-preview-field-path="financing.description2"
          data-preview-style-target="financing.description2"
          data-preview-style-type="text">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden

            data-preview-static="Decorative icon" />{siteData?.content?.financing?.description2 ?? "Illustrative estimate only. This is not a financing offer or approval; actual rates, fees and terms are set by the lender after assessment."}</p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
    'data-preview-field-path': fieldPath
}: { label: string; value: string; previewPath?: string; 'data-preview-field-path'?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-white/70" data-preview-field-path={fieldPath} data-preview-static={fieldPath ? undefined : "Interface label"}>{label}</dt>
      <dd className="font-semibold" data-preview-static="Interface label, control, or calculated value">{value}</dd>
    </div>
  );
}
