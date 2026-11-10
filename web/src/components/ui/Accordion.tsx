'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { FaqItem } from '@/types/vehicle'
import { cn } from '@/lib/utils'

export function Accordion({ items, tone = 'light', defaultOpen = -1 }: { items: FaqItem[]; tone?: 'light' | 'dark'; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen)
  const dark = tone === 'dark'
  return (
    <div className={cn('border-t', dark ? 'border-white/15' : 'border-line')}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={cn('border-b', dark ? 'border-white/15' : 'border-line')}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={cn(
                  'flex w-full items-start justify-between gap-6 py-5 text-left text-[16px] font-semibold sm:text-[17px]',
                  dark ? 'text-white' : 'text-ink'
                )}
              >
                {item.q}
                <Plus
                  className={cn(
                    'mt-0.5 h-5 w-5 shrink-0 transition-transform duration-200 ease-out',
                    isOpen && 'rotate-45',
                    dark ? 'text-white/60' : 'text-muted'
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cn('max-w-3xl pb-6 pr-10 text-[15px] leading-relaxed', dark ? 'text-white/70' : 'text-muted')}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
