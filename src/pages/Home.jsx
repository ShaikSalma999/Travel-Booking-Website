import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { packages } from '../data/data'
import PackageCard from '../components/PackageCard'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/destinations?q=${encodeURIComponent(query.trim())}`)
  }

  const popular = [...packages].sort((a, b) => b.rating - a.rating).slice(0, 4)
  const curated = [...packages].sort((a, b) => a.price - b.price).slice(0, 3)

  return (
    <div>
      <section className="relative text-white bg-[#12263a]">
        <img src="/images/swiss.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12263a]/90 via-[#12263a]/60 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-36">
          <h1 className="font-display text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
            Pick a place. We'll handle the rest.
          </h1>
          <p className="mt-4 text-slate-300 max-w-xl">Hand-built itineraries across India and abroad, priced in rupees with no surprises at checkout.</p>
          <form onSubmit={handleSearch} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-xl">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try Goa, Bali, Ladakh…"
              className="flex-1 rounded-lg px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-amber-400" />
            <button className="bg-amber-400 text-[#12263a] font-bold px-6 py-3 rounded-lg hover:bg-amber-300">Search trips</button>
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg grid grid-cols-3 text-center py-5">
          {[['8+', 'Curated trips'], ['4.7★', 'Average rating'], ['₹0', 'Hidden fees']].map(([n, l]) => (
            <div key={l}><p className="font-display text-2xl font-bold text-[#0f766e]">{n}</p><p className="text-xs text-slate-500">{l}</p></div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-2xl font-bold">Popular destinations</h2>
          <Link to="/destinations" className="text-sm text-[#0f766e] font-medium hover:underline">See all trips</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popular.map((p) => <PackageCard key={p.id} pkg={p} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="font-display text-2xl font-bold mb-1">Best-value packages</h2>
        <p className="text-slate-600 mb-5 text-sm">Our lowest-priced trips, flights not included.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {curated.map((p) => <PackageCard key={p.id} pkg={p} />)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="relative rounded-3xl overflow-hidden text-white">
          <img src="/images/ladakh.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative px-6 py-14 md:px-14 text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold max-w-lg">The road is calling. Answer it.</h2>
            <p className="mt-2 text-slate-200 max-w-md">Browse every package and filter by budget, trip length or style.</p>
            <Link to="/destinations" className="inline-block mt-6 bg-amber-400 text-[#12263a] font-bold px-6 py-3 rounded-lg hover:bg-amber-300">Explore all trips</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
