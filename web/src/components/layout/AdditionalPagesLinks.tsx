'use client'

import { contentList, useSiteData } from '@deneb-ui/ui'
import Link from '@/components/ui/SiteLink'

interface AdditionalPage {
  id?: string
  title?: string
  label?: string
  route?: string
  url?: string
  slug?: string
  isPublished?: boolean
}

export function AdditionalPagesLinks() {
  const siteData = useSiteData()
  const pages = contentList<AdditionalPage>(siteData.content?.additionalPages ?? siteData.additionalPages)
  return (
    <ul data-preview-list-path="additionalPages" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
      {pages.map((page, index: number) => page.isPublished === false ? null : (
        <li data-preview-item-path={`additionalPages[${index}]`} key={page.id ?? `additional-page-${index}`} >
          <Link href={page.route ?? page.url ?? (page.slug ? `/${page.slug}` : '/')} className="hover:text-white">
            <span data-preview-field-path={`additionalPages[${index}].title`}>{page.title ?? page.label ?? 'Additional page'}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
