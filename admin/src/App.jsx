import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointment from './pages/Doctor/DoctorAppointment'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import ScrollToTop from './components/ScrollToTop'
import { AdminRoute, DoctorRoute } from './components/RoleRoute'
import NotFound from './pages/NotFound'

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return aToken || dToken ? (
    <div className='min-h-screen bg-purple-50'>
      <ToastContainer />

      <Navbar
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      <div className='flex'>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        <main
          className={`flex-1 min-w-0 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
            }`}
        >          
        <ScrollToTop/>
        <Routes>
            <Route
              path="/"
              element={
                aToken ? (
                  <Navigate to="/admin-dashboard" replace />
                ) : (
                  <Navigate to="/doctor-dashboard" replace />
                )
              }
            />

            <Route path='/admin-dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path='/all-appointments' element={<AdminRoute><AllAppointments /></AdminRoute>} />
            <Route path='/add-doctor' element={<AdminRoute><AddDoctor /></AdminRoute>} />
            <Route path='/doctor-list' element={<AdminRoute><DoctorsList /></AdminRoute>} />

            <Route path='/doctor-dashboard' element={<DoctorRoute><DoctorDashboard /></DoctorRoute>} />
            <Route path='/doctor-appointments' element={<DoctorRoute><DoctorAppointment /></DoctorRoute>} />
            <Route path='/doctor-profile' element={<DoctorRoute><DoctorProfile /></DoctorRoute>} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App