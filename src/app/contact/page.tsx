export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light text-brand-900 mb-4">Contact Us</h1>
      <p className="text-gray-500 mb-12">We are here to help. Reach us through any of the channels below.</p>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="font-medium text-brand-900 mb-2">📞 Phone / WhatsApp</h3>
            <a href="tel:+919999999999" className="text-gray-600 hover:text-brand-500">+91 99999 99999</a>
            <p className="text-sm text-gray-400 mt-1">Mon–Sat, 10am–7pm IST</p>
          </div>
          <div>
            <h3 className="font-medium text-brand-900 mb-2">✉️ Email</h3>
            <a href="mailto:info@astrobeads.in" className="text-gray-600 hover:text-brand-500">info@astrobeads.in</a>
            <p className="text-sm text-gray-400 mt-1">Response within 24 hours</p>
          </div>
          <div>
            <h3 className="font-medium text-brand-900 mb-2">📍 Address</h3>
            <p className="text-gray-600">Astro Beads & Gems<br/>New Delhi, India – 110001</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="font-medium text-brand-900 mb-6">Send us a message</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-400"/>
            <input type="email" placeholder="Email address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-400"/>
            <textarea placeholder="Your message" rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-400 resize-none"/>
            <button className="w-full bg-brand-600 text-white py-3 rounded-lg text-sm hover:bg-brand-700 transition-colors">Send message</button>
          </div>
        </div>
      </div>
    </div>
  )
}
