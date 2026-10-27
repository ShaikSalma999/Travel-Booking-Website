import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { packages, formatINR } from '../data/data'

const GST_RATE = 0.05
const today = new Date().toISOString().split('T')[0]

export default function BookingForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pkg = packages.find((p) => p.id === Number(id))

  const [form, setForm] = useState({ name: '', email: '', phone: '', travelers: 1, startDate: '' })
  const [errors, setErrors] = useState({})

  if (!pkg) return <p className="text-center py-20">Package not found. <Link to="/destinations" className="underline">Browse trips</Link></p>

  const travelers = Number(form.travelers) || 0
  const subtotal = pkg.price * travelers
  const gst = Math.round(subtotal * GST_RATE)
  const total = subtotal + gst

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' }) // clear the error as the user fixes it
  }

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 3) e.name = 'Enter your full name (at least 3 characters).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a 10-digit Indian mobile number.'
    if (!(travelers >= 1 && travelers <= 10)) e.travelers = 'Travelers must be between 1 and 10.'
    if (!form.startDate) e.startDate = 'Choose a start date.'
    else if (form.startDate < today) e.startDate = 'Start date cannot be in the past.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) return

    const end = new Date(form.startDate)
    end.setDate(end.getDate() + pkg.days - 1)

    const booking = {
      id: Date.now(),
      packageId: pkg.id, packageName: pkg.name, destination: pkg.destination, 
      name: form.name.trim(), email: form.email, phone: form.phone,
      travelers, startDate: form.startDate, endDate: end.toISOString().split('T')[0],
      total,
    }
    const existing = JSON.parse(localStorage.getItem('tripnest_bookings') || '[]')
    localStorage.setItem('tripnest_bookings', JSON.stringify([booking, ...existing]))
    navigate('/my-bookings', { state: { justBooked: true } })
  }

  const field = (name, label, props = {}) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
      <input id={name} name={name} value={form[name]} onChange={handleChange}
        className={`w-full rounded-lg border px-3 py-2 ${errors[name] ? 'border-rose-500' : 'border-slate-300'}`} {...props} />
      {errors[name] && <p className="text-xs text-rose-600 mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-5 gap-6">
      <form onSubmit={handleSubmit} noValidate className="md:col-span-3 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h1 className="font-display text-2xl font-bold">Traveler details</h1>
        {field('name', 'Full name', { autoComplete: 'name' })}
        {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
        {field('phone', 'Mobile number', { type: 'tel', maxLength: 10, placeholder: '9876543210' })}
        <div className="grid grid-cols-2 gap-4">
          {field('travelers', 'Travelers', { type: 'number', min: 1, max: 10 })}
          {field('startDate', 'Start date', { type: 'date', min: today })}
        </div>
        <button className="w-full bg-[#0f766e] hover:bg-[#0b5f58] text-white font-bold py-3 rounded-lg">
          Confirm booking · {formatINR(total)}
        </button>
      </form>

      <aside className="md:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden self-start text-sm">
        <img src={pkg.image} alt={pkg.name} className="h-40 w-full object-cover" />
        <div className="p-6 space-y-2">
        <h2 className="font-display text-lg font-semibold">{pkg.name}</h2>
        <p className="text-slate-500">{pkg.days} days · {pkg.destination}</p>
        <hr className="my-3" />
        <div className="flex justify-between"><span>{formatINR(pkg.price)} × {travelers}</span><span>{formatINR(subtotal)}</span></div>
        <div className="flex justify-between"><span>GST (5%)</span><span>{formatINR(gst)}</span></div>
        <div className="flex justify-between font-bold text-base pt-2 border-t"><span>Total</span><span className="text-[#0f766e]">{formatINR(total)}</span></div>
        </div>
      </aside>
    </div>
  )
}
