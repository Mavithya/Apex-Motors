import { CATEGORIES } from './vehicles'

export type NavKey = 'home' | 'vehicles' | 'arrivals' | 'sell' | 'financing' | 'about' | 'contact' | 'faq'

export interface NavItem {
  key: NavKey
  label: string
  to: string
  children?: { label: string; to: string; note?: string }[]
}

export const MAIN_NAV: NavItem[] = [
  { key: 'home', label: 'Home', to: '/' },
  {
    key: 'vehicles',
    label: 'Browse Cars',
    to: '/vehicles',
    children: [
      { label: 'All vehicles', to: '/vehicles' },
      { label: 'Brand new', to: '/vehicles?condition=New' },
      { label: 'Pre-owned', to: '/vehicles?condition=Used' },
      ...CATEGORIES.map((c) => ({ label: c.label, to: `/vehicles?category=${c.slug}` })),
    ],
  },
  { key: 'arrivals', label: 'New Arrivals', to: '/vehicles?view=new-arrivals' },
  { key: 'sell', label: 'Sell / Trade In', to: '/sell-your-car' },
  { key: 'financing', label: 'Financing', to: '/financing' },
  { key: 'about', label: 'About Us', to: '/about' },
  { key: 'contact', label: 'Contact', to: '/contact' },
]

export const FOOTER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'All vehicles', to: '/vehicles' },
  { label: 'New arrivals', to: '/vehicles?view=new-arrivals' },
  { label: 'Financing', to: '/financing' },
  { label: 'Sell or trade in', to: '/sell-your-car' },
  { label: 'About us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
]
