// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format price in INR */
export function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Generate a unique order number like GP-20240001 */
export function generateOrderNumber() {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 90000) + 10000
  return `GP-${year}${rand}`
}

/** Slugify a string */
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/** Truncate text */
export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str
}

/** Tax calculation (GST 3% on gems) */
export function calculateTax(subtotal: number) {
  return Math.round(subtotal * 0.03)
}

/** Shipping cost (free above ₹10,000) */
export function calculateShipping(subtotal: number) {
  return subtotal >= 10000 ? 0 : 199
}
