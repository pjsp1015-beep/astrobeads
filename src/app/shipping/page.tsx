export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light text-brand-900 mb-6">Shipping Policy</h1>
      <div className="space-y-8 text-gray-600">
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Processing Time</h2><p>All orders are processed within 1–2 business days. Orders placed on weekends or public holidays are processed the next business day.</p></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Delivery Times</h2><ul className="space-y-2"><li>🇮🇳 Within India: 3–5 business days</li><li>🌍 International: 7–14 business days</li><li>⚡ Express delivery available at checkout</li></ul></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Shipping Charges</h2><ul className="space-y-2"><li>Free shipping on orders above ₹2,000 within India</li><li>Standard shipping: ₹99 for orders below ₹2,000</li><li>International shipping calculated at checkout</li></ul></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Packaging</h2><p>All gemstones are shipped in secure, padded jewellery boxes with tamper-proof seals. Certificates are included separately in protective sleeves.</p></div>
        <div><h2 className="text-xl font-medium text-brand-900 mb-3">Tracking</h2><p>You will receive a tracking number via email once your order is shipped. Track your order at <a href="/track" className="text-brand-500 underline">Track My Order</a>.</p></div>
      </div>
    </div>
  )
}
