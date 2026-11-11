import type { FaqCategory } from '@/types/vehicle'
import initialSiteData from './site-data.json'

export const FAQ_CATEGORIES: FaqCategory[] = initialSiteData.content.faqs
export const HOME_FAQS = [[0, 0], [1, 0], [2, 2], [3, 0]].flatMap(([category, item]) => FAQ_CATEGORIES[category]?.items[item] ? [FAQ_CATEGORIES[category].items[item]] : [])
