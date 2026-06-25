// src/types/index.ts

export type Role = 'CUSTOMER' | 'ADMIN'
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  weight: number
  origin: string
  emoji: string
  bgColor: string
  tag: string
  certified: boolean
  certificate?: string | null
  treatment: string
  stock: number
  active: boolean
  specs: Record<string, string>
  category: { id: string; name: string; slug: string; emoji?: string | null }
  images?: ProductImage[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  url: string
  alt?: string | null
  isPrimary: boolean
}

export interface CartItem {
  id: string
  name: string
  price: number
  weight: number
  origin: string
  emoji: string
  bgColor: string
  quantity: number
}

export interface Address {
  id?: string
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  country: string
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  subtotal: number
  tax: number
  shipping: number
  total: number
  shippingAddress: Address
  items: OrderItem[]
  createdAt: Date
  user?: { name?: string | null; email?: string | null }
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  subtotal: number
  product?: Product
}

export interface Category {
  id: string
  name: string
  slug: string
  emoji?: string | null
  description?: string | null
}

// ─── API Response Types ────────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  question: string
  sub: string
  options: { icon: string; label: string }[]
}

export interface QuizResult {
  gem: string
  name: string
  slug: string
  desc: string
}
