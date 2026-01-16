import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { Cross } from 'lucide-react'
import { AdminContext } from '../context/AdminContext.jsx'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext.jsx'
const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)


    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && sessionStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && sessionStorage.removeItem('dToken')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-purple-200 shadow-sm shadow-purple-100 bg-white'>
            <div className='flex items-center gap-2 text-sm'>
                <div className='bg-purple-700 p-2 rounded-2xl w-fit'>
                    <span className='text-2xl font-semibold flex gap-2'>
                        <Cross className='text-white' />
                    </span>
                </div><p className='text-2xl font-semibold'>MediFlow</p>

                <p className='font-medium text-gray-800 border px-2.5 py-0.5 rounded-full border-purple-500 animate-pulse shadow-md shadow-purple-300'>{aToken ? "Admin Panel" : "Doctor Panel"}</p>
            </div>
            <button onClick={logout} className='sm:text-sm md:text-base  px-6 py-2.5 bg-purple-900 md:px-8 md:py-3 
            rounded-full  text-white font-medium hover:bg-white  border-purple-900 hover:border-purple-700 
          hover:text-purple-900 hover:shadow-md transition-all duration-200 ease-out cursor-pointer border '>Logout</button>
        </div>
    )
}

export default Navbar