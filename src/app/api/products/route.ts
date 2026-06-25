// src/app/api/products/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const sort = searchParams.get('sort')
    const take = parseInt(searchParams.get('take') || '50')

    const products = await prisma.product.findMany({
      where: {
        active: true,
        ...(category && { category: { slug: category } }),
      },
      include: { category: true },
      orderBy:
        sort === 'price-asc' ? { price: 'asc' }
        : sort === 'price-desc' ? { price: 'desc' }
        : { createdAt: 'desc' },
      take,
    })

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 })
  }
}
