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
} from 'lucide-react'

const Sidebar = ({ sidebarOpen, setSidebarOpen, mobileSidebarOpen, setMobileSidebarOpen }) => {
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
          fixed top-16 left-0 z-50 h-[calc(100vh-64px)] bg-white border-r border-purple-200 shadow-sm shadow-purple-200
          transition-all duration-300 ease-in-out flex flex-col
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-72 lg:translate-x-0 lg:fixed lg:z-30 lg:h-[calc(100vh-64px)]
          ${sidebarOpen ? 'lg:w-72' : 'lg:w-20'}
          shrink-0 overflow-hidden
        `}
      >
        <div className='flex items-center justify-between px-3 py-3 border-b border-purple-100'>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='hidden lg:flex items-center justify-center h-10 w-10 rounded-xl border border-purple-200 text-purple-800 hover:bg-purple-50 transition'
          >
            <PanelLeft size={18} />
          </button>

          <div className='lg:hidden flex w-full justify-end'>
            <button
              onClick={handleMobileClose}
              className='p-2 rounded-lg hover:bg-purple-50 text-purple-800'
            >
              <X size={20} />
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
                  <SquarePlus className='shrink-0' />
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
            className='w-full flex items-center gap-3 rounded-xl px-3 md:px-5 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-all duration-200'
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