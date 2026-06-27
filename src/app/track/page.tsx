export default function TrackPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-light text-brand-900 mb-4">Track My Order</h1>
      <p className="text-gray-500 mb-10">Enter your order number or tracking ID to check your delivery status.</p>
      <div className="bg-gray-50 rounded-2xl p-8">
        <input type="text" placeholder="Order number (e.g. AB1234567890)" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-400 mb-4"/>
        <button className="w-full bg-brand-600 text-white py-3 rounded-lg text-sm hover:bg-brand-700 transition-colors">Track order</button>
        <p className="text-xs text-gray-400 mt-4">Or check your email for the tracking link sent after shipping.</p>
      </div>
      <p className="text-sm text-gray-500 mt-8">Need help? <a href="/contact" className="text-brand-500 underline">Contact us</a></p>
    </div>
  )
}
