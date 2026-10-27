import { Link } from 'react-router-dom'
import { formatINR } from '../data/data'

export default function PackageCard({ pkg }) {
  return (
    <Link to={`/package/${pkg.id}`} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <img src={pkg.image} alt={pkg.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute top-3 left-3 bg-white/90 text-[#12263a] text-xs font-bold px-2.5 py-1 rounded-full">{pkg.type}</span>
        <span className="absolute top-3 right-3 bg-amber-400 text-[#12263a] text-xs font-bold px-2.5 py-1 rounded-full">★ {pkg.rating}</span>
        <p className="absolute bottom-3 left-4 right-4 text-white font-medium text-sm drop-shadow">📍 {pkg.destination}, {pkg.country}</p>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold">{pkg.name}</h3>
        <p className="text-sm text-slate-600 mt-1 flex-1">{pkg.summary}</p>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
          <span className="text-sm text-slate-500">{pkg.days} days</span>
          <span className="text-right">
            <span className="block text-xs text-slate-500">from</span>
            <span className="text-xl font-bold text-[#0f766e]">{formatINR(pkg.price)}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
