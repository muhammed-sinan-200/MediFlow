import React from 'react'
import { Cross } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-purple-100'>
            <div className='container px-4 pt-14 pb-6 sm:px-6 md:px-8'>
                <div className='grid grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10 text-left'>

                    <div className='space-y-4'>
                        <div className='flex gap-3 items-center'>
                            <div className='bg-purple-700 p-2 rounded-2xl'>
                                <span className='text-2xl font-semibold flex gap-2'>
                                    <Cross className='text-white' />
                                </span>
                            </div>
                            <h1 className='text-2xl font-medium'>MediFlow</h1>
                        </div>

                        <p className='text-sm text-gray-600 leading-6 max-w-[220px]'>
                            MediFlow helps patients find doctors and book appointments easily.
                        </p>
                    </div>

                    <div className='space-y-4'>
                        <p className='font-bold text-xl'>Quick Links</p>
                        <ul className='space-y-2.5 text-sm text-gray-600'>
                            <li>
                                <Link to='/' className='hover:text-black transition-colors'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/doctors' className='hover:text-black transition-colors'>
                                    Doctors
                                </Link>
                            </li>
                            <li>
                                <Link to='/about' className='hover:text-black transition-colors'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to='/contact' className='hover:text-black transition-colors'>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='space-y-4'>
                        <p className='font-bold text-xl'>Connect</p>
                        <ul className='space-y-2 text-sm text-gray-600'>
                            <li><span className='cursor-pointer hover:text-black transition-colors'>LinkedIn</span></li>
                            <li><span className='cursor-pointer hover:text-black transition-colors'>Youtube</span></li>
                            <li><span className='cursor-pointer hover:text-black transition-colors'>GitHub</span></li>
                            <li><span className='cursor-pointer hover:text-black transition-colors'>Instagram</span></li>
                        </ul>
                    </div>

                    <div className='space-y-4'>
                        <p className='font-bold text-xl'>Legal</p>
                        <ul className='space-y-2 text-sm text-gray-600'>
                            <li><span className='cursor-pointer hover:text-black transition-colors'>Privacy Policy</span></li>
                            <li><span className='cursor-pointer hover:text-black transition-colors'>Terms & Conditions</span></li>
                        </ul>
                    </div>
                </div>

                <hr className='border-gray-300 mt-10 mb-4' />

                <p className='text-sm text-center text-gray-600'>
                    &copy; 2025 MediFlow. All rights reserved.
                </p>
            </div>
        </div>

    )
}

export default Footer