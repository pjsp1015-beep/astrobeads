'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  stock: number
  tag: string
  certified: boolean
  active: boolean
  origin: string
  weight: number
  category: { name: string }
}

interface Stats {
  totalProducts: number
  totalCategories: number
  lowStock: number
  outOfStock: number
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, totalCategories: 0, lowStock: 0, outOfStock: 0 })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'add'>('dashboard')
  const [msg, setMsg] = useState('')

  const [form, setForm] = useState({
    name: '', slug: '', description: '', price: '', weight: '', origin: '',
    tag: 'Precious', categorySlug: 'precious', stock: '', certified: false,
    certificate: '', treatment: 'None', bgColor: '#f5f0ff',
  })

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/products')
      const d = await r.json()
      if (d.success) {
        setProducts(d.data.products)
        setStats(d.data.stats)
      }
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch('/api/admin/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, active: !active })
    })
    fetchData()
  }

  async function deleteProduct(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchData()
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault()
    setMsg('')
    const r = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        weight: parseFloat(form.weight) || 0,
        stock: parseInt(form.stock) || 0,
        emoji: form.tag === 'Rudraksha' ? 'Rudraksha' : form.tag === 'Jewellery' ? 'Jewellery' : 'Gem',
        specs: {},
      })
    })
    const d = await r.json()
    if (d.success) {
      setMsg('Product added successfully!')
      setForm({ name:'', slug:'', description:'', price:'', weight:'', origin:'', tag:'Precious', categorySlug:'precious', stock:'', certified:false, certificate:'', treatment:'None', bgColor:'#f5f0ff' })
      fetchData()
      setActiveTab('products')
    } else {
      setMsg('Error: ' + d.error)
    }
  }

  const statusColor = (stock: number) =>
    stock === 0 ? 'bg-red-50 text-red-700' : stock <= 3 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
  const statusLabel = (stock: number) =>
    stock === 0 ? 'Out of stock' : stock <= 3 ? 'Low stock' : 'In stock'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-brand-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-medium text-gold-400">Astro Beads & Gems</h1>
          <p className="text-xs text-white/60">Admin Panel</p>
        </div>
        <Link href="/" className="text-sm text-white/70 hover:text-white">← Back to site</Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {(['dashboard','products','add'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors -mb-px ${activeTab === tab ? 'border-brand-500 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab === 'add' ? '+ Add Product' : tab}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-light mb-6">Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total products', value: stats.totalProducts, color: 'text-brand-600' },
                { label: 'Categories', value: stats.totalCategories, color: 'text-teal-600' },
                { label: 'Low stock', value: stats.lowStock, color: 'text-amber-600' },
                { label: 'Out of stock', value: stats.outOfStock, color: 'text-red-600' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white rounded-xl p-5 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">{label}</p>
                  <p className={`text-3xl font-medium ${color}`}>{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-medium mb-4">Quick actions</h3>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => setActiveTab('add')} className="btn-gold">+ Add new product</button>
                <button onClick={() => setActiveTab('products')} className="btn-outline">View all products</button>
                <Link href="/catalog" className="btn-outline">View live catalog</Link>
              </div>
            </div>
          </div>
        )}

        {/* Products list */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light">All Products <span className="text-gray-400 text-lg">({products.length})</span></h2>
              <button onClick={() => setActiveTab('add')} className="btn-gold">+ Add product</button>
            </div>
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading...</div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Product','Category','Price','Stock','Status','Active','Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-sm text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-400">{p.origin} · {p.weight > 0 ? p.weight + ' ct' : 'N/A'}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{p.category?.name}</td>
                        <td className="px-4 py-3 text-sm font-medium">₹{p.price.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-sm">{p.stock}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(p.stock)}`}>
                            {statusLabel(p.stock)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleActive(p.id, p.active)}
                            className={`w-10 h-5 rounded-full transition-colors relative ${p.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${p.active ? 'translate-x-5' : 'translate-x-0.5'}`}/>
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => deleteProduct(p.id, p.name)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add product form */}
        {activeTab === 'add' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-light mb-6">Add New Product</h2>
            {msg && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${msg.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {msg}
              </div>
            )}
            <form onSubmit={addProduct} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Product name *</label>
                  <input className="input" required value={form.name} onChange={e => {
                    const name = e.target.value
                    const slug = name.toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,'-')
                    setForm({...form, name, slug})
                  }} placeholder="e.g. Natural Ruby (Manik)"/>
                </div>
                <div>
                  <label className="label">Slug (auto-generated)</label>
                  <input className="input bg-gray-50" value={form.slug} onChange={e => setForm({...form, slug:e.target.value})} placeholder="natural-ruby-manik"/>
                </div>
              </div>

              <div>
                <label className="label">Description *</label>
                <textarea className="input h-24 resize-none" required value={form.description} onChange={e => setForm({...form, description:e.target.value})} placeholder="Describe the gemstone, its astrological benefits, quality..."/>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label">Price (₹ per carat) *</label>
                  <input className="input" type="number" required value={form.price} onChange={e => setForm({...form, price:e.target.value})} placeholder="12500"/>
                </div>
                <div>
                  <label className="label">Weight (carats)</label>
                  <input className="input" type="number" step="0.1" value={form.weight} onChange={e => setForm({...form, weight:e.target.value})} placeholder="2.5"/>
                </div>
                <div>
                  <label className="label">Stock quantity *</label>
                  <input className="input" type="number" required value={form.stock} onChange={e => setForm({...form, stock:e.target.value})} placeholder="5"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Origin *</label>
                  <input className="input" required value={form.origin} onChange={e => setForm({...form, origin:e.target.value})} placeholder="Burma, Sri Lanka, India..."/>
                </div>
                <div>
                  <label className="label">Category *</label>
                  <select className="input" value={form.categorySlug} onChange={e => {
                    const s = e.target.value
                    const tagMap: Record<string,string> = {precious:'Precious','semi-precious':'Semi-Precious',rudraksha:'Rudraksha',jewellery:'Jewellery',organic:'Organic'}
                    setForm({...form, categorySlug:s, tag:tagMap[s]||'Precious'})
                  }}>
                    <option value="precious">Precious Gems</option>
                    <option value="semi-precious">Semi-Precious</option>
                    <option value="rudraksha">Rudraksha</option>
                    <option value="jewellery">Jewellery</option>
                    <option value="organic">Organic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Treatment</label>
                  <select className="input" value={form.treatment} onChange={e => setForm({...form, treatment:e.target.value})}>
                    <option>None</option>
                    <option>Minor Oil</option>
                    <option>Heating</option>
                    <option>Irradiation</option>
                    <option>Filling</option>
                  </select>
                </div>
                <div>
                  <label className="label">Card background colour</label>
                  <div className="flex gap-2">
                    <input type="color" value={form.bgColor} onChange={e => setForm({...form, bgColor:e.target.value})} className="h-10 w-14 rounded border border-gray-200 cursor-pointer"/>
                    <input className="input flex-1" value={form.bgColor} onChange={e => setForm({...form, bgColor:e.target.value})}/>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.certified} onChange={e => setForm({...form, certified:e.target.checked})} className="w-4 h-4 accent-brand-500"/>
                  <span className="text-sm font-medium">Lab certified</span>
                </label>
                {form.certified && (
                  <input className="input flex-1" value={form.certificate} onChange={e => setForm({...form, certificate:e.target.value})} placeholder="Certificate authority (e.g. GII, GRS, AGL)"/>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-gold">Add product</button>
                <button type="button" onClick={() => setActiveTab('products')} className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
