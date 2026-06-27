const faqs = [
  { q: "Are your gemstones certified?", a: "Yes, all our gemstones come with certificates from recognised laboratories including GIA, IGI, and GRS. Certificates are included with every purchase." },
  { q: "How do I know which gemstone is right for me?", a: "Take our free Vedic Gem Quiz or contact our astrology experts. We recommend gemstones based on your birth chart (Rashi), life goals, and current planetary positions." },
  { q: "Are the gemstones natural or synthetic?", a: "All our gemstones are 100% natural. We clearly mention any treatments (like heating) in the product description. We never sell synthetic or lab-grown stones." },
  { q: "What is your return policy?", a: "We offer a 7-day return policy from the date of delivery. The gemstone must be in its original condition with the certificate intact. See our Return Policy for details." },
  { q: "Do you offer EMI options?", a: "Yes, EMI is available on orders above ₹5,000 through major credit cards and Razorpay. Options are shown at checkout." },
  { q: "How should I wear my gemstone?", a: "Each product page includes wearing instructions. Generally, gemstones should be energised before wearing. Our experts can guide you on the correct finger, metal, and auspicious time." },
  { q: "Do you ship internationally?", a: "Yes, we ship worldwide. International orders take 7–14 business days. Customs duties may apply depending on your country." },
  { q: "Can I get a personalised consultation?", a: "Yes! Contact us on WhatsApp or email for a personalised Vedic astrology consultation. We analyse your birth chart and recommend the most beneficial gemstone." },
]
export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-light text-brand-900 mb-4">Frequently Asked Questions</h1>
      <p className="text-gray-500 mb-12">Everything you need to know about our gemstones and services.</p>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-6">
            <h3 className="font-medium text-brand-900 mb-2">Q: {faq.q}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
