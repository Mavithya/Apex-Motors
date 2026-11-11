'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/lib/useWishlist'
import { cn } from '@/lib/utils'

export function WishlistButton({
  id,
  label,
  className,
  variant = 'icon',
}: {
  id: string
  label: string
  className?: string
  variant?: 'icon' | 'text'
}) {
  const { has, toggle } = useWishlist()
  const saved = has(id)

  if (variant === 'text') {
    return (
      <button
        type="button"
        onClick={() => toggle(id)}
        aria-pressed={saved}
        className={cn(
          'inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[3px] border px-4 text-sm font-semibold transition-colors duration-150',
          saved ? 'border-accent text-accent' : 'border-line text-ink hover:border-ink',
          className
        )} data-preview-static="Interface label, control, or calculated value"
      >
        <Heart
          className={cn('h-4 w-4', saved && 'fill-accent')}
          aria-hidden

          data-preview-static="Decorative icon" />
        {saved ? 'Saved' : 'Save'}
      </button>
    );
  }

  return (
    <motion.button data-preview-static="Wishlist action"
      type="button"
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.12 }}
      onClick={(e) => {
        e.preventDefault()
        toggle(id)
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
      className={cn(
        'flex h-10 w-10 items-center justify-center bg-white/95 transition-colors duration-150',
        saved ? 'text-accent' : 'text-ink hover:text-accent',
        className
      )}
    >
      <Heart
        className={cn('h-[18px] w-[18px]', saved && 'fill-accent')}
        aria-hidden

        data-preview-static="Decorative icon" />
    </motion.button>
  );
}
