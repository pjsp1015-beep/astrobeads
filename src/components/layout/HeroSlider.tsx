'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const SCENES = [
  { lbl: 'Earth extraction — raw ore' },
  { lbl: 'Raw crystals emerge' },
  { lbl: 'Transportation to cutting house' },
  { lbl: 'Master cutter marks the stone' },
  { lbl: 'Precision cutting — facets form' },
  { lbl: 'Rough edges refined' },
  { lbl: 'Polishing wheel — gem awakens' },
  { lbl: 'Quality grading & inspection' },
  { lbl: 'Gold setting — jewel takes form' },
  { lbl: 'The final masterpiece' },
]

const DUR = 5500

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function sz(canvas: HTMLCanvasElement) {
  const W = canvas.parentElement?.parentElement?.offsetWidth || 640
  const H = 480
  if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H }
  return { W, H, ctx: canvas.getContext('2d')! }
}

function drawEarth(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#08030a'; ctx.fillRect(0, 0, W, H)
  for (let l = 0; l < 8; l++) { ctx.fillStyle = `rgba(${12 + l * 3},${6 + l * 2},${4 + l},0.95)`; ctx.fillRect(0, H * (0.05 + l * 0.12), W, H * 0.13) }
  const cx = W * .5, cy = H * .45
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110)
  g.addColorStop(0, 'rgba(180,90,30,0.3)'); g.addColorStop(.6, 'rgba(100,45,12,0.1)'); g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 150, 0, Math.PI * 2); ctx.fill()
  for (let p = 0; p < 60; p++) {
    const x = (p * 127 + Math.sin(p * .6 + t * .007) * 30) % W
    const y = H * .1 + (p * 89) % (H * .8)
    const br = Math.abs(Math.sin(t * .022 + p * .35))
    if (br > .25) { ctx.fillStyle = `rgba(190,120,45,${br * .5})`; ctx.beginPath(); ctx.arc(x, y, .5 + br, 0, Math.PI * 2); ctx.fill() }
  }
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * Math.PI * 2 + t * .003, d = 40 + k % 4 * 12
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * .5
    const h = 12 + k % 4 * 8, w = 5 + k % 3 * 3, br = .4 + Math.sin(t * .04 + k) * .3
    ctx.save(); ctx.translate(x, y); ctx.rotate(a + .5)
    ctx.fillStyle = `rgba(${170 + k % 30},${80 + k % 40},${20 + k % 20},${br})`
    ctx.beginPath(); ctx.moveTo(0, -h); ctx.lineTo(w / 2, 0); ctx.lineTo(0, h * .25); ctx.lineTo(-w / 2, 0); ctx.closePath(); ctx.fill()
    ctx.restore()
  }
}

function drawCrystals(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#06040e'; ctx.fillRect(0, 0, W, H)
  const colors = ['#6a2d8f', '#8b44b0', '#4a1f6b', '#9b59b6', '#5c2d8a', '#3d1460']
  for (let i = 0; i < 35; i++) {
    const x = (i * 117 + Math.sin(i * .55) * 35) % W, y = (i * 83 + Math.cos(i * .7) * 28) % (H * .85) + H * .08
    const h = 20 + i % 6 * 18, w = 7 + i % 4 * 5, br = .4 + Math.sin(t * .032 + i * .4) * .3
    ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(i * .8) * .3)
    ctx.fillStyle = colors[i % 6]; ctx.globalAlpha = br
    ctx.beginPath(); ctx.moveTo(0, -h); ctx.lineTo(w / 2, 0); ctx.lineTo(w * .3, h * .2); ctx.lineTo(-w * .3, h * .2); ctx.lineTo(-w / 2, 0); ctx.closePath(); ctx.fill()
    if (br > .6) { ctx.fillStyle = 'rgba(220,180,255,.5)'; ctx.globalAlpha = (br - .6) * 1.5; ctx.beginPath(); ctx.arc(-w * .1, -h * .35, 1.5, 0, Math.PI * 2); ctx.fill() }
    ctx.globalAlpha = 1; ctx.restore()
  }
  for (let s = 0; s < 40; s++) { const x = (s * 93 + t * .3) % W, y = (s * 71) % H, br = Math.abs(Math.sin(t * .04 + s * .3)); ctx.fillStyle = `rgba(200,160,255,${br * .3})`; ctx.beginPath(); ctx.arc(x, y, .6, 0, Math.PI * 2); ctx.fill() }
}

