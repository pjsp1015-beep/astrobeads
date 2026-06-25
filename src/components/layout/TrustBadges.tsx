// src/components/layout/TrustBadges.tsx
export function TrustBadges() {
  const badges = [
    { emoji: 'Lab', label: 'Lab certified', sub: 'GII · GRS · AGL' },
    { emoji: 'Nat', label: 'Natural & unheated', sub: 'No treatments' },
    { emoji: 'Rud', label: 'Original rudraksha', sub: 'Nepal & Java' },
    { emoji: 'Shi', label: 'Free shipping', sub: 'Orders above 10,000' },
    { emoji: 'Ret', label: '30-day returns', sub: 'Hassle free' },
  ]

  return (
    <div className="border-y border-gray-100 bg-white py-5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-around gap-4">
          {badges.map(({ emoji, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
                {emoji}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
