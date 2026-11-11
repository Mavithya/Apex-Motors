"use client";
import { useSiteData } from "@deneb-ui/ui";
import React, { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const control =
  'w-full rounded-[3px] border bg-white px-3.5 text-[15px] text-graphite placeholder:text-muted/70 transition-colors duration-150 focus:border-ink focus:outline-none'

interface Base {
  label: string
  error?: string
  hint?: string
  className?: string
  optional?: boolean
  previewPath?: string
  placeholderPath?: string
  'data-preview-field-path'?: string
}

function Wrapper({ id, label, error, hint, optional, className, children, fieldPath }: Base & { id: string; children: React.ReactNode; fieldPath?: string }) {
  const siteData = useSiteData();
  return (
    <div className={cn('min-w-0', className)}>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between text-[13px] font-semibold text-graphite"
        >
        <span data-preview-field-path={fieldPath} data-preview-static={fieldPath ? undefined : "Interface label"}>{label}</span>
        {optional && <span
          className="text-xs font-normal text-muted"
          data-preview-field-path="common.optionalLabel"
          data-preview-style-target="common.optionalLabel"
          data-preview-style-type="text">{siteData?.content?.common?.optionalLabel ?? "Optional"}</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-[13px] font-medium text-accent" data-preview-static="Form feedback or option">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[13px] text-muted" data-preview-static="Form feedback or option">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  error,
  hint,
  optional,
  className,
  previewPath,
  placeholderPath,
  'data-preview-field-path': fieldPath,
  ...rest
}: Base & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={className} previewPath={previewPath} fieldPath={fieldPath}>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(control, 'h-12', error ? 'border-accent' : 'border-line')}
        data-preview-field-path={placeholderPath}
        data-preview-static={placeholderPath ? undefined : "Form input"}
        {...rest}
      />
    </Wrapper>
  )
}

export function SelectField({
  label,
  error,
  hint,
  optional,
  className,
  options,
  placeholder,
  previewPath,
  placeholderPath,
  'data-preview-field-path': fieldPath,
  ...rest
}: Base & {
  options: { value: string; label: string }[]
  placeholder?: string
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className'>) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={className} previewPath={previewPath} fieldPath={fieldPath}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={!!error}
          className={cn(control, 'h-12 appearance-none pr-10', error ? 'border-accent' : 'border-line')}
          data-preview-field-path={placeholderPath}
        data-preview-static={placeholderPath ? undefined : "Form input"}
        {...rest}
        >
          {placeholder !== undefined && <option value="" data-preview-static="Form feedback or option">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value} data-preview-static="Form feedback or option">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden
          data-preview-static="decorative-icon" />
      </div>
    </Wrapper>
  );
}

export function TextAreaField({
  label,
  error,
  hint,
  optional,
  className,
  previewPath,
  placeholderPath,
  'data-preview-field-path': fieldPath,
  ...rest
}: Base & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>) {
  const id = useId()
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={className} previewPath={previewPath} fieldPath={fieldPath}>
      <textarea
        id={id}
        aria-invalid={!!error}
        rows={4}
        className={cn(control, 'resize-y py-3', error ? 'border-accent' : 'border-line')}
        data-preview-field-path={placeholderPath}
        data-preview-static={placeholderPath ? undefined : "Form input"}
        {...rest}
      />
    </Wrapper>
  )
}
