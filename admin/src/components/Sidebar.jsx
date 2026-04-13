import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import {
  House,
  CalendarDays,
  SquarePlus,
  Users,
  X,
  PanelLeft,
  LogOut,
  Cross,
  User,
} from 'lucide-react'

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}) => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const handleMobileClose = () => {
    setMobileSidebarOpen(false)
  }

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && sessionStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && sessionStorage.removeItem('dToken')
    setMobileSidebarOpen(false)
  }

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-5 cursor-pointer transition-all duration-200 whitespace-nowrap rounded-xl mx-2 ${
      isActive
        ? 'bg-purple-100 text-purple-800 border border-purple-200'
        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
    }`

  return (
    <>
      {mobileSidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/30 lg:hidden'
          onClick={handleMobileClose}
        />
      )}

      <aside
        className={`
          fixed left-0 z-50 bg-white border-r border-purple-200 shadow-sm shadow-purple-200
          transition-all duration-300 ease-in-out flex flex-col
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          top-0 h-screen w-72
          lg:top-16 lg:h-[calc(100vh-64px)] lg:translate-x-0 lg:fixed lg:z-30
          ${sidebarOpen ? 'lg:w-72' : 'lg:w-20'}
          shrink-0 overflow-hidden
        `}
      >
        <div className='border-b border-purple-100'>
          <div className='lg:hidden h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-white'>
            <div className='flex items-center gap-3 min-w-0'>
              <div className='bg-purple-700 p-2 rounded-2xl w-fit shrink-0'>
                <span className='text-2xl font-semibold flex gap-2'>
                  <Cross className='text-white' />
                </span>
              </div>

              <div className='flex items-center gap-2 min-w-0'>
                <p className='text-lg sm:text-2xl font-semibold truncate'>MediFlow</p>
              </div>
            </div>

            <button
              onClick={handleMobileClose}
              className='p-2 rounded-lg hover:bg-purple-50 text-purple-800 transition'
            >
              <X size={20} />
            </button>
          </div>

          <div className='hidden lg:flex items-center justify-between px-3 py-3'>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='flex items-center justify-center h-10 w-10 rounded-xl border border-purple-200 text-purple-800 hover:bg-purple-50 transition'
            >
              <PanelLeft size={18} />
            </button>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto py-3'>
          {aToken && (
            <ul className='space-y-1'>
              <li>
                <NavLink
                  className={navClass}
                  to='/admin-dashboard'
                  onClick={handleMobileClose}
                >
                  <House className='shrink-0' />
                  <span className={`${sidebarOpen ? 'lg:inline' : 'lg:hidden'} inline`}>
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={navClass}
                  to='/all-appointments'
                  onClick={handleMobileClose}
                >
                  <CalendarDays className='shrink-0' />
                  <span className={`${sidebarOpen ? 'lg:inline' : 'lg:hidden'} inline`}>
                    Appointments
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={navClass}
                  to='/add-doctor'
                  onClick={handleMobileClose}
                >
                  <SquarePlus className='shrink-0' />
                  <span className={`${sidebarOpen ? 'lg:inline' : 'lg:hidden'} inline`}>
                    Add Doctor
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={navClass}
                  to='/doctor-list'
                  onClick={handleMobileClose}
                >
                  <Users className='shrink-0' />
                  <span className={`${sidebarOpen ? 'lg:inline' : 'lg:hidden'} inline`}>
                    Doctor List
                  </span>
                </NavLink>
              </li>
            </ul>
          )}

          {dToken && (
            <ul className='space-y-1'>
              <li>
                <NavLink
                  className={navClass}
                  to='/doctor-dashboard'
                  onClick={handleMobileClose}
                >
                  <House className='shrink-0' />
                  <span className={`${sidebarOpen ? 'lg:inline' : 'lg:hidden'} inline`}>
                    Dashboard
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={navClass}
                  to='/doctor-appointments'
                  onClick={handleMobileClose}
                >
                  <CalendarDays className='shrink-0' />
                  <span className={`${sidebarOpen ? 'lg:inline' : 'lg:hidden'} inline`}>
                    Appointments
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={navClass}
                  to='/doctor-profile'
                  onClick={handleMobileClose}
                >
                  <User className='shrink-0' />
                  <span className={`${sidebarOpen ? 'lg:inline' : 'lg:hidden'} inline`}>
                    Profile
                  </span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        <div className='border-t border-purple-100 p-3'>
          <button
            onClick={logout}
            className='w-full flex items-center gap-3 rounded-xl px-3 md:px-5 py-3 text-gray-700 transition-all duration-200 hover:bg-red-500 hover:text-white'
          >
            <LogOut className='shrink-0' size={18} />
            <span className={`${sidebarOpen ? 'lg:inline' : 'lg:hidden'} inline font-medium`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar