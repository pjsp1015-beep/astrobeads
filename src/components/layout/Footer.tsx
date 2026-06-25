// src/components/layout/Footer.tsx
import Link from 'next/link'
import { Star } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white/70 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
              <span className="text-lg font-medium text-white">
                <span className="text-gold-400">Gem</span>Pandit
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              India's trusted source for certified natural gemstones, original rudraksha beads, and astrological jewellery.
            </p>
          </div>
          {[
            {
              title: 'Gemstones',
              links: [
                { href: '/catalog?category=precious', label: 'Precious stones' },
                { href: '/catalog?category=semi-precious', label: 'Semi-precious' },
                { href: '/catalog?category=organic', label: 'Organic gems' },
                { href: '/quiz', label: 'Find your gem' },
              ],
            },
            {
              title: 'Support',
              links: [
                { href: '/about', label: 'About us' },
                { href: '/contact', label: 'Contact' },
                { href: '/faq', label: 'FAQ' },
                { href: '/shipping', label: 'Shipping policy' },
              ],
            },
            {
              title: 'Legal',
              links: [
                { href: '/privacy', label: 'Privacy policy' },
                { href: '/terms', label: 'Terms of service' },
                { href: '/returns', label: 'Return policy' },
                { href: '/authenticity', label: 'Authenticity guarantee' },
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-white font-medium mb-4 text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm hover:text-gold-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Astro Beads & Gems. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <span>🇮🇳 India</span>
            <span>Secure payments</span>
            <span>SSL encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
