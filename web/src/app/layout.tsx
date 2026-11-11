import './globals.css'
import { SiteProviders as Providers } from '@/components/layout/SiteProviders'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Header, HeaderContent } from '@/components/layout/Header'
import { UtilityBar } from '@/components/layout/UtilityBar'
import { Footer } from '@/components/layout/Footer'
import { DEALER } from '@/data/dealer'

export const metadata: Metadata = {
  title: { default: 'Apex Motors – Selected vehicles, presented honestly.', template: '%s | Apex Motors' },
  description: DEALER.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <div className="min-w-0 bg-paper font-sans text-graphite">
            <UtilityBar />
            <Suspense fallback={<HeaderContent />}>
              <Header />
            </Suspense>
            <main className="apex-main">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
