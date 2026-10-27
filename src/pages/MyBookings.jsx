import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatINR, packages } from '../data/data'

const KEY = 'tripnest_bookings'
const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function MyBookings() {
  const location = useLocation()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    try {
      setBookings(JSON.parse(localStorage.getItem(KEY) || '[]'))
    } catch {
      setBookings([]) 
    }
  }, [])

  const cancelBooking = (id) => {
    if (!window.confirm('Cancel this booking? This cannot be undone.')) return
    const updated = bookings.filter((b) => b.id !== id)
    setBookings(updated)
    localStorage.setItem(KEY, JSON.stringify(updated))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-4">My bookings</h1>

      {location.state?.justBooked && (
        <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 text-sm">
          Booking confirmed. Your trip is saved below.
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl text-center py-16">
          <p className="text-slate-600 mb-3">You haven't booked anything yet.</p>
          <Link to="/destinations" className="text-[#0f766e] font-medium underline">Find a trip</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <article key={b.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <img src={packages.find((p) => p.id === b.packageId)?.image} alt={b.packageName} className="w-full sm:w-40 h-32 sm:h-28 rounded-lg object-cover" />
              <div className="flex-1 text-sm">
                <h2 className="font-display text-lg font-semibold">{b.packageName}</h2>
                <p className="text-slate-600">{fmtDate(b.startDate)} to {fmtDate(b.endDate)} · {b.travelers} traveler{b.travelers > 1 && 's'}</p>
                <p className="text-slate-500">{b.name} · {b.email} · {b.phone}</p>
              </div>
              <div className="sm:text-right">
                <p className="font-bold text-[#0f766e] text-lg">{formatINR(b.total)}</p>
                <button onClick={() => cancelBooking(b.id)} className="text-sm text-rose-600 hover:underline mt-1">Cancel booking</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
