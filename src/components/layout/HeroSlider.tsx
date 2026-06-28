'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const STAGES = [
  { label: 'Deep in the earth — raw stone' },
  { label: 'Master cutters shape each facet' },
  { label: 'Polished to sacred brilliance' },
  { label: 'Set into gold — the jewel takes form' },
  { label: 'The final masterpiece' },
]

const STAGE_DUR = 6000

function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)) }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function drawMining(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.fillStyle = '#0a0503'; ctx.fillRect(0, 0, W, H)
  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = `rgba(${18 + i * 4},${8 + i * 3},${3 + i},0.9)`
    ctx.fillRect(0, H * (0.08 + i * 0.13), W, H * 0.15)
  }
  const cx = W * 0.5, cy = H * 0.42, p = clamp(t / 80, 0, 1)
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90)
  g.addColorStop(0, `rgba(200,120,40,${0.22 + p * 0.12})`)
  g.addColorStop(0.6, `rgba(120,55,15,${0.08 + p * 0.06})`)
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 130, 0, Math.PI * 2); ctx.fill()
  for (let i = 0; i < 55; i++) {
    const x = (i * 131 + Math.sin(i * 0.6 + t * 0.008) * 25) % W
    const y = H * 0.12 + (i * 83) % (H * 0.75)
    const br = Math.abs(Math.sin(t * 0.025 + i * 0.38))
    if (br > 0.28) {
      ctx.fillStyle = `rgba(200,130,55,${br * 0.55})`
      ctx.beginPath(); ctx.arc(x, y, 0.6 + br, 0, Math.PI * 2); ctx.fill()
    }
  }
  const n = 10 + Math.floor(p * 8)
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + t * 0.003
    const d = lerp(0, 60 + p * 30, clamp(p * 4 - i * 0.2, 0, 1))
    const x = cx + Math.cos(ang) * d, y = cy + Math.sin(ang) * d * 0.55
    const h = 10 + i % 5 * 7, w = 5 + i % 3 * 3
    const br = 0.45 + Math.sin(t * 0.045 + i) * 0.3
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang + 0.5)
    ctx.fillStyle = `rgba(${180 + i % 35},${85 + i % 45},${25 + i % 25},${br})`
    ctx.beginPath(); ctx.moveTo(0, -h); ctx.lineTo(w / 2, 0); ctx.lineTo(0, h * 0.28); ctx.lineTo(-w / 2, 0); ctx.closePath(); ctx.fill()
    if (br > 0.62) {
      ctx.fillStyle = `rgba(255,200,90,${(br - 0.62) * 1.8})`
      ctx.beginPath(); ctx.arc(-w * 0.12, -h * 0.38, 1.3, 0, Math.PI * 2); ctx.fill()
    }
    ctx.restore()
  }
  ctx.fillStyle = `rgba(255,175,75,${(Math.sin(t * 0.04) * 0.5 + 0.5) * 0.3 * p})`
  ctx.beginPath(); ctx.arc(cx, cy, 22 + Math.sin(t * 0.06) * 6, 0, Math.PI * 2); ctx.fill()
}

