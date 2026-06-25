# GemPandit — Gemstone E-commerce

A full-stack gemstone e-commerce website built with Next.js 14, Tailwind CSS, Prisma, and PostgreSQL.

## Tech stack

| Layer       | Technology                              |
|-------------|----------------------------------------|
| Frontend    | Next.js 14 (App Router) + React 18     |
| Styling     | Tailwind CSS + custom gem theme        |
| Database    | PostgreSQL via Prisma ORM              |
| Auth        | NextAuth.js (Phase 3)                  |
| Payments    | Razorpay (Phase 4)                     |
| State       | Zustand (cart, UI)                     |
| Hosting     | Vercel + Supabase (Phase 5)            |

## Project structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── catalog/page.tsx    # Product listing with filters
│   ├── product/[slug]/     # Product detail
│   ├── quiz/page.tsx       # Astrology gem quiz
│   ├── admin/              # Admin panel (Phase 3+)
│   ├── checkout/           # Checkout flow (Phase 4)
│   └── api/                # API routes
│       ├── products/
│       ├── orders/
│       └── auth/
├── components/
│   ├── layout/             # Navbar, Footer, AuthProvider
│   ├── product/            # ProductCard, CategoryGrid
│   ├── cart/               # CartDrawer
│   ├── quiz/               # QuizBanner
│   └── ui/                 # Toaster, shared UI
├── lib/
│   ├── prisma.ts           # DB client singleton
│   ├── utils.ts            # Helpers (formatPrice, cn, etc.)
│   └── store/
│       └── cart.ts         # Zustand cart store
├── types/                  # TypeScript interfaces
└── styles/
    └── globals.css         # Tailwind + custom CSS
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Seed data (12 gems)
```

## Setup (Phase 1)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Fill in your values — see .env.example for instructions
```

### 3. Set up Supabase (free tier)

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy the **Connection string (URI)** from Project Settings → Database
3. Paste it into `DATABASE_URL` in `.env.local`

### 4. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase
npm run db:push

# Seed with 12 gemstones + admin user
npm run db:seed
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## Admin login (after seeding)

```
Email:    admin@gempandit.com
Password: Admin@123
```

## What's included in Phase 1

- ✅ Homepage with hero, category grid, featured products
- ✅ Catalog page with category & sort filters
- ✅ Product detail page with specs
- ✅ Astrology gem quiz (4 questions → recommendation)
- ✅ Cart drawer with Zustand state (persists on refresh)
- ✅ Navbar with cart count badge
- ✅ Footer with links
- ✅ Trust badges (certified, shipping, returns)
- ✅ Complete Prisma schema (users, products, orders, addresses)
- ✅ Database seed with 12 real gemstones
- ✅ Products API route
- ✅ Custom Tailwind gem theme + CSS classes
- ✅ TypeScript types for entire app
- ✅ Price formatting in INR
- ✅ GST (3%) + shipping calculation

## Next phases

- **Phase 2** — Database queries, admin panel, product management
- **Phase 3** — NextAuth.js authentication (Google + email/password)
- **Phase 4** — Razorpay checkout, order management, email receipts
- **Phase 5** — Vercel deploy, Supabase production, domain, SEO

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db:generate  # Regenerate Prisma client after schema change
npm run db:push      # Push schema changes to database
npm run db:seed      # Reseed products and admin user
npm run db:studio    # Open Prisma Studio (visual DB editor)
```
