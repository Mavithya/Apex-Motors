'use client'

import { SiteDataProvider, SiteDataContext, ThemeStyles, useSiteData, type TemplateTheme } from '@deneb-ui/ui'
import initialSiteData from '@/data/site-data.json'
import { useMemo, useState, type ReactNode } from 'react'

function SiteTheme() {
  const siteData = useSiteData()
  const theme = (siteData.theme ?? siteData.template?.structure?.theme ?? {}) as TemplateTheme
  return <ThemeStyles theme={theme} enableDualMode={false} />
}

export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <SiteDataProvider initialSiteData={initialSiteData}>
      <CatalogContent>{children}</CatalogContent>
    </SiteDataProvider>
  )
}

function CatalogContent({ children }: { children: ReactNode }) {
  const siteData = useSiteData()
  const root = siteData.content?.products
  const nested = siteData.content?.catalog?.products
  const rootKey = JSON.stringify(root ?? null)
  const nestedKey = JSON.stringify(nested ?? null)
  const [snapshot, setSnapshot] = useState(() => ({ rootKey, nestedKey, selected: Array.isArray(root) ? root : Array.isArray(nested) ? nested : [] }))
  if (snapshot.rootKey !== rootKey || snapshot.nestedKey !== nestedKey) {
    const selected = rootKey !== snapshot.rootKey && Array.isArray(root) ? root : nestedKey !== snapshot.nestedKey && Array.isArray(nested) ? nested : snapshot.selected
    setSnapshot({ rootKey, nestedKey, selected })
  }
  const value = useMemo(() => {
    // Live API updates and nested editor updates share the same catalog view.
    const products = snapshot.selected
    return { ...siteData, content: { ...siteData.content, products, catalog: { ...siteData.content?.catalog, products } } }
  }, [siteData, snapshot.selected])
  return (
    <SiteDataContext.Provider value={value}>
      <SiteTheme />
      {children}
    </SiteDataContext.Provider>
  )
}
