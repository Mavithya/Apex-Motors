import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { UtilityBar } from '@/components/layout/UtilityBar'
import { Footer } from '@/components/layout/Footer'
import { Logo } from '@/components/layout/Logo'
import { DEALER } from '@/data/dealer'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Apex Motors — Selected vehicles, presented honestly.', template: '%s | Apex Motors' },
  description: DEALER.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className="min-w-0 bg-paper font-sans text-graphite">
          <UtilityBar />
          <Suspense fallback={<div className="h-[73px] border-b border-line bg-white"><div className="mx-auto flex h-full max-w-[1320px] items-center px-5 sm:px-8"><Logo /></div></div>}>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