function drawTransport(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#080608'; ctx.fillRect(0, 0, W, H)
  const horizon = H * .55
  const g = ctx.createLinearGradient(0, 0, 0, horizon)
  g.addColorStop(0, 'rgba(15,8,25,1)'); g.addColorStop(.5, 'rgba(30,15,40,.8)'); g.addColorStop(1, 'rgba(20,10,30,.6)')
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, horizon)
  ctx.fillStyle = 'rgba(20,15,25,.6)'; ctx.fillRect(0, horizon, W, H - horizon)
  for (let s = 0; s < 80; s++) { const x = (s * 137 + Math.sin(s * .4) * 20) % W, y = (s * 73) % (horizon * .9), br = Math.abs(Math.sin(t * .025 + s * .2)); ctx.fillStyle = `rgba(255,255,255,${br * .5})`; ctx.beginPath(); ctx.arc(x, y, .6, 0, Math.PI * 2); ctx.fill() }
  const px = (t * .8) % W
  ctx.fillStyle = 'rgba(212,175,55,.85)'; ctx.fillRect(px - 22, horizon - 8, 44, 14)
  ctx.fillStyle = 'rgba(180,140,40,.7)'; ctx.fillRect(px - 15, horizon - 18, 30, 12)
  ctx.strokeStyle = 'rgba(212,175,55,.25)'; ctx.lineWidth = 1; ctx.setLineDash([4, 6])
  ctx.beginPath(); ctx.moveTo(0, horizon); ctx.lineTo(W, horizon); ctx.stroke(); ctx.setLineDash([])
}

function drawMarking(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#0a0905'; ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(30,25,10,.8)'; ctx.fillRect(W * .1, H * .15, W * .8, H * .7)
  ctx.strokeStyle = 'rgba(212,175,55,.2)'; ctx.lineWidth = .5; ctx.strokeRect(W * .1, H * .15, W * .8, H * .7)
  const cx = W * .5, cy = H * .45, r = 60
  const inc = Math.sin(t * .01) * .5 + .5
  ctx.strokeStyle = `rgba(212,175,55,${.5 + inc * .4})`; ctx.lineWidth = 1.5
  for (let ln = 0; ln < 8; ln++) {
    const a = (ln / 8) * Math.PI * 2 + t * .002
    ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 8, cy + Math.sin(a) * 8); ctx.lineTo(cx + Math.cos(a) * r * .85, cy + Math.sin(a) * r * .85 * .6); ctx.stroke()
  }
  const pulse = Math.abs(Math.sin(t * .06))
  ctx.strokeStyle = `rgba(255,220,80,${.4 + pulse * .4})`; ctx.lineWidth = 2
  ctx.beginPath(); ctx.ellipse(cx, cy, r, r * .6, 0, 0, Math.PI * 2); ctx.stroke()
  ctx.fillStyle = `rgba(255,220,80,${.6 + pulse * .3})`; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill()
}

