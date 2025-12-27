import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { Cross, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
const Navbar = () => {
    
    const [token,setToken]  = useState(false)
    const navigate = useNavigate()

    const base = 'px-8 py-3 rounded-4xl border-0 text-md  hover:text-purple-600 transition-all'
    const active = 'bg-white text-purple-700'
    const noActive = 'text-black hover:bg-white'

    return (
        <div className=' flex justify-between items-center text-sm p-4 border-0 rounded-4xl mb-5 bg-transparent relative z-50'>
            <NavLink to='/' className='flex gap-2 group justify-between items-center'>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className='bg-purple-700 p-2 rounded-2xl'
                >
                    <span className='text-2xl font-semibold flex gap-2'>
                        <Cross className='text-white' />
                    </span>
                </motion.div>
                <h1 className='text-2xl font-semibold'>MediFlow</h1>
            </NavLink>
            <ul className='hidden md:flex justify-between items-start px-1.5 py-1 gap-3 font-semibold  border-0 bg-gray-100/50 rounded-4xl'>
                <NavLink to='/' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>Home
                </NavLink>
                <NavLink to='/doctors' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>Our Doctors
                </NavLink>
                <NavLink to='/about' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>About
                </NavLink>
                <NavLink to='/contact' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>Contact
                </NavLink>

            </ul>
            <div>
                {
                    token?
                     <div className='flex gap-3 cursor-pointer group relative'> 
                        <img className='w-10 rounded-full' src={assets.profile_pic} alt="" />
                        <img className='w-3' src={assets.dropdown_icon} alt="" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={()=>navigate('my-profile')}  className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={()=>navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'><LogOut />Logout</p>
                            </div>
                        </div>
                    </div>
                    
                    : <button onClick={() => navigate('/login')}
                className='
                hidden md:block group bg-purple-900 px-6 py-3
                rounded-4xl cursor-pointer border text-white
                hover:bg-white   hover:border-purple-700 
                hover:text-black transition-all duration-100'
                >
                    <span 
                    className='group-hover:scale-105 inline-block transition-transform'>
                    Login
                    </span>
                </button>
                }
                
            </div>
        </div>
    )
}

export default Navbar