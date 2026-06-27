import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const categories = [
  { name: 'Gemstones', slug: 'gemstones', emoji: '💎' },
  { name: 'Rudraksha', slug: 'rudraksha', emoji: '📿' },
  { name: 'Bracelets', slug: 'bracelets', emoji: '🪬' },
  { name: 'Pendants', slug: 'pendants', emoji: '🔮' },
]

const products = [
  { name: 'Natural Blue Sapphire', slug: 'natural-blue-sapphire', description: 'Certified natural blue sapphire from Sri Lanka.', price: 4500, weight: 3.25, origin: 'Sri Lanka', emoji: '💙', bgColor: '#e8f0fe', categorySlug: 'gemstones', tag: 'Best Seller', certified: true, treatment: 'Unheated', stock: 10 },
  { name: 'Yellow Sapphire (Pukhraj)', slug: 'yellow-sapphire-pukhraj', description: 'Natural yellow sapphire for Jupiter blessings.', price: 3800, weight: 2.80, origin: 'Sri Lanka', emoji: '💛', bgColor: '#fffde7', categorySlug: 'gemstones', tag: 'Top Rated', certified: true, treatment: 'Unheated', stock: 8 },
  { name: 'Ruby (Manik)', slug: 'ruby-manik', description: 'Burmese ruby for Sun energy.', price: 6500, weight: 2.10, origin: 'Burma', emoji: '❤️', bgColor: '#fce4ec', categorySlug: 'gemstones', tag: 'Premium', certified: true, treatment: 'Heated', stock: 5 },
  { name: 'Emerald (Panna)', slug: 'emerald-panna', description: 'Colombian emerald for Mercury.', price: 5200, weight: 2.50, origin: 'Colombia', emoji: '💚', bgColor: '#e8f5e9', categorySlug: 'gemstones', tag: 'New', certified: true, treatment: 'Oiled', stock: 7 },
  { name: 'Red Coral (Moonga)', slug: 'red-coral-moonga', description: 'Italian red coral for Mars energy.', price: 1800, weight: 5.00, origin: 'Italy', emoji: '🪸', bgColor: '#fbe9e7', categorySlug: 'gemstones', tag: 'Popular', certified: true, treatment: 'None', stock: 15 },
  { name: 'Pearl (Moti)', slug: 'pearl-moti', description: 'South Sea pearl for Moon energy.', price: 1200, weight: 4.20, origin: 'South Sea', emoji: '⚪', bgColor: '#f3e5f5', categorySlug: 'gemstones', tag: 'Soothing', certified: true, treatment: 'None', stock: 20 },
  { name: "Cat's Eye (Lehsunia)", slug: 'cats-eye-lehsunia', description: "Chrysoberyl cat's eye for Ketu.", price: 3200, weight: 3.00, origin: 'Sri Lanka', emoji: '👁️', bgColor: '#f9fbe7', categorySlug: 'gemstones', tag: 'Rare', certified: true, treatment: 'None', stock: 6 },
  { name: 'Hessonite (Gomed)', slug: 'hessonite-gomed', description: 'Hessonite garnet for Rahu.', price: 2100, weight: 3.80, origin: 'Sri Lanka', emoji: '🟤', bgColor: '#efebe9', categorySlug: 'gemstones', tag: 'Effective', certified: true, treatment: 'None', stock: 12 },
  { name: '5 Mukhi Rudraksha', slug: '5-mukhi-rudraksha', description: 'Five-faced rudraksha for peace and health.', price: 450, weight: 8.00, origin: 'Nepal', emoji: '📿', bgColor: '#fff8e1', categorySlug: 'rudraksha', tag: 'Most Popular', certified: true, treatment: 'None', stock: 50 },
  { name: '1 Mukhi Rudraksha', slug: '1-mukhi-rudraksha', description: 'Rare single-faced rudraksha for moksha.', price: 8500, weight: 5.00, origin: 'Nepal', emoji: '🙏', bgColor: '#fce4ec', categorySlug: 'rudraksha', tag: 'Rare & Sacred', certified: true, treatment: 'None', stock: 3 },
  { name: 'Rudraksha Bracelet 8mm', slug: 'rudraksha-bracelet-8mm', description: 'Hand-knotted rudraksha bracelet with silver spacers.', price: 850, weight: 15.00, origin: 'Nepal', emoji: '🪬', bgColor: '#e8eaf6', categorySlug: 'bracelets', tag: 'Daily Wear', certified: false, treatment: 'None', stock: 30 },
  { name: 'Amethyst Bracelet', slug: 'amethyst-bracelet', description: 'Natural amethyst bead bracelet for calm and clarity.', price: 650, weight: 12.00, origin: 'Brazil', emoji: '💜', bgColor: '#f3e5f5', categorySlug: 'bracelets', tag: 'Calming', certified: false, treatment: 'None', stock: 25 },
  { name: 'Blue Sapphire Silver Pendant', slug: 'blue-sapphire-silver-pendant', description: 'Sterling silver pendant with certified blue sapphire.', price: 3200, weight: 4.50, origin: 'Sri Lanka', emoji: '🔮', bgColor: '#e3f2fd', categorySlug: 'pendants', tag: 'Elegant', certified: true, treatment: 'Unheated', stock: 8 },
  { name: 'Rudraksha & Sphatik Mala', slug: 'rudraksha-sphatik-mala', description: '108-bead mala for powerful meditation.', price: 1100, weight: 45.00, origin: 'Nepal', emoji: '📿', bgColor: '#e8f5e9', categorySlug: 'rudraksha', tag: 'Meditation', certified: false, treatment: 'None', stock: 20 },
  { name: 'Black Tourmaline Bracelet', slug: 'black-tourmaline-bracelet', description: 'Protective black tourmaline bracelet.', price: 550, weight: 14.00, origin: 'Brazil', emoji: '🖤', bgColor: '#eceff1', categorySlug: 'bracelets', tag: 'Protection', certified: false, treatment: 'None', stock: 35 },
  { name: 'Rose Quartz Pendant', slug: 'rose-quartz-pendant', description: 'Natural rose quartz heart pendant for love and healing.', price: 480, weight: 6.00, origin: 'Brazil', emoji: '🌸', bgColor: '#fce4ec', categorySlug: 'pendants', tag: 'Love & Healing', certified: false, treatment: 'None', stock: 40 },
]

export async function GET() {
  try {
    for (const cat of categories) {
      await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat })
    }
    const cats = await prisma.category.findMany()
    const catMap: Record<string, string> = Object.fromEntries(cats.map((c: { slug: string; id: string }) => [c.slug, c.id]))
    for (const p of products) {
      const { categorySlug, ...rest } = p
      await prisma.product.upsert({ where: { slug: rest.slug }, update: {}, create: { ...rest, specs: {}, categoryId: catMap[categorySlug] } })
    }
    return NextResponse.json({ success: true, message: `Seeded ${products.length} products` })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
