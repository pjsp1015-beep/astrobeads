const fs = require('fs');

// ─── Task 4: Branding updates ─────────────────────────────────────────────────

// 1. Update layout.tsx metadata
let layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
layout = layout
  .replace("'GemPandit — Certified Natural Gemstones'", "'Astro Beads & Gems — Certified Natural Gemstones'")
  .replace("'%s | GemPandit'", "'%s | Astro Beads & Gems'")
  .replace(/GemPandit/g, 'Astro Beads & Gems')
  .replace("'Buy 100% certified natural gemstones online. Certified Precious, semi-precious & astrological stones with expert guidance. Worldwide delivery.'", 
    "'Buy 100% certified natural gemstones, rudraksha and astrological jewellery online. Expert Vedic astrology guidance. Worldwide delivery.'");
fs.writeFileSync('src/app/layout.tsx', layout);
console.log('layout.tsx updated');

// 2. Update homepage hero text
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page
  .replace('Discover Gemstones', 'Discover Gemstones,\n            Rudraksha & Jewellery')
  .replace("'Astro Beads & Gems'", "'Astro Beads & Gems'")
  .replace(
    '10,000+ certified natural gemstones. Expert Vedic astrology guidance.\n            Worldwide delivery with lab certification.',
    'Certified gemstones, original rudraksha & astrological jewellery.\n            Expert Vedic guidance. Worldwide delivery.'
  );
fs.writeFileSync('src/app/page.tsx', page);
console.log('page.tsx updated');

// 3. Update footer
let footer = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');
footer = footer
  .replace(/GemPandit/g, 'Astro Beads & Gems')
  .replace(
    "India's leading online retailer of 100% natural, certified precious and semi-precious gemstones.",
    "India's trusted source for certified natural gemstones, original rudraksha beads, and astrological jewellery."
  );
fs.writeFileSync('src/components/layout/Footer.tsx', footer);
console.log('Footer.tsx updated');

// ─── Task 3: Product detail page polish ───────────────────────────────────────

// Rewrite the product detail page with better layout
const productDetail = `// src/app/product/[slug]/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import { AddToCartButton } from '@/components/product/AddToCartButton'
import { CheckCircle, MapPin, Weight, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } })
  if (!product) return {}
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  })

  if (!product) notFound()

  const specs = product.specs as Record<string, string>
  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, active: true },
    take: 4,
    include: { category: true },
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-gray-600">Gemstones</Link>
        <span>/</span>
        <Link href={\`/catalog?category=\${product.category.slug}\`} className="hover:text-gray-600">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Product image */}
        <div>
          <div
            className="rounded-2xl flex items-center justify-center text-8xl aspect-square mb-4"
            style={{ background: product.bgColor }}
          >
            {product.tag === 'Rudraksha' ? 'Ru' :
             product.tag === 'Jewellery' ? 'Je' :
             product.tag === 'Organic' ? 'Or' : product.name.charAt(0)}
          </div>
          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { icon: Shield, label: '100% Natural', sub: 'Authentic stones' },
              { icon: CheckCircle, label: 'Lab certified', sub: product.certificate || 'Verified quality' },
              { icon: Star, label: 'Expert curated', sub: 'Vedic guidance' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
                <Icon className="w-5 h-5 text-brand-500 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-tag">{product.tag}</span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />{product.origin}
            </span>
            {product.weight > 0 && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Weight className="w-3.5 h-3.5" />{product.weight} ct
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl font-light mb-4">{product.name}</h1>

          {product.certified && (
            <div className="flex items-center gap-2 mb-5">
              <span className="badge-certified">
                <CheckCircle className="w-3.5 h-3.5" />
                Lab certified — {product.certificate}
              </span>
            </div>
          )}

          <div className="mb-6">
            <span className="text-4xl font-medium text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.weight > 0 && (
              <span className="text-sm font-normal text-gray-400 ml-2">per carat</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Stock warning */}
          {product.stock <= 3 && product.stock > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6 text-sm text-amber-800">
              Only {product.stock} left in stock — order soon
            </div>
          )}
          {product.stock === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm text-red-700">
              Currently out of stock
            </div>
          )}

          <AddToCartButton product={product as any} />

          {/* Guarantees */}
          <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
            {[
              { emoji: '🔒', label: 'Secure payment', sub: 'Razorpay · UPI' },
              { emoji: '↩️', label: '30-day returns', sub: 'Hassle free' },
              { emoji: '🚚', label: 'Insured shipping', sub: 'Worldwide' },
            ].map(({ emoji, label, sub }) => (
              <div key={label}>
                <p className="text-xl mb-1">{emoji}</p>
                <p className="text-xs font-medium text-gray-700">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications */}
      {Object.keys(specs).length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-light mb-6">Stone specifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 px-5 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">{key}</span>
                <span className="text-sm font-medium text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-light mb-6">More from {product.category.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((rel) => (
              <Link key={rel.id} href={\`/product/\${rel.slug}\`}>
                <div className="card-hover p-4 text-center">
                  <div className="w-16 h-16 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl"
                    style={{ background: rel.bgColor }}>
                    {rel.name.charAt(0)}
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{rel.name}</p>
                  <p className="text-sm text-brand-600">{formatPrice(rel.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
`;

