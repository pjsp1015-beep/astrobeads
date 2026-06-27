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
      <div className={cn('group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all duration-300', className)}>
        <div
          className="h-48 flex items-center justify-center relative overflow-hidden"
          style={{ background: product.bgColor || '#f5f0ff' }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10" style={{ transform: 'translate(30%,-30%)' }} />
          <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/10" style={{ transform: 'translate(-30%,30%)' }} />
          <span className="text-6xl z-10 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
            {product.emoji || '💎'}
          </span>
          {product.certified && (
            <div className="absolute top-3 left-3 z-10">
              <span className="flex items-center gap-1 bg-white/90 text-green-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                <CheckCircle className="w-3 h-3" />
                Certified
              </span>
            </div>
          )}
          {product.stock <= 3 && product.stock > 0 && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Only {product.stock} left
              </span>
            </div>
          )}
          {product.tag && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="bg-brand-900/80 text-gold-400 text-xs font-medium px-2 py-1 rounded-full">
                {product.tag}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mb-3">{product.origin} · {product.weight} ct</p>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-brand-900">{formatPrice(product.price)}</span>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 bg-brand-900 text-gold-400 text-xs font-medium px-3 py-2 rounded-lg hover:bg-brand-800 transition-colors"
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