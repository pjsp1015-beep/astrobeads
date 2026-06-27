import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white/70 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="mb-4">
              <Image src="/logo.svg" alt="Astro Beads & Gems" width={160} height={40} />
            </div>
            <p className="text-sm leading-relaxed">India's trusted source for certified natural gemstones, original rudraksha beads, and astrological jewellery. Expert Vedic guidance. Worldwide delivery.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/catalog?category=rudraksha" className="text-sm hover:text-gold-400 transition-colors">Rudraksha</Link></li>
              <li><Link href="/catalog?category=healing-stones" className="text-sm hover:text-gold-400 transition-colors">Healing Stones</Link></li>
              <li><Link href="/catalog?category=gemstones" className="text-sm hover:text-gold-400 transition-colors">Gemstones</Link></li>
              <li><Link href="/catalog?category=pearls" className="text-sm hover:text-gold-400 transition-colors">Pearls</Link></li>
              <li><Link href="/catalog?category=beads-bracelets" className="text-sm hover:text-gold-400 transition-colors">Beads & Bracelets</Link></li>
              <li><Link href="/catalog?category=jewellery" className="text-sm hover:text-gold-400 transition-colors">Jewellery</Link></li>
              <li><Link href="/quiz" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">🔮 Free Gem Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-gold-400 transition-colors">About us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-gold-400 transition-colors">Contact us</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-gold-400 transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm hover:text-gold-400 transition-colors">Shipping policy</Link></li>
              <li><Link href="/track" className="text-sm hover:text-gold-400 transition-colors">Track my order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm hover:text-gold-400 transition-colors">Privacy policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-gold-400 transition-colors">Terms of service</Link></li>
              <li><Link href="/returns" className="text-sm hover:text-gold-400 transition-colors">Return policy</Link></li>
              <li><Link href="/authenticity" className="text-sm hover:text-gold-400 transition-colors">Authenticity guarantee</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Astro Beads & Gems. All rights reserved.</p>
          <div className="flex gap-4 items-center text-white/50">
            <span>🇮🇳 Made in India</span>
            <span>🔒 SSL Secured</span>
            <span>✅ 100% Certified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