function drawCutting(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#020407'; ctx.fillRect(0, 0, W, H)
  for (let p = 0; p < 90; p++) { const x = (p * 139 + Math.sin(p * .45) * 45) % W, y = (p * 91 + Math.cos(p * .55) * 35) % H, br = Math.abs(Math.sin(t * .032 + p * .28)); if (br > .18) { ctx.fillStyle = `rgba(140,200,255,${br * .35})`; ctx.beginPath(); ctx.arc(x, y, .7, 0, Math.PI * 2); ctx.fill() } }
  const cx = W * .5, cy = H * .43, R = 80
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * .012)
  for (let f = 0; f < 22; f++) {
    const a1 = (f / 22) * Math.PI * 2, a2 = ((f + .46) / 22) * Math.PI * 2, a3 = ((f + 1) / 22) * Math.PI * 2
    const br = Math.abs(Math.sin(a1 * 1.6 + t * .018))
    const inn = R * .34, out = R * (.8 + Math.sin(f * .6) * .08), top = R * (.52 + Math.sin(f * .9) * .05)
    const cols = [`rgba(18,75,175,${.46 + br * .4})`, `rgba(38,115,215,${.38 + br * .42})`, `rgba(75,155,250,${.52 + br * .32})`, `rgba(8,55,145,${.55 + br * .28})`, `rgba(55,135,225,${.42 + br * .38})`]
    ctx.fillStyle = cols[f % 5]
    ctx.beginPath(); ctx.moveTo(Math.cos(a1) * inn, Math.sin(a1) * inn); ctx.lineTo(Math.cos(a1) * out, Math.sin(a1) * out); ctx.lineTo(Math.cos(a2) * top, Math.sin(a2) * top); ctx.lineTo(Math.cos(a3) * out, Math.sin(a3) * out); ctx.lineTo(Math.cos(a3) * inn, Math.sin(a3) * inn); ctx.closePath(); ctx.fill()
    if (br > .7) { ctx.fillStyle = `rgba(210,235,255,${(br - .7) * 2.8})`; ctx.beginPath(); ctx.arc(Math.cos(a2) * out * .8, Math.sin(a2) * out * .8, 2.5, 0, Math.PI * 2); ctx.fill() }
  }
  ctx.restore()
}

function drawRefining(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#040308'; ctx.fillRect(0, 0, W, H)
  const cx = W * .5, cy = H * .43, R = 72
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * .008)
  for (let f = 0; f < 18; f++) {
    const a1 = (f / 18) * Math.PI * 2, a2 = ((f + 1) / 18) * Math.PI * 2
    const br = Math.abs(Math.sin(a1 * 2 + t * .02)), mix = f / 18
    const r2 = Math.floor(lerp(18, 75, mix)), g2 = Math.floor(lerp(75, 155, mix)), b2 = Math.floor(lerp(175, 250, mix))
    ctx.fillStyle = `rgba(${r2},${g2},${b2},${.45 + br * .4})`; ctx.globalAlpha = 1
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a1) * R, Math.sin(a1) * R); ctx.lineTo(Math.cos(a2) * R, Math.sin(a2) * R); ctx.closePath(); ctx.fill()
    if (br > .65) { ctx.fillStyle = `rgba(220,240,255,${(br - .65) * 2.2})`; ctx.beginPath(); ctx.arc(Math.cos((a1 + a2) / 2) * R * .65, Math.sin((a1 + a2) / 2) * R * .65, 2.2, 0, Math.PI * 2); ctx.fill() }
  }
  ctx.restore()
  for (let sp = 0; sp < 6; sp++) {
    const a = (sp / 6) * Math.PI * 2 + t * .015, d = R * 1.2 + Math.sin(t * .05 + sp) * 15
    const br = Math.abs(Math.sin(t * .08 + sp * .5))
    ctx.fillStyle = `rgba(180,220,255,${br * .6})`; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2 + br * 2, 0, Math.PI * 2); ctx.fill()
  }
}

function drawPolishing(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#030108'; ctx.fillRect(0, 0, W, H)
  const cx = W * .5, cy = H * .43, R = 75
  for (let r = 0; r < 10; r++) {
    const rad = R * .6 + r * 18, spd = .003 + r * .0015, ang = t * spd * (r % 2 ? 1 : -1), wob = Math.sin(t * .012 + r * .5) * 5
    ctx.strokeStyle = `rgba(${110 + r * 7},${32 + r * 4},${170 + r * 6},.16)`; ctx.lineWidth = 1
    ctx.beginPath(); for (let a = 0; a <= Math.PI * 2; a += .05) { ctx.lineTo(cx + Math.cos(a + ang) * (rad + wob * Math.sin(a * 4 + ang)), cy + Math.sin(a + ang) * (rad + wob * Math.sin(a * 4 + ang)) * .62) }
    ctx.closePath(); ctx.stroke()
  }
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * .007)
  for (let f = 0; f < 16; f++) {
    const a1 = (f / 16) * Math.PI * 2, a2 = ((f + 1) / 16) * Math.PI * 2
    const sh = Math.abs(Math.sin(a1 * 2.5 + t * .022))
    ctx.fillStyle = ['#541880', '#7228a8', '#9245b8', '#b870cc', '#632890', '#8538a8'][f % 6]; ctx.globalAlpha = .5 + sh * .42
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a1) * R, Math.sin(a1) * R); ctx.lineTo(Math.cos(a2) * R, Math.sin(a2) * R); ctx.closePath(); ctx.fill()
    if (sh > .68) { ctx.fillStyle = '#fff'; ctx.globalAlpha = (sh - .68) * 2.6; ctx.beginPath(); ctx.arc(Math.cos((a1 + a2) / 2) * R * .6, Math.sin((a1 + a2) / 2) * R * .6, 3, 0, Math.PI * 2); ctx.fill() }
  }
  ctx.globalAlpha = 1; ctx.restore()
}

