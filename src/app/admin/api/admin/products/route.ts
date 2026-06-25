import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [products, categories] = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.category.findMany(),
    ])

    const stats = {
      totalProducts: products.length,
      totalCategories: categories.length,
      lowStock: products.filter(p => p.stock > 0 && p.stock <= 3).length,
      outOfStock: products.filter(p => p.stock === 0).length,
    }

    return NextResponse.json({ success: true, data: { products, stats } })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { categorySlug, ...rest } = body

    const category = await prisma.category.findUnique({ where: { slug: categorySlug } })
    if (!category) return NextResponse.json({ success: false, error: 'Category not found' }, { status: 400 })

    const product = await prisma.product.create({
      data: { ...rest, categoryId: category.id },
    })

    return NextResponse.json({ success: true, data: product })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...data } = await req.json()
    const product = await prisma.product.update({ where: { id }, data })
    return NextResponse.json({ success: true, data: product })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
