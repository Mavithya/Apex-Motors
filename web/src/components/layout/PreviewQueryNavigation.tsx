'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

/** Keep query navigation in Next when Fivora's section-scroll bridge is present. */
export function PreviewQueryNavigation() {
  const router = useRouter()
  const editing = useRef(false)

  useEffect(() => {
    const onMode = (event: MessageEvent) => {
      if (event.source !== window.parent || !event.data || typeof event.data !== 'object') return
      if (event.data.type === 'FIVORA_PREVIEW_EDIT_MODE' || event.data.type === 'MARKETPLACE_PREVIEW_EDIT_MODE') editing.current = event.data.editMode === true
    }
    const onClick = (event: MouseEvent) => {
      const preview = window as Window & { __fivoraSectionNavigationInstalled?: boolean }
      if (!preview.__fivoraSectionNavigationInstalled || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return
      // SiteLink marks intentional navigation actions static. They must still
      // route in Edit mode; editable destinations stay with Fivora's inspector.
      if (editing.current && !anchor.hasAttribute('data-preview-static')) return
      const url = new URL(anchor.href, window.location.href)
      const normalize = (path: string) => path.replace(/\/+$/, '') || '/'
      if (url.origin !== window.location.origin || normalize(url.pathname) !== normalize(window.location.pathname) || url.search === window.location.search) return
      const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? '').replace(/\/$/, '')
      const pathname = basePath && url.pathname.startsWith(basePath + '/') ? url.pathname.slice(basePath.length) : url.pathname
      // The bridge respects defaultPrevented; React link callbacks still receive the click.
      event.preventDefault()
      router.push(pathname + url.search + url.hash)
    }
    window.addEventListener('message', onMode)
    window.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('message', onMode)
      window.removeEventListener('click', onClick, true)
    }
  }, [router])

  return null
}
