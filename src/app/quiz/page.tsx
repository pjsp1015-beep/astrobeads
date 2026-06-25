// src/app/quiz/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

const QUESTIONS = [
  {
    question: 'What is your main purpose for the gemstone?',
    sub: 'Choose the one that resonates most',
    options: [
      { icon: '🌟', label: 'Astrological benefits' },
      { icon: '💍', label: 'Jewellery & fashion' },
      { icon: '🧘', label: 'Healing & wellness' },
      { icon: '💰', label: 'Investment' },
    ],
  },
  {
    question: "Which planet's energy would you like to attract?",
    sub: 'Based on Vedic astrology',
    options: [
      { icon: '☀️', label: 'Sun — confidence & authority' },
      { icon: '🌙', label: 'Moon — peace & intuition' },
      { icon: '♂️', label: 'Mars — energy & courage' },
      { icon: '♃', label: 'Jupiter — wisdom & prosperity' },
    ],
  },
  {
    question: 'What is your budget?',
    sub: 'Total for the gemstone',
    options: [
      { icon: '💵', label: 'Under ₹5,000' },
      { icon: '💴', label: '₹5,000 – ₹25,000' },
      { icon: '💶', label: '₹25,000 – ₹1 Lakh' },
      { icon: '💷', label: 'Above ₹1 Lakh' },
    ],
  },
  {
    question: 'Which colour draws you most?',
    sub: 'Trust your instinct',
    options: [
      { icon: '🔴', label: 'Red & warm tones' },
      { icon: '💙', label: 'Blue & cool tones' },
      { icon: '💚', label: 'Green & earthy tones' },
      { icon: '🟣', label: 'Purple & mystical tones' },
    ],
  },
]

const RESULTS = [
  { gem: '💎', name: 'Blue Sapphire (Neelam)', slug: 'blue-sapphire-neelam', desc: 'Your answers align strongly with Blue Sapphire. Saturn\'s gem enhances discipline, focus, and career growth. Ideal for professionals seeking clarity and success.' },
  { gem: '🔴', name: 'Ruby (Manik)', slug: 'natural-ruby-manik', desc: 'Ruby aligns perfectly with your energy. The Sun stone brings confidence, leadership, and vitality. A Burma ruby with pigeon blood colour is most effective.' },
  { gem: '💚', name: 'Emerald (Panna)', slug: 'colombian-emerald-panna', desc: 'Emerald resonates with your choices. Mercury\'s gem enhances communication, intelligence, and business. A Colombian emerald from Muzo mines is recommended.' },
  { gem: '⭐', name: 'Yellow Sapphire (Pukhraj)', slug: 'yellow-sapphire-pukhraj', desc: 'Yellow Sapphire is your ideal match. Jupiter\'s gem brings wisdom, prosperity, and good fortune. An unheated Ceylon sapphire is most auspicious.' },
]

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const handleAnswer = (i: number) => {
    const newAnswers = [...answers, i]
    setAnswers(newAnswers)
    if (step < QUESTIONS.length - 1) setStep(step + 1)
    else setDone(true)
  }

  const reset = () => { setStep(0); setAnswers([]); setDone(false) }

  const result = RESULTS[answers[0] % RESULTS.length] ?? RESULTS[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-amber-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[3px] uppercase text-brand-500 mb-2">Astro gem quiz</p>
          <h1 className="text-3xl font-light">Find your perfect gemstone</h1>
          <p className="text-gray-500 mt-2 text-sm">Answer 4 questions for a personalised recommendation</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {!done ? (
            <div key={step} className="animate-fade-in">
              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-brand-500' : 'bg-gray-100'}`}
                  />
                ))}
              </div>

              <p className="text-xl font-medium mb-1">{QUESTIONS[step].question}</p>
              <p className="text-sm text-gray-400 mb-6">{QUESTIONS[step].sub}</p>

              <div className="grid grid-cols-2 gap-3">
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="flex items-center gap-3 p-4 border-2 border-gray-100 rounded-xl text-left hover:border-brand-400 hover:bg-brand-50 transition-all text-sm font-medium"
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-400 text-center mt-6">
                Question {step + 1} of {QUESTIONS.length}
              </p>
            </div>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="text-7xl mb-4">{result.gem}</div>
              <p className="text-xs tracking-[3px] uppercase text-brand-500 mb-2">Your recommended gem</p>
              <h2 className="text-2xl font-medium mb-4">{result.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto">{result.desc}</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href={`/product/${result.slug}`} className="btn-gold px-8 py-4">
                  View this gem →
                </Link>
                <button onClick={reset} className="btn-outline px-8 py-4">
                  Retake quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
