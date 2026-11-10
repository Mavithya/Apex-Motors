'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Menu, Search } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { MAIN_NAV, type NavKey } from '@/data/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/lib/useWishlist'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

export function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active: NavKey | undefined = pathname === '/vehicles' && searchParams.get('view') === 'new-arrivals' ? 'arrivals' : pathname.startsWith('/vehicles') ? 'vehicles' : MAIN_NAV.find((item) => item.to === pathname)?.key
  return <HeaderContent key={`${pathname}?${searchParams.toString()}`} active={active} />
}

function HeaderContent({ active }: { active?: NavKey }) {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count } = useWishlist()

  return (
    <>
    <div className="sticky top-0 z-40 border-b border-line bg-white/95 shadow-[0_8px_24px_-22px_rgba(23,26,29,0.45)] backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center xl:flex">
          {MAIN_NAV.map((item) => {
            const isActive = active === item.key
            if (item.children) {
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setOpen(item.key)}
                  onMouseLeave={() => setOpen(null)}
                >
                  <Link
                    href={item.to}
                    aria-haspopup="true"
                    aria-expanded={open === item.key}
                    onFocus={() => setOpen(item.key)}
                    className={navClass(isActive)}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />
                    {isActive && <ActiveBar />}
                  </Link>
                  <AnimatePresence>
                    {open === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute left-0 top-full w-[440px] pt-2"
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null)
                        }}
                      >
                        <div className="grid grid-cols-2 gap-x-6 border border-line bg-white p-5 shadow-[0_18px_40px_-20px_rgba(23,26,29,0.35)]">
                          <p className="col-span-2 mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                            Browse by
                          </p>
                          {item.children.map((c) => (
                            <Link
                              key={c.to}
                              href={c.to}
                              onClick={() => setOpen(null)}
                              className="border-b border-line py-2.5 text-sm font-medium text-graphite transition-colors duration-150 hover:text-accent"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }
            return (
              <Link key={item.key} href={item.to} className={navClass(isActive)} aria-current={isActive ? 'page' : undefined}>
                {item.label}
                {isActive && <ActiveBar />}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/vehicles?view=saved"
            aria-label={`Saved vehicles (${count})`}
            className="relative hidden h-11 w-11 items-center justify-center text-graphite transition-colors duration-150 hover:text-accent sm:flex"
          >
            <Heart className="h-5 w-5" aria-hidden />
            {count > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/vehicles"
            className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-[3px] bg-accent px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-dark sm:flex"
          >
            <Search className="h-4 w-4" aria-hidden />
            Find Your Car
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center text-ink xl:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

    </div>
    <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} active={active} />
    </>
  )
}

function navClass(active: boolean) {
  return cn(
    'relative flex h-[76px] items-center gap-1 whitespace-nowrap px-2.5 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 2xl:px-3 2xl:text-[14px]',
    active ? 'text-ink' : 'text-graphite/75 hover:text-ink'
  )
}

function ActiveBar() {
  return <span className="absolute inset-x-3 bottom-0 h-[2px] bg-accent" aria-hidden />
}
