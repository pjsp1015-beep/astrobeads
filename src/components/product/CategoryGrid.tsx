// src/components/product/CategoryGrid.tsx
import Link from 'next/link'
import type { Category } from '@/types'

const GEM_LINKS: Record<string, string> = {
  Ruby: '/catalog?gem=ruby',
  'Blue Sapphire': '/catalog?gem=blue-sapphire',
  Emerald: '/catalog?gem=emerald',
  'Yellow Sapphire': '/catalog?gem=yellow-sapphire',
  Pearl: '/catalog?gem=pearl',
  Amethyst: '/catalog?gem=amethyst',
  'Red Coral': '/catalog?gem=red-coral',
  "Cat's Eye": '/catalog?gem=cats-eye',
  'Blue Topaz': '/catalog?gem=blue-topaz',
  Hessonite: '/catalog?gem=hessonite',
}

const POPULAR_GEMS = [
  { emoji: '🔴', name: 'Ruby' },
  { emoji: '💎', name: 'Blue Sapphire' },
  { emoji: '💚', name: 'Emerald' },
  { emoji: '⭐', name: 'Yellow Sapphire' },
  { emoji: '⚪', name: 'Pearl' },
  { emoji: '🟣', name: 'Amethyst' },
  { emoji: '🪸', name: 'Red Coral' },
  { emoji: '🟡', name: "Cat's Eye" },
  { emoji: '🔵', name: 'Blue Topaz' },
  { emoji: '🟠', name: 'Hessonite' },
]

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="space-y-6">
      {/* Main category pills */}
      <div className="flex gap-3 justify-center flex-wrap">
        <Link
          href="/catalog"
          className="px-5 py-2 rounded-full bg-brand-900 text-gold-400 text-sm font-medium"
        >
          All Gemstones
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/catalog?category=${cat.slug}`}
            className="px-5 py-2 rounded-full border border-gray-200 text-gray-600 text-sm hover:border-brand-500 hover:text-brand-500 transition-colors"
          >
            {cat.emoji} {cat.name}
          </Link>
        ))}
      </div>

      {/* Popular gem grid */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {POPULAR_GEMS.map(({ emoji, name }) => (
          <Link
            key={name}
            href={GEM_LINKS[name] || '/catalog'}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-brand-50 hover:text-brand-600 transition-colors group text-center"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{emoji}</span>
            <span className="text-xs text-gray-500 group-hover:text-brand-500 leading-tight">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
