import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Cross, LogOut, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext.jsx'
const Navbar = () => {

    const navigate = useNavigate()
    const { token, setToken, userData } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/login')
    }

    const base = 'px-8 py-3 rounded-4xl border-0 text-md  hover:text-purple-600 transition-all'
    const active = 'bg-white text-purple-700'
    const noActive = 'text-black hover:bg-white'

    return (
        <motion.div initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className=' flex justify-between items-center text-sm p-4 border-0 rounded-4xl mb-5 bg-transparent relative z-50'>
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
            <ul className='hidden lg:flex justify-between items-start px-1.5 py-1 gap-3 font-semibold  border-0 bg-gray-100/50 rounded-4xl'>
                <NavLink to='/' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>Home
                </NavLink>
                <NavLink to='/doctors' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>Our Doctors
                </NavLink>
                <NavLink to='/about' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>About
                </NavLink>
                <NavLink to='/contact' className={({ isActive }) => `${base} ${isActive ? active : noActive}`}>Contact
                </NavLink>

            </ul>
            <div className='flex items-center gap-2'>
                {
                    token && userData ?
                        <>
                            <motion.div onClick={() => setIsOpen(!isOpen)}
                                whileHover={{
                                    boxShadow: "0 0 16px rgba(168,85,247,0.8)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className='flex flex-shrink-0 gap-3 cursor-pointer group relative bg-purple-200  rounded-full'>
                                <img className='w-10 rounded-full' src={userData.image} alt="" />
                                {/* <img className='w-3' src={assets.dropdown_icon} alt="" /> */}
                                {
                                    isOpen && (
                                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20'>
                                            <div className='w-48 border border-purple-700 outline-none bg-white/30  backdrop-blur-md rounded-2xl flex flex-col gap-4 py-6 px-3 shadow-lg'>
                                                <button onClick={() => navigate('my-profile')} className='flex items-center px-3 py-2 w-full text-left rounded-md hover:bg-purple-50 cursor-pointer'><span>My Profile</span></button>
                                                <button onClick={() => navigate('my-appointments')} className='flex items-center px-3 py-2 w-full text-left rounded-md hover:bg-purple-50 cursor-pointer'><span>My Appointments</span></button>
                                                <button onClick={logout} className='flex items-center px-3 py-2 w-full text-left rounded-md hover:bg-purple-50 cursor-pointer gap-2'><span>Logout</span> <span><LogOut /></span></button>
                                            </div>
                                        </div>

                                    )
                                }
                            </motion.div>
                          

                        </>

                        : <button onClick={() => navigate('/login')}
                            className='
                                    block md:block group bg-purple-900 px-6 py-3
                                    rounded-full cursor-pointer  text-white font-medium
                                   hover:bg-white  border border-purple-900 hover:border-purple-700 
                                   hover:text-purple-900 hover:shadow-md transition-all duration-200 ease-out'
                        >
                            <span
                                className='group-hover:scale-105 inline-block transition-transform'>
                                Create account
                            </span>
                        </button>
                }
                  <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 rounded-full hover:bg-purple-100 transition"
                            >
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>

            </div>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-2 mt-3 w-full  bg-white/30  backdrop-blur-md  rounded-3xl shadow-xl p-6 flex flex-col gap-4 lg:hidden z-50 border border-purple-200"
                >
                    <NavLink
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/doctors"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700"
                    >
                        Our Doctors
                    </NavLink>
                    <NavLink
                        to="/about"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700"
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-2 rounded-xl hover:bg-purple-50 transition font-medium text-gray-700"
                    >
                        Contact
                    </NavLink>
                </motion.div>

            )}

        </motion.div>
    )
}

export default Navbar