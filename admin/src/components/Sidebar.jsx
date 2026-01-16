import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { House, CalendarDays, SquarePlus, Users } from 'lucide-react'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='min-h-screen border-r border-purple-200 shadow-sm shadow-purple-200 bg-white  sm:w-20 md:w-56 lg:w-72'>
      {
        aToken && <ul className='mt-5'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-800 border-r-4 border-purple-700' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`} to={'/admin-dashboard'}>
            {/* <img src={assets.home_icon} alt="" /> */}
            <House />
            <p className='hidden md:block'>DashBoard</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-800 border-r-4 border-purple-700' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`} to={'/all-appointments'}>
            {/* <img src={assets.appointment_icon} alt="" /> */}
            <CalendarDays />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-800 border-r-4 border-purple-700' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`} to={'/add-doctor'}>
            {/* <img src={assets.add_icon} alt="" /> */}
            <SquarePlus />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-800 border-r-4 border-purple-700' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`} to={'/doctor-list'}>
            {/* <img src={assets.people_icon} alt="" /> */}
            <Users />
            <p className='hidden md:block'>Doctor List</p>
          </NavLink>

        </ul>
      }
      {
        dToken && <ul className='mt-5'>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-800 border-r-4 border-purple-700' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`} to={'/doctor-dashboard'}>
            <House />
            <p className='hidden md:block'>DashBoard</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-800 border-r-4 border-purple-700' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`} to={'/doctor-appointments'}>
            <CalendarDays />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9  cursor-pointer transition-all duration-200 ${isActive ? 'bg-purple-100 text-purple-800 border-r-4 border-purple-700' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}`} to={'/doctor-profile'}>
            <SquarePlus />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
          
        </ul>
      }

    </div>
  )
}

export default Sidebar