// src/app/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/product/ProductCard'
import { CategoryGrid } from '@/components/product/CategoryGrid'
import { QuizBanner } from '@/components/quiz/QuizBanner'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { HeroSlider } from '@/components/layout/HeroSlider'

const CAT_PHOTOS = [
  { name: 'Gemstones', sub: 'Ruby, Emerald, Sapphire & more', img: 'https://images.unsplash.com/photo-1603695819601-66b33bdee6e5?w=600&q=80', href: '/catalog?category=gemstones' },
  { name: 'Rudraksha', sub: '1 to 21 Mukhi certified beads',  img: 'https://images.unsplash.com/photo-1611967164521-abae8fba4668?w=600&q=80', href: '/catalog?category=rudraksha' },
  { name: 'Jewellery',  sub: 'Pendants, rings & bracelets',   img: 'https://images.unsplash.com/photo-1573408301185-9519f94815a5?w=600&q=80', href: '/catalog?category=jewellery' },
]

async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { stock: { gt: 0 } },
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

      {/* ── Cinematic hero slider ── */}
      <HeroSlider />

      {/* ── Category photo strip ── */}
      <section className="grid grid-cols-3 gap-0.5 bg-stone-200">
        {CAT_PHOTOS.map(c => (
          <Link key={c.name} href={c.href}
            className="relative h-52 overflow-hidden group block">
            <img src={c.img} alt={c.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white font-semibold text-sm tracking-wide">{c.name}</p>
              <p className="text-white/60 text-xs">{c.sub}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* ── Trust badges ── */}
      <TrustBadges />

      {/* ── Categories ── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-10">
            Shop by <span className="italic text-brand-500">Gemstone</span>
          </h2>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* ── Featured products ── */}
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

      {/* ── Quiz banner ── */}
      <QuizBanner />

      {/* ── Why us ── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-12">
            Why <span className="italic text-brand-500">Astro Beads & Gems</span>
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