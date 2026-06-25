// src/components/product/ProductCard.tsx
'use client'
import Link from 'next/link'
import { ShoppingBag, CheckCircle } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useCartStore((s) => s.openCart)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      origin: product.origin,
      emoji: product.emoji,
      bgColor: product.bgColor,
    })
    openCart()
  }

  return (
    <Link href={`/product/${product.slug}`}>
      <div className={cn('card-hover group cursor-pointer', className)}>
        {/* Gem image area */}
        <div
          className="h-44 flex items-center justify-center text-6xl relative overflow-hidden"
          style={{ background: product.bgColor }}
        >
          <span className="transform group-hover:scale-110 transition-transform duration-300">
            {product.tag === 'Rudraksha' ? '🟤' : product.tag === 'Jewellery' ? '💍' : product.tag === 'Organic' ? '🪸' : product.certified ? '💎' : '🔮'}
          </span>
          {product.certified && (
            <div className="absolute top-2 left-2">
              <span className="badge-certified">
                <CheckCircle className="w-3 h-3" />
                Certified
              </span>
            </div>
          )}
          {product.stock <= 2 && product.stock > 0 && (
            <div className="absolute top-2 right-2">
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">
                Only {product.stock} left
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="badge-tag mb-1">{product.tag}</p>
          <h3 className="font-medium text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            {product.origin} · {product.weight} ct
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-medium text-gray-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-gray-400 ml-1">/carat</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 bg-brand-900 text-gold-400 text-xs font-medium px-3 py-2 rounded hover:bg-brand-800 transition-colors"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
