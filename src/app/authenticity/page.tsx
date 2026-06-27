export default function AuthenticityPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light text-brand-900 mb-4">Authenticity Guarantee</h1>
      <div className="space-y-8 text-gray-600">
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6"><p className="text-brand-900 font-medium text-lg">💎 100% Natural. 100% Certified. 100% Guaranteed.</p></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Our Promise</h2><p>Every gemstone sold by Astro Beads & Gems is natural, ethically sourced, and certified by internationally recognised gemological laboratories.</p></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Certification Partners</h2><div className="grid grid-cols-3 gap-4"><div className="border border-gray-200 rounded-xl p-4 text-center"><p className="font-bold text-brand-900">GIA</p><p className="text-xs text-gray-500 mt-1">Gemological Institute of America</p></div><div className="border border-gray-200 rounded-xl p-4 text-center"><p className="font-bold text-brand-900">IGI</p><p className="text-xs text-gray-500 mt-1">International Gemological Institute</p></div><div className="border border-gray-200 rounded-xl p-4 text-center"><p className="font-bold text-brand-900">GRS</p><p className="text-xs text-gray-500 mt-1">GemResearch Swisslab</p></div></div></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">If Not Satisfied</h2><p>If you have any doubts about the authenticity of your gemstone, we will arrange a third-party lab test at our cost. If found inauthentic, full refund + ₹5,000 compensation.</p></div>
      </div>
    </div>
  )
}
