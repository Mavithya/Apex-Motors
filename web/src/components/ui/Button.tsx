import React from 'react'
import Link from '@/components/ui/SiteLink'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'dark' | 'outline' | 'light' | 'outline-light'
type Size = 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  dark: 'bg-ink text-white hover:bg-ink-soft',
  outline: 'border border-ink/20 text-ink hover:border-ink',
  light: 'bg-white text-ink hover:bg-paper',
  'outline-light': 'border border-white/40 text-white hover:border-white hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-7 text-[15px]',
}

type Common = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode }

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-semibold tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 max-[400px]:px-4',
    variants[variant],
    sizes[size],
    className
  )
}

/** Internal route link styled as a button. */
export function ButtonLink({ to, variant, size, className, children, ...attributes }: Common & { to: string; 'data-preview-field-path'?: string }) {
  return (
    <Link href={to} className={buttonClass(variant, size, className)} {...attributes}>
      {children}
    </Link>
  )
}

/** External link (tel:, wa.me, mailto:) styled as a button. */
export function ButtonAnchor({
  href,
  variant,
  size,
  className,
  children,
  newTab,
  ...attributes
}: Common & { href: string; newTab?: boolean; 'data-preview-field-path'?: string }) {
  return (
    <Link
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noreferrer' : undefined}
      className={buttonClass(variant, size, className)}
      {...attributes}
    >
      {children}
    </Link>
  )
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}
