import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AddToCartButton } from '@/components/product/AddToCartButton'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  })

  if (!product) notFound()

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    take: 4,
    include: { category: true },
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-500">Home</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-brand-500">Catalog</Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.category.slug}`} className="hover:text-brand-500">{product.category.name}</Link>
        <span>/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="aspect-square rounded-2xl flex items-center justify-center text-9xl"
          style={{ backgroundColor: product.bgColor || '#f5f0ff' }}>
          {product.emoji}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">{product.category.name}</span>
            {product.certified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✅ Certified</span>}
            {product.tag && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{product.tag}</span>}
          </div>

          <h1 className="text-3xl font-light text-brand-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">{product.description}</p>

          <div className="text-3xl font-medium text-brand-900 mb-1">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-gray-400 mb-6">Inclusive of all taxes · Free shipping above ₹2,000</p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { label: 'Weight', value: `${product.weight} carats` },
              { label: 'Origin', value: product.origin },
              { label: 'Treatment', value: product.treatment },
              { label: 'Stock', value: product.stock > 0 ? `${product.stock} available` : 'Out of stock' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {product.stock > 0 ? (
            <AddToCartButton product={product as any} />
          ) : (
            <button disabled className="w-full bg-gray-200 text-gray-400 py-4 rounded-xl text-sm cursor-not-allowed">
              Out of stock
            </button>
          )}

          <div className="grid grid-cols-3 gap-3 mt-4 text-center">
            {[
              { icon: '🔒', text: 'Secure payment' },
              { icon: '📦', text: 'Free shipping ₹2000+' },
              { icon: '↩️', text: '7-day returns' },
            ].map(({ icon, text }) => (
              <div key={text} className="bg-gray-50 rounded-xl p-3">
                <div className="text-lg mb-1">{icon}</div>
                <p className="text-xs text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {product.certified && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-12">
          <h3 className="font-medium text-green-800 mb-2">✅ Authenticity Guaranteed</h3>
          <p className="text-green-700 text-sm">This gemstone comes with a certificate of authenticity from a recognised gemological laboratory.</p>
        </div>
      )}

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-light text-brand-900 mb-6">Similar products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`}
                className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
                <div className="aspect-square flex items-center justify-center text-5xl"
                  style={{ backgroundColor: p.bgColor || '#f5f0ff' }}>
                  {p.emoji}
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-brand-600 line-clamp-1">{p.name}</p>
                  <p className="text-brand-600 font-medium mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}