function drawCutting(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.fillStyle = '#020407'; ctx.fillRect(0, 0, W, H)
  for (let i = 0; i < 90; i++) {
    const x = (i * 139 + Math.sin(i * 0.45) * 45) % W
    const y = (i * 91 + Math.cos(i * 0.55) * 35) % H
    const br = Math.abs(Math.sin(t * 0.035 + i * 0.28))
    if (br > 0.18) { ctx.fillStyle = `rgba(140,200,255,${br * 0.35})`; ctx.beginPath(); ctx.arc(x, y, 0.7, 0, Math.PI * 2); ctx.fill() }
  }
  const cx = W * 0.5, cy = H * 0.42, R = 88
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.01)
  for (let i = 0; i < 20; i++) {
    const a1 = (i / 20) * Math.PI * 2, a2 = ((i + 0.48) / 20) * Math.PI * 2, a3 = ((i + 1) / 20) * Math.PI * 2
    const br = Math.abs(Math.sin(a1 * 1.6 + t * 0.018))
    const inner = R * 0.36, outer = R * (0.82 + Math.sin(i * 0.6) * 0.08), top = R * (0.54 + Math.sin(i * 0.9) * 0.05)
    const cols = [`rgba(18,75,175,${0.48 + br * 0.38})`,`rgba(38,115,215,${0.38 + br * 0.42})`,`rgba(75,155,250,${0.52 + br * 0.32})`,`rgba(8,55,145,${0.55 + br * 0.28})`,`rgba(55,135,225,${0.42 + br * 0.38})`]
    ctx.fillStyle = cols[i % 5]
    ctx.beginPath(); ctx.moveTo(Math.cos(a1) * inner, Math.sin(a1) * inner); ctx.lineTo(Math.cos(a1) * outer, Math.sin(a1) * outer); ctx.lineTo(Math.cos(a2) * top, Math.sin(a2) * top); ctx.lineTo(Math.cos(a3) * outer, Math.sin(a3) * outer); ctx.lineTo(Math.cos(a3) * inner, Math.sin(a3) * inner); ctx.closePath(); ctx.fill()
    if (br > 0.7) { ctx.fillStyle = `rgba(210,235,255,${(br - 0.7) * 2.8})`; ctx.beginPath(); ctx.arc(Math.cos(a2) * outer * 0.8, Math.sin(a2) * outer * 0.8, 2.8, 0, Math.PI * 2); ctx.fill() }
  }
  ctx.restore()
}

function drawPolishing(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.fillStyle = '#030108'; ctx.fillRect(0, 0, W, H)
  const cx = W * 0.5, cy = H * 0.42, R = 80
  for (let r = 0; r < 9; r++) {
    const r2 = R * 0.65 + r * 20, spd = 0.003 + r * 0.0015, ang = t * spd * (r % 2 ? 1 : -1)
    const wob = Math.sin(t * 0.012 + r * 0.5) * 5
    ctx.strokeStyle = `rgba(${115 + r * 7},${35 + r * 4},${175 + r * 6},0.18)`; ctx.lineWidth = 1
    ctx.beginPath()
    for (let a = 0; a <= Math.PI * 2; a += 0.05) { const rr = r2 + wob * Math.sin(a * 4 + ang); ctx.lineTo(cx + Math.cos(a + ang) * rr, cy + Math.sin(a + ang) * rr * 0.6) }
    ctx.closePath(); ctx.stroke()
  }
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.006)
  for (let i = 0; i < 16; i++) {
    const a1 = (i / 16) * Math.PI * 2, a2 = ((i + 1) / 16) * Math.PI * 2
    const sh = Math.abs(Math.sin(a1 * 2.5 + t * 0.022))
    const pu = ['#541880','#7228a8','#9245b8','#b870cc','#632890','#8538a8']
    ctx.fillStyle = pu[i % 6]; ctx.globalAlpha = 0.52 + sh * 0.4
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a1) * R, Math.sin(a1) * R); ctx.lineTo(Math.cos(a2) * R, Math.sin(a2) * R); ctx.closePath(); ctx.fill()
    if (sh > 0.68) { ctx.fillStyle = '#fff'; ctx.globalAlpha = (sh - 0.68) * 2.5; ctx.beginPath(); ctx.arc(Math.cos((a1 + a2) / 2) * R * 0.6, Math.sin((a1 + a2) / 2) * R * 0.6, 3.2, 0, Math.PI * 2); ctx.fill() }
  }
  ctx.globalAlpha = 1; ctx.restore()
}

