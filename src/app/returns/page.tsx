export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light text-brand-900 mb-4">Return Policy</h1>
      <div className="space-y-8 text-gray-600">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6"><p className="text-green-800 font-medium">✅ 7-Day Easy Returns</p><p className="text-green-700 text-sm mt-1">We offer hassle-free returns within 7 days of delivery.</p></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Eligibility</h2><ul className="space-y-2 text-sm"><li>✓ Item returned within 7 days of delivery</li><li>✓ Original packaging intact</li><li>✓ Gemstone certificate included</li><li>✓ No signs of wear or damage</li></ul></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Non-Returnable Items</h2><ul className="space-y-2 text-sm"><li>✗ Custom-made or engraved jewellery</li><li>✗ Items damaged after delivery</li><li>✗ Items without original certificate</li></ul></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Refund Process</h2><p className="text-sm">Once we receive and inspect your return, refunds are processed within 5–7 business days to your original payment method.</p></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">How to Return</h2><p className="text-sm">Contact us at info@astrobeads.in or WhatsApp with your order number. We will arrange a pickup from your address.</p></div>
      </div>
    </div>
  )
}