function drawInspection(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#050508'; ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(15,12,20,.7)'; ctx.fillRect(W * .08, H * .1, W * .84, H * .8)
  const cx = W * .5, cy = H * .42, R = 55
  ctx.save(); ctx.translate(cx, cy)
  for (let f = 0; f < 14; f++) {
    const a1 = (f / 14) * Math.PI * 2, a2 = ((f + 1) / 14) * Math.PI * 2
    const br = Math.abs(Math.sin(a1 * 2 + t * .015))
    ctx.fillStyle = ['#9b59b6', '#8e44ad', '#6c3483', '#d2b4de'][f % 4]; ctx.globalAlpha = .55 + br * .38
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a1) * R, Math.sin(a1) * R); ctx.lineTo(Math.cos(a2) * R, Math.sin(a2) * R); ctx.closePath(); ctx.fill()
    if (br > .7) { ctx.fillStyle = '#fff'; ctx.globalAlpha = (br - .7) * 2; ctx.beginPath(); ctx.arc(Math.cos((a1 + a2) / 2) * R * .65, Math.sin((a1 + a2) / 2) * R * .65, 2, 0, Math.PI * 2); ctx.fill() }
  }
  ctx.globalAlpha = 1; ctx.restore()
  const loopR = 80 + Math.sin(t * .02) * 3
  ctx.strokeStyle = `rgba(212,175,55,${.3 + Math.sin(t * .03) * .15})`; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.arc(cx, cy, loopR, 0, Math.PI * 2); ctx.stroke()
  for (let tk = 0; tk < 12; tk++) { const a = (tk / 12) * Math.PI * 2; ctx.strokeStyle = 'rgba(212,175,55,.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * (loopR - 5), cy + Math.sin(a) * (loopR - 5)); ctx.lineTo(cx + Math.cos(a) * (loopR + 5), cy + Math.sin(a) * (loopR + 5)); ctx.stroke() }
  const scan = (t * .015) % (Math.PI * 2)
  ctx.strokeStyle = 'rgba(100,200,255,.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(scan) * loopR, cy + Math.sin(scan) * loopR); ctx.stroke()
}

function drawSetting(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#040300'; ctx.fillRect(0, 0, W, H)
  for (let p = 0; p < 65; p++) { const x = (p * 109 + Math.sin(p * .38) * 55) % W, y = (p * 77 + Math.cos(p * .48) * 42) % H, br = Math.abs(Math.sin(t * .03 + p * .22)); ctx.fillStyle = `rgba(212,175,55,${br * .26})`; ctx.beginPath(); ctx.arc(x, y, .7, 0, Math.PI * 2); ctx.fill() }
  const cx = W * .5, cy = H * .41, rR = 80
  ctx.strokeStyle = 'rgba(212,175,55,.42)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, rR, 0, Math.PI * 2); ctx.stroke()
  const gc = ['#e74c3c', '#2980b9', '#27ae60', '#9b59b6', '#f39c12', '#1abc9c', '#e74c3c', '#3498db']
  for (let g = 0; g < 8; g++) {
    const ang = (g / 8) * Math.PI * 2 + t * .004, gx = cx + Math.cos(ang) * rR, gy = cy + Math.sin(ang) * rR
    const br = .78 + Math.abs(Math.sin(t * .048 + g * .78)) * .2
    ctx.fillStyle = gc[g]; ctx.globalAlpha = br
    ctx.save(); ctx.translate(gx, gy); ctx.rotate(ang + t * .008)
    ctx.beginPath(); ctx.moveTo(0, -8.5); ctx.lineTo(7, 0); ctx.lineTo(0, 5); ctx.lineTo(-7, 0); ctx.closePath(); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.globalAlpha = .4 * br; ctx.beginPath(); ctx.arc(-2, -2, 2, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1; ctx.restore()
  }
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * .003)
  for (let s = 0; s < 10; s++) { const a = (s / 10) * Math.PI * 2; ctx.strokeStyle = 'rgba(212,175,55,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 12, Math.sin(a) * 12); ctx.lineTo(Math.cos(a) * 36, Math.sin(a) * 36); ctx.stroke(); ctx.fillStyle = 'rgba(212,175,55,.5)'; ctx.beginPath(); ctx.arc(Math.cos(a) * 36, Math.sin(a) * 36, 2.2, 0, Math.PI * 2); ctx.fill() }
  ctx.restore()
  const gw = Math.abs(Math.sin(t * .038)); ctx.fillStyle = `rgba(212,175,55,${.7 + gw * .22})`; ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,.48)'; ctx.beginPath(); ctx.arc(cx - 3.5, cy - 3.5, 4.5, 0, Math.PI * 2); ctx.fill()
}

