import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'Gemstones', slug: 'gemstones', emoji: '💎' },
    { name: 'Rudraksha', slug: 'rudraksha', emoji: '📿' },
    { name: 'Bracelets', slug: 'bracelets', emoji: '🪬' },
    { name: 'Pendants', slug: 'pendants', emoji: '🔮' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { name: cat.name, slug: cat.slug, emoji: cat.emoji },
    })
  }

  console.log('Seeded categories')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
