'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const SLIDES = [
  { image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=85', caption: 'Amethyst clusters' },
  { image: 'https://images.unsplash.com/photo-1522767131594-6b7b887b4ae6?w=1600&q=85', caption: 'Citrine geodes' },
  { image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=1600&q=85', caption: 'Crystal spheres' },
  { image: 'https://images.unsplash.com/photo-1573408301185-9519f94815a5?w=1600&q=85', caption: 'Sacred jewellery' },
]

export function HeroSlider() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  const go = (n: number) => setCur((n + SLIDES.length) % SLIDES.length)

  return (
    <section className="relative w-full h-[560px] overflow-hidden bg-stone-900">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === cur ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt={s.caption}
            className="w-full h-full object-cover"
            style={{ animation: i === cur ? 'kenburnshome 8s ease-in-out forwards' : 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
        </div>
      ))}

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 z-10 text-center">
        <p className="text-xs tracking-[4px] uppercase text-amber-300 mb-4 font-medium">
          Certified · Natural · Astrological
        </p>
        <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-4 drop-shadow-lg">
          Discover Gemstones,<br />
          Rudraksha & Jewellery
        </h1>
        <p className="text-white/65 text-sm tracking-widest mb-8 font-light">
          Astro Beads & Gems — Authentic. Certified. Vedic.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/catalog"
            className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-8 py-3 text-sm tracking-widest transition-colors">
            SHOP COLLECTION
          </Link>
          <Link href="/quiz"
            className="border border-white/50 hover:border-amber-400 hover:text-amber-400 text-white px-8 py-3 text-sm tracking-widest transition-colors">
            FIND MY GEM ✦
          </Link>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button onClick={() => go(cur - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white text-2xl flex items-center justify-center hover:bg-white/30 transition-colors">
        ‹
      </button>
      <button onClick={() => go(cur + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white text-2xl flex items-center justify-center hover:bg-white/30 transition-colors">
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={`w-2 h-2 rounded-full border-none transition-all cursor-pointer ${i === cur ? 'bg-white scale-125' : 'bg-white/35'}`}
          />
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-6 right-5 z-20">
        <span className="text-white/50 text-xs tracking-widest uppercase font-light">
          {SLIDES[cur].caption}
        </span>
      </div>

      <style>{`
        @keyframes kenburnshome {
          from { transform: scale(1.05); }
          to   { transform: scale(1); }
        }
      `}</style>
    </section>
  )
}
