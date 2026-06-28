// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/product/ProductCard'
import { CategoryGrid } from '@/components/product/CategoryGrid'
import { QuizBanner } from '@/components/quiz/QuizBanner'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { HeroSlider } from '@/components/layout/HeroSlider'

// ── Category photo strip ───────────────────────────────────
const CAT_PHOTOS = [
  {
    name: 'Gemstones',
    sub: 'Ruby, Emerald, Sapphire & more',
    img: 'https://images.unsplash.com/photo-1551761429-8232f9f5955c?w=800&q=85',
    href: '/catalog?category=gemstones',
  },
  {
    name: 'Rudraksha',
    sub: '1 to 21 Mukhi certified beads',
    img: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=85',
    href: '/catalog?category=rudraksha',
  },
  {
    name: 'Healing Stones',
    sub: 'Crystals for body, mind & soul',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=85',
    href: '/catalog?category=healing-stones',
  },
  {
    name: 'Pearls',
    sub: 'Natural & cultured pearls',
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85',
    href: '/catalog?category=pearls',
  },
  {
    name: 'Beads & Bracelets',
    sub: 'Healing bead bracelets',
    img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85',
    href: '/catalog?category=beads-bracelets',
  },
  {
    name: 'Jewellery',
    sub: 'Pendants, rings & necklaces',
    img: 'https://images.unsplash.com/photo-1573408301185-9519f94815a5?w=800&q=85',
    href: '/catalog?category=jewellery',
  },
]

// ── Featured gems ──────────────────────────────────────────
const FEATURED_GEMS = [
  { name: 'Natural Ruby', price: '₹4,500', img: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&q=85', href: '/catalog?q=ruby' },
  { name: 'Blue Sapphire', price: '₹6,200', img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=85', href: '/catalog?q=sapphire' },
  { name: 'Emerald', price: '₹3,800', img: 'https://images.unsplash.com/photo-1551761429-8232f9f5955c?w=400&q=85', href: '/catalog?q=emerald' },
  { name: 'Yellow Sapphire', price: '₹5,100', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=85', href: '/catalog?q=yellow-sapphire' },
  { name: 'Pearl', price: '₹1,200', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=85', href: '/catalog?q=pearl' },
  { name: 'Hessonite', price: '₹2,400', img: 'https://images.unsplash.com/photo-1573408301185-9519f94815a5?w=400&q=85', href: '/catalog?q=hessonite' },
  { name: 'Cat\'s Eye', price: '₹3,200', img: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&q=85', href: '/catalog?q=cats-eye' },
  { name: 'Red Coral', price: '₹2,800', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=85', href: '/catalog?q=coral' },
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
    <div className="bg-[#f5f0ea]">

      {/* ── Cinematic hero slider ── */}
      <HeroSlider />

      {/* ── 6-category photo strip ── */}
      <section className="px-8 py-3 bg-[#f5f0ea]">
        <div className="grid grid-cols-3 gap-0.5">
          {CAT_PHOTOS.map(c => (
            <Link key={c.name} href={c.href}
              className="relative overflow-hidden group block"
              style={{ height: '200px' }}>
              <img
                src={c.img}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.04) 55%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-sm tracking-wide">{c.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{c.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Trust badges ── */}
      <TrustBadges />

      {/* ── Featured gemstones with photos ── */}
      <section className="py-14 px-8 bg-[#0f0800]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs tracking-widest uppercase mb-2"
              style={{ color: '#d4af37', fontFamily: 'Arial,sans-serif', letterSpacing: '4px' }}>
              Featured stones
            </p>
            <h2 className="text-3xl font-light text-white">Our finest gemstones</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
            {FEATURED_GEMS.map(g => (
              <Link key={g.name} href={g.href}
                className="group overflow-hidden block"
                style={{ background: '#0a0600' }}>
                <div className="overflow-hidden" style={{ height: '160px' }}>
                  <img
                    src={g.img}
                    alt={g.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="text-white text-sm" style={{ fontFamily: 'Arial,sans-serif' }}>{g.name}</p>
                  <p className="text-xs mt-1" style={{ color: '#d4af37', fontFamily: 'Arial,sans-serif' }}>From {g.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/catalog"
              className="inline-block border text-sm px-10 py-3 tracking-widest transition-colors"
              style={{ borderColor: '#d4af37', color: '#d4af37', fontFamily: 'Arial,sans-serif', letterSpacing: '3px', fontSize: '11px' }}>
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* ── All products from DB ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-3xl font-light">
              Shop <span className="italic text-brand-500">All Products</span>
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

      {/* ── Categories from DB ── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-10">
            Shop by <span className="italic text-brand-500">Category</span>
          </h2>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-14 px-4 bg-white">
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
