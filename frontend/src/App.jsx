import './App.css'
import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Login from './pages/Login'
import Appointment from './pages/Appointment'

import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AIChatbot from './components/aiChat/AiChat'
import GuestRoute from './guestRoute/GuestRoute'

import EmailVerify from './pages/EmailVerify'
import ForgotPassword from './pages/ForgotPassword'
import ResetOtpVerify from './pages/ResetOtpVerify'
import ResetPassword from './pages/ResetPassword'

import AppLoader from './components/AppLoader'
import { ToastContainer } from 'react-toastify'

function App() {
  const location = useLocation()
  const [appLoading, setAppLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  const authRoutes = [
    '/login',
    '/verify-email',
    '/forgot-password',
    '/verify-reset-otp',
    '/reset-password',
  ]

  const isAuthPage = authRoutes.includes(location.pathname)

  return (
    <>
      <AppLoader isLoading={appLoading} />

      <div className={isAuthPage ? '' : 'mx-4 sm:mx-[5%] pb-28 md:pb-10'}>
        <ToastContainer />
        <ScrollToTop />

        {!isAuthPage && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<EmailVerify />} />

          <Route
            path="/forgot-password"
            element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
            }
          />
          <Route
            path="/verify-reset-otp"
            element={
              <GuestRoute>
                <ResetOtpVerify />
              </GuestRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <GuestRoute>
                <ResetPassword />
              </GuestRoute>
            }
          />

          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointments/:docId" element={<Appointment />} />
        </Routes>

        {!isAuthPage && <BottomNav />}
      </div>

      <AIChatbot />

      {!isAuthPage && <Footer />}
    </>
  )
}

export default App