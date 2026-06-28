'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1551761429-8232f9f5955c?w=1600&q=90',
    caption: 'Precious gemstones',
  },
  {
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=90',
    caption: 'Natural crystals',
  },
  {
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&q=90',
    caption: 'Sacred rudraksha',
  },
  {
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=90',
    caption: 'Fine jewellery',
  },
]

export function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setPrev(cur)
      setTransitioning(true)
      setCur(c => (c + 1) % SLIDES.length)
      setTimeout(() => {
        setPrev(null)
        setTransitioning(false)
      }, 1800)
    }, 6000)
    return () => clearInterval(t)
  }, [cur])

  return (
    <section className="relative w-full h-[580px] overflow-hidden bg-black">

      {/* Previous slide fading out */}
      {prev !== null && (
        <div
          className="absolute inset-0 z-10"
          style={{ animation: 'fadeOut 1.8s ease forwards' }}
        >
          <img
            src={SLIDES[prev].image}
            alt={SLIDES[prev].caption}
            className="w-full h-full object-cover"
            style={{ animation: 'kenburns-out 6s ease-in-out forwards' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/75" />
        </div>
      )}

      {/* Current slide zooming in */}
      <div className="absolute inset-0 z-0">
        <img
          key={cur}
          src={SLIDES[cur].image}
          alt={SLIDES[cur].caption}
          className="w-full h-full object-cover"
          style={{ animation: 'kenburns-in 7s ease-in-out forwards' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/75" />
      </div>

      {/* Text overlay — fades in with each slide */}
      <div
        key={cur + '-text'}
        className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-4 z-20 text-center"
        style={{ animation: 'textFadeIn 1.5s ease forwards' }}
      >
        <p className="text-xs tracking-[5px] uppercase text-amber-300 mb-5 font-medium">
          Certified · Natural · Astrological
        </p>
        <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-4 drop-shadow-2xl">
          Discover Gemstones,<br />
          Rudraksha & Jewellery
        </h1>
        <p className="text-white/60 text-sm tracking-widest mb-10 font-light">
          Astro Beads & Gems — Authentic. Certified. Vedic.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/catalog"
            className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-10 py-3.5 text-sm tracking-widest transition-all duration-300 hover:scale-105">
            SHOP COLLECTION
          </Link>
          <Link href="/quiz"
            className="border border-white/50 hover:border-amber-400 hover:text-amber-400 text-white px-10 py-3.5 text-sm tracking-widest transition-all duration-300">
            FIND MY GEM ✦
          </Link>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className="transition-all duration-500 rounded-full"
            style={{
              width: i === cur ? '24px' : '7px',
              height: '7px',
              background: i === cur ? '#f59e0b' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>

      {/* Caption bottom right */}
      <div className="absolute bottom-7 right-6 z-30">
        <span className="text-white/35 text-xs tracking-widest uppercase font-light">
          {SLIDES[cur].caption}
        </span>
      </div>

      <style>{`
        @keyframes kenburns-in {
          0%   { transform: scale(1.08) translate(1%, 0.5%); }
          100% { transform: scale(1)    translate(0%, 0%); }
        }
        @keyframes kenburns-out {
          0%   { transform: scale(1)    translate(0%, 0%); }
          100% { transform: scale(0.96) translate(-1%, -0.5%); }
        }
        @keyframes fadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes textFadeIn {
          0%   { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
