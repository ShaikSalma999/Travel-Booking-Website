import { Link, useNavigate, useParams } from 'react-router-dom'
import { packages, formatINR } from '../data/data'

const List = ({ items, mark, tone }) => (
  <ul className="space-y-1.5 text-sm">
    {items.map((i) => <li key={i} className="flex gap-2"><span className={tone}>{mark}</span>{i}</li>)}
  </ul>
)

export default function PackageDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pkg = packages.find((p) => p.id === Number(id))

  if (!pkg) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="mb-4">We couldn't find that package.</p>
        <Link to="/destinations" className="text-[#0f766e] font-medium underline">Browse all trips</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="relative rounded-3xl overflow-hidden h-64 md:h-96 text-white">
        <img src={pkg.image} alt={pkg.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 p-6 md:p-10">
          <span className="bg-amber-400 text-[#12263a] text-xs font-bold px-3 py-1 rounded-full">{pkg.type}</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-3">{pkg.name}</h1>
          <p className="mt-1 opacity-90">📍 {pkg.destination}, {pkg.country} · {pkg.days} days · ★ {pkg.rating}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-display text-xl font-semibold mb-2">Highlights</h2>
            <List items={pkg.highlights} mark="✓" tone="text-[#0f766e]" />
          </section>

          <section className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-display text-xl font-semibold mb-3">Itinerary</h2>
            <ol className="space-y-3">
              {pkg.itinerary.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="font-bold text-[#0f766e] w-14 shrink-0">Day {i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="font-display text-lg font-semibold mb-2">Included</h2>
              <List items={pkg.inclusions} mark="+" tone="text-emerald-600 font-bold" />
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="font-display text-lg font-semibold mb-2">Not included</h2>
              <List items={pkg.exclusions} mark="–" tone="text-rose-600 font-bold" />
            </div>
          </section>
        </div>

        <aside className="md:sticky md:top-20 self-start bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Price per person</p>
          <p className="text-3xl font-bold text-[#0f766e]">{formatINR(pkg.price)}</p>
          <button onClick={() => navigate(`/book/${pkg.id}`)}
            className="mt-4 w-full bg-amber-400 hover:bg-amber-300 text-[#12263a] font-bold py-3 rounded-lg">
            Book now
          </button>
          <p className="text-xs text-slate-500 mt-3">Cancel anytime from My Bookings. 5% GST added at checkout.</p>
        </aside>
      </div>
    </div>
  )
}
