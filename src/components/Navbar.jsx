import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/my-bookings', label: 'My Bookings' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-[#12263a] text-white' : 'hover:bg-white/70'}`

  return (
    <header className="sticky top-0 z-20 bg-[#eef4f6]/95 backdrop-blur border-b border-slate-200">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold text-[#0f766e]">TripNest</Link>
        <div className="hidden md:flex gap-1">
          {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>{l.label}</NavLink>)}
        </div>
        <button className="md:hidden p-2 text-2xl" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </nav>
      {open && (
        <div className="md:hidden px-4 pb-3 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass} onClick={() => setOpen(false)}>{l.label}</NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
