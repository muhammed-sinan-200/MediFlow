import React, { useContext } from 'react'
import { Cross, Menu } from 'lucide-react'
import { AdminContext } from '../context/AdminContext.jsx'
import { DoctorContext } from '../context/DoctorContext.jsx'

const Navbar = ({
  mobileSidebarOpen,
  setMobileSidebarOpen,
}) => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='sticky top-0 z-40 h-16 flex justify-between items-center px-4 sm:px-6 md:px-8 border-b border-purple-200 shadow-sm shadow-purple-100 bg-white'>
      <div className='flex items-center gap-3 min-w-0'>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className='lg:hidden p-2 rounded-xl border border-purple-200 text-purple-800 hover:bg-purple-50 transition'
        >
          <Menu size={20} />
        </button>

        <div className='bg-purple-700 p-2 rounded-2xl w-fit shrink-0'>
          <span className='text-2xl font-semibold flex gap-2'>
            <Cross className='text-white' />
          </span>
        </div>

        <div className='flex items-center gap-2 min-w-0'>
          <p className='text-lg sm:text-2xl font-semibold truncate'>MediFlow</p>

          <p className='hidden sm:block font-medium text-gray-800 border px-2.5 py-0.5 rounded-full border-purple-500 animate-pulse shadow-md shadow-purple-300 whitespace-nowrap'>
            {aToken ? 'Admin Panel' : dToken ? 'Doctor Panel' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navbar