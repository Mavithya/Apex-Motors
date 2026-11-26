'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useSiteData } from '@deneb-ui/ui'
import { useWishlist } from '@/lib/useWishlist'
import { cn } from '@/lib/utils'

function WishlistGlyphFallback() {
  return <Heart className="h-[18px] w-[18px]" aria-hidden />
}

// Keep the default heart light; load other Lucide glyphs only when selected.
const WishlistGlyph = dynamic(async () => {
  const { DynamicIcon, iconNames } = await import('lucide-react/dynamic')
  return function WishlistGlyph({ name, saved }: { name: string; saved: boolean }) {
    const normalized = name.replace(/Icon$/i, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().trim()
    const iconName = iconNames.find((icon) => icon === normalized) ?? 'heart'
    return <DynamicIcon name={iconName} size={18} className={cn('h-[18px] w-[18px]', saved && 'fill-accent')} aria-hidden fallback={WishlistGlyphFallback} />
  }
}, { ssr: false, loading: WishlistGlyphFallback })

/** Also serves as the visible empty-inventory save cue when there are no cards. */
export function WishlistIcon({ editable = false, saved = false, className }: { editable?: boolean; saved?: boolean; className?: string }) {
  const siteData = useSiteData()
  const iconName = siteData.content?.common?.vehicleCard?.wishlistIcon ?? 'heart'
  const glyph = iconName === 'heart'
    ? <Heart className={cn('h-[18px] w-[18px]', saved && 'fill-accent')} aria-hidden data-preview-static="Decorative icon" />
    : <WishlistGlyph name={iconName} saved={saved} />
  return editable ? (
    <span className={className} data-preview-field-path="common.vehicleCard.wishlistIcon" data-preview-control="icon-picker" data-preview-icon-type="lucide" data-preview-icon={iconName}>{glyph}</span>
  ) : glyph
}

export function WishlistButton({
  id,
  label,
  className,
  variant = 'icon',
  compact = false,
}: {
  id: string
  label: string
  className?: string
  variant?: 'icon' | 'text'
  compact?: boolean
}) {
  const { has, toggle } = useWishlist()
  const siteData = useSiteData()
  const iconName = siteData.content?.common?.vehicleCard?.wishlistIcon ?? 'heart'
  const saved = has(id)

  if (variant === 'text') {
    return (
      <button
        type="button"
        onClick={() => toggle(id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
        title={compact ? (saved ? 'Saved' : 'Save') : undefined}
        className={cn(
          'inline-flex shrink-0 items-center whitespace-nowrap rounded-[3px] border font-semibold transition-colors duration-150',
          compact ? 'h-10 min-w-10 justify-center gap-1 px-1.5 text-[11px]' : 'h-11 gap-2 px-4 text-sm',
          saved ? 'border-accent text-accent' : 'border-line text-ink hover:border-ink',
          className
        )} data-preview-static="Interface label, control, or calculated value"
      >
        <Heart
          className={cn('h-4 w-4', saved && 'fill-accent')}
          aria-hidden

          data-preview-static="Decorative icon" />
        <span className={compact ? 'hidden @min-[320px]:inline' : undefined}>{saved ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  return (
    <motion.button
      data-preview-field-path="common.vehicleCard.wishlistIcon"
      data-preview-control="icon-picker"
      data-preview-icon-type="lucide"
      data-preview-icon={iconName}
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
      <WishlistIcon saved={saved} />
    </motion.button>
  );
}
