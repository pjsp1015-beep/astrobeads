import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const categories = [
  { name: 'Gemstones', slug: 'gemstones', emoji: '💎' },
  { name: 'Rudraksha', slug: 'rudraksha', emoji: '📿' },
  { name: 'Healing Stones', slug: 'healing-stones', emoji: '🔮' },
  { name: 'Pearls', slug: 'pearls', emoji: '⚪' },
  { name: 'Beads & Bracelets', slug: 'beads-bracelets', emoji: '🪬' },
  { name: 'Jewellery', slug: 'jewellery', emoji: '💍' },
]

const products = [
  // GEMSTONES
  { name: 'Blue Sapphire (Neelam)', slug: 'natural-blue-sapphire', description: 'Certified natural blue sapphire from Sri Lanka. Saturn\'s gem for career, discipline and success.', price: 4500, weight: 3.25, origin: 'Sri Lanka', emoji: '💙', bgColor: '#e8f0fe', categorySlug: 'gemstones', tag: 'Best Seller', certified: true, treatment: 'Unheated', stock: 10 },
  { name: 'Yellow Sapphire (Pukhraj)', slug: 'yellow-sapphire-pukhraj', description: 'Natural yellow sapphire for Jupiter blessings. Brings wisdom, prosperity and good fortune.', price: 3800, weight: 2.80, origin: 'Sri Lanka', emoji: '💛', bgColor: '#fffde7', categorySlug: 'gemstones', tag: 'Top Rated', certified: true, treatment: 'Unheated', stock: 8 },
  { name: 'Ruby (Manik)', slug: 'ruby-manik', description: 'Burmese ruby for Sun energy. Enhances confidence, leadership and vitality.', price: 6500, weight: 2.10, origin: 'Burma', emoji: '❤️', bgColor: '#fce4ec', categorySlug: 'gemstones', tag: 'Premium', certified: true, treatment: 'Heated', stock: 5 },
  { name: 'Emerald (Panna)', slug: 'emerald-panna', description: 'Colombian emerald for Mercury. Improves communication, intelligence and business success.', price: 5200, weight: 2.50, origin: 'Colombia', emoji: '💚', bgColor: '#e8f5e9', categorySlug: 'gemstones', tag: 'New', certified: true, treatment: 'Oiled', stock: 7 },
  { name: 'Red Coral (Moonga)', slug: 'red-coral-moonga', description: 'Italian red coral for Mars energy. Boosts courage, health and overcomes obstacles.', price: 1800, weight: 5.00, origin: 'Italy', emoji: '🪸', bgColor: '#fbe9e7', categorySlug: 'gemstones', tag: 'Popular', certified: true, treatment: 'None', stock: 15 },
  { name: 'Hessonite (Gomed)', slug: 'hessonite-gomed', description: 'Hessonite garnet for Rahu. Removes confusion, obstacles and brings clarity.', price: 2100, weight: 3.80, origin: 'Sri Lanka', emoji: '🟤', bgColor: '#efebe9', categorySlug: 'gemstones', tag: 'Effective', certified: true, treatment: 'None', stock: 12 },
  { name: "Cat's Eye (Lehsunia)", slug: 'cats-eye-lehsunia', description: "Chrysoberyl cat's eye for Ketu. Protection from negative energy and spiritual growth.", price: 3200, weight: 3.00, origin: 'Sri Lanka', emoji: '👁️', bgColor: '#f9fbe7', categorySlug: 'gemstones', tag: 'Rare', certified: true, treatment: 'None', stock: 6 },
  { name: 'White Sapphire', slug: 'white-sapphire', description: 'Natural white sapphire — alternative to diamond for Venus. Enhances beauty and relationships.', price: 2800, weight: 2.20, origin: 'Sri Lanka', emoji: '🤍', bgColor: '#f3f4f6', categorySlug: 'gemstones', tag: 'Venus Gem', certified: true, treatment: 'Unheated', stock: 9 },
  { name: 'Blue Topaz', slug: 'blue-topaz', description: 'Natural blue topaz for communication and self-expression. Calming and clarity-enhancing.', price: 1200, weight: 4.50, origin: 'Brazil', emoji: '🔷', bgColor: '#e0f2fe', categorySlug: 'gemstones', tag: 'Affordable', certified: true, treatment: 'Irradiated', stock: 20 },

  // RUDRAKSHA
  { name: '5 Mukhi Rudraksha', slug: '5-mukhi-rudraksha', description: 'Five-faced rudraksha representing Lord Shiva. Most popular for peace, health and general wellbeing.', price: 450, weight: 8.00, origin: 'Nepal', emoji: '📿', bgColor: '#fff8e1', categorySlug: 'rudraksha', tag: 'Most Popular', certified: true, treatment: 'None', stock: 50 },
  { name: '1 Mukhi Rudraksha', slug: '1-mukhi-rudraksha', description: 'Rare single-faced rudraksha — rarest of all. For supreme consciousness, moksha and Sun energy.', price: 8500, weight: 5.00, origin: 'Nepal', emoji: '🙏', bgColor: '#fce4ec', categorySlug: 'rudraksha', tag: 'Rare & Sacred', certified: true, treatment: 'None', stock: 3 },
  { name: '2 Mukhi Rudraksha', slug: '2-mukhi-rudraksha', description: 'Two-faced rudraksha for Moon energy. Brings unity, harmony in relationships and emotional balance.', price: 650, weight: 7.00, origin: 'Nepal', emoji: '☯️', bgColor: '#e8eaf6', categorySlug: 'rudraksha', tag: 'Harmony', certified: true, treatment: 'None', stock: 25 },
  { name: '7 Mukhi Rudraksha', slug: '7-mukhi-rudraksha', description: 'Seven-faced rudraksha for Mahalakshmi. Brings wealth, prosperity and removes financial obstacles.', price: 1200, weight: 7.50, origin: 'Nepal', emoji: '🌟', bgColor: '#fffde7', categorySlug: 'rudraksha', tag: 'Wealth', certified: true, treatment: 'None', stock: 18 },
  { name: 'Rudraksha Mala 108 Beads', slug: 'rudraksha-sphatik-mala', description: '108-bead original Nepal rudraksha mala. Essential for meditation, japa and daily spiritual practice.', price: 1100, weight: 45.00, origin: 'Nepal', emoji: '📿', bgColor: '#e8f5e9', categorySlug: 'rudraksha', tag: 'Meditation', certified: false, treatment: 'None', stock: 20 },
  { name: 'Gauri Shankar Rudraksha', slug: 'gauri-shankar-rudraksha', description: 'Two naturally joined rudraksha beads representing Shiva-Parvati union. For love and family harmony.', price: 2200, weight: 10.00, origin: 'Nepal', emoji: '💑', bgColor: '#fce4ec', categorySlug: 'rudraksha', tag: 'Marriage', certified: true, treatment: 'None', stock: 8 },

  // HEALING STONES
  { name: 'Amethyst (Katela)', slug: 'amethyst-katela', description: 'Natural amethyst for calm, clarity and spiritual awareness. Excellent for meditation and stress relief.', price: 650, weight: 12.00, origin: 'Brazil', emoji: '💜', bgColor: '#f3e5f5', categorySlug: 'healing-stones', tag: 'Calming', certified: false, treatment: 'None', stock: 25 },
  { name: 'Rose Quartz', slug: 'rose-quartz-stone', description: 'Natural rose quartz — stone of unconditional love. Opens heart chakra and attracts love and healing.', price: 480, weight: 15.00, origin: 'Brazil', emoji: '🌸', bgColor: '#fce4ec', categorySlug: 'healing-stones', tag: 'Love Stone', certified: false, treatment: 'None', stock: 40 },
  { name: 'Black Tourmaline', slug: 'black-tourmaline-stone', description: 'Powerful protection stone. Shields from negative energy, EMF radiation and psychic attacks.', price: 550, weight: 14.00, origin: 'Brazil', emoji: '🖤', bgColor: '#eceff1', categorySlug: 'healing-stones', tag: 'Protection', certified: false, treatment: 'None', stock: 35 },
  { name: 'Lapis Lazuli (Lajward)', slug: 'lapis-lazuli', description: 'Royal blue lapis lazuli for truth, wisdom and inner power. Opens third eye and throat chakra.', price: 750, weight: 10.00, origin: 'Afghanistan', emoji: '🔵', bgColor: '#e3f2fd', categorySlug: 'healing-stones', tag: 'Wisdom', certified: false, treatment: 'None', stock: 22 },
  { name: 'Clear Quartz (Sphatik)', slug: 'clear-quartz-sphatik', description: 'Master healer crystal. Amplifies energy, enhances clarity and purifies surroundings.', price: 380, weight: 20.00, origin: 'Brazil', emoji: '🔮', bgColor: '#f5f5f5', categorySlug: 'healing-stones', tag: 'Master Healer', certified: false, treatment: 'None', stock: 50 },
  { name: 'Tiger\'s Eye', slug: 'tigers-eye', description: 'Tiger\'s eye for courage, confidence and good luck. Protects from evil eye and negative energies.', price: 420, weight: 12.00, origin: 'South Africa', emoji: '🐯', bgColor: '#fff8e1', categorySlug: 'healing-stones', tag: 'Courage', certified: false, treatment: 'None', stock: 30 },
  { name: 'Green Aventurine', slug: 'green-aventurine', description: 'Stone of opportunity and good luck. Attracts prosperity, success and new opportunities.', price: 350, weight: 15.00, origin: 'India', emoji: '🟢', bgColor: '#e8f5e9', categorySlug: 'healing-stones', tag: 'Lucky Stone', certified: false, treatment: 'None', stock: 45 },
  { name: 'Labradorite', slug: 'labradorite', description: 'Mystical labradorite with stunning play of colours. Enhances intuition and magical abilities.', price: 680, weight: 11.00, origin: 'Madagascar', emoji: '🌈', bgColor: '#e8eaf6', categorySlug: 'healing-stones', tag: 'Mystical', certified: false, treatment: 'None', stock: 18 },

  // PEARLS
  { name: 'South Sea Pearl (Moti)', slug: 'pearl-moti', description: 'Certified South Sea pearl for Moon energy. Brings emotional balance, peace and intuition.', price: 1200, weight: 4.20, origin: 'South Sea', emoji: '⚪', bgColor: '#f3e5f5', categorySlug: 'pearls', tag: 'Moon Gem', certified: true, treatment: 'None', stock: 20 },
  { name: 'Basra Pearl', slug: 'basra-pearl', description: 'Rare natural Basra pearl from the Persian Gulf. Most auspicious for Vedic astrology purposes.', price: 8500, weight: 3.50, origin: 'Basra', emoji: '🤍', bgColor: '#fafafa', categorySlug: 'pearls', tag: 'Rare', certified: true, treatment: 'None', stock: 5 },
  { name: 'Keshi Pearl', slug: 'keshi-pearl', description: 'Natural keshi pearl — formed without nucleus. Irregular shape with high lustre and purity.', price: 2200, weight: 3.80, origin: 'Japan', emoji: '🫧', bgColor: '#f0f4ff', categorySlug: 'pearls', tag: 'Natural', certified: true, treatment: 'None', stock: 12 },
  { name: 'Pearl Bracelet', slug: 'pearl-bracelet', description: 'Elegant freshwater pearl bracelet. Perfect for wearing as Moon gem remedy or fashion jewellery.', price: 1800, weight: 25.00, origin: 'China', emoji: '📿', bgColor: '#fce4ec', categorySlug: 'pearls', tag: 'Elegant', certified: false, treatment: 'None', stock: 15 },

  // BEADS & BRACELETS
  { name: 'Rudraksha Bracelet 8mm', slug: 'rudraksha-bracelet-8mm', description: 'Hand-knotted 8mm Nepal rudraksha bracelet with silver spacers. For daily wear protection and peace.', price: 850, weight: 15.00, origin: 'Nepal', emoji: '🪬', bgColor: '#e8eaf6', categorySlug: 'beads-bracelets', tag: 'Daily Wear', certified: false, treatment: 'None', stock: 30 },
  { name: 'Amethyst Bracelet', slug: 'amethyst-bracelet', description: 'Natural amethyst bead bracelet for calm, clarity and spiritual awareness. 8mm premium beads.', price: 650, weight: 12.00, origin: 'Brazil', emoji: '💜', bgColor: '#f3e5f5', categorySlug: 'beads-bracelets', tag: 'Calming', certified: false, treatment: 'None', stock: 25 },
  { name: 'Black Tourmaline Bracelet', slug: 'black-tourmaline-bracelet', description: 'Protective black tourmaline bead bracelet. Shields from negative energy and EMF radiation.', price: 550, weight: 14.00, origin: 'Brazil', emoji: '🖤', bgColor: '#eceff1', categorySlug: 'beads-bracelets', tag: 'Protection', certified: false, treatment: 'None', stock: 35 },
  { name: 'Tiger Eye Bracelet', slug: 'tiger-eye-bracelet', description: 'Tiger\'s eye bead bracelet for confidence and good luck. Ideal for students and professionals.', price: 480, weight: 13.00, origin: 'South Africa', emoji: '🐯', bgColor: '#fff8e1', categorySlug: 'beads-bracelets', tag: 'Lucky', certified: false, treatment: 'None', stock: 28 },
  { name: 'Rose Quartz Bracelet', slug: 'rose-quartz-bracelet', description: 'Rose quartz bead bracelet for love and emotional healing. Opens the heart chakra.', price: 420, weight: 11.00, origin: 'Brazil', emoji: '🌸', bgColor: '#fce4ec', categorySlug: 'beads-bracelets', tag: 'Love', certified: false, treatment: 'None', stock: 32 },
  { name: 'Lava Stone Bracelet', slug: 'lava-stone-bracelet', description: 'Natural lava stone bracelet for grounding and strength. Can be used with essential oils.', price: 380, weight: 16.00, origin: 'Indonesia', emoji: '🌋', bgColor: '#37474f', categorySlug: 'beads-bracelets', tag: 'Grounding', certified: false, treatment: 'None', stock: 40 },
  { name: '7 Chakra Bracelet', slug: '7-chakra-bracelet', description: '7 natural gemstone beads representing all chakras. Balances energy and promotes overall wellbeing.', price: 750, weight: 14.00, origin: 'India', emoji: '🌈', bgColor: '#f3e5f5', categorySlug: 'beads-bracelets', tag: 'Chakra', certified: false, treatment: 'None', stock: 22 },

  // JEWELLERY
  { name: 'Blue Sapphire Silver Pendant', slug: 'blue-sapphire-silver-pendant', description: 'Sterling silver pendant with certified blue sapphire. Elegant Vedic jewellery for Saturn remedy.', price: 3200, weight: 4.50, origin: 'Sri Lanka', emoji: '🔮', bgColor: '#e3f2fd', categorySlug: 'jewellery', tag: 'Elegant', certified: true, treatment: 'Unheated', stock: 8 },
  { name: 'Rose Quartz Heart Pendant', slug: 'rose-quartz-pendant', description: 'Natural rose quartz heart pendant in sterling silver. Symbol of love and compassion.', price: 480, weight: 6.00, origin: 'Brazil', emoji: '💝', bgColor: '#fce4ec', categorySlug: 'jewellery', tag: 'Love & Healing', certified: false, treatment: 'None', stock: 40 },
  { name: 'Ruby Gold Ring', slug: 'ruby-gold-ring', description: 'Natural ruby set in 22k gold ring. Astrologically energised for Sun remedy and confidence.', price: 12500, weight: 3.00, origin: 'Burma', emoji: '💍', bgColor: '#fce4ec', categorySlug: 'jewellery', tag: 'Premium', certified: true, treatment: 'Heated', stock: 4 },
  { name: 'Rudraksha Pendant Silver', slug: 'rudraksha-pendant-silver', description: 'Five mukhi rudraksha in sterling silver pendant capping. Sacred and stylish daily wear.', price: 950, weight: 8.00, origin: 'Nepal', emoji: '🙏', bgColor: '#fff8e1', categorySlug: 'jewellery', tag: 'Sacred', certified: true, treatment: 'None', stock: 20 },
  { name: 'Emerald Silver Ring', slug: 'emerald-silver-ring', description: 'Natural emerald set in 925 silver ring for Mercury remedy. For communication and business success.', price: 4800, weight: 2.80, origin: 'Colombia', emoji: '💚', bgColor: '#e8f5e9', categorySlug: 'jewellery', tag: 'Mercury Gem', certified: true, treatment: 'Oiled', stock: 6 },
  { name: 'Navratna Pendant', slug: 'navratna-pendant', description: 'All 9 Vedic gemstones in one gold pendant. Harnesses power of all planets simultaneously.', price: 18500, weight: 5.00, origin: 'India', emoji: '✨', bgColor: '#fffde7', categorySlug: 'jewellery', tag: 'Auspicious', certified: true, treatment: 'None', stock: 3 },
]

export async function GET() {
  try {
    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name, emoji: cat.emoji },
        create: { name: cat.name, slug: cat.slug, emoji: cat.emoji },
      })
    }
    const cats = await prisma.category.findMany()
    const catMap: Record<string, string> = Object.fromEntries(
      cats.map((c: { slug: string; id: string }) => [c.slug, c.id])
    )
    for (const p of products) {
      await prisma.product.upsert({
        where: { slug: p.slug },
        update: {},
        create: {
          name: p.name,
          slug: p.slug,
          description: p.description,
          price: p.price,
          weight: p.weight,
          origin: p.origin,
          emoji: p.emoji,
          bgColor: p.bgColor,
          tag: p.tag,
          certified: p.certified,
          treatment: p.treatment,
          stock: p.stock,
          specs: {},
          categoryId: catMap[p.categorySlug],
        },
      })
    }
    return NextResponse.json({ success: true, message: `Seeded ${products.length} products across ${categories.length} categories` })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}