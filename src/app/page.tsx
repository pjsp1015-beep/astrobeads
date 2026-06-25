// src/app/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/product/ProductCard'
import { CategoryGrid } from '@/components/product/CategoryGrid'
import { QuizBanner } from '@/components/quiz/QuizBanner'
import { TrustBadges } from '@/components/layout/TrustBadges'

async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { active: true, stock: { gt: 0 } },
    include: { category: true },
    orderBy: { price: 'desc' },
    take: 8,
  })
}

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } })
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ])

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="bg-gem-gradient text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(ellipse at 60% 40%, #e8c97a 0%, transparent 60%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xs tracking-[4px] uppercase text-gold-400 mb-4 font-medium">
            Certified · Natural · Astrological
          </p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-6">
            Discover Gemstones,
            Rudraksha & Jewellery
            <br />
            <span className="text-gold-400 font-normal">Aligned with Your Stars</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Certified gemstones, original rudraksha & astrological jewellery.
            Expert Vedic guidance. Worldwide delivery.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/catalog" className="btn-gold text-base px-8 py-4">
              Shop Gemstones
            </Link>
            <Link href="/quiz" className="btn-outline border-white/40 text-white hover:border-gold-400 hover:text-gold-400 text-base px-8 py-4">
              Find Your Gem ✦
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
            {[
              { value: '10,000+', label: 'Gemstones' },
              { value: '500+', label: 'Rudraksha beads' },
              { value: '98%', label: 'Lab certified' },
              { value: '50+', label: 'Countries served' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-medium text-gold-400">{value}</p>
                <p className="text-sm text-white/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust badges ──────────────────────────────────── */}
      <TrustBadges />

      {/* ── Categories ────────────────────────────────────── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-10">
            Shop by <span className="italic text-brand-500">Gemstone</span>
          </h2>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* ── Featured products ─────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-3xl font-light">
              Featured <span className="italic text-brand-500">Gems</span>
            </h2>
            <Link href="/catalog" className="text-sm text-brand-500 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Quiz banner ───────────────────────────────────── */}
      <QuizBanner />

      {/* ── Why GemPandit ─────────────────────────────────── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-12">
            Why <span className="italic text-brand-500">GemPandit</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '🔬', title: 'Lab certified', desc: 'Every precious stone comes with a certificate from GII, GRS, or AGL — so you know exactly what you are buying.' },
              { emoji: '🌿', title: 'Natural & unheated', desc: 'We stock only natural, unheated and untreated gemstones. No enhancements, no surprises.' },
              { emoji: '🌍', title: 'Worldwide delivery', desc: 'Insured shipping to 50+ countries. Tamper-proof packaging with real-time tracking.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="text-center">
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="text-lg font-medium mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