fs.writeFileSync('src/app/product/[slug]/page.tsx', productDetail);
console.log('Product detail page updated');

// ─── Update homepage stats section ────────────────────────────────────────────
let homePage = fs.readFileSync('src/app/page.tsx', 'utf8');
homePage = homePage.replace(
  `{ value: '10,000+', label: 'Gemstones' },
              { value: '40+', label: 'Gem types' },
              { value: '98%', label: 'Certified' },
              { value: '50+', label: 'Countries served' },`,
  `{ value: '10,000+', label: 'Gemstones' },
              { value: '500+', label: 'Rudraksha beads' },
              { value: '98%', label: 'Lab certified' },
              { value: '50+', label: 'Countries served' },`
);
fs.writeFileSync('src/app/page.tsx', homePage);
console.log('Homepage stats updated');

// ─── Update QuizBanner branding ────────────────────────────────────────────────
let quiz = fs.readFileSync('src/components/quiz/QuizBanner.tsx', 'utf8');
quiz = quiz
  .replace('Not sure which gemstone is right for you?', 'Not sure which gemstone or Rudraksha is right for you?')
  .replace(
    'Take our 4-question astrology quiz and get a personalised gemstone recommendation from our Vedic experts.',
    'Take our 4-question Vedic astrology quiz and get a personalised recommendation from our experts.'
  );
fs.writeFileSync('src/components/quiz/QuizBanner.tsx', quiz);
console.log('QuizBanner updated');

// ─── Update TrustBadges ────────────────────────────────────────────────────────
const trustBadges = `// src/components/layout/TrustBadges.tsx
export function TrustBadges() {
  const badges = [
    { emoji: 'Lab', label: 'Lab certified', sub: 'GII · GRS · AGL' },
    { emoji: 'Nat', label: 'Natural & unheated', sub: 'No treatments' },
    { emoji: 'Rud', label: 'Original rudraksha', sub: 'Nepal & Java' },
    { emoji: 'Shi', label: 'Free shipping', sub: 'Orders above 10,000' },
    { emoji: 'Ret', label: '30-day returns', sub: 'Hassle free' },
  ]

  return (
    <div className="border-y border-gray-100 bg-white py-5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-around gap-4">
          {badges.map(({ emoji, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
                {emoji}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
`;
fs.writeFileSync('src/components/layout/TrustBadges.tsx', trustBadges);
console.log('TrustBadges updated');

console.log('\nAll done! Tasks 3 & 4 complete. Refresh your browser.');