function drawFinal(c: HTMLCanvasElement, t: number) {
  const { W, H, ctx } = sz(c)
  ctx.fillStyle = '#020103'; ctx.fillRect(0, 0, W, H)
  const cx = W * .5, cy = H * .42
  const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200)
  aura.addColorStop(0, 'rgba(212,175,55,.07)'); aura.addColorStop(.5, 'rgba(140,70,200,.04)'); aura.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = aura; ctx.fillRect(0, 0, W, H)
  const rR = 88
  ctx.strokeStyle = 'rgba(212,175,55,.48)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, rR, 0, Math.PI * 2); ctx.stroke()
  ctx.strokeStyle = 'rgba(212,175,55,.1)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, rR + 14, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, rR - 14, 0, Math.PI * 2); ctx.stroke()
  const gc = ['#e74c3c', '#2980b9', '#27ae60', '#9b59b6', '#f39c12', '#1abc9c', '#e74c3c', '#3498db', '#e67e22', '#8e44ad']
  for (let g = 0; g < 10; g++) {
    const ang = (g / 10) * Math.PI * 2 + t * .003, gx = cx + Math.cos(ang) * rR, gy = cy + Math.sin(ang) * rR
    const p2 = .82 + Math.sin(t * .055 + g * .6) * .16
    ctx.fillStyle = gc[g]; ctx.globalAlpha = p2
    ctx.save(); ctx.translate(gx, gy); ctx.rotate(ang)
    ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(7.5, 0); ctx.lineTo(0, 5.5); ctx.lineTo(-7.5, 0); ctx.closePath(); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.globalAlpha = .42; ctx.beginPath(); ctx.arc(-2.5, -2.5, 2.5, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1; ctx.restore()
    ctx.strokeStyle = 'rgba(212,175,55,.4)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(gx, gy, 10, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * .002)
  for (let s = 0; s < 12; s++) { const a = (s / 12) * Math.PI * 2; ctx.strokeStyle = 'rgba(212,175,55,.28)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 14, Math.sin(a) * 14); ctx.lineTo(Math.cos(a) * 40, Math.sin(a) * 40); ctx.stroke(); ctx.fillStyle = 'rgba(212,175,55,.6)'; ctx.beginPath(); ctx.arc(Math.cos(a) * 40, Math.sin(a) * 40, 3, 0, Math.PI * 2); ctx.fill() }
  ctx.restore()
  for (let p = 0; p < 30; p++) { const a = (p / 30) * Math.PI * 2 + t * .007, r2 = rR * 1.32 + Math.sin(t * .038 + p) * 10; ctx.fillStyle = `rgba(212,175,55,${Math.abs(Math.sin(t * .048 + p * .38)) * .22})`; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2, 1, 0, Math.PI * 2); ctx.fill() }
  const gl = Math.abs(Math.sin(t * .028)); ctx.fillStyle = `rgba(212,175,55,${.75 + gl * .22})`; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,.52)'; ctx.beginPath(); ctx.arc(cx - 4, cy - 4, 5.5, 0, Math.PI * 2); ctx.fill()
}

