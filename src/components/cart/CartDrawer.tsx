// src/components/cart/CartDrawer.tsx
'use client'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { isOpen, items, closeCart, removeItem, updateQuantity, subtotal, tax, shipping, total } = useCartStore()

  if (!isOpen) return null

  const sub = subtotal()
  const t = tax()
  const s = shipping()
  const tot = total()

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-500" />
            <h2 className="text-lg font-medium">Your cart</h2>
            {items.length > 0 && (
              <span className="text-xs bg-brand-50 text-brand-500 px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <span className="text-5xl mb-4">💎</span>
              <p className="font-medium text-gray-800 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-500 mb-6">Browse our collection to find your perfect gemstone.</p>
              <button onClick={closeCart} className="btn-primary">
                Explore gemstones
              </button>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: item.bgColor }}
                  >
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.origin} · {item.weight} ct</p>
                    <div className="flex items-center justify-between mt-2">
                      {/* Qty control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-5 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>{formatPrice(sub)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (3%)</span><span>{formatPrice(t)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{s === 0 ? <span className="text-green-600">Free</span> : formatPrice(s)}</span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t">
                <span>Total</span><span>{formatPrice(tot)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center">
              {sub < 10000
                ? `Add ${formatPrice(10000 - sub)} more for free shipping`
                : '✓ Free shipping applied'}
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-gold w-full justify-center text-base py-4"
            >
              Proceed to checkout →
            </Link>
            <button onClick={closeCart} className="btn-ghost w-full justify-center text-sm">
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
