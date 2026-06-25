// src/app/layout.tsx
import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Toaster } from '@/components/ui/Toaster'
import { AuthProvider } from '@/components/layout/AuthProvider'

export const metadata: Metadata = {
  title: {
    default: 'Astro Beads & Gems — Certified Natural Gemstones',
    template: '%s | Astro Beads & Gems',
  },
  description:
    'Buy 100% certified natural gemstones online. Precious, semi-precious & astrological stones with expert guidance. Worldwide delivery.',
  keywords: ['gemstones', 'buy gemstones online', 'natural gemstones', 'ruby', 'sapphire', 'emerald', 'astrological gems'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://gempandit.com',
    siteName: 'Astro Beads & Gems',
    title: 'Astro Beads & Gems — Certified Natural Gemstones',
    description: 'Buy 100% certified natural gemstones online.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
