// src/components/layout/Navbar.tsx
'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'

export function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount, toggleCart } = useCartStore()
  const count = itemCount()

  const navLinks = [
    { href: '/catalog', label: 'Gemstones' },
    { href: '/catalog?category=precious', label: 'Precious' },
    { href: '/catalog?category=semi-precious', label: 'Semi-Precious' },
    { href: '/quiz', label: 'Find Your Gem' },
  ]

  return (
    <header className="bg-brand-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
            <span className="text-xl font-medium">
              <span className="text-gold-400">Astro</span> Beads & Gems
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-white/80 hover:text-gold-400 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-white/80 hover:text-white transition-colors hidden md:block">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="p-2 text-white/80 hover:text-white transition-colors relative"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-400 text-brand-900 text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* User */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden md:block">{session.user?.name?.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 top-8 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-1 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-gray-50">My orders</Link>
                  <Link href="/account/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-50">Wishlist</Link>
                  {(session.user as any)?.role === 'ADMIN' && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-brand-500 hover:bg-gray-50">Admin panel</Link>
                  )}
                  <hr className="my-1" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="hidden md:block">Sign in</span>
              </Link>
            )}

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-1 animate-fade-in">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block px-2 py-2.5 text-sm text-white/80 hover:text-gold-400"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
