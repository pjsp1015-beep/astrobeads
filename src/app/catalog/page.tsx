// src/app/catalog/page.tsx
import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/product/ProductCard'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'All Products' }

interface Props {
  searchParams: { category?: string; sort?: string; gem?: string }
}

export default async function CatalogPage({ searchParams }: Props) {
  const { category, sort, gem } = searchParams

  const products = await prisma.product.findMany({
  where: {
    ...(category && { category: { slug: category } }),
    ...(gem && { slug: { contains: gem } }),
  },
    include: { category: true },
    orderBy:
      sort === 'price-asc'
        ? { price: 'asc' }
        : sort === 'price-desc'
        ? { price: 'desc' }
        : { createdAt: 'desc' },
  })

  const categories = await prisma.category.findMany()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="md:w-52 flex-shrink-0">
          <h2 className="text-lg font-medium mb-4">Filter</h2>

          <div className="space-y-1 mb-6">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Category</p>
            <a
              href="/catalog"
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${!category ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              All gemstones
            </a>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/catalog?category=${cat.slug}`}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${category === cat.slug ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {cat.name}
              </a>
            ))}
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Sort by</p>
            {[
              { value: '', label: 'Featured' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' },
            ].map(({ value, label }) => (
              <a
                key={value}
                href={`/catalog${category ? `?category=${category}&sort=${value}` : `?sort=${value}`}`}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${sort === value || (!sort && !value) ? 'bg-brand-50 text-brand-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {label}
              </a>
            ))}
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-light">
              {category
                ? (categories.find((c) => c.slug === category)?.name || 'All') + ' Products'
                : 'All Products'}
            </h1>
            <p className="text-sm text-gray-400">{products.length} found</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">??</p>
              <p className="text-gray-500">No gemstones found for this filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