function drawSetting(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.fillStyle = '#040300'; ctx.fillRect(0, 0, W, H)
  for (let i = 0; i < 65; i++) {
    const x = (i * 109 + Math.sin(i * 0.38) * 55) % W, y = (i * 77 + Math.cos(i * 0.48) * 42) % H
    const br = Math.abs(Math.sin(t * 0.03 + i * 0.22))
    ctx.fillStyle = `rgba(212,175,55,${br * 0.28})`; ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill()
  }
  const cx = W * 0.5, cy = H * 0.4, rR = 85
  ctx.strokeStyle = 'rgba(212,175,55,0.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, rR, 0, Math.PI * 2); ctx.stroke()
  const gc = ['#e74c3c','#2980b9','#27ae60','#9b59b6','#f39c12','#1abc9c','#e74c3c','#3498db']
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2 + t * 0.004, gx = cx + Math.cos(ang) * rR, gy = cy + Math.sin(ang) * rR
    const br = 0.78 + Math.abs(Math.sin(t * 0.048 + i * 0.78)) * 0.2
    ctx.fillStyle = gc[i]; ctx.globalAlpha = br
    ctx.save(); ctx.translate(gx, gy); ctx.rotate(ang + t * 0.008)
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(7, 0); ctx.lineTo(0, 5.5); ctx.lineTo(-7, 0); ctx.closePath(); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.globalAlpha = 0.42 * br; ctx.beginPath(); ctx.arc(-2, -2.5, 2.2, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1; ctx.restore()
  }
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * 0.003)
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    ctx.strokeStyle = 'rgba(212,175,55,0.28)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 13, Math.sin(a) * 13); ctx.lineTo(Math.cos(a) * 38, Math.sin(a) * 38); ctx.stroke()
    ctx.fillStyle = 'rgba(212,175,55,0.55)'; ctx.beginPath(); ctx.arc(Math.cos(a) * 38, Math.sin(a) * 38, 2.5, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
  const gw = Math.abs(Math.sin(t * 0.038))
  ctx.fillStyle = `rgba(212,175,55,${0.72 + gw * 0.22})`; ctx.beginPath(); ctx.arc(cx, cy, 15, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.48)'; ctx.beginPath(); ctx.arc(cx - 4, cy - 4, 5, 0, Math.PI * 2); ctx.fill()
}

function drawFinal(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  ctx.fillStyle = '#020103'; ctx.fillRect(0, 0, W, H)
  const cx = W * 0.5, cy = H * 0.43
  const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, 210)
  aura.addColorStop(0, 'rgba(212,175,55,0.07)'); aura.addColorStop(0.5, 'rgba(140,70,200,0.04)'); aura.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = aura; ctx.fillRect(0, 0, W, H)
  const rR = 92
  ctx.strokeStyle = 'rgba(212,175,55,0.48)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, rR, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = 'rgba(212,175,55,0.1)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, rR + 15, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.arc(cx, cy, rR - 15, 0, Math.PI * 2); ctx.stroke()
  const gc = ['#e74c3c','#2980b9','#27ae60','#9b59b6','#f39c12','#1abc9c','#e74c3c','#3498db','#e67e22','#8e44ad']
  for (let i = 0; i < 10; i++) {
    const ang = (i / 10) * Math.PI * 2 + t * 0.003, gx = cx + Math.cos(ang) * rR, gy = cy + Math.sin(ang) * rR
    const p2 = 0.82 + Math.sin(t * 0.055 + i * 0.6) * 0.16
    ctx.fillStyle = gc[i]; ctx.globalAlpha = p2
    ctx.save(); ctx.translate(gx, gy); ctx.rotate(ang)
    ctx.beginPath(); ctx.moveTo(0, -9.5); ctx.lineTo(8, 0); ctx.lineTo(0, 6); ctx.lineTo(-8, 0); ctx.closePath(); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.globalAlpha = 0.42; ctx.beginPath(); ctx.arc(-2.5, -2.8, 2.5, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1; ctx.restore()
    ctx.strokeStyle = 'rgba(212,175,55,0.42)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(gx, gy, 10.5, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * 0.002)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    ctx.strokeStyle = 'rgba(212,175,55,0.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 14, Math.sin(a) * 14); ctx.lineTo(Math.cos(a) * 42, Math.sin(a) * 42); ctx.stroke()
    ctx.fillStyle = 'rgba(212,175,55,0.62)'; ctx.beginPath(); ctx.arc(Math.cos(a) * 42, Math.sin(a) * 42, 3, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2 + t * 0.007, r2 = rR * 1.32 + Math.sin(t * 0.038 + i) * 10
    ctx.fillStyle = `rgba(212,175,55,${Math.abs(Math.sin(t * 0.048 + i * 0.38)) * 0.22})`
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2, 1, 0, Math.PI * 2); ctx.fill()
  }
  const gl = Math.abs(Math.sin(t * 0.028))
  ctx.fillStyle = `rgba(212,175,55,${0.75 + gl * 0.22})`; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.52)'; ctx.beginPath(); ctx.arc(cx - 4, cy - 4, 5.5, 0, Math.PI * 2); ctx.fill()
}

