import React from 'react'
import { Cross } from 'lucide-react'
import { assets } from '../assets/assets'
const Footer = () => {
    return (
        <div className='container mt-20 py-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 text-center md:text-left'>

                <div className='gap-6 space-y-4 '>
                    <div className='flex  gap-3 text-center items-center justify-center md:justify-start'>
                        <div className='bg-purple-700 p-2 rounded-2xl'>
                            <span className='text-2xl font-semibold flex gap-2'>
                                <Cross className='text-white' />
                            </span>
                        </div>
                        <h1 className='text-2xl font-medium'>MediFlow</h1>
                    </div>

                    <p className='text-sm text-gray-600'>MediFlow helps patients find doctors and book appointments easily.</p>
                    <div className='flex items-center justify-center gap-2.5 '>
                        <p className='text-gray-600'>Created by </p>
                        <img className='w-10 rounded-xl cursor-pointer shadow-[0_0_15px_#a855f7]
                         border-purple-400 border-2 hover:scale-105  transition-all duration-200 hover:shadow-[0_0_25px_#a855f7]' src={assets.my_portrait} alt="" />
                    </div>
                </div>

                <div className='space-y-4'>
                    <p className='font-bold text-xl'>Quick Links</p>
                    <ul className='space-y-3 text-gray-600'>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> Home</span></li>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> About</span></li>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> Appointment</span></li>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> Contact</span></li>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> Provacy</span> Policy</li>
                    </ul>
                </div>
                <div className='space-y-4'>
                    <p className='font-bold text-xl'>Connect</p>
                    <ul className='space-y-3 text-gray-600'>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> LinkedIn</span></li>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> Twitter</span></li>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> GitHub</span></li>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> Instagram</span></li>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> Facebook</span></li>
                    </ul>
                </div>
                <div className='space-y-4'>
                    <p className='font-bold text-xl'>Legal</p>
                    <ul className='space-y-3 text-gray-600 '>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> Privacy</span> Policy</li>
                        <li ><span className='cursor-pointer hover:text-black transition-colors'> Terms</span> & Conditions</li>
                    </ul>
                </div>
            </div>
            <hr className='border-gray-400 mt-10' />

            <p className='text-sm text-center text-gray-600 mt-8'>
                &copy; 2025 MediFlow.All rights Reserved.</p>
        </div>
    )
}

export default Footer