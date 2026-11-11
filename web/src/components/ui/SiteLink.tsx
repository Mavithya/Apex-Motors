'use client'

import NextLink from 'next/link'
import { useSiteData } from '@deneb-ui/ui'
import { Children, cloneElement, isValidElement, type ComponentProps, type ReactElement, type ReactNode } from 'react'

/** Keeps Next navigation and respects the pages enabled by Merchant Studio. */
export default function SiteLink(props: ComponentProps<typeof NextLink>) {
  const siteData = useSiteData()
  const selected = siteData.requirements?.requiredPages
  const rawHref = typeof props.href === 'string' ? props.href : (props.href && typeof props.href === 'object' && 'pathname' in props.href) ? (props.href.pathname ?? '') : ''
  // The installed SDK prefixes its product-detail helper; Next Link must receive a logical route.
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? '').replace(/\/$/, '')
  const href = basePath && rawHref.startsWith(basePath + '/') ? rawHref.slice(basePath.length) : rawHref
  const route = href ? href.split(/[?#]/)[0].replace(/\/$/, '') || '/' : ''
  const pageKey = route === '/' ? 'home' : route.startsWith('/products/') || route.startsWith('/vehicles/') ? 'vehicles' : route.slice(1)
  const known = ['home', 'vehicles', 'about', 'contact', 'faq', 'financing', 'sell-your-car'].includes(pageKey)
  if (href && known && Array.isArray(selected) && !selected.includes(pageKey)) return null
  const metadata = props as unknown as Record<string, unknown>
  const ownField = typeof metadata['data-preview-field-path'] === 'string' ? metadata['data-preview-field-path'] : undefined
  const fields = new Set<string>()
  if (ownField) fields.add(ownField)
  collectFields(props.children, fields)
  // Fixed destinations stay static; their editable text sits above that static
  // element, following DENEB's label/action nesting contract.
  const actionField = ownField && /(?:\.to|\.href|\.url|\.route|Url)$/.test(ownField)
  const targetHref = typeof props.href === 'string' ? href : props.href ?? '#'
  if (actionField || fields.size > 1) return <NextLink {...props} href={targetHref} data-preview-static={undefined} />
  if (fields.size === 1) {
    const field = [...fields][0]
    const attributes: Record<string, string> = { 'data-preview-field-path': field }
    const clean = { ...props } as ComponentProps<typeof NextLink> & Record<string, unknown>
    for (const key of ['data-preview-field-path', 'data-preview-item-path', 'data-preview-list-path', 'data-preview-style-target', 'data-preview-style-type']) {
      if (typeof metadata[key] === 'string') attributes[key] = metadata[key]
      delete clean[key]
    }
    const layout = /(^|\s)h-full(\s|$)/.test(props.className ?? '') ? 'block h-full w-full' : /(^|\s)block(\s|$)/.test(props.className ?? '') ? 'block' : /(^|\s)(?:inline-)?flex(\s|$)/.test(props.className ?? '') ? 'inline-flex' : 'inline'
    return <span {...attributes} className={layout}><NextLink {...clean} href={targetHref} data-preview-static="Navigation destination">{stripFields(props.children)}</NextLink></span>
  }
  return <NextLink {...props} href={targetHref} data-preview-static={typeof metadata['data-preview-static'] === 'string' ? metadata['data-preview-static'] : 'Navigation destination and interface label'} />
}

function collectFields(children: ReactNode, result: Set<string>) {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    const props = child.props as Record<string, unknown>
    if (typeof props['data-preview-field-path'] === 'string') result.add(props['data-preview-field-path'])
    collectFields(props.children as ReactNode, result)
  })
}

function stripFields(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child
    const element = child as ReactElement<Record<string, unknown>>
    const props: Record<string, unknown> = {}
    for (const key of Object.keys(element.props)) if (key.startsWith('data-preview-')) props[key] = undefined
    return cloneElement(element, props, stripFields(element.props.children as ReactNode))
  })
}
