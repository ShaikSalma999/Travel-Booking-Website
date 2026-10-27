import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { packages, destinationTypes } from '../data/data'
import PackageCard from '../components/PackageCard'

const priceRanges = [
  { label: 'Any price', min: 0, max: Infinity },
  { label: 'Under ₹30,000', min: 0, max: 30000 },
  { label: '₹30,000 – ₹75,000', min: 30000, max: 75000 },
  { label: 'Above ₹75,000', min: 75000, max: Infinity },
]
const durations = [
  { label: 'Any duration', min: 0, max: 99 },
  { label: '1–4 days', min: 1, max: 4 },
  { label: '5–7 days', min: 5, max: 7 },
  { label: '8+ days', min: 8, max: 99 },
]

export default function Destinations() {
  const [params] = useSearchParams()
  const [search, setSearch] = useState(params.get('q') || '')
  const [type, setType] = useState('All')
  const [priceIdx, setPriceIdx] = useState(0)
  const [durIdx, setDurIdx] = useState(0)

  const price = priceRanges[priceIdx]
  const dur = durations[durIdx]
  const term = search.trim().toLowerCase()

  const results = packages.filter((p) =>
    (!term || `${p.name} ${p.destination} ${p.country}`.toLowerCase().includes(term)) &&
    (type === 'All' || p.type === type) &&
    p.price >= price.min && p.price < price.max &&
    p.days >= dur.min && p.days <= dur.max
  )

  const reset = () => { setSearch(''); setType('All'); setPriceIdx(0); setDurIdx(0) }
  const selectClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm'

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-5">Find your trip</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-4 grid gap-3 md:grid-cols-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search destination or country"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-4" />
        <select className={selectClass} value={type} onChange={(e) => setType(e.target.value)} aria-label="Destination type">
          {destinationTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select className={selectClass} value={priceIdx} onChange={(e) => setPriceIdx(+e.target.value)} aria-label="Price range">
          {priceRanges.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
        </select>
        <select className={selectClass} value={durIdx} onChange={(e) => setDurIdx(+e.target.value)} aria-label="Duration">
          {durations.map((d, i) => <option key={d.label} value={i}>{d.label}</option>)}
        </select>
        <button onClick={reset} className="text-sm text-[#0f766e] font-medium border border-[#0f766e] rounded-lg py-2 hover:bg-teal-50">Clear filters</button>
      </div>

      <p className="text-sm text-slate-600 mt-5 mb-3">{results.length} trip{results.length !== 1 && 's'} found</p>
      {results.length === 0 ? (
        <p className="text-center py-16 text-slate-600">No trips match those filters. Try a wider price range or clear the search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((p) => <PackageCard key={p.id} pkg={p} />)}
        </div>
      )}
    </div>
  )
}
