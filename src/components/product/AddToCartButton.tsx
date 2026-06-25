// src/components/product/AddToCartButton.tsx
'use client'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart'
import type { Product } from '@/types'

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, openCart } = useCartStore()

  if (product.stock === 0) {
    return (
      <button disabled className="btn-primary w-full justify-center opacity-50 cursor-not-allowed py-4">
        Out of stock
      </button>
    )
  }

  return (
    <button
      onClick={() => {
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
      }}
      className="btn-gold w-full justify-center text-base py-4"
    >
      <ShoppingBag className="w-5 h-5" />
      Add to cart
    </button>
  )
}