const DRAW_FNS = [drawMining, drawCutting, drawPolishing, drawSetting, drawFinal]

export function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [showText, setShowText] = useState(true)
  const canvasRefs = useRef<(HTMLCanvasRenderingContext2D | null)[]>([null, null, null, null, null])
  const tickRefs = useRef<number[]>([0, 0, 0, 0, 0])
  const animRefs = useRef<number[]>([0, 0, 0, 0, 0])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const curRef = useRef(0)

  const go = (n: number) => {
    curRef.current = n
    setCur(n)
    setShowText(false)
    setTimeout(() => setShowText(true), 350)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => go((curRef.current + 1) % 5), STAGE_DUR)
  }

  useEffect(() => {
    DRAW_FNS.forEach((fn, i) => {
      const loop = () => {
        const canvas = document.getElementById(`hero-c-${i}`) as HTMLCanvasElement
        if (!canvas) return
        const W = canvas.parentElement?.offsetWidth || 640
        const H = 560
        if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H }
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        tickRefs.current[i]++
        fn(ctx, W, H, tickRefs.current[i])
        animRefs.current[i] = requestAnimationFrame(loop)
      }
      animRefs.current[i] = requestAnimationFrame(loop)
    })
    timerRef.current = setTimeout(() => go(1), STAGE_DUR)
    return () => {
      animRefs.current.forEach(id => cancelAnimationFrame(id))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '560px' }}>
      {STAGES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
          style={{ opacity: i === cur ? 1 : 0 }}
        >
          <canvas
            id={`hero-c-${i}`}
            className="absolute inset-0 w-full h-full transition-transform duration-[7000ms] ease-out"
            style={{ transform: i === cur ? 'scale(1)' : 'scale(1.08)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.12) 50%,rgba(0,0,0,0.78) 100%)' }} />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-4 z-10 text-center">
        <div
          className="transition-all duration-[1200ms] ease-out"
          style={{ opacity: showText ? 1 : 0, transform: showText ? 'translateY(0)' : 'translateY(14px)', transitionDelay: showText ? '0.35s' : '0s' }}
        >
          <p className="text-xs tracking-[5px] uppercase text-amber-300 mb-5 font-medium" style={{ fontFamily: 'Arial,sans-serif' }}>
            Certified · Natural · Astrological
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-3" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}>
            Discover Gemstones,<br />Rudraksha & Jewellery
          </h1>
          <p className="text-white/50 text-xs tracking-widest mb-8 font-light" style={{ fontFamily: 'Arial,sans-serif' }}>
            Astro Beads & Gems — Authentic. Vedic. Certified.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/catalog" className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-10 py-3 text-xs tracking-widest transition-colors" style={{ fontFamily: 'Arial,sans-serif', letterSpacing: '3px' }}>
              SHOP COLLECTION
            </Link>
            <Link href="/quiz" className="border border-white/40 hover:border-amber-400 hover:text-amber-400 text-white px-10 py-3 text-xs tracking-widest transition-colors" style={{ fontFamily: 'Arial,sans-serif', letterSpacing: '3px' }}>
              FIND MY GEM ✦
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 items-center z-20">
        {STAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="h-1 rounded-full border-none cursor-pointer transition-all duration-500"
            style={{ width: i === cur ? '32px' : '10px', background: i === cur ? '#d4af37' : 'rgba(255,255,255,0.28)' }}
          />
        ))}
      </div>

      <div
        className="absolute top-5 left-1/2 -translate-x-1/2 z-20 text-xs tracking-widest uppercase font-light transition-opacity duration-500"
        style={{ fontFamily: 'Arial,sans-serif', color: 'rgba(255,255,255,0.38)', whiteSpace: 'nowrap' }}
      >
        {STAGES[cur].label}
      </div>
    </section>
  )
}
