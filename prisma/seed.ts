import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.category.upsert({ where: { slug: 'gemstones' }, update: {}, create: { name: 'Gemstones', slug: 'gemstones', emoji: '💎' } })
  await prisma.category.upsert({ where: { slug: 'rudraksha' }, update: {}, create: { name: 'Rudraksha', slug: 'rudraksha', emoji: '📿' } })
  await prisma.category.upsert({ where: { slug: 'bracelets' }, update: {}, create: { name: 'Bracelets', slug: 'bracelets', emoji: '🪬' } })
  await prisma.category.upsert({ where: { slug: 'pendants' }, update: {}, create: { name: 'Pendants', slug: 'pendants', emoji: '🔮' } })
  console.log('Seeded categories')
}

main().catch(console.error).finally(() => prisma.$disconnect())