const DRAW_FNS = [drawEarth, drawCrystals, drawTransport, drawMarking, drawCutting, drawRefining, drawPolishing, drawInspection, drawSetting, drawFinal]

export function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [showText, setShowText] = useState(true)
  const [label, setLabel] = useState(SCENES[0].lbl)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>(new Array(10).fill(null))
  const tickRefs = useRef<number[]>(new Array(10).fill(0))
  const animRefs = useRef<number[]>(new Array(10).fill(0))
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const curRef = useRef(0)

  const go = (n: number) => {
    curRef.current = n
    setCur(n)
    setShowText(false)
    setTimeout(() => { setShowText(true); setLabel(SCENES[n].lbl) }, 350)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => go((curRef.current + 1) % 10), DUR)
  }

  useEffect(() => {
    DRAW_FNS.forEach((fn, i) => {
      const loop = () => {
        const canvas = document.getElementById(`hc${i}`) as HTMLCanvasElement | null
        if (canvas) { tickRefs.current[i]++; fn(canvas, tickRefs.current[i]) }
        animRefs.current[i] = requestAnimationFrame(loop)
      }
      animRefs.current[i] = requestAnimationFrame(loop)
    })
    timerRef.current = setTimeout(() => go(1), DUR)
    return () => { animRefs.current.forEach(id => cancelAnimationFrame(id)); if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  return (
    <div className="w-full bg-[#f5f0ea] px-8 py-0">
      <section className="relative w-full overflow-hidden bg-black rounded-sm" style={{ height: '480px' }}>

        {SCENES.map((_, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out" style={{ opacity: i === cur ? 1 : 0 }}>
            <canvas id={`hc${i}`} className="absolute inset-0 w-full h-full transition-transform duration-[7000ms] ease-out" style={{ transform: i === cur ? 'scale(1)' : 'scale(1.07)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.06) 0%,rgba(0,0,0,0.1) 45%,rgba(0,0,0,0.72) 100%)' }} />
          </div>
        ))}

        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center transition-opacity duration-500" style={{ fontFamily: 'Arial,sans-serif', fontSize: '8px', color: 'rgba(255,255,255,0.38)', letterSpacing: '4px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          {label}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-11 px-6 z-10 text-center">
          <div className="transition-all duration-[1100ms] ease-out" style={{ opacity: showText ? 1 : 0, transform: showText ? 'translateY(0)' : 'translateY(12px)', transitionDelay: showText ? '0.35s' : '0s' }}>
            <p className="mb-3" style={{ fontFamily: 'Arial,sans-serif', fontSize: '9px', letterSpacing: '5px', color: 'rgba(212,175,55,0.9)', textTransform: 'uppercase' }}>
              Certified · Natural · Astrological
            </p>
            <h1 className="font-light text-white mb-2" style={{ fontSize: '32px', lineHeight: '1.22', textShadow: '0 2px 20px rgba(0,0,0,0.65)' }}>
              Discover Gemstones,<br />Rudraksha & Jewellery
            </h1>
            <p className="mb-5" style={{ fontFamily: 'Arial,sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '4px' }}>
              Astro Beads & Gems — Authentic. Vedic. Certified.
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Link href="/catalog" style={{ background: '#d4af37', color: '#1a1200', padding: '10px 24px', fontSize: '10px', letterSpacing: '3px', fontFamily: 'Arial,sans-serif', fontWeight: 700, textDecoration: 'none' }}>
                SHOP COLLECTION
              </Link>
              <Link href="/quiz" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.38)', padding: '10px 24px', fontSize: '10px', letterSpacing: '3px', fontFamily: 'Arial,sans-serif', textDecoration: 'none' }}>
                FIND MY GEM ✦
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 items-center z-10">
          {SCENES.map((_, i) => (
            <button key={i} onClick={() => go(i)} className="h-[3px] rounded-sm border-none cursor-pointer p-0 transition-all duration-500"
              style={{ width: i === cur ? '28px' : '8px', background: i === cur ? '#d4af37' : 'rgba(255,255,255,0.28)' }} />
          ))}
        </div>

      </section>
    </div>
  )
}
