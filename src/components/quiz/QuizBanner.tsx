// src/components/quiz/QuizBanner.tsx
import Link from 'next/link'

export function QuizBanner() {
  return (
    <section className="bg-brand-900 text-white py-16 px-4 text-center">
      <p className="text-xs tracking-[3px] uppercase text-gold-400 mb-3">Astrology · Vedic guidance</p>
      <h2 className="text-3xl font-light mb-4">
        Not sure which gemstone or Rudraksha is right for you?
      </h2>
      <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
        Take our 4-question Vedic astrology quiz and get a personalised recommendation from our experts.
      </p>
      <Link href="/quiz" className="btn-gold text-base px-8 py-4">
        Start the quiz →
      </Link>
    </section>
  )
}
