'use client'

import { EditableIcon, useSiteData } from '@deneb-ui/ui'
import { Circle, Clock, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from '@/components/ui/SiteLink'
import { useDealer } from '@/lib/useDealer'
import { cn } from '@/lib/utils'

type UtilityItem = {
  label?: string
  icon?: string
  href?: string
  side?: string
  visibility?: string
  newTab?: boolean
}

const DEFAULT_ICONS: Record<string, LucideIcon | undefined> = {
  'map-pin': MapPin, clock: Clock, phone: Phone, 'message-circle': MessageCircle, circle: Circle,
}

function IconFallback() {
  return <Circle size={14} strokeWidth={2} aria-hidden />
}

const AdditionalIcon = dynamic(async () => {
  const { DynamicIcon, iconNames } = await import('lucide-react/dynamic')
  return function AdditionalIcon({ name }: { name: string }) {
    const iconName = iconNames.find((icon) => icon === name) ?? 'circle'
    return <DynamicIcon name={iconName} size={14} strokeWidth={2} aria-hidden fallback={IconFallback} />
  }
}, { ssr: false, loading: IconFallback })

export function UtilityBar() {
  const siteData = useSiteData()
  const dealer = useDealer()
  const configured: unknown = siteData.content?.common?.utilityBar?.items
  const fallback: UtilityItem[] = [
    { label: dealer.city, icon: 'map-pin', side: 'Left', visibility: 'Always' },
    { label: dealer.hoursShort, icon: 'clock', side: 'Left', visibility: 'Desktop only' },
    { label: dealer.phoneDisplay, icon: 'phone', href: dealer.phoneHref, side: 'Right', visibility: 'Tablet and desktop' },
    { label: siteData.content?.common?.contact?.whatsappLabel ?? 'WhatsApp', icon: 'message-circle', href: siteData.content?.common?.contact?.whatsappUrl ?? dealer.whatsappUrl, side: 'Right', visibility: 'Always', newTab: true },
  ]
  const source = configured === undefined ? fallback : configured
  const items: UtilityItem[] = Array.isArray(source) ? source.map((item: unknown) => item && typeof item === 'object' ? item as UtilityItem : {}) : []

  return (
    <div className="bg-ink text-[12.5px] text-white/70" data-preview-style-target="common.utilityBar" data-preview-style-type="section">
      <div data-preview-list-path="common.utilityBar.items" data-preview-style-target="common.utilityBar.items.grid" data-preview-style-type="grid"
        className="mx-auto flex min-h-10 max-w-[1320px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2 sm:px-8">
        {(['Left', 'Right'] as const).map((side) => (
          <div key={side} className={cn('flex min-w-0 max-w-full flex-wrap items-center gap-y-2', side === 'Left' ? 'gap-x-6' : 'gap-x-5')}>
            {items.map((item, index) => {
              if ((item.side === 'Right' ? 'Right' : 'Left') !== side) return null
              const name = (item.icon ?? 'circle').replace(/Icon$/i, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().trim() || 'circle'
              const Icon = Object.hasOwn(DEFAULT_ICONS, name) ? DEFAULT_ICONS[name] : undefined
              const content = <>
                <EditableIcon name={name} size={14} strokeWidth={2} className="h-3.5 w-3.5 shrink-0 text-white/40" style={{ display: 'flex' }}
                  fieldPath={`common.utilityBar.items[${index}].icon`}
                  data-preview-field-path={`common.utilityBar.items[${index}].icon`}
                  customIcon={Icon ? <Icon size={14} strokeWidth={2} aria-hidden /> : <AdditionalIcon key={name} name={name} />} />
                <span className="min-w-0 break-words" data-preview-field-path={`common.utilityBar.items[${index}].label`}
                  data-preview-style-target={`common.utilityBar.items[${index}].label`} data-preview-style-type="text">{item.label ?? ''}</span>
              </>
              return (
                <span key={index} data-preview-item-path={`common.utilityBar.items[${index}]`}
                  data-preview-style-target={`common.utilityBar.items[${index}].card`} data-preview-style-type="card"
                  className={cn('min-w-0 max-w-full', item.visibility === 'Desktop only' ? 'hidden md:flex' : item.visibility === 'Tablet and desktop' ? 'hidden sm:flex' : 'flex')}>
                  {item.href ? (
                    <Link href={item.href} target={item.newTab ? '_blank' : undefined} rel={item.newTab ? 'noreferrer' : undefined}
                      data-preview-field-path={`common.utilityBar.items[${index}].href`}
                      className="flex min-w-0 items-center gap-2 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70">
                      {content}
                    </Link>
                  ) : <span className="flex min-w-0 items-center gap-2">{content}</span>}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

