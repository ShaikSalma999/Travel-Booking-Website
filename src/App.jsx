import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import PackageDetails from './pages/PackageDetails'
import BookingForm from './pages/BookingForm'
import MyBookings from './pages/MyBookings'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0) 
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/book/:id" element={<BookingForm />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="*" element={<p className="text-center py-20">Page not found. <Link to="/" className="underline">Go home</Link></p>} />
        </Routes>
      </main>
      <footer className="text-center text-xs text-slate-500 py-6">© 2026 TripNest</footer>
    </div>
  )
}
