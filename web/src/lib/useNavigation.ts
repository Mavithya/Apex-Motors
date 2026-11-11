'use client'

import { useSiteData } from '@deneb-ui/ui'
import { MAIN_NAV, type NavKey, type NavItem } from '@/data/navigation'

export function navLabelKey(key: NavKey) {
  return key === 'sell' ? 'sell-your-car' : key
}

export function navPreviewPath(key: NavKey) {
  return 'common.navLabels.' + navLabelKey(key)
}

export function useNavigation(): NavItem[] {
  const siteData = useSiteData()
  const labels = siteData.content?.common?.navLabels ?? {}
  const categories: { slug: string; label: string }[] = siteData.content?.home?.CATEGORIES ?? []
  const categoryLabels = new Map(categories.map((category) => [category.slug, category.label]))
  return MAIN_NAV.map((item) => ({
    ...item,
    label: labels[navLabelKey(item.key)] ?? item.label,
    children: item.children?.flatMap((child: { to: string; label: string }) => {
      const category = new URL(child.to, 'https://apex-motors.invalid').searchParams.get('category')
      return category ? categoryLabels.has(category) ? [{ ...child, label: categoryLabels.get(category)! }] : [] : [child]
    }),
  }))
}
